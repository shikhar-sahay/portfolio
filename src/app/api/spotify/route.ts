import { NextResponse } from 'next/server';
import type { SpotifyTrack } from '@/content/personality';

// Short server cache: fresh enough to feel live, calm enough that one
// visitor never causes more than one Spotify round trip per minute.
export const revalidate = 60;

interface SpotifyImage {
  url?: unknown;
}

interface SpotifyArtist {
  name?: unknown;
}

interface SpotifyItem {
  name?: unknown;
  artists?: unknown;
  album?: unknown;
  duration_ms?: unknown;
  external_urls?: unknown;
}

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function number(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function artistsOf(item: SpotifyItem): string | undefined {
  if (!Array.isArray(item.artists)) return undefined;
  const names = (item.artists as SpotifyArtist[])
    .map(artist => text(artist?.name))
    .filter((name): name is string => Boolean(name));
  return names.length > 0 ? names.join(', ') : undefined;
}

function albumOf(item: SpotifyItem): { album?: string; artwork?: string } {
  const album = item.album as { name?: unknown; images?: unknown } | undefined;
  if (!album || typeof album !== 'object') return {};
  const images = Array.isArray(album.images) ? (album.images as SpotifyImage[]) : [];
  const artwork = text(images[0]?.url);
  return { album: text(album.name), artwork };
}

function linkOf(item: SpotifyItem): string | undefined {
  const urls = item.external_urls as { spotify?: unknown } | undefined;
  return urls && typeof urls === 'object' ? text(urls.spotify) : undefined;
}

function trackOf(item: unknown): SpotifyTrack | null {
  if (!item || typeof item !== 'object') return null;
  const candidate = item as SpotifyItem;
  const title = text(candidate.name);
  const artist = artistsOf(candidate);
  if (!title || !artist) return null;
  const { album, artwork } = albumOf(candidate);
  return {
    status: 'recent',
    title,
    artist,
    album,
    artwork,
    spotifyUrl: linkOf(candidate),
    durationMs: number(candidate.duration_ms),
  };
}

async function refreshAccessToken(
  clientId: string,
  clientSecret: string,
  refreshToken: string
): Promise<string | null> {
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  let response: Response;
  try {
    response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        authorization: `Basic ${basic}`,
      },
      body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }),
      cache: 'no-store',
    });
  } catch {
    return null;
  }
  if (!response.ok) return null;
  let data: { access_token?: unknown };
  try {
    data = (await response.json()) as { access_token?: unknown };
  } catch {
    return null;
  }
  return text(data.access_token) ?? null;
}

async function spotifyGet(path: string, accessToken: string): Promise<Response | null> {
  try {
    return await fetch(`https://api.spotify.com/v1${path}`, {
      headers: { authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    });
  } catch {
    return null;
  }
}

function unavailable() {
  return NextResponse.json({ status: 'unavailable' } satisfies SpotifyTrack);
}

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return unavailable();

  const accessToken = await refreshAccessToken(clientId, clientSecret, refreshToken);
  if (!accessToken) return unavailable();

  const playing = await spotifyGet('/me/player/currently-playing', accessToken);
  if (playing && playing.status !== 204 && playing.ok) {
    let data: { is_playing?: unknown; progress_ms?: unknown; item?: unknown };
    try {
      data = (await playing.json()) as typeof data;
    } catch {
      return unavailable();
    }
    const track = trackOf(data.item);
    if (track && data.is_playing === true) {
      return NextResponse.json({
        ...track,
        status: 'playing',
        isPlaying: true,
        progressMs: number(data.progress_ms),
      } satisfies SpotifyTrack);
    }
  } else if (playing && playing.status !== 204 && playing.status !== 200) {
    if (playing.status === 429 || playing.status >= 500) return unavailable();
  }

  const recent = await spotifyGet('/me/player/recently-played?limit=1', accessToken);
  if (!recent || !recent.ok) return unavailable();
  let history: { items?: unknown };
  try {
    history = (await recent.json()) as typeof history;
  } catch {
    return unavailable();
  }
  if (!Array.isArray(history.items) || history.items.length === 0) return unavailable();
  const entry = history.items[0] as { track?: unknown; played_at?: unknown };
  const track = trackOf(entry?.track);
  if (!track) return unavailable();
  return NextResponse.json({
    ...track,
    playedAt: text(entry?.played_at),
  } satisfies SpotifyTrack);
}
