'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

const CAROUSEL_INTERVAL_MS = 4000;

interface ImageCarouselProps {
  images: string[];
  title: string;
}

export default function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isTransitioningRef = useRef(false);

  const imageCount = images.length;

  useEffect(() => {
    if (imageCount <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageCount);
    }, CAROUSEL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [imageCount, isHovered]);

  const changeImage = useCallback((direction: 'prev' | 'next') => {
    if (isTransitioningRef.current) return;

    isTransitioningRef.current = true;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? imageCount - 1 : prev - 1;
      } else {
        return (prev + 1) % imageCount;
      }
    });

    setTimeout(() => {
      isTransitioningRef.current = false;
      setIsTransitioning(false);
    }, 500);
  }, [imageCount]);

  const goToImage = useCallback((index: number) => {
    if (isTransitioningRef.current) return;
    setCurrentImageIndex((prev) => {
      if (index === prev) return prev;
      isTransitioningRef.current = true;
      setIsTransitioning(true);
      setTimeout(() => {
        isTransitioningRef.current = false;
        setIsTransitioning(false);
      }, 500);
      return index;
    });
  }, []);

  return (
    <div className="mb-16">
      <h3 className="text-lg font-gaming text-cyan-400 mb-6 tracking-wider">
        CAPTURES D&apos;ÉCRAN
      </h3>
      <div className="w-full flex justify-center">
        <div
          className="relative w-full rounded-xl overflow-hidden shadow-2xl cursor-default aspect-[16/9]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{
              width: `${imageCount * 100}%`,
              transform: `translateX(-${(currentImageIndex * 100) / imageCount}%)`
            }}
          >
            {images.map((imageUrl, index) => (
              <div
                key={imageUrl}
                className="relative flex-shrink-0 h-full w-full"
                style={{ width: `${100 / imageCount}%` }}
              >
                <Image
                  src={imageUrl}
                  alt={`${title} - Screenshot ${index + 1}`}
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  loading={index === 0 ? "eager" : "lazy"}
                  priority={index === 0}
                  quality={85}
                />
              </div>
            ))}
          </div>

          {!isHovered && (
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white/70 text-xs font-gaming">
              AUTO-PLAY
            </div>
          )}

          <button
            onClick={() => changeImage('prev')}
            disabled={isTransitioning}
            aria-label="Image précédente"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/70 backdrop-blur-sm text-white hover:bg-black/90 hover:text-cyan-300 transition-all duration-200 disabled:opacity-50 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => changeImage('next')}
            disabled={isTransitioning}
            aria-label="Image suivante"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/70 backdrop-blur-sm text-white hover:bg-black/90 hover:text-cyan-300 transition-all duration-200 disabled:opacity-50 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((imageUrl, index) => (
              <button
                key={imageUrl}
                onClick={() => goToImage(index)}
                disabled={isTransitioning}
                aria-label={`Aller à l'image ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-200 cursor-pointer ${
                  index === currentImageIndex
                    ? 'bg-cyan-300 scale-125'
                    : 'bg-white/70 hover:bg-white/90'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
