import type { GameData } from '@/types/game';

export interface GameFilters {
  searchTerm: string;
  selectedGenre: string;
  selectedYear: number | null;
}

export function filterGames(games: GameData[], filters: GameFilters): GameData[] {
  return games.filter((game) => {
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesSearch =
        game.title.toLowerCase().includes(searchLower) ||
        game.longDescription.toLowerCase().includes(searchLower) ||
        game.genres.some(genre => genre.toLowerCase().includes(searchLower)) ||
        game.credits.some(credit =>
          `${credit.firstName} ${credit.lastName}`.toLowerCase().includes(searchLower)
        );
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
}

export function getAvailableYears(games: GameData[]): number[] {
  return [...new Set(games.map(game => game.year))].sort((a, b) => b - a);
}
