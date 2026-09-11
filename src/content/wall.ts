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
  maxPayloadBytes: 4096,
  initialFetchLimit: 300,
  renderCap: 150,
  /**
   * Posting policy windows. Top-level pins are deliberately stricter
   * than replies: two pins per IP per ten minutes with a minute between
   * them, versus six replies per ten minutes with ten seconds between.
   * Enforced server-side in `src/app/api/notes/_store.ts`; the client
   * never enforces anything.
   */
  notesWindowMs: 10 * 60 * 1000,
  notesMax: 2,
  notesMinGapMs: 60 * 1000,
  repliesWindowMs: 10 * 60 * 1000,
  repliesMax: 6,
  repliesMinGapMs: 10 * 1000,
  /** Exact-duplicate double-submit window, per IP, in milliseconds. */
  duplicateWindowMs: 120 * 1000,
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

/**
 * Exact normalized key for double-submit detection. Control characters
 * drop out, whitespace collapses, case folds: re-clicks, double taps,
 * and immediate identical reposts converge on one key. Matching is
 * always scoped to one rate-limit key server-side, so two strangers
 * writing the same short phrase never collide.
 */
export function normalizeWallText(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

export interface WallClientError {
  title: string;
  body: string;
  /** Static retry hint derived from the server response, never ticking. */
  hint?: string;
}

/**
 * Themed client copy for wall failures. The server keeps plain factual
 * strings; this maps status codes to the portfolio voice so raw backend
 * text never reaches the wall. Pure and unit-testable.
 */
export function wallClientError(
  kind: 'note' | 'reply',
  status: number,
  server: { error?: string; retryAfter?: number } | null
): WallClientError {
  const retry =
    typeof server?.retryAfter === 'number' && server.retryAfter > 0
      ? Math.ceil(server.retryAfter)
      : 0;
  const hint = retry > 0 ? `Try again in ${retry}s.` : undefined;
  if (status === 429) {
    if (kind === 'reply') {
      return {
        title: 'EASY THERE.',
        body: 'Give it a few seconds before replying again.',
        hint,
      };
    }
    return {
      title: 'TOO MANY PINS.',
      body:
        retry > 90
          ? "You've left a couple already. Give the wall a little time before adding another."
          : "Give the wall a minute. You can still reply to someone else's note.",
      hint,
    };
  }
  if (status === 409) {
    return {
      title: 'ALREADY PINNED.',
      body: 'This exact note just went up. Nothing more to do.',
    };
  }
  if (status === 400 || status === 404 || status === 413 || status === 422) {
    return {
      title: status === 404 ? "NOTE'S GONE." : "DIDN'T QUITE STICK.",
      body:
        status === 404
          ? 'That note is no longer on the wall.'
          : (server?.error ?? 'That one did not pass validation.'),
    };
  }
  return {
    title: "WALL'S HAVING A MOMENT.",
    body: "That note didn't make it through. Try again in a bit.",
  };
}
