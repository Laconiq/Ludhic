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
}

const g = globalThis as typeof globalThis & { __bingodir?: BingodirState };

if (!g.__bingodir) {
  g.__bingodir = {
    clients: new Set(),
    players: new Map(),
    messages: [],
  };
}

export const state = g.__bingodir;

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
