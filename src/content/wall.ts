/**
 * Notes wall data model and shared validation. Used by both the API
 * routes (server) and the wall UI (client) so the rules live in one
 * place. Rendering is always plain React text nodes: no HTML, no links,
 * nothing to escape at render time beyond what React already does.
 */

export interface WallReply {
  id: string;
  noteId: string;
  name: string;
  message: string;
  createdAt: number;
}

export interface WallNote {
  id: string;
  x: number;
  y: number;
  name: string;
  message: string;
  createdAt: number;
  variant: number;
  owner: boolean;
  replyCount: number;
  replies: WallReply[];
}

/**
 * Practical world bounds. The wall is not presented as a finite canvas:
 * these limits only keep persisted coordinates sane.
 */
export const WORLD = {
  w: 200000,
  h: 200000,
  minX: -100000,
  maxX: 100000,
  minY: -100000,
  maxY: 100000,
  originX: 0,
  originY: 0,
} as const;

/** Strict input limits (mirrored client and server). */
export const LIMITS = {
  nameMax: 24,
  messageMax: 140,
  replyMax: 100,
  notesPerHourPerIp: 10,
  repliesPerHourPerIp: 20,
  maxPayloadBytes: 4096,
  initialFetchLimit: 300,
  renderCap: 150,
} as const;

/** Three style variants: ink on paper, paper on ink, vermilion accent. */
export const VARIANTS = [0, 1, 2] as const;

function cleanText(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  // Strip control characters; keep everything else as plain text.
  const text = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();
  if (text.length === 0 || text.length > max) return null;
  return text;
}

function cleanCoord(value: unknown, max: number): number | null {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  if (value < -max || value > max) return null;
  return Math.round(value);
}

export function validateNote(
  input: unknown
):
  | { ok: true; note: { name: string; message: string; x: number; y: number; variant: number } }
  | { ok: false; error: string } {
  if (!input || typeof input !== 'object') return { ok: false, error: 'Bad payload.' };
  const body = input as Record<string, unknown>;
  const name = cleanText(body.name ?? 'anonymous', LIMITS.nameMax);
  const message = cleanText(body.message, LIMITS.messageMax);
  const x = cleanCoord(body.x, WORLD.maxX);
  const y = cleanCoord(body.y, WORLD.maxY);
  const variant =
    typeof body.variant === 'number' && body.variant >= 0 && body.variant < VARIANTS.length
      ? body.variant
      : 0;
  if (!name) return { ok: false, error: `Name must be 1 to ${LIMITS.nameMax} characters.` };
  if (!message)
    return { ok: false, error: `Message must be 1 to ${LIMITS.messageMax} characters.` };
  if (x === null || y === null) return { ok: false, error: 'Placement is off the wall.' };
  return { ok: true, note: { name, message, x, y, variant } };
}

export function validateReply(
  input: unknown
): { ok: true; reply: { name: string; message: string } } | { ok: false; error: string } {
  if (!input || typeof input !== 'object') return { ok: false, error: 'Bad payload.' };
  const body = input as Record<string, unknown>;
  const name = cleanText(body.name ?? 'anonymous', LIMITS.nameMax);
  const message = cleanText(body.message, LIMITS.replyMax);
  if (!name) return { ok: false, error: `Name must be 1 to ${LIMITS.nameMax} characters.` };
  if (!message) return { ok: false, error: `Reply must be 1 to ${LIMITS.replyMax} characters.` };
  return { ok: true, reply: { name, message } };
}

export const SEED_NOTES: WallNote[] = [];
