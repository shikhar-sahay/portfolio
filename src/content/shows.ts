/**
 * Show recommendation model. The watched list is public editorial
 * content shared by client and server. Recommendations themselves
 * live in Postgres (`show_recommendations`, see db/002) and are
 * never stored anywhere else: no localStorage, no fake success.
 */

export const WATCHED_SHOWS: readonly string[] = [
  'Outer Banks',
  'Euphoria',
  'The Boys',
  'Stranger Things',
  'Four More Shots Please!',
  'Upload',
  'Squid Game',
  'The Glory',
  'Elite',
  'Gossip Girl',
  'Sex Education',
  'Never Have I Ever',
  'Top Boy',
  'The Blacklist',
  'Prison Break',
  'The Mentalist',
  'Lucifer',
  'Narcos',
  'Money Heist',
  'Baby',
  'On My Block',
  'Brooklyn 99',
  'Psych',
  'God Friended Me',
  'Peaky Blinders',
  'Supergirl',
  'The Kicks',
  'Suits',
  '13 Reasons Why',
];

/** Strict input limits (mirrored client and server). */
export const SHOW_LIMITS = {
  titleMax: 80,
  recommendationsPerHourPerIp: 10,
  maxPayloadBytes: 2048,
} as const;

/**
 * Conservative normalization for title comparison: trim, collapse
 * repeated whitespace, casefold. Deliberately no fuzzy matching, so
 * genuinely different titles can never collide.
 */
export function normalizeShowTitle(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const clean = value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
  if (clean.length === 0 || clean.length > SHOW_LIMITS.titleMax) return null;
  return clean;
}

const watchedSet = new Set(WATCHED_SHOWS.map(show => normalizeShowTitle(show)));

export function isWatchedShow(normalized: string): boolean {
  return watchedSet.has(normalized);
}

export type RecommendStatus = 'watched' | 'added' | 'duplicate' | 'invalid' | 'unavailable';

export interface RecommendResponse {
  status: RecommendStatus;
  /** Echo of the cleaned title for watched, added, and duplicate states. */
  show?: string;
  /** Human-safe detail for invalid and unavailable states. */
  error?: string;
}
