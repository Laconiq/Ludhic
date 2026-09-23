import { useState } from 'preact/hooks';
import { getYoutubeEmbedUrl } from '@/lib/youtube';

interface GameVideoProps {
  contentFolder: string;
  posterSrc: string;
  youtubeUrl?: string;
}

export default function GameVideo({ contentFolder, posterSrc, youtubeUrl }: GameVideoProps) {
  const [videoError, setVideoError] = useState(false);

  const embedUrl = youtubeUrl ? getYoutubeEmbedUrl(youtubeUrl) : null;

  return (
    <div class="mb-16">
      <h3 class="text-lg font-gaming text-cyan-400 mb-6 tracking-wider">
        VIDÉO DU JEU
      </h3>
      <div class="relative w-full rounded-xl overflow-hidden shadow-2xl aspect-video">
        {embedUrl ? (
          <iframe
            class="w-full h-full"
            src={embedUrl}
            title="Vidéo du jeu"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : videoError ? (
          <div class="flex items-center justify-center h-full bg-black/40 text-white/80">
            <p class="text-center p-4">
              La vidéo n&apos;a pas pu être chargée.<br />
              Veuillez réessayer plus tard.
            </p>
          </div>
        ) : (
          <video
            class="w-full h-full object-cover"
            controls
            preload="metadata"
            poster={posterSrc}
            onError={() => setVideoError(true)}
          >
            <source src={`${contentFolder}/video.webm`} type="video/webm" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
        )}
      </div>
    </div>
  );
}
