import { NextResponse } from 'next/server';
import { readJsonBody } from '@/app/api/_request';
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
  const body = await readJsonBody(request, LIMITS.maxPayloadBytes);
  if (!body.ok) return body.response;
  const parsed = validateReply(body.body);
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
