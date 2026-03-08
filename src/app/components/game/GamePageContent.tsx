'use client';

import Link from 'next/link';
import Navigation from '@/app/components/layout/Navigation';
import { GameData } from '@/types/game';
import { getAllImageUrls } from '@/lib/images';
import GamingButton from '@/app/components/ui/GamingButton';
import GenreBadge from '@/app/components/ui/GenreBadge';
import GameCredits from '@/app/components/game/GameCredits';
import GameHero from '@/app/components/game/GameHero';
import GameVideo from '@/app/components/game/GameVideo';
import ImageCarousel from '@/app/components/game/ImageCarousel';
import dynamic from 'next/dynamic';

const FadeInView = dynamic(() => import('@/app/components/ui/FadeInView'), { ssr: false });

interface GamePageContentProps {
  game: GameData;
}

export default function GamePageContent({ game }: GamePageContentProps) {
  const allImages = getAllImageUrls(game.contentFolder, game.imageCount);

  return (
    <>
      <Navigation />

      <GameHero title={game.title} contentFolder={game.contentFolder} />

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-16">
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
        <h1 className="text-2xl md:text-4xl font-gaming foil-effect text-center mb-6">
          {game.title.toUpperCase()}
        </h1>
        <div className="flex flex-col items-center gap-y-2 mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="font-gaming bg-black/50 backdrop-blur-sm rounded-full border border-cyan-400/30 text-cyan-400 text-xs px-2 py-0.5 sm:text-base sm:px-3 sm:py-1">
              ANNÉE {game.year}
            </span>
            {game.genres.map((genre) => (
              <GenreBadge key={genre} genre={genre} variant="detail" href={`/games?genre=${encodeURIComponent(genre)}`} />
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
        <FadeInView>
          <div className="mb-12 w-full">
            <h2 className="text-xl md:text-2xl font-gaming text-cyan-400 mb-6 tracking-wider w-full">
              A PROPOS DU JEU
            </h2>
            <p className="text-white/90 text-base leading-relaxed w-full">
              {game.longDescription}
            </p>
          </div>
        </FadeInView>

        {game.imageCount > 1 && (
          <FadeInView delay={0.1}>
            <ImageCarousel images={allImages} title={game.title} />
          </FadeInView>
        )}

        {game.hasVideo && (
          <FadeInView delay={0.2}>
            <GameVideo contentFolder={game.contentFolder} />
          </FadeInView>
        )}

        <FadeInView delay={0.3}>
          <GameCredits credits={game.credits} />
        </FadeInView>
      </div>
    </>
  );
}
