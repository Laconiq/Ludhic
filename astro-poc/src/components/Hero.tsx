import { useEffect, useRef } from 'preact/hooks';
import GamingButton from './GamingButtonIsland';

const BACKGROUND_VIDEO_COUNT = 3;

function scrollToSection(sectionId: string): boolean {
  const element = document.getElementById(sectionId);
  if (!element) return false;
  element.scrollIntoView({ behavior: 'smooth' });
  return true;
}

interface HeroProps {
  logoSrc: string;
}

export default function Hero({ logoSrc }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // La page est pré-rendue au build : tirer le fond au sort pendant le rendu
  // figerait le HTML sur une seule vidéo. Le tirage se fait donc après
  // montage, directement sur l'élément — `src` n'est volontairement pas posé
  // dans le JSX (cf. commentaire de la version Next d'origine).
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
    <section id="hero" class="h-screen flex items-center justify-center relative overflow-hidden -mt-16">
      <video
        ref={videoRef}
        autoplay
        loop
        muted
        playsInline
        preload="none"
        class="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />
      <div class="absolute top-0 left-0 w-full h-full bg-black/50 z-0 pointer-events-none" />

      <div class="absolute inset-0 z-10">
        <div class="absolute inset-0 opacity-30 animate-grid-move gaming-grid-bg" />
        <div class="absolute inset-0 opacity-15 gaming-grid-bg-fine" />
      </div>

      <div class="relative z-20 text-center px-4 pt-16 max-w-5xl mx-auto">
        <div class="hero-animate-title">
          <div class="flex items-center justify-center gap-6 mb-8 foil-container">
            <div class="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 foil-logo">
              <img src={logoSrc} alt="Ludhic Logo" width={128} height={128} class="w-full h-full object-contain filter drop-shadow-lg" />
            </div>
            <h1 class="text-6xl md:text-8xl font-gaming foil-effect">
              LUDHIC
            </h1>
          </div>
        </div>

        <div class="hero-animate-text">
          <p class="text-lg md:text-xl text-white/85 mb-12 max-w-4xl mx-auto leading-relaxed">
            Ludhic est une association regroupant plusieurs étudiants et anciens étudiants du Master HIC (anciennement MAJE).
            Cette association a pour but principal de répertorier et de mettre en avant les travaux des étudiants.
          </p>
        </div>

        <div class="hero-animate-buttons">
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
