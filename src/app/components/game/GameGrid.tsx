'use client';

import { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import GameCard from './GameCard';
import GamingButton from '@/app/components/ui/GamingButton';
import FilterBar from './FilterBar';
import { logValidationErrors } from '@/lib/validation';

const FadeInView = dynamic(() => import('@/app/components/ui/FadeInView'), { ssr: false });
import { GameData } from '@/types/game';
import { GameFilters, filterGames } from '@/lib/filters';
import { FEATURED_YEAR } from '@/constants/site';

interface AllGamesProps {
  games: GameData[];
  initialGenre?: string;
  initialYear?: number | null;
}

export default function GameGrid({ games, initialGenre = '', initialYear = null }: AllGamesProps) {
  const [filters, setFilters] = useState<GameFilters>({
    searchTerm: '',
    selectedGenre: initialGenre,
    selectedYear: initialYear ?? null
  });
  const [showAllGames, setShowAllGames] = useState(false);


  useEffect(() => {
    if (initialGenre || initialYear !== null) {
      setFilters(prev => ({
        ...prev,
        selectedGenre: initialGenre,
        selectedYear: initialYear ?? null,
      }));
    }
  }, [initialGenre, initialYear]);

  useEffect(() => {
    logValidationErrors(games);
  }, [games]);

  const filteredGames = useMemo(() => {
    return filterGames(games, filters);
  }, [games, filters]);

  const sortedGames = useMemo(() => {
    return [...filteredGames].sort((a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year;
      }
      return a.title.localeCompare(b.title);
    });
  }, [filteredGames]);

  const featuredGames = sortedGames.filter(game => game.year === FEATURED_YEAR);
  const allSortedGames = sortedGames;
  const hasActiveFilters = filters.searchTerm || filters.selectedGenre || filters.selectedYear !== null;

  const gamesToDisplay = (showAllGames || hasActiveFilters) ? allSortedGames : featuredGames;

  useEffect(() => {
    setShowAllGames(false);
  }, [filters]);

  const handleFiltersChange = (newFilters: GameFilters) => {
    setFilters(newFilters);
  };

  return (
    <section id="games" className="py-16 px-4 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-gaming foil-effect mb-4">
            JEUX ÉTUDIANTS
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Explorez les créations interactives des étudiants Master HIC
          </p>
        </div>
      </div>
      
      <FilterBar games={games} onFiltersChange={handleFiltersChange} currentFilters={filters} filteredCount={filteredGames.length} />
      <div className="max-w-7xl mx-auto px-4">
        <div className="mt-8">
          {gamesToDisplay.length === 0 && hasActiveFilters && (
            <div className="text-center py-20">
              <div className="text-white/75 text-xl mb-4 font-gaming">
                ⚠ AUCUN JEU TROUVÉ
              </div>
              <p className="text-white/65 mb-6">
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
              {gamesToDisplay.length > 0 && (
                <div className="mb-12">
                  {!hasActiveFilters && !showAllGames && featuredGames.length > 0 && (
                    <h3 className="text-2xl font-gaming text-cyan-400 mb-8 tracking-wider">
                      ⭐ JEUX EN VEDETTE {FEATURED_YEAR}
                    </h3>
                  )}
                  
                  {!hasActiveFilters && showAllGames && (
                    <h3 className="text-2xl font-gaming text-purple-400 mb-8 tracking-wider animate-fadeIn">
                      🎮 PORTFOLIO COMPLET
                    </h3>
                  )}

                  {hasActiveFilters && (
                    <h3 className="text-2xl font-gaming text-purple-400 mb-8 tracking-wider">
                      🔍 RÉSULTATS DE RECHERCHE ({gamesToDisplay.length} jeu{gamesToDisplay.length > 1 ? 'x' : ''})
                    </h3>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr">
                    {gamesToDisplay.map((game, index) => {
                      const card = (
                        <GameCard
                          title={game.title}
                          longDescription={game.longDescription}
                          genres={game.genres}
                          contentFolder={game.contentFolder}
                          year={game.year}
                          priority={index < 4}
                        />
                      );
                      return index < 4 ? (
                        <div key={game.id}>{card}</div>
                      ) : (
                        <FadeInView key={game.id} delay={Math.min((index - 4) * 0.05, 0.3)}>
                          {card}
                        </FadeInView>
                      );
                    })}
                  </div>
                </div>
              )}

              {!showAllGames && allSortedGames.length > featuredGames.length && !hasActiveFilters && (
                <div className="text-center py-12">
                  <GamingButton
                    onClick={() => setShowAllGames(true)}
                    size="lg"
                    className="hover:scale-105"
                  >
                    VOIR LE PORTFOLIO COMPLET ({allSortedGames.length - featuredGames.length} autres jeux)
                  </GamingButton>
                </div>
              )}

              {showAllGames && allSortedGames.length > featuredGames.length && (
                <div className="text-center py-8">
                  <div className="text-white/60 font-gaming text-sm">
                    ✨ Portfolio complet affiché ({allSortedGames.length} jeux)
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