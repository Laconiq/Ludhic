'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface HeroProps {
  onVideoLoaded?: () => void;
}

export default function Hero({ onVideoLoaded }: HeroProps) {
  const [bgVideo, setBgVideo] = useState('/videos/background-1.webm');

  useEffect(() => {
    const idx = Math.floor(Math.random() * 3) + 1;
    setBgVideo(`/videos/background-${idx}.webm`);
  }, []);

  const handleVideoLoad = () => {
    if (onVideoLoaded) {
      onVideoLoaded();
    }
  };

  const scrollToGames = () => {
    const element = document.getElementById('games');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="h-screen flex items-center justify-center relative overflow-hidden -mt-16">
      {/* Vidéo en arrière-plan */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src={bgVideo}
        onLoadedData={handleVideoLoad}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0 pointer-events-none" />
      
      {/* Gaming background effects */}
      <div className="absolute inset-0 z-10">
        {/* Animated grid - plus visible */}
        <div 
          className="absolute inset-0 opacity-30 animate-grid-move"
          style={{
            backgroundImage: `
              linear-gradient(rgba(45,66,126,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(45,66,126,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        {/* Grille secondaire pour plus de détail */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(45,66,126,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(45,66,126,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '10px 10px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 pt-16 max-w-5xl mx-auto">
        {/* Logo et titre sur la même ligne avec conteneur hover */}
        <div 
          className="flex items-center justify-center gap-6 mb-8 foil-container"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.2s ease'
          }}
        >
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 foil-logo">
            <Image
              src="/images/logo.png"
              alt="Ludhic Logo"
              fill
              className="object-contain filter drop-shadow-lg"
              priority
              quality={95}
              sizes="(max-width: 768px) 96px, 128px"
            />
          </div>
          <h1 className="text-6xl md:text-8xl font-gaming foil-effect">
            LUDHIC
          </h1>
        </div>
        
        {/* Description */}
        <p 
          className="text-lg md:text-xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed"
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
          }}
        >
          Ludhic est une association regroupant plusieurs étudiants et anciens étudiants du Master HIC (anciennement MAJE). 
          Cette association a pour but principal de répertorier et de mettre en avant les travaux des étudiants.
        </p>
        
        {/* CTA Buttons - Tailles égalisées */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={scrollToGames}
            className="btn-gaming px-8 py-4 rounded-lg text-lg font-semibold cursor-pointer w-full sm:w-auto min-w-[200px]"
          >
            ▶ EXPLORER LES JEUX
          </button>
          
          <a 
            href="https://univ-cotedazur.fr/formation/offre-de-formation/majic-master-jeux-video-image-et-creativite" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-gaming px-8 py-4 rounded-lg text-lg font-semibold cursor-pointer w-full sm:w-auto min-w-[200px]"
          >
            MASTER OFFICIEL ↗
          </a>
        </div>
      </div>
    </section>
  );
} 