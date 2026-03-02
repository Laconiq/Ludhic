import GameCard from '@/app/components/game/GameCard';
import { GameData } from '@/types/game';

interface RelatedGamesProps {
  games: GameData[];
}

export default function RelatedGames({ games }: RelatedGamesProps) {
  if (games.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-[var(--bg-primary)] border-t border-[var(--border-primary)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-gaming foil-effect text-center mb-10">
          JEUX SIMILAIRES
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 auto-rows-fr">
          {games.map(game => (
            <GameCard
              key={game.id}
              title={game.title}
              longDescription={game.longDescription}
              genres={game.genres}
              contentFolder={game.contentFolder}
              year={game.year}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
