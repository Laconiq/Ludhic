'use client';

import { useSearchParams } from 'next/navigation';
import Navigation from '@/app/components/layout/Navigation';
import Footer from '@/app/components/layout/Footer';
import GameGrid from '@/app/components/game/GameGrid';
import { GameData } from '@/types/game';

interface GamesPageContentProps {
  games: GameData[];
}

export default function GamesPageContent({ games }: GamesPageContentProps) {
  const searchParams = useSearchParams();
  const genre = searchParams.get('genre') || '';
  const yearParam = searchParams.get('year');
  const year = yearParam ? parseInt(yearParam, 10) : null;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <Navigation />
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <h1 className="text-3xl md:text-5xl font-gaming foil-effect text-center">
            TOUS LES JEUX ÉTUDIANTS
          </h1>
        </div>
        <GameGrid games={games} initialGenre={genre} initialYear={year} />
      </div>
      <Footer />
    </div>
  );
}
