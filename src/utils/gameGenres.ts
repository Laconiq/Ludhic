// Genres de jeux disponibles
export const ALL_GENRES = [
  'Action', 'Aventure', 'Narratif', 'Plateforme', 'Puzzle', 
  'Tactique', 'Rythme', 'Point & Click', 'Deckbuilding', 
  'Rogue Like', 'Metroidvania', 'Horreur', 'VR', '2D', '3D', 'Isométrique'
] as const;

// Type pour les genres (pour TypeScript)
export type GameGenre = typeof ALL_GENRES[number];

// Fonction utilitaire pour valider qu'un genre existe
export const isValidGenre = (genre: string): genre is GameGenre => {
  return ALL_GENRES.includes(genre as GameGenre);
}; 