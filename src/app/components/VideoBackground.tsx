'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface VideoConfig {
  videos: Array<{
    path: string;
    index: number;
  }>;
  totalGames: number;
  segmentDuration: number;
  transitionDuration: number;
  generatedAt: string;
}

export default function VideoBackground() {
  const [selectedVideo, setSelectedVideo] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sélectionner une vidéo aléatoire au chargement
  useEffect(() => {
    const loadVideoConfig = async () => {
      try {
        console.log('🎬 Chargement de la configuration vidéo...');
        
        // Essayer de charger la configuration
        const response = await fetch('/videos/video-config.json');
        if (!response.ok) {
          throw new Error('Configuration vidéo non trouvée');
        }
        
        const config: VideoConfig = await response.json();
        console.log(`📋 Configuration chargée: ${config.videos.length} vidéos disponibles`);
        
        // Sélectionner une vidéo aléatoire
        const randomIndex = Math.floor(Math.random() * config.videos.length);
        const selectedVideoPath = config.videos[randomIndex].path;
        
        console.log(`🎲 Vidéo sélectionnée: ${selectedVideoPath} (index: ${randomIndex + 1})`);
        setSelectedVideo(selectedVideoPath);
        
      } catch (error) {
        console.error('❌ Erreur lors du chargement de la configuration vidéo:', error);
        setError('Impossible de charger les vidéos d\'arrière-plan');
      } finally {
        setIsLoading(false);
      }
    };

    loadVideoConfig();
  }, []);

  // Charger la vidéo sélectionnée
  useEffect(() => {
    if (!selectedVideo || !videoRef.current) return;

    console.log(`🎬 Chargement de la vidéo: ${selectedVideo}`);
    const video = videoRef.current;
    
    // Gestion des erreurs
    const handleError = () => {
      console.error('Erreur lors du chargement de la vidéo');
      setError('Erreur de chargement vidéo');
    };

    video.onerror = handleError;
    video.src = selectedVideo;
    video.load();
    
    // Démarrer à un temps aléatoire pour varier l'expérience
    video.addEventListener('loadedmetadata', function onLoadedMetadata() {
      const duration = video.duration;
      const maxTime = Math.max(0, duration - 30); // Garder 30s à la fin
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

    // Boucler la vidéo
    video.addEventListener('ended', () => {
      console.log('🔄 Fin de vidéo, redémarrage...');
      video.currentTime = 0;
      video.play().catch(console.error);
    });

  }, [selectedVideo]);

  if (isLoading) {
    return (
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-white/80 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-2"></div>
          <p className="text-sm">Chargement de l'arrière-plan...</p>
        </div>
      </div>
    );
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

  if (!selectedVideo) {
    return null;
  }

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
        loop
      >
        Votre navigateur ne supporte pas la lecture vidéo.
      </video>

      {/* Indicateur discret - En bas à droite */}
      <div className="absolute bottom-4 right-4 z-20 hidden md:block">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-white/80 text-xs font-gaming border border-cyan-400/30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            <span>Arrière-plan vidéo</span>
          </div>
          <div className="text-white/60 text-xs mt-1">
            <span className="text-cyan-400">🎬 Ludhic</span>
          </div>
        </div>
      </div>
    </div>
  );
} 