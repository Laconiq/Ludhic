import { useState } from 'preact/hooks';
import { ALL_GENRES } from '@/lib/genres';
import type { GameData } from '@/types/game';
import { type GameFilters, getAvailableYears } from '@/lib/filters';
import GamingButton from './GamingButtonIsland';

function scrollToSection(sectionId: string): boolean {
  const element = document.getElementById(sectionId);
  if (!element) return false;
  element.scrollIntoView({ behavior: 'smooth' });
  return true;
}

interface FilterBarProps {
  games: GameData[];
  onFiltersChange: (filters: GameFilters) => void;
  currentFilters: GameFilters;
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
    <div class="relative">
      <GamingButton
        onClick={onToggle}
        aria-label={`Filtrer par ${label.toLowerCase()}${value ? ` : ${value}` : ''}`}
        aria-expanded={isOpen}
        className={`rounded-xl flex items-center gap-2 ${
          isMd ? 'px-6 py-3 min-w-[120px] justify-between' : 'px-4 py-2'
        }`}
      >
        <span class={isMd ? 'text-sm' : 'text-xs'}>
          {value || label}
        </span>
        <svg
          class={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${isMd ? 'w-4 h-4' : 'w-3 h-3'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M19 9l-7 7-7-7" />
        </svg>
      </GamingButton>

      {isOpen && (
        <div class={`absolute top-full left-0 mt-2 ${dropdownWidth} bg-[linear-gradient(135deg,var(--bg-primary)_0%,var(--bg-secondary)_100%)] border border-[var(--border-primary)] shadow-[var(--shadow-dark),var(--shadow-glow)] rounded-xl py-2 z-[100]`}>
          <button
            onClick={() => onSelect(null)}
            class="w-full text-left px-4 py-2 text-[var(--text-primary)]/80 hover:text-cyan-300 hover:bg-[var(--bg-tertiary)]/50 transition-colors text-sm cursor-pointer"
          >
            {resetLabel}
          </button>
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onSelect(option)}
              class={`w-full text-left px-4 py-2 transition-colors text-sm cursor-pointer ${
                value === option
                  ? 'text-cyan-300 bg-[var(--bg-tertiary)]/50'
                  : 'text-[var(--text-primary)]/80 hover:text-cyan-300 hover:bg-[var(--bg-tertiary)]/50'
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
  const { searchTerm, selectedGenre, selectedYear } = currentFilters;
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const availableYears = getAvailableYears(games);

  const updateFilters = (newSearchTerm: string, newGenre: string, newYear: number | null) => {
    onFiltersChange({
      searchTerm: newSearchTerm,
      selectedGenre: newGenre,
      selectedYear: newYear,
    });
  };

  const resetFilters = () => {
    updateFilters('', '', null);
    setIsGenreOpen(false);
    setIsYearOpen(false);
    scrollToSection('games');
  };

  const hasActiveFilters = Boolean(searchTerm || selectedGenre || selectedYear !== null);

  const handleGenreToggle = () => {
    setIsGenreOpen((prev) => !prev);
    setIsYearOpen(false);
  };

  const handleYearToggle = () => {
    setIsYearOpen((prev) => !prev);
    setIsGenreOpen(false);
  };

  const handleGenreSelect = (value: string | number | null) => {
    updateFilters(searchTerm, (value as string) ?? '', selectedYear);
    setIsGenreOpen(false);
    scrollToSection('games');
  };

  const handleYearSelect = (value: string | number | null) => {
    updateFilters(searchTerm, selectedGenre, value as number | null);
    setIsYearOpen(false);
    scrollToSection('games');
  };

  const dropdowns = (size: 'sm' | 'md') => (
    <>
      <DropdownFilter
        label="GENRE"
        value={selectedGenre || null}
        options={ALL_GENRES}
        isOpen={isGenreOpen}
        onToggle={handleGenreToggle}
        onSelect={handleGenreSelect}
        resetLabel="Tous les genres"
        size={size}
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
        size={size}
        dropdownWidth="w-36"
      />
    </>
  );

  const searchField = (
    <div class="relative">
      <input
        type="text"
        placeholder="Rechercher un jeu, genre, personne..."
        value={searchTerm}
        onInput={(e) => updateFilters((e.target as HTMLInputElement).value, selectedGenre, selectedYear)}
        aria-label="Rechercher un jeu, genre ou personne"
        class="bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] font-['Inter',sans-serif] transition-all duration-300 focus:border-[var(--primary-blue)] focus:shadow-[0_0_15px_rgba(49,70,128,0.3)] focus:bg-[var(--bg-secondary)] placeholder:text-[var(--text-primary)] placeholder:opacity-70 w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      />
      <svg
        class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );

  const resetButton = (textSize: string) =>
    hasActiveFilters && (
      <button
        onClick={resetFilters}
        aria-label="Reinitialiser tous les filtres"
        class={`text-white/70 hover:text-cyan-300 transition-colors ${textSize} font-gaming tracking-wider cursor-pointer`}
      >
        RESET
      </button>
    );

  return (
    <div class="sticky top-16 z-50 mb-8">
      <div class="max-w-screen-2xl mx-auto px-4">
        <div class="bg-gradient-to-r from-[var(--bg-secondary)]/95 via-[var(--bg-primary)]/95 to-[var(--bg-secondary)]/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[var(--border-primary)]">
          <div class="hidden lg:flex gap-4 items-center justify-between">
            <div class="flex-1 max-w-md w-full">{searchField}</div>

            <div class="flex gap-4 items-center">{dropdowns('md')}</div>

            <div class="flex items-center gap-4">
              <div class="text-white/80 font-gaming text-sm">
                <span class="text-cyan-300">{filteredCount}</span> jeu{filteredCount !== 1 ? 'x' : ''}
              </div>
              {resetButton('text-sm')}
            </div>
          </div>

          <div class="lg:hidden flex flex-col gap-4">
            {searchField}
            <div class="flex items-center justify-center gap-3">
              {dropdowns('sm')}
              <div class="text-white/80 font-gaming text-xs whitespace-nowrap">
                <span class="text-cyan-300">{filteredCount}</span> jeu{filteredCount !== 1 ? 'x' : ''}
              </div>
              {resetButton('text-xs')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
