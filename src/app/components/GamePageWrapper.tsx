'use client';

import { useState } from 'react';
import Hero from './Hero';
import AllGames from './AllGames';
import FAQ from './FAQ';
import Footer from './Footer';
import Navigation from './Navigation';
import GamePageModal from './GamePageModal';

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

interface GamePageWrapperProps {
  game: GameData;
  games: GameData[];
}

export default function GamePageWrapper({ game, games }: GamePageWrapperProps) {
  const [isModalOpen] = useState(true); // Toujours ouvert pour cette page

  return (
    <>
      <Navigation isModalOpen={isModalOpen} />
      <main>
        <Hero />
        <AllGames 
          games={games} 
          onModalStateChange={() => {}} // Pas d'interaction sur cette page
        />
        <FAQ />
      </main>
      <Footer />
      
      {/* Modal du jeu toujours ouverte */}
      <GamePageModal game={game} />
    </>
  );
} 