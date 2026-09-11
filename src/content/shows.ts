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
 * Canonical normalization, shared by watched matching, alias
 * resolution, and DB uniqueness. Deterministic and conservative:
 * NFKC, lowercase, trim, hyphens and underscores become spaces,
 * harmless punctuation drops out, whitespace collapses. Letters and
 * numbers always survive, so "Brooklyn 99" stays "brooklyn 99" and
 * " Money-Heist! " becomes "money heist". No fuzzy matching, so
 * genuinely different titles can never collide.
 */
export function canonicalizeTitle(value: string): string {
  return value
    .normalize('NFKC')
    .toLowerCase()
    .trim()
    .replace(/[_-]+/g, ' ')
    .replace(/[^a-z0-9À-ÖØ-öø-ÿ ]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Strict validation wrapper for incoming titles: control characters
 * are stripped, then the canonical form must be non-empty and fit
 * the title cap.
 */
export function normalizeShowTitle(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const stripped = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  if (stripped.trim().length === 0 || stripped.trim().length > SHOW_LIMITS.titleMax) return null;
  const clean = canonicalizeTitle(stripped);
  if (clean.length === 0 || clean.length > SHOW_LIMITS.titleMax) return null;
  return clean;
}

/**
 * Small explicit alias map for obvious known variations, keyed by
 * canonical form. Nothing speculative lives here.
 */
const SHOW_ALIASES: Record<string, string> = {
  'brooklyn nine nine': 'brooklyn 99',
  b99: 'brooklyn 99',
  'thirteen reasons why': '13 reasons why',
};

const watchedEntries: Array<readonly [canonical: string, display: string]> = WATCHED_SHOWS.map(
  title => [canonicalizeTitle(title), title] as const
);

function tokensOf(canonical: string): string[] {
  return canonical.split(' ');
}

function containsTokenSequence(haystack: string[], needle: string[]): boolean {
  if (needle.length === 0 || needle.length > haystack.length) return false;
  for (let start = 0; start <= haystack.length - needle.length; start += 1) {
    let matched = true;
    for (let i = 0; i < needle.length; i += 1) {
      if (haystack[start + i] !== needle[i]) {
        matched = false;
        break;
      }
    }
    if (matched) return true;
  }
  return false;
}

export interface WatchedMatch {
  /** Canonical form of the watched title, for stable downstream use. */
  canonical: string;
  /** Display title exactly as listed. */
  title: string;
}

/**
 * Recognize a raw input against the finite watched dataset. Exact
 * canonical titles and explicit aliases always match. Containment is
 * deliberately narrow: only multi-token watched titles with enough
 * characters may match as a complete token subsequence, so short
 * single-word titles like Baby or Elite never fire inside longer
 * unrelated titles ("Baby Reindeer" and "Elite Academy" stay new).
 */
export function matchWatchedShow(raw: unknown): WatchedMatch | null {
  if (typeof raw !== 'string') return null;
  const stripped = raw.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  if (stripped.trim().length === 0) return null;
  let canonical = canonicalizeTitle(stripped);
  if (!canonical) return null;
  canonical = SHOW_ALIASES[canonical] ?? canonical;
  for (const entry of watchedEntries) {
    if (entry[0] === canonical) return { canonical, title: entry[1] };
  }
  const inputTokens = tokensOf(canonical);
  for (const entry of watchedEntries) {
    const watchedTokens = tokensOf(entry[0]);
    if (watchedTokens.length < 2 || entry[0].length < 8) continue;
    if (containsTokenSequence(inputTokens, watchedTokens)) {
      return { canonical: entry[0], title: entry[1] };
    }
  }
  return null;
}

export type RecommendStatus = 'watched' | 'added' | 'duplicate' | 'invalid' | 'unavailable';

export interface RecommendResponse {
  status: RecommendStatus;
  /** Echo of the cleaned title for watched, added, and duplicate states. */
  show?: string;
  /** Human-safe detail for invalid and unavailable states. */
  error?: string;
}
