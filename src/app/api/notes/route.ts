import { NextResponse } from 'next/server';
import { LIMITS, validateNote } from '@/content/wall';
import {
  clientIp,
  duplicateKey,
  getNoteStore,
  notesPersistenceConfigured,
  persistenceErrorResponse,
} from './_store';

export async function GET(request: Request) {
  if (!notesPersistenceConfigured()) return persistenceErrorResponse();
  const noteStore = getNoteStore();
  const { searchParams } = new URL(request.url);
  // Latest-note navigation: answer from the whole store so the client
  // never mistakes the newest loaded note for the newest global note.
  if (searchParams.get('order') === 'latest') {
    const note = await noteStore.latest();
    return NextResponse.json({ note: note ?? null });
  }
  if (searchParams.get('order') === 'random') {
    const note = await noteStore.random();
    return NextResponse.json({ note: note ?? null });
  }
  const limit = Math.min(
    LIMITS.initialFetchLimit,
    Math.max(
      1,
      Number.parseInt(searchParams.get('limit') ?? `${LIMITS.initialFetchLimit}`, 10) ||
        LIMITS.initialFetchLimit
    )
  );
  const beforeRaw = searchParams.get('before');
  const before = beforeRaw ? Number.parseInt(beforeRaw, 10) : undefined;
  const minX = Number.parseInt(searchParams.get('minX') ?? '', 10);
  const maxX = Number.parseInt(searchParams.get('maxX') ?? '', 10);
  const minY = Number.parseInt(searchParams.get('minY') ?? '', 10);
  const maxY = Number.parseInt(searchParams.get('maxY') ?? '', 10);
  const hasBounds = [minX, maxX, minY, maxY].every(Number.isFinite);
  const { notes, total } = await noteStore.list({
    limit,
    before: Number.isFinite(before) ? before : undefined,
    bounds: hasBounds ? { minX, maxX, minY, maxY } : undefined,
  });
  return NextResponse.json({ notes, total });
}

export async function POST(request: Request) {
  if (!notesPersistenceConfigured()) return persistenceErrorResponse();
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
  // Validation runs before any quota is touched, so malformed requests
  // never consume posting allowance.
  const parsed = validateNote(body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 422 });
  const ip = clientIp(request.headers);
  const store = getNoteStore();
  const gate = await store.checkPostGate(ip, 'notes');
  if (!gate.ok) {
    return NextResponse.json(
      { error: 'Too many pins right now.', retryAfter: gate.retryAfter },
      { status: 429, headers: { 'Retry-After': `${gate.retryAfter}` } }
    );
  }
  const contentKey = duplicateKey([parsed.note.name, parsed.note.message]);
  if (await store.checkDuplicate(ip, 'notes', contentKey)) {
    return NextResponse.json({ error: 'This exact note just went up.' }, { status: 409 });
  }
  let note;
  try {
    note = await store.add(parsed.note);
  } catch {
    return NextResponse.json({ error: 'Could not save the note.' }, { status: 503 });
  }
  // Quota and duplicate events record successful inserts only, so failed
  // writes never punish the visitor.
  await store.recordPostEvent(ip, 'notes', contentKey);
  return NextResponse.json({ note }, { status: 201 });
}
