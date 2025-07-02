'use client';

import { useState, useMemo, useEffect } from 'react';
import { ALL_GENRES } from '../../constants/gameGenres';

export interface GameFilters {
  searchTerm: string;
  selectedGenre: string;
  selectedYear: number | null;
}

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

interface FilterBarProps {
  games: GameData[];
  onFiltersChange: (filters: GameFilters) => void;
  currentFilters?: GameFilters;
}

export default function FilterBar({ games, onFiltersChange, currentFilters }: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState(currentFilters?.searchTerm || '');
  const [selectedGenre, setSelectedGenre] = useState(currentFilters?.selectedGenre || '');
  const [selectedYear, setSelectedYear] = useState<number | null>(currentFilters?.selectedYear || null);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  // Synchroniser les états locaux avec les filtres externes
  useEffect(() => {
    if (currentFilters) {
      setSearchTerm(currentFilters.searchTerm);
      setSelectedGenre(currentFilters.selectedGenre);
      setSelectedYear(currentFilters.selectedYear);
    }
  }, [currentFilters]);

  // Obtenir les années uniques des jeux
  const availableYears = useMemo(() => {
    const years = [...new Set(games.map(game => game.year))];
    return years.sort((a, b) => b - a); // Ordre décroissant
  }, [games]);

  // Compter les résultats actuels
  const filteredCount = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch = !searchTerm || 
        game.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGenre = !selectedGenre || 
        game.genres.includes(selectedGenre);
      
      const matchesYear = selectedYear === null || 
        game.year === selectedYear;

      return matchesSearch && matchesGenre && matchesYear;
    }).length;
  }, [games, searchTerm, selectedGenre, selectedYear]);

  const updateFilters = (newSearchTerm: string, newGenre: string, newYear: number | null) => {
    setSearchTerm(newSearchTerm);
    setSelectedGenre(newGenre);
    setSelectedYear(newYear);
    onFiltersChange({
      searchTerm: newSearchTerm,
      selectedGenre: newGenre,
      selectedYear: newYear
    });
    
    // Scroll vers la section des jeux quand on applique un filtre
    const gamesElement = document.getElementById('games');
    if (gamesElement) {
      gamesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resetFilters = () => {
    updateFilters('', '', null);
    setIsGenreOpen(false);
    setIsYearOpen(false);
  };

  const hasActiveFilters = searchTerm || selectedGenre || selectedYear !== null;

  return (
    <div className="sticky top-16 z-50 mb-8">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="bg-gradient-to-r from-gray-800/95 via-gray-900/95 to-gray-800/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700">
          {/* Layout Desktop */}
          <div className="hidden lg:flex gap-4 items-center justify-between">
            {/* Section gauche: Recherche */}
            <div className="flex-1 max-w-md w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un jeu..."
                  value={searchTerm}
                  onChange={(e) => updateFilters(e.target.value, selectedGenre, selectedYear)}
                  className="input-gaming w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none"
                />
                <svg 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Section centre: Filtres */}
            <div className="flex gap-4 items-center">
              {/* Dropdown Genre */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsGenreOpen(!isGenreOpen);
                    setIsYearOpen(false);
                  }}
                  className="btn-gaming px-6 py-3 rounded-xl flex items-center gap-2 min-w-[140px] justify-between cursor-pointer"
                >
                  <span className="text-sm">
                    {selectedGenre || 'GENRE'}
                  </span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isGenreOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isGenreOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 modal-gaming rounded-xl shadow-xl border border-gray-600 py-2 z-[100]">
                    <button
                      onClick={() => {
                        updateFilters(searchTerm, '', selectedYear);
                        setIsGenreOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-white/70 hover:text-cyan-400 hover:bg-gray-700/50 transition-colors text-sm cursor-pointer"
                    >
                      Tous les genres
                    </button>
                    {ALL_GENRES.map((genre) => (
                      <button
                        key={genre}
                        onClick={() => {
                          updateFilters(searchTerm, genre, selectedYear);
                          setIsGenreOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 transition-colors text-sm cursor-pointer ${
                          selectedGenre === genre 
                            ? 'text-cyan-400 bg-gray-700/50' 
                            : 'text-white/70 hover:text-cyan-400 hover:bg-gray-700/50'
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown Année */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsYearOpen(!isYearOpen);
                    setIsGenreOpen(false);
                  }}
                  className="btn-gaming px-6 py-3 rounded-xl flex items-center gap-2 min-w-[120px] justify-between cursor-pointer"
                >
                  <span className="text-sm">
                    {selectedYear || 'ANNÉE'}
                  </span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isYearOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isYearOpen && (
                  <div className="absolute top-full left-0 mt-2 w-36 modal-gaming rounded-xl shadow-xl border border-gray-600 py-2 z-[100]">
                    <button
                      onClick={() => {
                        updateFilters(searchTerm, selectedGenre, null);
                        setIsYearOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-white/70 hover:text-cyan-400 hover:bg-gray-700/50 transition-colors text-sm cursor-pointer"
                    >
                      Toutes les années
                    </button>
                    {availableYears.map((year) => (
                      <button
                        key={year}
                        onClick={() => {
                          updateFilters(searchTerm, selectedGenre, year);
                          setIsYearOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 transition-colors text-sm cursor-pointer ${
                          selectedYear === year 
                            ? 'text-cyan-400 bg-gray-700/50' 
                            : 'text-white/70 hover:text-cyan-400 hover:bg-gray-700/50'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Section droite: Résultats et reset */}
            <div className="flex items-center gap-4">
              {/* Compteur de résultats */}
              <div className="text-white/70 font-gaming text-sm">
                <span className="text-cyan-400">{filteredCount}</span> jeu{filteredCount !== 1 ? 'x' : ''}
              </div>

              {/* Bouton reset */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-white/60 hover:text-cyan-400 transition-colors text-sm font-gaming tracking-wider cursor-pointer"
                >
                  RESET
                </button>
              )}
            </div>
          </div>

          {/* Layout Mobile - Simplifié */}
          <div className="lg:hidden flex items-center justify-center gap-3">
            {/* Dropdown Genre */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsGenreOpen(!isGenreOpen);
                  setIsYearOpen(false);
                }}
                className="btn-gaming px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <span className="text-xs">
                  {selectedGenre || 'GENRE'}
                </span>
                <svg 
                  className={`w-3 h-3 transition-transform duration-200 ${isGenreOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isGenreOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 modal-gaming rounded-xl shadow-xl border border-gray-600 py-2 z-[100]">
                  <button
                    onClick={() => {
                      updateFilters(searchTerm, '', selectedYear);
                      setIsGenreOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-white/70 hover:text-cyan-400 hover:bg-gray-700/50 transition-colors text-sm cursor-pointer"
                  >
                    Tous les genres
                  </button>
                  {ALL_GENRES.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => {
                        updateFilters(searchTerm, genre, selectedYear);
                        setIsGenreOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 transition-colors text-sm cursor-pointer ${
                        selectedGenre === genre 
                          ? 'text-cyan-400 bg-gray-700/50' 
                          : 'text-white/70 hover:text-cyan-400 hover:bg-gray-700/50'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown Année */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsYearOpen(!isYearOpen);
                  setIsGenreOpen(false);
                }}
                className="btn-gaming px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <span className="text-xs">
                  {selectedYear || 'ANNÉE'}
                </span>
                <svg 
                  className={`w-3 h-3 transition-transform duration-200 ${isYearOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isYearOpen && (
                <div className="absolute top-full left-0 mt-2 w-36 modal-gaming rounded-xl shadow-xl border border-gray-600 py-2 z-[100]">
                  <button
                    onClick={() => {
                      updateFilters(searchTerm, selectedGenre, null);
                      setIsYearOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-white/70 hover:text-cyan-400 hover:bg-gray-700/50 transition-colors text-sm cursor-pointer"
                  >
                    Toutes les années
                  </button>
                  {availableYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        updateFilters(searchTerm, selectedGenre, year);
                        setIsYearOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 transition-colors text-sm cursor-pointer ${
                        selectedYear === year 
                          ? 'text-cyan-400 bg-gray-700/50' 
                          : 'text-white/70 hover:text-cyan-400 hover:bg-gray-700/50'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bouton reset */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-white/60 hover:text-cyan-400 transition-colors text-xs font-gaming tracking-wider cursor-pointer"
              >
                RESET
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 