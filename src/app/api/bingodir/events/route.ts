import { state, broadcast } from '../state';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const playerId = url.searchParams.get('playerId') || '';

  const encoder = new TextEncoder();
  let client: { playerId: string; controller: ReadableStreamDefaultController } | null = null;
  let ping: ReturnType<typeof setInterval> | null = null;

  const stream = new ReadableStream({
    start(controller) {
      client = { playerId, controller };
      state.clients.add(client);

      controller.enqueue(
        encoder.encode(
          `event: init\ndata: ${JSON.stringify({
            players: Object.fromEntries(state.players),
            messages: state.messages.slice(-50),
          })}\n\n`
        )
      );

      ping = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: ping\n\n`));
        } catch {
          if (ping) clearInterval(ping);
        }
      }, 30_000);
    },
    cancel() {
      if (ping) clearInterval(ping);
      if (client) {
        state.clients.delete(client);
        if (playerId && state.players.has(playerId)) {
          state.players.delete(playerId);
          broadcast('player-leave', { id: playerId });
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
