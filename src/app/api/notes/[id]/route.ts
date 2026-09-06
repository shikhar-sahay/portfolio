import { NextResponse } from 'next/server';
import { noteStore } from '../_store';

/**
 * Owner moderation endpoint. Requires the WALL_ADMIN_SECRET environment
 * variable to be configured AND supplied per request. Without it, this
 * returns 503 with an explicit message (never silently open).
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const secret = process.env.WALL_ADMIN_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: 'Moderation is not configured. Set WALL_ADMIN_SECRET to enable it.' },
      { status: 503 }
    );
  }
  if (request.headers.get('x-wall-admin') !== secret) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }
  const removed = noteStore.remove(params.id);
  if (!removed) return NextResponse.json({ error: 'Note not found.' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
