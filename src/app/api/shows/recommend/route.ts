import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import { readJsonBody } from '@/app/api/_request';
import {
  SHOW_LIMITS,
  matchWatchedShow,
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
  const body = await readJsonBody(request, SHOW_LIMITS.maxPayloadBytes);
  if (!body.ok) {
    if (body.response.status === 413) return body.response;
    return invalid('That did not look like a show title.');
  }
  const raw = (body.body as Record<string, unknown> | null)?.show;
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

  const watched = matchWatchedShow(raw);
  if (watched) {
    return NextResponse.json({
      status: 'watched',
      show: watched.title,
    } satisfies RecommendResponse);
  }

  if (!process.env.DATABASE_URL) return unavailable();
  try {
    const sql = neon(process.env.DATABASE_URL);
    // Atomic upsert: concurrent identical submissions converge on one
    // row instead of racing between select and insert. xmax is zero
    // exactly when the row was inserted rather than updated.
    const rows = (await sql`
      insert into show_recommendations (show_name, normalized_name)
      values (${display.slice(0, SHOW_LIMITS.titleMax)}, ${normalized})
      on conflict (normalized_name) do update set
        recommendation_count = show_recommendations.recommendation_count + 1,
        updated_at = now()
      returning (xmax = 0) as inserted
    `) as { inserted: boolean }[];
    const inserted = rows.length > 0 && rows[0].inserted === true;
    return NextResponse.json(
      { status: inserted ? 'added' : 'duplicate', show: display } satisfies RecommendResponse,
      { status: inserted ? 201 : 200 }
    );
  } catch {
    return unavailable();
  }
}
