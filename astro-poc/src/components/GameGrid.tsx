import { useState } from 'preact/hooks';
import GameCard from './GameCardIsland';
import type { ResolvedImage } from './GameCardIsland';
import GamingButton from './GamingButtonIsland';
import FilterBar from './FilterBar';
import { type GameFilters, filterGames } from '@/lib/filters';
import { FEATURED_YEAR } from '@/constants/site';
import type { GameData } from '@/types/game';

export interface GameWithImages extends GameData {
  mainImage: ResolvedImage;
  logoImage: ResolvedImage;
}

interface GameGridProps {
  games: GameWithImages[];
  initialGenre?: string;
  initialYear?: number | null;
  /** Affiche tout le catalogue d'emblée, sans passer par « voir le portfolio complet ». */
  showAllByDefault?: boolean;
}

export default function GameGrid({ games, initialGenre = '', initialYear = null, showAllByDefault = false }: GameGridProps) {
  const [filters, setFilters] = useState<GameFilters>({
    searchTerm: '',
    selectedGenre: initialGenre,
    selectedYear: initialYear ?? null,
  });
  const [showAllGames, setShowAllGames] = useState(showAllByDefault);

  const filteredGames = filterGames(games, filters) as GameWithImages[];

  const sortedGames = [...filteredGames].sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year;
    }
    return a.title.localeCompare(b.title);
  });

  const featuredGames = sortedGames.filter((game) => game.year === FEATURED_YEAR);
  const hasActiveFilters = Boolean(filters.searchTerm || filters.selectedGenre || filters.selectedYear !== null);

  const gamesToDisplay = (showAllGames || hasActiveFilters) ? sortedGames : featuredGames;

  const handleFiltersChange = (newFilters: GameFilters) => {
    setFilters(newFilters);
    setShowAllGames(showAllByDefault);
  };

  return (
    <section id="games" class="py-16 px-4 bg-[var(--bg-primary)]">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-gaming foil-effect mb-4">
            JEUX ÉTUDIANTS
          </h2>
          <p class="text-white/70 text-lg max-w-2xl mx-auto">
            Explorez les créations interactives des étudiants Master HIC
          </p>
        </div>
      </div>

      <FilterBar games={games} onFiltersChange={handleFiltersChange} currentFilters={filters} filteredCount={filteredGames.length} />
      <div class="max-w-7xl mx-auto px-4">
        <div class="mt-8">
          {gamesToDisplay.length === 0 && hasActiveFilters && (
            <div class="text-center py-20">
              <div class="text-white/75 text-xl mb-4 font-gaming">
                ⚠ AUCUN JEU TROUVÉ
              </div>
              <p class="text-white/65 mb-6">
                Aucun jeu ne correspond à vos critères de recherche
              </p>
              <GamingButton
                onClick={() => setFilters({ searchTerm: '', selectedGenre: '', selectedYear: null })}
                size="md"
              >
                RESET FILTRES
              </GamingButton>
            </div>
          )}

          {gamesToDisplay.length > 0 && (
            <>
              <div class="mb-12">
                {!hasActiveFilters && !showAllGames && featuredGames.length > 0 && (
                  <h3 class="text-2xl font-gaming text-cyan-400 mb-8 tracking-wider">
                    ⭐ JEUX EN VEDETTE {FEATURED_YEAR}
                  </h3>
                )}

                {!hasActiveFilters && showAllGames && !showAllByDefault && (
                  <h3 class="text-2xl font-gaming text-purple-400 mb-8 tracking-wider animate-fadeIn">
                    🎮 PORTFOLIO COMPLET
                  </h3>
                )}

                {hasActiveFilters && (
                  <h3 class="text-2xl font-gaming text-purple-400 mb-8 tracking-wider">
                    🔍 RÉSULTATS DE RECHERCHE ({gamesToDisplay.length} jeu{gamesToDisplay.length > 1 ? 'x' : ''})
                  </h3>
                )}

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr">
                  {gamesToDisplay.map((game, index) => (
                    <GameCard key={game.id} game={game} mainImage={game.mainImage} logoImage={game.logoImage} priority={index < 4} />
                  ))}
                </div>
              </div>

              {!showAllGames && sortedGames.length > featuredGames.length && !hasActiveFilters && (
                <div class="text-center py-12">
                  <GamingButton
                    onClick={() => setShowAllGames(true)}
                    size="lg"
                    className="hover:scale-105"
                  >
                    VOIR LE PORTFOLIO COMPLET ({sortedGames.length - featuredGames.length} autres jeux)
                  </GamingButton>
                </div>
              )}

              {showAllGames && !showAllByDefault && sortedGames.length > featuredGames.length && (
                <div class="text-center py-8">
                  <div class="text-white/60 font-gaming text-sm">
                    ✨ Portfolio complet affiché ({sortedGames.length} jeux)
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
