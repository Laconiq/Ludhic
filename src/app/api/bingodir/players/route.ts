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
  const id = String(body.id || '');
  const action = String(body.action || 'update');

  if (!id) {
    return NextResponse.json({ error: 'Invalid' }, { status: 400 });
  }

  if (action === 'leave') {
    if (state.players.has(id)) {
      state.players.delete(id);
      broadcast('player-leave', { id });
    }
  } else {
    const pseudo = String(body.pseudo || '').slice(0, 20);
    const checkedCount = Math.min(Math.max(Number(body.checkedCount) || 0, 0), 24);
    state.players.set(id, { pseudo, checkedCount });
    broadcast('player-update', { id, pseudo, checkedCount });
  }

  return NextResponse.json({ ok: true });
}
