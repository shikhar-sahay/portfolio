import { NextResponse } from 'next/server';

export async function readJsonBody(
  request: Request,
  maxBytes: number
): Promise<{ ok: true; body: unknown } | { ok: false; response: NextResponse }> {
  const type = request.headers.get('content-type') ?? '';
  if (!type.toLowerCase().includes('application/json')) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Expected JSON.' }, { status: 415 }),
    };
  }

  const declared = Number.parseInt(request.headers.get('content-length') ?? '0', 10);
  if (Number.isFinite(declared) && declared > maxBytes) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Payload too large.' }, { status: 413 }),
    };
  }

  let text: string;
  try {
    text = await request.text();
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Bad payload.' }, { status: 400 }),
    };
  }

  if (new TextEncoder().encode(text).length > maxBytes) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Payload too large.' }, { status: 413 }),
    };
  }

  try {
    return { ok: true, body: JSON.parse(text) };
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Bad payload.' }, { status: 400 }),
    };
  }
}
