import { neon } from '@neondatabase/serverless';
import { LIMITS, type WallNote, type WallReply } from '@/content/wall';

interface ListOptions {
  limit: number;
  before?: number;
  bounds?: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
}

export interface NoteStore {
  list(options: ListOptions): Promise<{ notes: WallNote[]; total: number }>;
  add(
    note: Omit<WallNote, 'id' | 'createdAt' | 'replies' | 'owner' | 'replyCount'>
  ): Promise<WallNote>;
  get(id: string): Promise<WallNote | undefined>;
  latest(): Promise<WallNote | undefined>;
  random(): Promise<WallNote | undefined>;
  hide(id: string): Promise<boolean>;
  addReply(
    noteId: string,
    reply: Omit<WallReply, 'id' | 'noteId' | 'createdAt'>
  ): Promise<WallReply | null>;
}

interface NoteRow {
  id: string;
  parent_id: string | null;
  author_name: string;
  body: string;
  x: number | null;
  y: number | null;
  variant: number;
  is_owner: boolean;
  created_at: string;
  reply_count?: number | string;
}

function databaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is required for the notes wall.');
  }
  return url;
}

function createdAtMs(value: string): number {
  const ms = new Date(value).getTime();
  return Number.isFinite(ms) ? ms : Date.now();
}

function toReply(row: NoteRow): WallReply {
  return {
    id: row.id,
    noteId: row.parent_id ?? '',
    name: row.author_name,
    message: row.body,
    createdAt: createdAtMs(row.created_at),
  };
}

function toNote(row: NoteRow, replies: WallReply[] = []): WallNote {
  return {
    id: row.id,
    x: row.x ?? 0,
    y: row.y ?? 0,
    name: row.author_name,
    message: row.body,
    createdAt: createdAtMs(row.created_at),
    variant: row.variant,
    owner: row.is_owner,
    replyCount: Number(row.reply_count ?? replies.length),
    replies,
  };
}

function groupReplies(rows: NoteRow[]): Map<string, WallReply[]> {
  const grouped = new Map<string, WallReply[]>();
  for (const row of rows) {
    if (!row.parent_id) continue;
    const list = grouped.get(row.parent_id) ?? [];
    list.push(toReply(row));
    grouped.set(row.parent_id, list);
  }
  return grouped;
}

class PostgresNoteStore implements NoteStore {
  private sql = neon(databaseUrl());

  async list({ limit, before, bounds }: ListOptions) {
    const capped = Math.min(Math.max(1, limit), LIMITS.initialFetchLimit);
    const beforeDate = before ? new Date(before).toISOString() : null;
    const hasBounds = Boolean(bounds);
    const rows = (await this.sql`
      select
        n.id,
        n.parent_id,
        n.author_name,
        n.body,
        n.x,
        n.y,
        n.variant,
        n.is_owner,
        n.created_at,
        (
          select count(*)::int
          from wall_notes r
          where r.parent_id = n.id and r.moderation_state = 'visible'
        ) as reply_count
      from wall_notes n
      where n.parent_id is null
        and n.moderation_state = 'visible'
        and (${beforeDate}::timestamptz is null or n.created_at < ${beforeDate}::timestamptz)
        and (
          ${hasBounds} = false
          or (
            n.x between ${bounds?.minX ?? 0} and ${bounds?.maxX ?? 0}
            and n.y between ${bounds?.minY ?? 0} and ${bounds?.maxY ?? 0}
          )
        )
      order by n.is_owner desc, n.created_at desc
      limit ${capped}
    `) as NoteRow[];
    const replies = await this.repliesFor(rows.map(row => row.id));
    const countRows = (await this.sql`
      select count(*)::text as count
      from wall_notes
      where parent_id is null and moderation_state = 'visible'
    `) as Array<{ count: string }>;
    return {
      notes: rows.map(row => toNote(row, replies.get(row.id) ?? [])),
      total: Number(countRows[0]?.count ?? rows.length),
    };
  }

