import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import {
  SHOW_LIMITS,
  isWatchedShow,
  normalizeShowTitle,
  type RecommendResponse,
} from '@/content/shows';
import { clientIp } from '@/app/api/notes/_store';

/** Sliding-window rate limiter (per process; pair with platform limits in prod). */
const buckets = new Map<string, number[]>();
function checkRecommendRate(ip: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const stamps = (buckets.get(ip) ?? []).filter(t => now - t < windowMs);
  if (stamps.length >= SHOW_LIMITS.recommendationsPerHourPerIp) {
    return { ok: false, retryAfter: Math.ceil((stamps[0] + windowMs - now) / 1000) };
  }
  stamps.push(now);
  buckets.set(ip, stamps);
  return { ok: true, retryAfter: 0 };
}

function invalid(error: string) {
  return NextResponse.json({ status: 'invalid', error } satisfies RecommendResponse, {
    status: 422,
  });
}

function unavailable() {
  return NextResponse.json(
    {
      status: 'unavailable',
      error: 'Recommendations are offline right now. Your show was not saved.',
    } satisfies RecommendResponse,
    { status: 503 }
  );
}

export async function POST(request: Request) {
  const length = Number.parseInt(request.headers.get('content-length') ?? '0', 10);
  if (length > SHOW_LIMITS.maxPayloadBytes) {
    return NextResponse.json({ error: 'Payload too large.' }, { status: 413 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return invalid('That did not look like a show title.');
  }
  const raw = (body as Record<string, unknown> | null)?.show;
  if (typeof raw !== 'string' || raw.trim().length === 0) {
    return invalid('Type a show first.');
  }
  if (raw.trim().length > SHOW_LIMITS.titleMax) {
    return invalid(`Keep it under ${SHOW_LIMITS.titleMax} characters.`);
  }
  const normalized = normalizeShowTitle(raw);
  if (!normalized) return invalid('That did not look like a show title.');
  const display = raw.trim().replace(/\s+/g, ' ');

  const gate = checkRecommendRate(clientIp(request.headers));
  if (!gate.ok) {
    return NextResponse.json(
      { error: `Too many recommendations. Try again in ${gate.retryAfter} seconds.` },
      { status: 429, headers: { 'Retry-After': `${gate.retryAfter}` } }
    );
  }

  if (isWatchedShow(normalized)) {
    return NextResponse.json({ status: 'watched', show: display } satisfies RecommendResponse);
  }

  if (!process.env.DATABASE_URL) return unavailable();
  try {
    const sql = neon(process.env.DATABASE_URL);
    const existing = (await sql`
      select id, recommendation_count from show_recommendations
      where normalized_name = ${normalized}
    `) as { id: string; recommendation_count: number }[];
    if (existing.length > 0) {
      await sql`
        update show_recommendations
        set recommendation_count = recommendation_count + 1, updated_at = now()
        where id = ${existing[0].id}
      `;
      return NextResponse.json({ status: 'duplicate', show: display } satisfies RecommendResponse);
    }
    await sql`
      insert into show_recommendations (show_name, normalized_name)
      values (${display.slice(0, SHOW_LIMITS.titleMax)}, ${normalized})
    `;
    return NextResponse.json({ status: 'added', show: display } satisfies RecommendResponse, {
      status: 201,
    });
  } catch {
    return unavailable();
  }
}
