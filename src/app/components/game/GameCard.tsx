'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getMainImageUrl, getLogoUrl } from '@/lib/images';
import { createSlug } from '@/lib/slug';
import GenreBadge from '@/app/components/ui/GenreBadge';

const DESCRIPTION_MAX_LENGTH = 140;
const MAX_VISIBLE_GENRES = 3;

interface GameProps {
  title: string;
  longDescription: string;
  genres: string[];
  contentFolder: string;
  year: number;
}

export default function GameCard({
  title, 
  longDescription, 
  genres, 
  contentFolder,
  year
}: GameProps) {

  return (
    <Link 
      href={`/games/${createSlug(title)}`}
      className="gaming-card cursor-pointer h-full flex flex-col overflow-hidden block"
      aria-label={`Voir les détails du jeu ${title}`}
    >
      <div className="relative w-full h-48 flex-shrink-0">
        <Image
          src={getMainImageUrl(contentFolder)}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          quality={80}
        />
        
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-semibold">
          {year}
        </div>

        <div className="absolute bottom-2 left-2 h-8 max-w-16 flex items-center opacity-90">
          <Image
            src={getLogoUrl(contentFolder)}
            alt={`${title} Logo`}
            width={64}
            height={32}
            className="max-h-full w-auto object-contain drop-shadow-md"
            sizes="64px"
            loading="lazy"
            quality={90}
          />
        </div>
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-sans font-bold text-white mb-3 line-clamp-2">
          {title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-3 flex-shrink-0">
          {genres.slice(0, MAX_VISIBLE_GENRES).map((genre) => (
            <GenreBadge key={genre} genre={genre} variant="card" />
          ))}
          {genres.length > MAX_VISIBLE_GENRES && (
            <GenreBadge genre={`+${genres.length - MAX_VISIBLE_GENRES}`} variant="card" showHash={false} />
          )}
        </div>

        <p className="text-white/85 text-sm flex-grow">
          {longDescription.length > DESCRIPTION_MAX_LENGTH
            ? longDescription.slice(0, DESCRIPTION_MAX_LENGTH) + '...'
            : longDescription}
        </p>
      </div>
    </Link>
  );
} 