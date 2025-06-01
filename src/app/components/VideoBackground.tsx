'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import gamesData from '../../data/games.json';

interface GameVideo {
  title: string;
  videoPath: string;
  year: number;
}

export default function VideoBackground() {
  const [videos, setVideos] = useState<GameVideo[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef<number>(0);
  const MAX_RETRIES = 3;

  // Configuration du timer (en millisecondes)
  const TIMER_DURATION = 5000; // 5 secondes

  // Fonction pour démarrer le décompte
  const startCountdown = useCallback(() => {
    setCountdown(TIMER_DURATION / 1000);
    
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    
    countdownRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          return TIMER_DURATION / 1000;
        }
        return prev - 1;
      });
    }, 1000);
  }, [TIMER_DURATION]);

  // Fonction pour arrêter le décompte
  const stopCountdown = useCallback(() => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  }, []);

  // Fonction pour détecter le format vidéo disponible avec retry
  const checkVideoFormat = async (basePath: string): Promise<string | null> => {
    try {
      const response = await fetch(`${basePath}/video.webm`, { 
        method: 'HEAD',
        cache: 'no-cache'
      });
      if (response.ok) {
        return `${basePath}/video.webm`;
      }
    } catch (error) {
      console.error(`Erreur lors de la vérification de la vidéo ${basePath}:`, error);
      if (retryCountRef.current < MAX_RETRIES) {
        retryCountRef.current++;
        console.log(`Tentative ${retryCountRef.current} de ${MAX_RETRIES}`);
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCountRef.current));
        return checkVideoFormat(basePath);
      }
    }
    return null;
  };

  // Récupérer toutes les vidéos disponibles depuis games.json
  useEffect(() => {
    const loadAvailableVideos = async () => {
      try {
        console.log('🔍 Recherche des vidéos disponibles...');
        const gamesWithVideo = gamesData.filter(game => game.hasVideo);
        console.log(`📋 Jeux avec hasVideo=true: ${gamesWithVideo.length}`, gamesWithVideo.map(g => g.title));
        
        const availableVideos: GameVideo[] = [];

        for (const game of gamesWithVideo) {
          console.log(`🎬 Vérification vidéo pour: ${game.title} -> ${game.contentFolder}`);
          const videoPath = await checkVideoFormat(game.contentFolder);
          if (videoPath) {
            console.log(`✅ Vidéo trouvée: ${videoPath}`);
            availableVideos.push({
              title: game.title,
              videoPath: videoPath,
              year: game.year
            });
          } else {
            console.log(`❌ Aucune vidéo trouvée pour: ${game.title}`);
          }
        }

        console.log(`🎯 Total vidéos disponibles: ${availableVideos.length}`, availableVideos);
        if (availableVideos.length === 0) {
          setError('Aucune vidéo n\'a pu être chargée');
        } else {
          availableVideos.sort((a, b) => b.year - a.year);
          setVideos(availableVideos);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des vidéos:', error);
        setError('Une erreur est survenue lors du chargement des vidéos');
      } finally {
        setIsLoading(false);
      }
    };

    loadAvailableVideos();
  }, []);

  // Fonction simplifiée pour changer de vidéo avec gestion d'erreur
  const changeVideo = useCallback((newIndex: number) => {
    if (!videos.length || !videoRef.current) return;
    
    console.log(`🔄 Changement vidéo: ${currentVideoIndex} → ${newIndex}`);
    console.log(`🎬 Nouvelle vidéo: ${videos[newIndex].title} (${videos[newIndex].videoPath})`);
    
    setCurrentVideoIndex(newIndex);
    
    const video = videoRef.current;
    video.pause();
    
    // Gestion des erreurs de chargement
    const handleError = () => {
      console.error('Erreur lors du chargement de la vidéo');
      video.style.display = 'none';
      nextVideo(); // Passer à la vidéo suivante en cas d'erreur
    };

    video.onerror = handleError;
    video.src = videos[newIndex].videoPath;
    video.load();
    
    video.addEventListener('loadedmetadata', function onLoadedMetadata() {
      const duration = video.duration;
      const maxTime = Math.max(0, duration - 20);
      const randomTime = Math.random() * maxTime;
      
      console.log(`⏰ Durée vidéo: ${duration.toFixed(1)}s, démarrage à: ${randomTime.toFixed(1)}s`);
      
      video.currentTime = randomTime;
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
    });
    
    video.addEventListener('canplay', function onCanPlay() {
      video.play().catch(error => {
        console.error('Erreur lors de la lecture:', error);
        handleError();
      });
      video.removeEventListener('canplay', onCanPlay);
    });
    
  }, [videos, currentVideoIndex]);

  // Fonction pour passer à la vidéo suivante
  const nextVideo = useCallback(() => {
    if (videos.length > 0) {
      const nextIndex = (currentVideoIndex + 1) % videos.length;
      changeVideo(nextIndex);
    }
  }, [videos.length, currentVideoIndex, changeVideo]);

  // Timer automatique
  useEffect(() => {
    if (videos.length > 0) {
      startCountdown(); // Démarrer le décompte
      
      timerRef.current = setInterval(() => {
        nextVideo();
      }, TIMER_DURATION); // 5 secondes

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        stopCountdown(); // Arrêter le décompte
      };
    }
  }, [videos.length, nextVideo, startCountdown, stopCountdown]);

  // Charger la première vidéo
  useEffect(() => {
    if (videos.length > 0 && videoRef.current) {
      console.log(`🎬 Chargement première vidéo: ${videos[0].title}`);
      const video = videoRef.current;
      video.src = videos[0].videoPath;
      video.load();
      
      // Temps aléatoire pour la première vidéo aussi
      video.addEventListener('loadedmetadata', function onLoadedMetadata() {
        const duration = video.duration;
        const maxTime = Math.max(0, duration - 20);
        const randomTime = Math.random() * maxTime;
        
        console.log(`⏰ Première vidéo - Durée: ${duration.toFixed(1)}s, démarrage à: ${randomTime.toFixed(1)}s`);
        
        video.currentTime = randomTime;
        video.removeEventListener('loadedmetadata', onLoadedMetadata);
      });
      
      video.addEventListener('canplay', function onCanPlay() {
        video.play().catch(console.error);
        video.removeEventListener('canplay', onCanPlay);
      });
    }
  }, [videos.length]);

  // Navigation manuelle
  const goToVideo = (direction: 'prev' | 'next') => {
    if (videos.length === 0) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentVideoIndex + 1) % videos.length;
    } else {
      newIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    }
    
    changeVideo(newIndex);
    
    // Reset timer et décompte
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        nextVideo();
      }, TIMER_DURATION);
    }
    
    // Redémarrer le décompte
    startCountdown();
  };

  if (isLoading) {
    return null;
  }

  if (error) {
    return (
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-white/80 text-center p-4">
          <p className="mb-2">⚠️ {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-cyan-400/20 hover:bg-cyan-400/30 rounded-lg text-cyan-400 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return null;
  }

  const currentVideo = videos[currentVideoIndex];

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Overlay pour contrôler l'opacité */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      {/* Vidéo en arrière-plan */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: 0.8,
          filter: 'blur(0.5px) brightness(0.8)',
        }}
        autoPlay
        muted
        playsInline
      >
        Votre navigateur ne supporte pas la lecture vidéo.
      </video>

      {/* Indicateur de la vidéo courante - En bas à droite */}
      <div className="absolute bottom-4 right-4 z-20 hidden md:block">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-white/80 text-xs font-gaming border border-cyan-400/30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            <span>{currentVideo?.title || 'Chargement...'}</span>
            <span className="text-white/60">({currentVideo?.year})</span>
          </div>
          <div className="text-white/60 text-xs mt-1 flex items-center justify-between">
            <span>{currentVideoIndex + 1}/{videos.length}</span>
            <span className="text-cyan-400">⏱ {countdown}s</span>
          </div>
        </div>
      </div>

      {/* Contrôles discrets */}
      <div className="absolute bottom-4 left-4 z-20 flex gap-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => goToVideo('prev')}
          className="bg-black/40 backdrop-blur-sm rounded-full p-2 text-white/60 hover:text-white hover:bg-black/60 transition-all duration-200"
          title="Vidéo précédente"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
          </svg>
        </button>
        
        <button
          onClick={() => goToVideo('next')}
          className="bg-black/40 backdrop-blur-sm rounded-full p-2 text-white/60 hover:text-white hover:bg-black/60 transition-all duration-200"
          title="Vidéo suivante"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
} 