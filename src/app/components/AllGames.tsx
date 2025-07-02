'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Game from './Game';
import FilterBar, { GameFilters } from './FilterBar';
import { logValidationErrors } from '../../utils/gameValidation';

interface GameData {
  id: number;
  title: string;
  longDescription: string;
  genres: string[];
  year: number;
  contentFolder: string;
  imageCount: number;
  hasVideo: boolean;
  customButton: {
    enabled: boolean;
    name: string;
    link: string;
  };
  credits: Array<{
    firstName: string;
    lastName: string;
    roles: string[];
  }>;
  featured: boolean;
}

interface AllGamesProps {
  games: GameData[];
}

export default function AllGames({ games }: AllGamesProps) {
  const [filters, setFilters] = useState<GameFilters>({
    searchTerm: '',
    selectedGenre: '',
    selectedYear: null
  });
  const [visibleGames, setVisibleGames] = useState(8); // Nombre initial de jeux affichés
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  // Configuration de l'année en vedette (peut être configuré facilement)
  const FEATURED_YEAR = 2025;

  // Validation des genres au chargement (en développement uniquement)
  useEffect(() => {
    logValidationErrors(games);
  }, [games]);

  // Fonction de filtrage optimisée
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch = 
          game.title.toLowerCase().includes(searchLower) ||
          game.longDescription.toLowerCase().includes(searchLower) ||
          game.genres.some(genre => genre.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }
      
      if (filters.selectedGenre && !game.genres.includes(filters.selectedGenre)) {
        return false;
      }
      
      if (filters.selectedYear !== null && game.year !== filters.selectedYear) {
        return false;
      }
      
      return true;
    });
  }, [games, filters]);

  // Trier par année décroissante puis ordre alphabétique
  const sortedGames = useMemo(() => {
    return [...filteredGames].sort((a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year; // Année décroissante
      }
      return a.title.localeCompare(b.title); // Ordre alphabétique
    });
  }, [filteredGames]);

  // Jeux en vedette : ceux de l'année configurée
  const featuredGames = sortedGames.filter(game => game.year === FEATURED_YEAR);
  const otherGames = sortedGames.filter(game => game.year !== FEATURED_YEAR);
  const allSortedGames = [...featuredGames, ...otherGames];

  // Fonction pour charger plus de jeux
  const loadMoreGames = useCallback(() => {
    if (visibleGames >= allSortedGames.length) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setVisibleGames(prev => Math.min(prev + 8, allSortedGames.length));
      setIsLoading(false);
    }, 200); // Réduit de 500ms à 200ms
  }, [visibleGames, allSortedGames.length]);

  // Intersection Observer pour le lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && visibleGames < allSortedGames.length) {
          loadMoreGames();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px' // Précharger 100px avant
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loadMoreGames, isLoading, visibleGames, allSortedGames.length]);

  // Reset des jeux visibles quand les filtres changent
  useEffect(() => {
    setVisibleGames(8);
  }, [filters]);

  // Jeux à afficher (avec limitation pour le lazy loading)
  const gamesToDisplay = allSortedGames.slice(0, visibleGames);
  const hasActiveFilters = filters.searchTerm || filters.selectedGenre || filters.selectedYear !== null;

  const handleFiltersChange = (newFilters: GameFilters) => {
    setFilters(newFilters);
  };

  return (
    <section id="games" className="py-16 px-4 bg-gray-900">
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
      
      {/* Barre de filtres avec sa propre largeur */}
      <FilterBar games={games} onFiltersChange={handleFiltersChange} currentFilters={filters} />
      
      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="mt-8">
          {gamesToDisplay.length === 0 && hasActiveFilters && (
            <div className="text-center py-20">
              <div className="text-white/60 text-xl mb-4 font-gaming">
                ⚠ AUCUN JEU TROUVÉ
              </div>
              <p className="text-white/40 mb-6">
                Aucun jeu ne correspond à vos critères de recherche
              </p>
              <button
                onClick={() => setFilters({ searchTerm: '', selectedGenre: '', selectedYear: null })}
                className="btn-gaming px-6 py-3 rounded-lg cursor-pointer"
              >
                RESET FILTRES
              </button>
            </div>
          )}

          {gamesToDisplay.length > 0 && (
            <>
              {/* Sections avec jeux en vedette d'abord, puis les autres */}
              {!hasActiveFilters && featuredGames.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-gaming text-cyan-400 mb-8 tracking-wider">
                    ⭐ JEUX EN VEDETTE {FEATURED_YEAR}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr">
                    {featuredGames.slice(0, Math.min(visibleGames, featuredGames.length)).map((game) => (
                      <div key={game.id} className="animate-fadeIn">
                        <Game
                          title={game.title}
                          longDescription={game.longDescription}
                          genres={game.genres}
                          contentFolder={game.contentFolder}
                          year={game.year}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Portfolio complet */}
              {(hasActiveFilters || otherGames.length > 0) && (
                <div className="mb-12">
                  {!hasActiveFilters && otherGames.length > 0 && (
                    <h3 className="text-2xl font-gaming text-purple-400 mb-8 tracking-wider">
                      🎮 PORTFOLIO COMPLET
                    </h3>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr">
                    {gamesToDisplay
                      .filter(game => hasActiveFilters || game.year !== FEATURED_YEAR)
                      .map((game, index) => (
                      <div 
                        key={game.id} 
                        className="animate-fadeIn"
                        style={{ 
                          animationDelay: `${(index % 8) * 0.1}s`,
                          animationFillMode: 'both'
                        }}
                      >
                        <Game
                          title={game.title}
                          longDescription={game.longDescription}
                          genres={game.genres}
                          contentFolder={game.contentFolder}
                          year={game.year}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Indicateur de chargement */}
              {visibleGames < allSortedGames.length && (
                <div ref={observerRef} className="text-center py-12">
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                      <span className="text-cyan-400 font-gaming">CHARGEMENT...</span>
                    </div>
                  ) : (
                    <div className="text-white/60 font-gaming text-sm">
                      Scroll pour charger plus de jeux...
                    </div>
                  )}
                </div>
              )}

              {/* Indicateur de fin */}
              {visibleGames >= allSortedGames.length && allSortedGames.length > 8 && (
                <div className="text-center py-8">
                  <div className="text-white/60 font-gaming text-sm">
                    ✨ Tous les jeux ont été chargés ({allSortedGames.length} jeux)
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