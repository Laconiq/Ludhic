import { NextResponse } from 'next/server';
import { state, broadcast } from '../state';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const senderId = String(body.id || '');
  const pseudo = String(body.pseudo || '').slice(0, 20);
  const text = String(body.text || '').slice(0, 200);

  if (!senderId || !pseudo || !text) {
    return NextResponse.json({ error: 'Invalid' }, { status: 400 });
  }

  const msg = { senderId, pseudo, text, timestamp: Date.now() };
  state.messages.push(msg);

  if (state.messages.length > 100) {
    state.messages.splice(0, state.messages.length - 100);
  }

  broadcast('chat', msg);
  return NextResponse.json({ ok: true });
}
