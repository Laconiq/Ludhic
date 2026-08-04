'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { scrollToSection } from '@/lib/scroll';
import GamingButton from '@/app/components/ui/GamingButton';

const BACKGROUND_VIDEO_COUNT = 3;

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // La page est pré-rendue au build : tirer le fond au sort pendant le rendu
  // figerait le HTML sur une seule vidéo et casserait l'hydratation. Le tirage
  // se fait donc après montage, directement sur l'élément.
  //
  // La source n'est volontairement pas posée dans le HTML : `autoPlay` prime
  // sur `preload="none"`, le navigateur téléchargeait donc le fond par défaut
  // dès le parsing, avant que cet effet ne le remplace deux fois sur trois —
  // soit deux vidéos tirées du VPS pour une seule affichée.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = `/videos/background-${Math.floor(Math.random() * BACKGROUND_VIDEO_COUNT) + 1}.webm`;
    video.load();
    video.play().catch(() => {
      // Lecture auto refusée (économie de données, politique navigateur) : le
      // fond reste simplement fixe, ce n'est pas une erreur à remonter.
    });
  }, []);

  const scrollToGames = () => scrollToSection('games');

  return (
    <section id="hero" className="h-screen flex items-center justify-center relative overflow-hidden -mt-16">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
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
                width={128}
                height={128}
                className="w-full h-full object-contain filter drop-shadow-lg"
                priority
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