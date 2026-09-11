import { NextResponse } from 'next/server';
import { LIMITS, validateReply } from '@/content/wall';
import {
  clientIp,
  duplicateKey,
  getNoteStore,
  notesPersistenceConfigured,
  persistenceErrorResponse,
} from '../../_store';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  if (!notesPersistenceConfigured()) return persistenceErrorResponse();
  const note = await getNoteStore().get(params.id);
  if (!note) return NextResponse.json({ error: 'Note not found.' }, { status: 404 });
  return NextResponse.json({ replies: note.replies });
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
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
  const parsed = validateReply(body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 422 });
  const ip = clientIp(request.headers);
  const store = getNoteStore();
  const gate = await store.checkPostGate(ip, 'replies');
  if (!gate.ok) {
    return NextResponse.json(
      { error: 'Too many replies right now.', retryAfter: gate.retryAfter },
      { status: 429, headers: { 'Retry-After': `${gate.retryAfter}` } }
    );
  }
  const contentKey = duplicateKey([params.id, parsed.reply.name, parsed.reply.message]);
  if (await store.checkDuplicate(ip, 'replies', contentKey)) {
    return NextResponse.json({ error: 'This exact reply just went up.' }, { status: 409 });
  }
  let reply;
  try {
    reply = await store.addReply(params.id, parsed.reply);
  } catch {
    return NextResponse.json({ error: 'Could not save the reply.' }, { status: 503 });
  }
  if (!reply) return NextResponse.json({ error: 'Note not found.' }, { status: 404 });
  await store.recordPostEvent(ip, 'replies', contentKey);
  return NextResponse.json({ reply }, { status: 201 });
}
