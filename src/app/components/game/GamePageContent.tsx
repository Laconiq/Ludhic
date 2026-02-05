'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/app/components/layout/Navigation';
import { GameData } from '@/types/game';
import { getMainImageUrl, getLogoUrl, getAllImageUrls } from '@/lib/images';
import GamingButton from '@/app/components/ui/GamingButton';
import GameCredits from '@/app/components/game/GameCredits';
import ImageCarousel from '@/app/components/game/ImageCarousel';

interface GamePageContentProps {
  game: GameData;
}

export default function GamePageContent({ game }: GamePageContentProps) {
  const [videoError, setVideoError] = useState(false);

  useEffect(() => setVideoError(false), [game.contentFolder]);

  const allImages = getAllImageUrls(game.contentFolder, game.imageCount);

  return (
    <>
      <Navigation />
      
      <div className="relative w-full h-48 md:h-64 overflow-hidden">
        <Image
          src={getMainImageUrl(game.contentFolder)}
          alt={game.title}
          fill
          className="object-cover blur-lg scale-110"
          sizes="100vw"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-600/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <div className="mb-2 flex items-center justify-center p-8 md:p-0 w-full max-w-xs mx-auto">
            <Image
              src={getLogoUrl(game.contentFolder)}
              alt={`${game.title} Logo`}
              width={1800}
              height={400}
              className="h-[144px] md:h-[260px] w-auto max-w-full object-contain drop-shadow-2xl"
              style={{ height: '144px', width: 'auto' }}
              sizes="(max-width: 768px) 600px, 1800px"
              priority
              quality={95}
            />
          </div>
        </div>
      </div>
      
      <div className="w-full px-[15vw] md:px-[25vw] py-16">
        <nav aria-label="Fil d'Ariane" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-white/60">
            <li>
              <Link href="/" className="hover:text-cyan-300 transition-colors">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/30">/</li>
            <li>
              <Link href="/#games" className="hover:text-cyan-300 transition-colors">
                Jeux
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/30">/</li>
            <li className="text-cyan-300 font-medium truncate" aria-current="page">
              {game.title}
            </li>
          </ol>
        </nav>
        <div className="flex flex-col items-center gap-y-2 mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="font-gaming bg-black/50 backdrop-blur-sm rounded-full border border-cyan-400/30 text-cyan-400 text-xs px-2 py-0.5 sm:text-base sm:px-3 sm:py-1">
              ANNÉE {game.year}
            </span>
            {game.genres.map((genre) => (
              <span 
                key={genre} 
                className="px-2 py-0.5 sm:px-3 sm:py-1 bg-black/50 backdrop-blur-sm rounded-full text-cyan-300 border border-cyan-400/30 font-gaming text-xs sm:text-base"
              >
                {genre}
              </span>
            ))}
          </div>
          {game.customButton.enabled && (
            <GamingButton
              href={game.customButton.link}
              external
              size="sm"
              className="mt-4 block mx-auto w-auto hover:scale-105"
            >
              {game.customButton.name}
            </GamingButton>
          )}
        </div>
        <div className="mb-12 w-full">
          <h2 className="text-xl md:text-2xl font-gaming text-cyan-400 mb-6 tracking-wider w-full">
            A PROPOS DU JEU
          </h2>
          <p className="text-white/90 text-base leading-relaxed w-full">
            {game.longDescription}
          </p>
        </div>
        
        {game.imageCount > 1 && (
          <ImageCarousel images={allImages} title={game.title} />
        )}
        
        {game.hasVideo && (
          <div className="mb-16">
            <h3 className="text-lg font-gaming text-cyan-400 mb-6 tracking-wider">
              🎬 VIDÉO DU JEU
            </h3>
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl aspect-video">
              {videoError ? (
                <div className="flex items-center justify-center h-full bg-black/40 text-white/80">
                  <p className="text-center p-4">
                    La vidéo n&apos;a pas pu être chargée.<br />
                    Veuillez réessayer plus tard.
                  </p>
                </div>
              ) : (
                <video
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  poster={getMainImageUrl(game.contentFolder)}
                  onError={() => setVideoError(true)}
                >
                  <source src={`${game.contentFolder}/video.webm`} type="video/webm" />
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video>
              )}
            </div>
          </div>
        )}
        
        <GameCredits credits={game.credits} />
      </div>
    </>
  );
} 