'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getMainImageUrl, getLogoUrl } from '../utils/imageUtils';

interface GameProps {
  title: string;
  longDescription: string;
  genres: string[];
  contentFolder: string;
  year: number;
}

// Fonction pour créer un slug à partir du titre
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD') // décompose les accents
    .replace(/[\u0300-\u036f]/g, '') // enlève les diacritiques
    .replace(/[^a-z0-9\s-]/g, '') // enlève les caractères spéciaux
    .replace(/\s+/g, '-') // espaces → tirets
    .replace(/-+/g, '-') // tirets multiples
    .trim();
}

export default function Game({ 
  title, 
  longDescription, 
  genres, 
  contentFolder,
  year
}: GameProps) {

  return (
    <Link 
      href={`/games/${createSlug(title)}`}
      className="card-gaming rounded-xl cursor-pointer h-full flex flex-col overflow-hidden block hover:scale-105 transition-transform duration-300"
      aria-label={`Voir les détails du jeu ${title}`}
    >
      {/* Image principale avec logo en overlay */}
      <div className="relative w-full h-48 flex-shrink-0">
        <Image
          src={getMainImageUrl(contentFolder)}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          quality={80}
        />
        
        {/* Badge année */}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-semibold">
          {year}
        </div>

        {/* Logo en overlay en bas à gauche */}
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

      {/* Contenu */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Titre */}
        <h3 className="text-lg font-sans font-bold text-white mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-3 flex-shrink-0">
          {genres.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="tag-gaming px-3 py-1 rounded-full text-xs"
            >
              #{genre}
            </span>
          ))}
          {genres.length > 3 && (
            <span className="tag-gaming px-3 py-1 rounded-full text-xs">
              +{genres.length - 3}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-white/85 text-sm flex-grow">
          {longDescription.length > 140
            ? longDescription.slice(0, 140) + '...'
            : longDescription}
        </p>
      </div>
    </Link>
  );
} 