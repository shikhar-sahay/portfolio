import { LIMITS, SEED_NOTES, type WallNote, type WallReply } from '@/content/wall';

/**
 * Storage abstraction for the notes wall.
 *
 * TODAY this is an in-memory Map: perfect on `next dev` and on a
 * long-running Node server, but serverless instances do NOT share
 * memory, so on Vercel each invocation would see a different wall.
 *
 * PRODUCTION path (owner setup required, nothing committed here):
 * implement this same interface against Upstash Redis or Vercel KV
 * (`@vercel/kv`), reading credentials from environment variables
 * (e.g. `KV_REST_API_URL`, `KV_REST_API_TOKEN`), and swap the export
 * in this file. The routes, validation, and UI do not change.
 */
export interface NoteStore {
  list(limit: number, before?: number): { notes: WallNote[]; total: number };
  add(note: Omit<WallNote, 'id' | 'createdAt' | 'replies' | 'owner'>): WallNote;
  get(id: string): WallNote | undefined;
  remove(id: string): boolean;
  addReply(noteId: string, reply: Omit<WallReply, 'id' | 'noteId' | 'createdAt'>): WallReply | null;
}

function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

class MemoryNoteStore implements NoteStore {
  private notes = new Map<string, WallNote>();

  seed(seeds: WallNote[]) {
    for (const seed of seeds) {
      if (!this.notes.has(seed.id)) {
        this.notes.set(seed.id, { ...seed, replies: [...seed.replies] });
      }
    }
  }

  list(limit: number, before?: number) {
    const all = Array.from(this.notes.values())
      .filter(n => (before === undefined ? true : n.createdAt < before))
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, Math.min(limit, LIMITS.initialFetchLimit));
    return { notes: all, total: this.notes.size };
  }

  add(note: Omit<WallNote, 'id' | 'createdAt' | 'replies' | 'owner'>): WallNote {
    const full: WallNote = { ...note, id: uid(), createdAt: Date.now(), replies: [], owner: false };
    this.notes.set(full.id, full);
    return full;
  }

  get(id: string) {
    return this.notes.get(id);
  }

  remove(id: string) {
    return this.notes.delete(id);
  }

  addReply(
    noteId: string,
    reply: Omit<WallReply, 'id' | 'noteId' | 'createdAt'>
  ): WallReply | null {
    const note = this.notes.get(noteId);
    if (!note) return null;
    const full: WallReply = { ...reply, id: uid(), noteId, createdAt: Date.now() };
    note.replies = [...note.replies.slice(-49), full];
    return full;
  }
}

// Module singleton: shared across route handlers in one process.
// Seeded with the owner notes so seeds accept replies like any note.
const globalStore = globalThis as unknown as { __wallStore?: MemoryNoteStore };
if (!globalStore.__wallStore) {
  globalStore.__wallStore = new MemoryNoteStore();
  globalStore.__wallStore.seed(SEED_NOTES);
}
export const noteStore: NoteStore = globalStore.__wallStore;

/** Sliding-window rate limiter (per process; pair with edge limits in prod). */
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
