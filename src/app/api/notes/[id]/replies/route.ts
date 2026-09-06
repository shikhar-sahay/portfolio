import { NextResponse } from 'next/server';
import { LIMITS, validateReply } from '@/content/wall';
import { checkRateLimit, clientIp, noteStore } from '../../_store';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const note = noteStore.get(params.id);
  if (!note) return NextResponse.json({ error: 'Note not found.' }, { status: 404 });
  return NextResponse.json({ replies: note.replies });
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const ip = clientIp(request.headers);
  const gate = checkRateLimit(ip, 'replies');
  if (!gate.ok) {
    return NextResponse.json(
      { error: `Too many replies. Try again in ${gate.retryAfter} seconds.` },
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
  const parsed = validateReply(body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 422 });
  const reply = noteStore.addReply(params.id, parsed.reply);
  if (!reply) return NextResponse.json({ error: 'Note not found.' }, { status: 404 });
  return NextResponse.json({ reply }, { status: 201 });
}
