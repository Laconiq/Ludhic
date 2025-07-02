'use client';

import { Suspense, useState, useEffect } from 'react';
import Hero from './components/Hero';
import AllGames from './components/AllGames';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import SEOSchema from './components/SEOSchema';
import LoadingScreen from './components/LoadingScreen';
import gamesData from '../data/games.json';

function HomeContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [essentialElementsLoaded, setEssentialElementsLoaded] = useState(false);

  // Vérifier que les éléments essentiels sont chargés
  useEffect(() => {
    const checkEssentialElements = () => {
      // Vérifier que les images critiques sont chargées
      const logoImg = new Image();
      logoImg.onload = () => {
        setEssentialElementsLoaded(true);
      };
      logoImg.src = '/images/logo.png';
    };

    checkEssentialElements();
  }, []);

  // Attendre que la vidéo ET les éléments essentiels soient chargés
  useEffect(() => {
    if (videoLoaded && essentialElementsLoaded) {
      // Petit délai pour une transition fluide
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [videoLoaded, essentialElementsLoaded]);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <>
      <Navigation />
      <main>
        <Hero onVideoLoaded={handleVideoLoaded} />
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