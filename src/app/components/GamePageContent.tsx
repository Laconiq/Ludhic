'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from './Navigation';

interface Game {
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

interface GamePageContentProps {
  game: Game;
}

// Fonctions utilitaires pour les images
const getMainImageUrl = (contentFolder: string) => `${contentFolder}/1.webp`;
const getLogoUrl = (contentFolder: string) => `${contentFolder}/logo.webp`;

export default function GamePageContent({ game }: GamePageContentProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  // Générer toutes les URLs d'images
  const allImages = Array.from({ length: game.imageCount }, (_, i) => 
    `${game.contentFolder}/${i + 1}.webp`
  );

  // Auto-play du carrousel
  useEffect(() => {
    if (game.imageCount <= 1 || isCarouselHovered) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % game.imageCount);
    }, 4000);

    return () => clearInterval(interval);
  }, [game.imageCount, isCarouselHovered]);

  // Fonction pour changer d'image
  const changeImage = (direction: 'prev' | 'next') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? game.imageCount - 1 : prev - 1;
      } else {
        return (prev + 1) % game.imageCount;
      }
    });
    
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Fonction pour aller à une image spécifique
  const goToImage = (index: number) => {
    if (isTransitioning || index === currentImageIndex) return;
    setIsTransitioning(true);
    setCurrentImageIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <>
      <Navigation />
      
      {/* Bannière réduite, pleine largeur, image floue */}
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
        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Dégradé gaming */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-600/10" />
        {/* Contenu centré */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          {/* Logo centré */}
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
      
      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        {/* Genres et année juste au-dessus du titre */}
        <div className="flex flex-wrap items-center gap-2 mb-8 justify-between text-[1em]">
          {/* Année à gauche */}
          <span className="font-gaming bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-cyan-400/30 text-cyan-400">
            ANNÉE {game.year}
          </span>
          {/* Genres au centre */}
          <div className="flex flex-wrap gap-2">
            {game.genres.map((genre) => (
              <span 
                key={genre} 
                className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-cyan-300 border border-cyan-400/30 font-gaming"
              >
                {genre}
              </span>
            ))}
          </div>
          {/* Bouton personnalisé à droite */}
          {game.customButton.enabled && (
            <a
              href={game.customButton.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block btn-gaming px-5 py-2 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ml-auto"
            >
              {game.customButton.name}
            </a>
          )}
        </div>
        {/* Description */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-gaming text-cyan-400 mb-6 tracking-wider">
            À PROPOS DU JEU
          </h2>
          <p className="text-white/80 text-base leading-relaxed max-w-4xl">
            {game.longDescription}
          </p>
        </div>
        
        {/* Carrousel d'images avec effet slide */}
        {game.imageCount > 1 && (
          <div className="mb-16">
            <h3 className="text-lg font-gaming text-cyan-400 mb-6 tracking-wider">
              📸 CAPTURES D&apos;ÉCRAN
            </h3>
            <div 
              className="relative w-full rounded-xl overflow-hidden shadow-2xl cursor-default" 
              style={{ aspectRatio: '16/9' }}
              onMouseEnter={() => setIsCarouselHovered(true)}
              onMouseLeave={() => setIsCarouselHovered(false)}
            >
              {/* Container avec toutes les images en ligne */}
              <div 
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{ 
                  width: `${game.imageCount * 100}%`,
                  transform: `translateX(-${(currentImageIndex * 100) / game.imageCount}%)`
                }}
              >
                {allImages.map((imageUrl, index) => (
                  <div 
                    key={index}
                    className="relative flex-shrink-0 h-full"
                    style={{ width: `${100 / game.imageCount}%` }}
                  >
                    <Image
                      src={imageUrl}
                      alt={`${game.title} - Screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 1200px"
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                      quality={85}
                    />
                  </div>
                ))}
              </div>
              
              {/* Auto-play indicator */}
              {!isCarouselHovered && (
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white/70 text-xs font-gaming">
                  AUTO-PLAY
                </div>
              )}
              
              {/* Carrousel controls */}
              <button
                onClick={() => changeImage('prev')}
                disabled={isTransitioning}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 hover:text-cyan-400 transition-all duration-200 disabled:opacity-50 cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => changeImage('next')}
                disabled={isTransitioning}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 hover:text-cyan-400 transition-all duration-200 disabled:opacity-50 cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    disabled={isTransitioning}
                    className={`w-3 h-3 rounded-full transition-all duration-200 cursor-pointer ${
                      index === currentImageIndex 
                        ? 'bg-cyan-400 scale-125' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Vidéo du jeu */}
        {game.hasVideo && (
          <div className="mb-16">
            <h3 className="text-lg font-gaming text-cyan-400 mb-6 tracking-wider">
              🎬 VIDÉO DU JEU
            </h3>
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
              <div className="relative w-full h-full bg-black/20">
                <video
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  poster={getMainImageUrl(game.contentFolder)}
                  onError={(e) => {
                    console.error('Erreur de chargement de la vidéo:', e);
                    const videoElement = e.target as HTMLVideoElement;
                    videoElement.style.display = 'none';
                    const container = videoElement.parentElement;
                    if (container) {
                      container.innerHTML = `
                        <div class="flex items-center justify-center h-full bg-black/40 text-white/80">
                          <p class="text-center p-4">
                            La vidéo n'a pas pu être chargée.<br>
                            Veuillez réessayer plus tard.
                          </p>
                        </div>
                      `;
                    }
                  }}
                >
                  <source 
                    src={`${game.contentFolder}/video.webm`} 
                    type="video/webm"
                    onError={(e) => {
                      console.error('Erreur de chargement de la source vidéo:', e);
                    }}
                  />
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video>
              </div>
            </div>
          </div>
        )}
        
        {/* Équipe de développement */}
        <div className="mb-16">
          <h3 className="text-lg font-gaming text-cyan-400 mb-8 tracking-wider">
            👥 ÉQUIPE DE DÉVELOPPEMENT
          </h3>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-gray-600">
            {game.credits.map((member, index) => (
              <div key={index} className="flex flex-wrap items-baseline gap-2 mb-2">
                <span className="font-semibold text-white text-sm md:text-base">
                  {member.firstName} {member.lastName}
                </span>
                <span className="text-cyan-300 text-xs md:text-sm">
                  {member.roles.length > 0 ? member.roles.join(', ') : 'Contributeur'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 