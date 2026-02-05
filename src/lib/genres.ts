export const ALL_GENRES = [
  'Action', 'Aventure', 'Narratif', 'Plateforme', 'Puzzle',
  'Tactique', 'Rythme', 'Point & Click', 'Deckbuilding',
  'Rogue Like', 'Metroidvania', 'Horreur', 'VR', '2D', '3D', 'Isométrique', 'FPS'
] as const;

export type GameGenre = typeof ALL_GENRES[number];

export function isValidGenre(genre: string): genre is GameGenre {
  return ALL_GENRES.includes(genre as GameGenre);
}
