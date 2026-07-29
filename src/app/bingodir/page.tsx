'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import bingoData from '@/data/bingoData.json';

interface BingoCell {
  text: string;
  isChecked: boolean;
  isCenter: boolean;
}

interface ChatMessage {
  senderId: string;
  pseudo: string;
  text: string;
  timestamp: number;
}

interface PlayerInfo {
  pseudo: string;
  checkedCount: number;
}

const PSEUDO_KEY = 'bingodir-pseudo';

function shuffled<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildGrid(): BingoCell[][] {
  const selected = shuffled(bingoData.bingoEntries).slice(0, 24);
  const grid: BingoCell[][] = [];
  let index = 0;
  for (let row = 0; row < 5; row++) {
    grid[row] = [];
    for (let col = 0; col < 5; col++) {
      if (row === 2 && col === 2) {
        grid[row][col] = { text: 'BOUTET', isChecked: true, isCenter: true };
      } else {
        grid[row][col] = { text: selected[index], isChecked: false, isCenter: false };
        index++;
      }
    }
  }
  return grid;
}

function countChecked(grid: BingoCell[][]): number {
  return grid.flat().filter(c => c.isChecked && !c.isCenter).length;
}

function getOrCreateId(): string {
  const key = 'bingodir-id';
  const existing = typeof window !== 'undefined' ? sessionStorage.getItem(key) : null;
  if (existing) return existing;
  const id = Math.random().toString(36).slice(2, 10);
  if (typeof window !== 'undefined') sessionStorage.setItem(key, id);
  return id;
}

