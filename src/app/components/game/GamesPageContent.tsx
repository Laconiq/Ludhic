import Navigation from '@/app/components/layout/Navigation';
import Footer from '@/app/components/layout/Footer';
import GameGrid from '@/app/components/game/GameGrid';
import { GameData } from '@/types/game';

interface GamesPageContentProps {
  games: GameData[];
  initialGenre?: string;
  initialYear?: number | null;
}

export default function GamesPageContent({ games, initialGenre = '', initialYear = null }: GamesPageContentProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <Navigation />
      <main className="pt-24 flex-1">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <h1 className="text-3xl md:text-5xl font-gaming foil-effect text-center">
            TOUS LES JEUX ÉTUDIANTS
          </h1>
        </div>
        <GameGrid key={`${initialGenre}-${initialYear}`} games={games} initialGenre={initialGenre} initialYear={initialYear} />
      </main>
      <Footer />
    </div>
  );
}
