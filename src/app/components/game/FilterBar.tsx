'use client';

import { useState, useMemo, useEffect } from 'react';
import { ALL_GENRES } from '@/lib/genres';
import { GameData } from '@/types/game';
import { scrollToSection } from '@/lib/scroll';
import { GameFilters, getAvailableYears } from '@/lib/filters';
import GamingButton from '@/app/components/ui/GamingButton';

interface FilterBarProps {
  games: GameData[];
  onFiltersChange: (filters: GameFilters) => void;
  currentFilters?: GameFilters;
  filteredCount: number;
}

interface DropdownFilterProps {
  label: string;
  value: string | number | null;
  options: readonly (string | number)[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string | number | null) => void;
  resetLabel: string;
  size: 'sm' | 'md';
  dropdownWidth: string;
}

function DropdownFilter({ label, value, options, isOpen, onToggle, onSelect, resetLabel, size, dropdownWidth }: DropdownFilterProps) {
  const isMd = size === 'md';

  return (
    <div className="relative">
      <GamingButton
        onClick={onToggle}
        aria-label={`Filtrer par ${label.toLowerCase()}${value ? ` : ${value}` : ''}`}
        aria-expanded={isOpen}
        className={`rounded-xl flex items-center gap-2 ${
          isMd ? 'px-6 py-3 min-w-[120px] justify-between' : 'px-4 py-2'
        }`}
      >
        <span className={isMd ? 'text-sm' : 'text-xs'}>
          {value || label}
        </span>
        <svg
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${isMd ? 'w-4 h-4' : 'w-3 h-3'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </GamingButton>

      {isOpen && (
        <div className={`absolute top-full left-0 mt-2 ${dropdownWidth} bg-[linear-gradient(135deg,var(--bg-primary)_0%,var(--bg-secondary)_100%)] border border-[var(--border-primary)] shadow-[var(--shadow-dark),var(--shadow-glow)] rounded-xl py-2 z-[100]`}>
          <button
            onClick={() => onSelect(null)}
            className="w-full text-left px-4 py-2 text-white/80 hover:text-cyan-300 hover:bg-gray-700/50 transition-colors text-sm cursor-pointer"
          >
            {resetLabel}
          </button>
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`w-full text-left px-4 py-2 transition-colors text-sm cursor-pointer ${
                value === option
                  ? 'text-cyan-300 bg-gray-700/50'
                  : 'text-white/80 hover:text-cyan-300 hover:bg-gray-700/50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FilterBar({ games, onFiltersChange, currentFilters, filteredCount }: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState(currentFilters?.searchTerm || '');
  const [selectedGenre, setSelectedGenre] = useState(currentFilters?.selectedGenre || '');
  const [selectedYear, setSelectedYear] = useState<number | null>(currentFilters?.selectedYear || null);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  useEffect(() => {
    if (currentFilters) {
      setSearchTerm(currentFilters.searchTerm);
      setSelectedGenre(currentFilters.selectedGenre);
      setSelectedYear(currentFilters.selectedYear);
    }
  }, [currentFilters]);

  const availableYears = useMemo(() => {
    return getAvailableYears(games);
  }, [games]);

  const updateFilters = (newSearchTerm: string, newGenre: string, newYear: number | null) => {
    setSearchTerm(newSearchTerm);
    setSelectedGenre(newGenre);
    setSelectedYear(newYear);
    onFiltersChange({
      searchTerm: newSearchTerm,
      selectedGenre: newGenre,
      selectedYear: newYear
    });

    scrollToSection('games');
  };

  const resetFilters = () => {
    updateFilters('', '', null);
    setIsGenreOpen(false);
    setIsYearOpen(false);
  };

  const hasActiveFilters = searchTerm || selectedGenre || selectedYear !== null;

  const handleGenreToggle = () => {
    setIsGenreOpen(!isGenreOpen);
    setIsYearOpen(false);
  };

  const handleYearToggle = () => {
    setIsYearOpen(!isYearOpen);
    setIsGenreOpen(false);
  };

  const handleGenreSelect = (value: string | number | null) => {
    updateFilters(searchTerm, value as string ?? '', selectedYear);
    setIsGenreOpen(false);
  };

  const handleYearSelect = (value: string | number | null) => {
    updateFilters(searchTerm, selectedGenre, value as number | null);
    setIsYearOpen(false);
  };

  return (
    <div className="sticky top-16 z-50 mb-8">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="bg-gradient-to-r from-gray-800/95 via-gray-900/95 to-gray-800/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700">
          <div className="hidden lg:flex gap-4 items-center justify-between">
            <div className="flex-1 max-w-md w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un jeu, genre, personne..."
                  value={searchTerm}
                  onChange={(e) => updateFilters(e.target.value, selectedGenre, selectedYear)}
                  aria-label="Rechercher un jeu, genre ou personne"
                  className="bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] font-['Inter',sans-serif] transition-all duration-300 focus:border-[var(--primary-blue)] focus:shadow-[0_0_15px_rgba(49,70,128,0.3)] focus:bg-[var(--bg-secondary)] placeholder:text-[var(--text-primary)] placeholder:opacity-70 w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none"
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

            <div className="flex gap-4 items-center">
              <DropdownFilter
                label="GENRE"
                value={selectedGenre || null}
                options={ALL_GENRES}
                isOpen={isGenreOpen}
                onToggle={handleGenreToggle}
                onSelect={handleGenreSelect}
                resetLabel="Tous les genres"
                size="md"
                dropdownWidth="w-48"
              />
              <DropdownFilter
                label="ANNEE"
                value={selectedYear}
                options={availableYears}
                isOpen={isYearOpen}
                onToggle={handleYearToggle}
                onSelect={handleYearSelect}
                resetLabel="Toutes les annees"
                size="md"
                dropdownWidth="w-36"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="text-white/80 font-gaming text-sm">
                <span className="text-cyan-300">{filteredCount}</span> jeu{filteredCount !== 1 ? 'x' : ''}
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  aria-label="Reinitialiser tous les filtres"
                  className="text-white/70 hover:text-cyan-300 transition-colors text-sm font-gaming tracking-wider cursor-pointer"
                >
                  RESET
                </button>
              )}
            </div>
          </div>

          <div className="lg:hidden flex items-center justify-center gap-3">
            <DropdownFilter
              label="GENRE"
              value={selectedGenre || null}
              options={ALL_GENRES}
              isOpen={isGenreOpen}
              onToggle={handleGenreToggle}
              onSelect={handleGenreSelect}
              resetLabel="Tous les genres"
              size="sm"
              dropdownWidth="w-48"
            />
            <DropdownFilter
              label="ANNEE"
              value={selectedYear}
              options={availableYears}
              isOpen={isYearOpen}
              onToggle={handleYearToggle}
              onSelect={handleYearSelect}
              resetLabel="Toutes les annees"
              size="sm"
              dropdownWidth="w-36"
            />
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                aria-label="Reinitialiser tous les filtres"
                className="text-white/70 hover:text-cyan-300 transition-colors text-xs font-gaming tracking-wider cursor-pointer"
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
