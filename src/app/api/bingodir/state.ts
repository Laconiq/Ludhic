interface SSEClient {
  playerId: string;
  controller: ReadableStreamDefaultController;
}

interface PlayerInfo {
  pseudo: string;
  checkedCount: number;
}

interface ChatMessage {
  senderId: string;
  pseudo: string;
  text: string;
  timestamp: number;
}

interface BingodirState {
  clients: Set<SSEClient>;
  players: Map<string, PlayerInfo>;
  messages: ChatMessage[];
  cleanupTimer: ReturnType<typeof setInterval> | null;
}

const g = globalThis as typeof globalThis & { __bingodir?: BingodirState };

if (!g.__bingodir) {
  g.__bingodir = {
    clients: new Set(),
    players: new Map(),
    messages: [],
    cleanupTimer: null,
  };
}

export const state = g.__bingodir;

function cleanupStalePlayers() {
  const activePlayerIds = new Set<string>();
  for (const client of state.clients) {
    if (client.playerId) activePlayerIds.add(client.playerId);
  }
  for (const [id] of state.players) {
    if (!activePlayerIds.has(id)) {
      state.players.delete(id);
      broadcast('player-leave', { id });
    }
  }
}

if (!state.cleanupTimer) {
  state.cleanupTimer = setInterval(cleanupStalePlayers, 15_000);
}

export function broadcast(event: string, data: unknown) {
  const chunk = new TextEncoder().encode(
    `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
  );
  for (const client of state.clients) {
    try {
      client.controller.enqueue(chunk);
    } catch {
      state.clients.delete(client);
    }
  }
}
