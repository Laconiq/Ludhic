'use client';

import { Suspense } from 'react';
import Hero from '../components/Hero';
import AllGames from '../components/AllGames';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import SEOSchema from '../components/SEOSchema';
import gamesData from '../data/games.json';


function HomeContent() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <AllGames games={gamesData} />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

export default function Home() {
  return (
    <>
      <SEOSchema games={gamesData} currentPage="home" />
      <Suspense fallback={
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-cyan-400 font-gaming">Chargement de Ludhic...</p>
          </div>
        </div>
      }>
        <HomeContent />
      </Suspense>
    </>
  );
}