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

/**
 * Seed notes: neutral examples, not fabricated testimonials. They make
 * the world feel alive before persistence has enough visitor marks.
 */
export const SEED_NOTES: WallNote[] = [
  {
    id: 'seed-ananya',
    x: 520,
    y: -120,
    name: 'Ananya',
    message: 'A small note can still change the room.',
    createdAt: 0,
    variant: 0,
    owner: false,
    replyCount: 0,
    replies: [],
  },
  {
    id: 'seed-ritvik',
    x: 960,
    y: -210,
    name: 'Ritvik',
    message: 'Different perspectives make the world a lot more interesting.',
    createdAt: 0,
    variant: 1,
    owner: false,
    replyCount: 0,
    replies: [],
  },
  {
    id: 'seed-kartik',
    x: 1480,
    y: -130,
    name: 'Kartik',
    message: 'More people like you please.',
    createdAt: 0,
    variant: 0,
    owner: false,
    replyCount: 0,
    replies: [],
  },
  {
    id: 'seed-meera',
    x: 360,
    y: 260,
    name: 'Meera',
    message: 'Found this through a friend. Ended up spending way too long here.',
    createdAt: 0,
    variant: 1,
    owner: false,
    replyCount: 0,
    replies: [],
  },
  {
    id: 'seed-shruti',
    x: 850,
    y: 230,
    name: 'Shruti',
    message: "You're proof that it is possible to care about both the technical and human side.",
    createdAt: 0,
    variant: 0,
    owner: false,
    replyCount: 0,
    replies: [],
  },
  {
    id: 'seed-aarav',
    x: 1360,
    y: 330,
    name: 'Aarav',
    message: 'Pokemon, Beyblade, and cybersecurity on the same site? Elite taste.',
    createdAt: 0,
    variant: 1,
    owner: false,
    replyCount: 0,
    replies: [],
  },
  {
    id: 'seed-dev',
    x: 260,
    y: 620,
    name: 'Dev',
    message: 'Leaving my mark here.',
    createdAt: 0,
    variant: 0,
    owner: false,
    replyCount: 0,
    replies: [],
  },
  {
    id: 'seed-tanvi',
    x: 720,
    y: 650,
    name: 'Tanvi',
    message: 'Good ideas find good people.',
    createdAt: 0,
    variant: 1,
    owner: false,
    replyCount: 0,
    replies: [],
  },
  {
    id: 'seed-aditya',
    x: 1030,
    y: 590,
    name: 'Aditya',
    message: 'Keep building. The internet needs more people who build with intention.',
    createdAt: 0,
    variant: 0,
    owner: false,
    replyCount: 0,
    replies: [],
  },
  {
    id: 'seed-sameer',
    x: 620,
    y: 930,
    name: 'Sameer',
    message: 'Football makes life better.',
    createdAt: 0,
    variant: 0,
    owner: false,
    replyCount: 0,
    replies: [],
  },
  {
    id: 'seed-nish',
    x: 1190,
    y: 940,
    name: 'Nish',
    message: 'Randomly stumbled here and now I am saving this as reference.',
    createdAt: 0,
    variant: 1,
    owner: false,
    replyCount: 0,
    replies: [],
  },
  {
    id: 'seed-owner',
    x: 180,
    y: 980,
    name: 'Shikhar',
    message: 'Different people. Same direction.',
    createdAt: 0,
    variant: 2,
    owner: true,
    replyCount: 0,
    replies: [],
  },
  {
    id: 'seed-lina',
    x: 1580,
    y: 760,
    name: 'Lina',
    message: 'Strangers today, stories tomorrow.',
    createdAt: 0,
    variant: 1,
    owner: false,
    replyCount: 0,
    replies: [],
  },
];
