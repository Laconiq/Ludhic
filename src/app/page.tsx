'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Hero from './components/Hero';
import AllGames from './components/AllGames';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import SEOSchema from './components/SEOSchema';
import GameModal from './components/GameModal';
import gamesData from '../data/games.json';

interface GameData {
  id: number;
  title: string;
  longDescription: string;
  genres: string[];
  year: number;
  contentFolder: string;
  imageCount: number;
  hasVideo: boolean;
  customButton: {
    enabled: boolean;
    name: string;
    link: string;
  };
  credits: Array<{
    firstName: string;
    lastName: string;
    roles: string[];
  }>;
  featured: boolean;
}

function HomeContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);
  const searchParams = useSearchParams();

  // Ouvrir automatiquement la modal si paramètre "game" présent
  useEffect(() => {
    const gameId = searchParams.get('game');
    if (gameId) {
      const game = gamesData.find(g => g.id === parseInt(gameId)) as GameData;
      if (game) {
        setSelectedGame(game);
        setIsModalOpen(true);
      }
    }
  }, [searchParams]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
    // Nettoyer l'URL
    window.history.replaceState({}, '', '/');
  };

  return (
    <>
      <Navigation isModalOpen={isModalOpen} />
      <main>
        <Hero />
        <AllGames 
          games={gamesData} 
          onModalStateChange={setIsModalOpen}
        />
        <FAQ />
      </main>
      <Footer />
      
      {/* Modal du jeu depuis URL directe */}
      {selectedGame && (
        <GameModal
          isOpen={isModalOpen}
          game={selectedGame}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default function Home() {
  return (
    <>
      <SEOSchema games={gamesData} />
      <Suspense fallback={<div>Chargement...</div>}>
        <HomeContent />
      </Suspense>
    </>
  );
}