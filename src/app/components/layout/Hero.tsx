'use client';

import Image from 'next/image';
import { useState } from 'react';
import { scrollToSection } from '@/lib/scroll';
import GamingButton from '@/app/components/ui/GamingButton';

export default function Hero() {
  const [bgVideo] = useState(() => {
    const idx = Math.floor(Math.random() * 3) + 1;
    return `/videos/background-${idx}.webm`;
  });

  const scrollToGames = () => scrollToSection('games');

  return (
    <section id="hero" className="h-screen flex items-center justify-center relative overflow-hidden -mt-16">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src={bgVideo}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0 pointer-events-none" />

      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 opacity-30 animate-grid-move gaming-grid-bg" />
        <div className="absolute inset-0 opacity-15 gaming-grid-bg-fine" />
      </div>

      <div className="relative z-20 text-center px-4 pt-16 max-w-5xl mx-auto">
        <div className="hero-animate-title">
          <div className="flex items-center justify-center gap-6 mb-8 foil-container">
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
        </div>

        <div className="hero-animate-text">
          <p className="text-lg md:text-xl text-white/85 mb-12 max-w-4xl mx-auto leading-relaxed">
            Ludhic est une association regroupant plusieurs étudiants et anciens étudiants du Master HIC (anciennement MAJE).
            Cette association a pour but principal de répertorier et de mettre en avant les travaux des étudiants.
          </p>
        </div>

        <div className="hero-animate-buttons">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <GamingButton
              onClick={scrollToGames}
              size="lg"
              className="w-full sm:w-auto min-w-[200px] hover:scale-105"
            >
              ▶ EXPLORER LES JEUX
            </GamingButton>

            <GamingButton
              href="https://univ-cotedazur.fr/formation/offre-de-formation/majic-master-jeux-video-image-et-creativite"
              external
              size="lg"
              className="w-full sm:w-auto min-w-[200px] hover:scale-105"
            >
              MASTER OFFICIEL ↗
            </GamingButton>
          </div>
        </div>
      </div>
    </section>
  );
} 