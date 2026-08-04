import Image from 'next/image';
import Link from 'next/link';
import { getMainImageUrl, getLogoUrl } from '@/lib/images';
import { createSlug } from '@/lib/slug';
import GenreBadge from '@/app/components/ui/GenreBadge';
import { GameData } from '@/types/game';

const DESCRIPTION_MAX_LENGTH = 140;
const MAX_VISIBLE_GENRES = 3;

interface GameCardProps {
  game: GameData;
  priority?: boolean;
}

export default function GameCard({ game, priority = false }: GameCardProps) {
  const { title, longDescription, genres, contentFolder, year } = game;

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
          // La carte ne dépasse jamais ~350 px hors mobile (grilles 3 et 4
          // colonnes dans un conteneur max-w-7xl). L'ancien « 33vw » annonçait
          // 634 px sur un écran 1920 et faisait donc télécharger la variante la
          // plus large pour une vignette de 288 px.
          sizes="(max-width: 639px) 100vw, (max-width: 767px) 640px, (max-width: 1023px) 352px, 320px"
          priority={priority}
          loading={priority ? undefined : 'lazy'}
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
            // Pas de `sizes` volontairement : sur une image de largeur fixe,
            // Next se limite alors aux variantes 1x et 2x. Un `sizes` en px
            // sans unité vw lui ferait au contraire générer toute la gamme.
            loading="lazy"
          />
        </div>
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-sans font-bold text-[var(--text-primary)] mb-3 line-clamp-2">
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