import { NextResponse } from 'next/server';
import { LIMITS, validateNote } from '@/content/wall';
import { checkRateLimit, clientIp, noteStore } from './_store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(
    LIMITS.initialFetchLimit,
    Math.max(1, Number.parseInt(searchParams.get('limit') ?? `${LIMITS.initialFetchLimit}`, 10) || LIMITS.initialFetchLimit)
  );
  const beforeRaw = searchParams.get('before');
  const before = beforeRaw ? Number.parseInt(beforeRaw, 10) : undefined;
  const { notes, total } = noteStore.list(limit, Number.isFinite(before) ? before : undefined);
  return NextResponse.json({ notes, total });
}

export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  const gate = checkRateLimit(ip, 'notes');
  if (!gate.ok) {
    return NextResponse.json(
      { error: `Too many notes. Try again in ${gate.retryAfter} seconds.` },
      { status: 429, headers: { 'Retry-After': `${gate.retryAfter}` } }
    );
  }
  const length = Number.parseInt(request.headers.get('content-length') ?? '0', 10);
  if (length > LIMITS.maxPayloadBytes) {
    return NextResponse.json({ error: 'Payload too large.' }, { status: 413 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Bad payload.' }, { status: 400 });
  }
  const parsed = validateNote(body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 422 });
  const note = noteStore.add(parsed.note);
  return NextResponse.json({ note }, { status: 201 });
}
