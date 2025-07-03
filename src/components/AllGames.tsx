'use client';

import { useState, useMemo, useEffect } from 'react';
import Game from './Game';
import FilterBar, { GameFilters } from './FilterBar';
import { logValidationErrors } from '../utils/gameValidation';

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
  const [showAllGames, setShowAllGames] = useState(false);

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
  const allSortedGames = sortedGames;
  const hasActiveFilters = filters.searchTerm || filters.selectedGenre || filters.selectedYear !== null;

  // Jeux à afficher (seulement les jeux en vedette initialement, tous si showAllGames est true ou si filtres actifs)
  const gamesToDisplay = (showAllGames || hasActiveFilters) ? allSortedGames : featuredGames;

  // Reset quand les filtres changent
  useEffect(() => {
    setShowAllGames(false);
  }, [filters]);

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
              {/* Affichage des jeux */}
              {gamesToDisplay.length > 0 && (
                <div className="mb-12">
                  {/* Titre selon le contexte */}
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

                  {/* Grille des jeux */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr">
                    {gamesToDisplay.map((game, index) => (
                      <div 
                        key={game.id} 
                        className="animate-fadeIn"
                        style={{ 
                          animationDelay: `${index * 0.1}s`,
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

              {/* Bouton "Voir le portfolio complet" */}
              {!showAllGames && allSortedGames.length > featuredGames.length && !hasActiveFilters && (
                <div className="text-center py-12">
                  <button
                    onClick={() => setShowAllGames(true)}
                    className="btn-gaming px-8 py-4 rounded-lg cursor-pointer text-lg font-gaming tracking-wider hover:scale-105 transition-transform duration-200"
                  >
                    VOIR LE PORTFOLIO COMPLET ({allSortedGames.length - featuredGames.length} autres jeux)
                  </button>
                </div>
              )}

              {/* Indicateur quand tous les jeux sont affichés */}
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