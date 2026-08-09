import { useState, useEffect, useRef } from 'preact/hooks';

const CAROUSEL_INTERVAL_MS = 4000;

interface CarouselImage {
  src: string;
  width: number;
  height: number;
}

interface ImageCarouselProps {
  images: CarouselImage[];
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

  const changeImage = (direction: 'prev' | 'next') => {
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
  };

  const goToImage = (index: number) => {
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
  };

  return (
    <div class="mb-16">
      <h3 class="text-lg font-gaming text-cyan-400 mb-6 tracking-wider">
        CAPTURES D&apos;ÉCRAN
      </h3>
      <div class="w-full flex justify-center">
        <div
          class="relative w-full rounded-xl overflow-hidden shadow-2xl cursor-default aspect-[16/9]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            class="flex h-full transition-transform duration-500 ease-in-out"
            style={{
              width: `${imageCount * 100}%`,
              transform: `translateX(-${(currentImageIndex * 100) / imageCount}%)`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={image.src}
                class="relative flex-shrink-0 h-full w-full"
                style={{ width: `${100 / imageCount}%` }}
              >
                <img
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={`${title} - Screenshot ${index + 1}`}
                  class="absolute inset-0 w-full h-full object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>

          {!isHovered && (
            <div class="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white/70 text-xs font-gaming">
              AUTO-PLAY
            </div>
          )}

          <button
            onClick={() => changeImage('prev')}
            disabled={isTransitioning}
            aria-label="Image précédente"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/70 backdrop-blur-sm text-white hover:bg-black/90 hover:text-cyan-300 transition-all duration-200 disabled:opacity-50 cursor-pointer"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => changeImage('next')}
            disabled={isTransitioning}
            aria-label="Image suivante"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/70 backdrop-blur-sm text-white hover:bg-black/90 hover:text-cyan-300 transition-all duration-200 disabled:opacity-50 cursor-pointer"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((image, index) => (
              <button
                key={image.src}
                onClick={() => goToImage(index)}
                disabled={isTransitioning}
                aria-label={`Aller à l'image ${index + 1}`}
                class={`w-3 h-3 rounded-full transition-all duration-200 cursor-pointer ${
                  index === currentImageIndex ? 'bg-cyan-300 scale-125' : 'bg-white/70 hover:bg-white/90'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
