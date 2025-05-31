'use client';

import { useState } from 'react';
import Hero from './components/Hero';
import AllGames from './components/AllGames';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import gamesData from '../data/games.json';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navigation isModalOpen={isModalOpen} />
      <main>
        <Hero />
        <AllGames games={gamesData} onModalStateChange={setIsModalOpen} />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}