  async add(note: Omit<WallNote, 'id' | 'createdAt' | 'replies' | 'owner' | 'replyCount'>) {
    const rows = (await this.sql`
      insert into wall_notes (author_name, body, x, y, variant)
      values (${note.name}, ${note.message}, ${note.x}, ${note.y}, ${note.variant})
      returning id, parent_id, author_name, body, x, y, variant, is_owner, created_at
    `) as NoteRow[];
    return toNote(rows[0]);
  }

  async get(id: string) {
    const rows = (await this.sql`
      select id, parent_id, author_name, body, x, y, variant, is_owner, created_at
      from wall_notes
      where id = ${id}
        and parent_id is null
        and moderation_state = 'visible'
      limit 1
    `) as NoteRow[];
    const row = rows[0];
    if (!row) return undefined;
    const replies = await this.repliesFor([id]);
    return toNote(row, replies.get(id) ?? []);
  }

  async latest() {
    const rows = (await this.sql`
      select id, parent_id, author_name, body, x, y, variant, is_owner, created_at
      from wall_notes
      where parent_id is null and moderation_state = 'visible'
      order by created_at desc
      limit 1
    `) as NoteRow[];
    return rows[0] ? toNote(rows[0], await this.repliesForOne(rows[0].id)) : undefined;
  }

  async random() {
    const rows = (await this.sql`
      select id, parent_id, author_name, body, x, y, variant, is_owner, created_at
      from wall_notes
      where parent_id is null and moderation_state = 'visible'
      order by random()
      limit 1
    `) as NoteRow[];
    return rows[0] ? toNote(rows[0], await this.repliesForOne(rows[0].id)) : undefined;
  }

  async hide(id: string) {
    const rows = (await this.sql`
      update wall_notes
      set moderation_state = 'hidden', hidden_at = now()
      where id = ${id} and moderation_state = 'visible'
      returning id
    `) as Array<{ id: string }>;
    return rows.length > 0;
  }

  async addReply(
    noteId: string,
    reply: Omit<WallReply, 'id' | 'noteId' | 'createdAt'>
  ): Promise<WallReply | null> {
    const parent = await this.get(noteId);
    if (!parent) return null;
    const rows = (await this.sql`
      insert into wall_notes (parent_id, author_name, body)
      values (${noteId}, ${reply.name}, ${reply.message})
      returning id, parent_id, author_name, body, x, y, variant, is_owner, created_at
    `) as NoteRow[];
    return toReply(rows[0]);
  }

  private async repliesForOne(noteId: string) {
    const replies = await this.repliesFor([noteId]);
    return replies.get(noteId) ?? [];
  }

  private async repliesFor(noteIds: string[]) {
    if (noteIds.length === 0) return new Map<string, WallReply[]>();
    const rows = (await this.sql`
      select id, parent_id, author_name, body, x, y, variant, is_owner, created_at
      from wall_notes
      where parent_id = any(${noteIds})
        and moderation_state = 'visible'
      order by created_at asc
      limit 400
    `) as NoteRow[];
    return groupReplies(rows);
  }
}

export function getNoteStore(): NoteStore {
  return new PostgresNoteStore();
}

export function notesPersistenceConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function persistenceErrorResponse() {
  return Response.json(
    { error: 'Notes persistence is not configured. Set DATABASE_URL to enable the wall.' },
    { status: 503 }
  );
}

/** Sliding-window rate limiter (per process; pair with platform limits in prod). */
const buckets = new Map<string, { notes: number[]; replies: number[] }>();
export function checkRateLimit(
  ip: string,
  kind: 'notes' | 'replies'
): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  let bucket = buckets.get(ip);
  if (!bucket) {
    bucket = { notes: [], replies: [] };
    buckets.set(ip, bucket);
  }
  const stamps = bucket[kind].filter(t => now - t < windowMs);
  bucket[kind] = stamps;
  const limit = kind === 'notes' ? LIMITS.notesPerHourPerIp : LIMITS.repliesPerHourPerIp;
  if (stamps.length >= limit) {
    const retryAfter = Math.ceil((stamps[0] + windowMs - now) / 1000);
    return { ok: false, retryAfter };
  }
  stamps.push(now);
  return { ok: true, retryAfter: 0 };
}

export function clientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim().slice(0, 64);
  return 'local';
}
