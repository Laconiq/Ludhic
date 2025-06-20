'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { getMainImageUrl, getAllImageUrls, getLogoUrl } from '../../utils/imageUtils';

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

interface GameModalProps {
  game: GameData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function GameModal({ game, isOpen, onClose }: GameModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Reset image index when game changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [game?.id, game]);

  const changeImage = (direction: 'next' | 'prev') => {
    if (!game || game.imageCount <= 1 || isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % game.imageCount);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + game.imageCount) % game.imageCount);
    }
    
    // Reset transition state after animation (500ms CSS + 50ms buffer)
    setTimeout(() => setIsTransitioning(false), 550);
  };

  // Auto-play logic for carousel
  useEffect(() => {
    if (!game || game.imageCount <= 1 || isCarouselHovered) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
      return;
    }

    autoPlayRef.current = setInterval(() => {
      changeImage('next');
    }, 3000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [game?.imageCount, isCarouselHovered, changeImage]);

  const goToImage = (index: number) => {
    if (!game || isTransitioning || index === currentImageIndex) return;
    
    setIsTransitioning(true);
    setCurrentImageIndex(index);
    setTimeout(() => setIsTransitioning(false), 550);
  };

  if (!isOpen || !game) return null;

  const allImages = getAllImageUrls(game.contentFolder, game.imageCount);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with gaming effects */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-start justify-center p-4 pt-8">
        <div className="relative modal-gaming rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden transform transition-all duration-300 scale-100">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-3 rounded-xl bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 hover:text-cyan-400 transition-all duration-200 shadow-lg border border-gray-600 hover:border-cyan-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Scrollable content */}
          <div className="overflow-y-auto max-h-[95vh]">
            {/* Image d'entête avec logo centré */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <Image
                src={getMainImageUrl(game.contentFolder)}
                alt={game.title}
                fill
                className="object-cover blur-sm"
                sizes="(max-width: 768px) 100vw, 1200px"
                priority
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
              
              {/* Filtre noir à 40% */}
              <div className="absolute inset-0 bg-black/40" />
              
              {/* Gaming gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              
              {/* Gaming effects overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-600/10" />
              
              {/* Logo centré */}
              <div className="absolute inset-0 flex items-center justify-center px-8">
                <Image
                  src={getLogoUrl(game.contentFolder)}
                  alt={`${game.title} Logo`}
                  width={800}
                  height={200}
                  className="h-[200px] w-auto max-w-lg object-contain drop-shadow-2xl"
                  style={{ height: '200px', width: 'auto' }}
                  sizes="(max-width: 768px) 400px, 800px"
                  priority
                  quality={95}
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Year badge */}
              <div className="mb-4">
                <span className="text-sm text-cyan-400 font-gaming bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-400/30">
                  ANNÉE {game.year}
                </span>
              </div>
              
              {/* Title avec bouton à droite */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <h1 className="text-3xl md:text-4xl font-sans font-bold text-white">
                  {game.title}
                </h1>
                
                {/* Custom Button à droite du titre */}
                {game.customButton.enabled && (
                  <div className="flex-shrink-0">
                    <a
                      href={game.customButton.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gaming px-6 py-3 rounded-xl text-center inline-block hover:scale-105 transition-transform duration-200"
                    >
                      {game.customButton.name}
                    </a>
                  </div>
                )}
              </div>
              
              {/* Genres */}
              <div className="flex flex-wrap gap-3 mb-8">
                {game.genres.map((genre) => (
                  <span
                    key={genre}
                    className="tag-gaming px-4 py-2 rounded-full shadow-sm"
                  >
                    #{genre}
                  </span>
                ))}
              </div>
              
              {/* Description */}
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-white/80 leading-relaxed text-lg">
                  {game.longDescription}
                </p>
              </div>
              
              {/* Carrousel d'images avec effet slide */}
              {game.imageCount > 1 && (
                <div className="mb-8">
                  <h3 className="text-xl font-gaming text-cyan-400 mb-4 tracking-wider">
                    📸 CAPTURES D&apos;ÉCRAN
                  </h3>
                  <div 
                    className="relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer" 
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
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 hover:text-cyan-400 transition-all duration-200 disabled:opacity-50"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => changeImage('next')}
                      disabled={isTransitioning}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 hover:text-cyan-400 transition-all duration-200 disabled:opacity-50"
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
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            index === currentImageIndex 
                              ? 'bg-cyan-400' 
                              : 'bg-white/50 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Player vidéo local */}
              {game.hasVideo && (
                <div className="mb-8">
                  <h3 className="text-xl font-gaming text-cyan-400 mb-4 tracking-wider">
                    🎬 VIDÉO DU JEU
                  </h3>
                  <div className="relative w-full rounded-xl overflow-hidden shadow-lg" style={{ aspectRatio: '16/9' }}>
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
              
              {/* Crédits minimalistes */}
              {game.credits && game.credits.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-gaming text-cyan-400 mb-4 tracking-wider">
                    👥 ÉQUIPE
                  </h3>
                  <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                    <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                      {game.credits.map((person, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="text-white font-sans font-medium">
                            <span className="firstname-normal">{person.firstName}</span>{' '}
                            <span className="lastname-uppercase">{person.lastName}</span>
                          </span>
                          {person.roles.length > 0 && (
                            <>
                              <span className="text-gray-500">•</span>
                              <span className="text-cyan-400/80 text-xs">
                                {person.roles.join(', ')}
                              </span>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Gaming accent line */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 