export default function BingoDir() {
  const [pseudo, setPseudo] = useState<string | null>(null);
  const [pseudoInput, setPseudoInput] = useState('');
  const [bingoGrid, setBingoGrid] = useState<BingoCell[][]>(buildGrid);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [players, setPlayers] = useState<Map<string, PlayerInfo>>(new Map());
  const [mobileTab, setMobileTab] = useState<'leaderboard' | 'chat'>('chat');
  const [connected, setConnected] = useState(false);

  const [myId, setMyId] = useState('');
  const myIdRef = useRef('');
  const gridRef = useRef(bingoGrid);
  const pseudoRef = useRef(pseudo);
  const eventSourceRef = useRef<EventSource | null>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { gridRef.current = bingoGrid; }, [bingoGrid]);
  useEffect(() => { pseudoRef.current = pseudo; }, [pseudo]);

  useEffect(() => {
    const id = getOrCreateId();
    myIdRef.current = id;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMyId(id);
    const saved = localStorage.getItem(PSEUDO_KEY);
    if (saved) setPseudoInput(saved);
  }, []);

  useEffect(() => {
    if (!pseudo) return;

    const id = myIdRef.current;

    fetch('/api/bingodir/players', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, pseudo, checkedCount: countChecked(gridRef.current) }),
    });

    const es = new EventSource(`/api/bingodir/events?playerId=${id}`);
    eventSourceRef.current = es;

    es.addEventListener('init', (e) => {
      const data = JSON.parse(e.data);
      setMessages(data.messages as ChatMessage[]);
      const map = new Map<string, PlayerInfo>();
      for (const [pid, info] of Object.entries(data.players)) {
        if (pid !== id) map.set(pid, info as PlayerInfo);
      }
      setPlayers(map);
      setConnected(true);
    });

    es.addEventListener('chat', (e) => {
      const msg: ChatMessage = JSON.parse(e.data);
      if (msg.senderId !== id) {
        setMessages(prev => [...prev, msg]);
      }
    });

    es.addEventListener('player-update', (e) => {
      const data = JSON.parse(e.data);
      if (data.id !== id) {
        setPlayers(prev => new Map(prev).set(data.id, { pseudo: data.pseudo, checkedCount: data.checkedCount }));
      }
    });

    es.addEventListener('player-leave', (e) => {
      const data = JSON.parse(e.data);
      setPlayers(prev => { const n = new Map(prev); n.delete(data.id); return n; });
    });

    es.onerror = () => setConnected(false);
    es.onopen = () => {
      setConnected(true);
      fetch('/api/bingodir/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, pseudo: pseudoRef.current, checkedCount: countChecked(gridRef.current) }),
      });
    };

    const sendLeaveBeacon = () => {
      const blob = new Blob(
        [JSON.stringify({ id, action: 'leave' })],
        { type: 'application/json' }
      );
      navigator.sendBeacon('/api/bingodir/players', blob);
    };
    window.addEventListener('beforeunload', sendLeaveBeacon);
    window.addEventListener('pagehide', sendLeaveBeacon);

    return () => {
      window.removeEventListener('beforeunload', sendLeaveBeacon);
      window.removeEventListener('pagehide', sendLeaveBeacon);
      es.close();
      sendLeaveBeacon();
    };
  }, [pseudo]);

  useEffect(() => {
    if (!pseudo) return;
    fetch('/api/bingodir/players', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: myIdRef.current, pseudo, checkedCount: countChecked(bingoGrid) }),
    });
  }, [bingoGrid, pseudo]);

  useEffect(() => {
    document.querySelectorAll<HTMLElement>('[data-chat-messages]').forEach(el => {
      el.scrollTop = el.scrollHeight;
    });
  }, [messages]);

  const joinChat = (e: React.FormEvent) => {
    e.preventDefault();
    const name = pseudoInput.trim() || 'Anonyme';
    setPseudo(name);
    localStorage.setItem(PSEUDO_KEY, name);
  };

  const regenerate = () => setBingoGrid(buildGrid());

  const toggleCell = (row: number, col: number) => {
    setBingoGrid(prev =>
      prev.map((r, ri) =>
        r.map((cell, ci) =>
          ri === row && ci === col && !cell.isCenter
            ? { ...cell, isChecked: !cell.isChecked }
            : cell
        )
      )
    );
  };

  const sendMessage = () => {
    const trimmed = chatInput.trim();
    if (!trimmed || !pseudo) return;

    const msg: ChatMessage = { senderId: myIdRef.current, pseudo, text: trimmed, timestamp: Date.now() };
    setMessages(prev => [...prev, msg]);
    fetch('/api/bingodir/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: myIdRef.current, pseudo, text: trimmed }),
    });
    setChatInput('');
    chatInputRef.current?.focus();
  };

  const sortedPlayers = [
    { id: myId, pseudo: pseudo || '', checkedCount: countChecked(bingoGrid) },
    ...Array.from(players.entries()).map(([id, info]) => ({ id, ...info })),
  ].sort((a, b) => b.checkedCount - a.checkedCount);

  if (!pseudo) {
    return (
      <div className="flex flex-col items-center justify-center h-dvh overflow-hidden px-4 -mt-16">
        <h1 className="text-5xl lg:text-7xl font-gaming foil-effect mb-3">BINGODIR</h1>
        <p className="text-[var(--text-primary)]/70 text-sm lg:text-base mb-8 text-center">
          Le bingo officieux des soutenances Master HIC
        </p>
        <form onSubmit={joinChat} className="flex flex-col items-center gap-4 w-full max-w-xs">
          <input
            autoFocus
            value={pseudoInput}
            onChange={e => setPseudoInput(e.target.value)}
            maxLength={20}
            className="w-full px-4 py-3 rounded-lg text-sm bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] outline-none focus:border-[var(--primary-blue)] placeholder:text-[var(--text-primary)]/30 text-center"
            placeholder="Ton pseudo..."
          />
          <button
            type="submit"
            className="px-8 py-3 rounded-lg font-gaming tracking-wider text-sm border border-[var(--primary-blue)] bg-[var(--primary-blue)]/20 text-[var(--text-primary)] hover:bg-[var(--primary-blue)]/40 hover:shadow-[var(--shadow-glow)] active:scale-95 transition-all duration-300 cursor-pointer"
          >
            REJOINDRE
          </button>
        </form>
      </div>
    );
  }

  const leaderboardContent = (
    <div className="flex-1 overflow-y-auto p-2 space-y-1">
      {sortedPlayers.map((p, i) => (
        <div
          key={p.id}
          className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs ${
            p.id === myId
              ? 'bg-[var(--primary-blue)]/15 border border-[var(--primary-blue)]/30'
              : 'bg-[var(--bg-tertiary)]/50'
          }`}
        >
          <span className="font-gaming text-[var(--text-primary)]/50 w-5 shrink-0">{i + 1}.</span>
          <span className="flex-1 truncate text-[var(--text-primary)]/90">{p.pseudo}</span>
          <span className="font-gaming text-[var(--primary-blue)] shrink-0">{p.checkedCount}/24</span>
        </div>
      ))}
    </div>
  );

  const chatMessages = (
    <div data-chat-messages className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
      {messages.length === 0 && (
        <p className="text-[var(--text-primary)]/40 text-xs text-center mt-8">Aucun message...</p>
      )}
      {messages.map((msg) => {
        const isMe = msg.senderId === myId;
        return (
          <div key={`${msg.senderId}-${msg.timestamp}`} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
            <span className="text-[0.6rem] text-[var(--text-primary)]/50 mb-0.5 px-1">{msg.pseudo}</span>
            <div
              className={`max-w-[85%] px-2.5 py-1.5 rounded-lg text-xs leading-relaxed break-words ${
                isMe
                  ? 'bg-[var(--primary-blue)]/25 border border-[var(--primary-blue)]/40'
                  : 'bg-[var(--bg-tertiary)] border border-[var(--border-primary)]'
              } text-[var(--text-primary)]/90`}
            >
              {msg.text}
            </div>
          </div>
        );
      })}
    </div>
  );

  const chatForm = (
    <form
      onSubmit={e => { e.preventDefault(); sendMessage(); }}
      className="flex gap-2 px-3 py-2 border-t border-[var(--border-primary)]"
    >
      <input
        ref={chatInputRef}
        value={chatInput}
        onChange={e => setChatInput(e.target.value)}
        maxLength={200}
        className="flex-1 min-w-0 px-2.5 py-1.5 rounded-lg text-xs bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] outline-none focus:border-[var(--primary-blue)] placeholder:text-[var(--text-primary)]/30"
        placeholder="Message..."
      />
      <button
        type="submit"
        className="px-3 py-1.5 rounded-lg text-xs font-gaming bg-[var(--primary-blue)]/20 border border-[var(--primary-blue)] text-[var(--text-primary)] hover:bg-[var(--primary-blue)]/40 active:scale-95 transition-all cursor-pointer"
      >
        &gt;
      </button>
    </form>
  );

  return (
    <div className="flex flex-col h-dvh overflow-hidden -mt-16">
      <nav className="fixed top-0 left-0 right-0 z-[200] bg-[var(--bg-primary)]/95 backdrop-blur-[20px] border-b border-[var(--border-primary)] py-2 lg:py-4">
        <div className="flex items-center justify-between px-3 lg:px-6 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
            <div className="relative w-8 h-8 lg:w-10 lg:h-10">
              <Image src="/images/logo.png" alt="Ludhic Logo" fill className="object-contain" sizes="40px" />
            </div>
            <span className="font-gaming text-lg lg:text-xl foil-effect">LUDHIC</span>
          </Link>
          <div className="flex items-center gap-4 lg:gap-8">
            {(['ACCUEIL', 'JEUX', 'FAQ'] as const).map(label => {
              const id = label === 'ACCUEIL' ? 'hero' : label === 'JEUX' ? 'games' : 'faq';
              return (
                <Link
                  key={id}
                  href={`/#${id}`}
                  className="text-[var(--text-primary)]/85 hover:text-[var(--primary-blue)] hover:[text-shadow:0_0_20px_currentColor] font-gaming text-xs lg:text-sm tracking-wider transition-all duration-300 hover:scale-105"
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="flex-1 min-h-0 flex flex-col pt-16 lg:pt-22 px-2 lg:px-4 pb-4 overflow-hidden">
        <div className="flex flex-col items-center gap-1.5 mb-3 lg:mb-5">
          <h1 className="text-3xl lg:text-5xl font-gaming foil-effect">BINGODIR</h1>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={regenerate}
              className="px-4 py-2 rounded-lg cursor-pointer text-xs font-gaming tracking-wider border border-[var(--primary-blue)] bg-[var(--primary-blue)]/20 text-[var(--text-primary)] hover:bg-[var(--primary-blue)]/40 hover:shadow-[var(--shadow-glow)] active:scale-95 transition-all duration-300"
            >
              NOUVELLE GRILLE
            </button>
            <span className="text-[0.65rem] text-[var(--text-primary)]/50">
              {pseudo} &middot; {countChecked(bingoGrid)}/24
              {connected
                ? <span className="ml-1.5 text-green-400" title="Connecté">&#9679;</span>
                : <span className="ml-1.5 text-red-400" title="Déconnecté">&#9679;</span>
              }
            </span>
          </div>
        </div>

        <div className="hidden lg:flex w-full gap-6 flex-1 min-h-0">
          <div className="flex-1 min-w-0 flex flex-col rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)]/80 backdrop-blur-sm overflow-hidden self-stretch">
            <div className="px-3 py-2.5 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]/50 shrink-0">
              <h2 className="font-gaming text-xs tracking-wider text-[var(--text-primary)]/80">
                CLASSEMENT
                <span className="ml-2 font-sans text-[var(--text-primary)]/40">{sortedPlayers.length}</span>
              </h2>
            </div>
            {leaderboardContent}
          </div>

          <div className="flex-[3] min-w-0 flex flex-col items-center min-h-0">
            <div className="aspect-square max-h-full w-auto">
              <div className="flex flex-col gap-2 h-full">
                {bingoGrid.map((row, ri) => (
                  <div key={ri} className="flex gap-2 flex-1 min-h-0">
                    {row.map((cell, ci) => (
                      <button
                        key={`${ri}-${ci}`}
                        onClick={() => toggleCell(ri, ci)}
                        className={`
                          flex-1 aspect-square flex items-center justify-center p-1.5
                          rounded-xl border transition-colors duration-200 overflow-hidden
                          ${cell.isCenter
                            ? 'bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border-yellow-400 text-yellow-100 cursor-default'
                            : cell.isChecked
                              ? 'bg-gradient-to-br from-green-500/30 to-cyan-500/30 border-green-400 text-green-100'
                              : 'bg-linear-to-br from-[var(--bg-tertiary)] to-[var(--bg-secondary)] border-[var(--border-primary)] hover:border-[var(--primary-blue)] cursor-pointer active:scale-95'
                          }
                        `}
                      >
                        <span className="text-[clamp(0.5rem,1.2vw,0.85rem)] leading-snug text-center break-words hyphens-auto">
                          {cell.text}
                          {cell.isChecked && !cell.isCenter && <span className="ml-0.5 text-green-400">&#10003;</span>}
                          {cell.isCenter && <span className="ml-0.5 text-yellow-400">&#128081;</span>}
                        </span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              <p className="text-[var(--text-primary)]/50 text-[0.65rem] text-center mt-3">
                Cliquez sur les cases &middot; Ligne, colonne ou diagonale = BINGO !
              </p>
            </div>
          </div>

          <div className="flex-1 min-w-0 flex flex-col rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)]/80 backdrop-blur-sm overflow-hidden self-stretch">
            <div className="px-3 py-2.5 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]/50 shrink-0">
              <h2 className="font-gaming text-xs tracking-wider text-[var(--text-primary)]/80">CHAT</h2>
            </div>
            {chatMessages}
            {chatForm}
          </div>
        </div>

        <div className="lg:hidden flex flex-col gap-2 flex-1 min-h-0">
          <div className="w-full max-w-[95vw] mx-auto">
            <div className="flex flex-col gap-1">
              {bingoGrid.map((row, ri) => (
                <div key={ri} className="flex gap-1">
                  {row.map((cell, ci) => (
                    <button
                      key={`${ri}-${ci}`}
                      onClick={() => toggleCell(ri, ci)}
                      className={`
                        flex-1 aspect-square flex items-center justify-center p-1
                        rounded-md border transition-colors duration-200
                        ${cell.isCenter
                          ? 'bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border-yellow-400 text-yellow-100 cursor-default'
                          : cell.isChecked
                            ? 'bg-gradient-to-br from-green-500/30 to-cyan-500/30 border-green-400 text-green-100'
                            : 'bg-linear-to-br from-[var(--bg-tertiary)] to-[var(--bg-secondary)] border-[var(--border-primary)] hover:border-[var(--primary-blue)] cursor-pointer active:scale-95'
                        }
                      `}
                    >
                      <span className="text-[0.55rem] leading-tight text-center break-words hyphens-auto">
                        {cell.text}
                        {cell.isChecked && !cell.isCenter && <span className="ml-0.5 text-green-400">&#10003;</span>}
                        {cell.isCenter && <span className="ml-0.5 text-yellow-400">&#128081;</span>}
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)]/80 backdrop-blur-sm overflow-hidden h-64">
            <div className="flex border-b border-[var(--border-primary)]">
              {(['leaderboard', 'chat'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setMobileTab(tab)}
                  className={`flex-1 py-2 text-xs font-gaming tracking-wider transition-colors cursor-pointer ${
                    mobileTab === tab
                      ? 'text-[var(--primary-blue)] border-b-2 border-[var(--primary-blue)]'
                      : 'text-[var(--text-primary)]/50'
                  }`}
                >
                  {tab === 'leaderboard' ? 'CLASSEMENT' : 'CHAT'}
                </button>
              ))}
            </div>
            {mobileTab === 'leaderboard' ? leaderboardContent : <>{chatMessages}{chatForm}</>}
          </div>
        </div>
      </main>
    </div>
  );
}
