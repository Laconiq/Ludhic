// Constantes pour les genres de jeux
export const GAME_GENRES = {
  // Action & Aventure
  ACTION: 'Action',
  AVENTURE: 'Aventure',
  NARRATIF: 'Narratif',
  
  // Gameplay
  PLATEFORME: 'Plateforme',
  PUZZLE: 'Puzzle',
  TACTIQUE: 'Tactique',
  RYTHME: 'Rythme',
  POINT_AND_CLICK: 'Point & Click',
  
  // Styles de jeu
  DECKBUILDING: 'Deckbuilding',
  ROGUE_LIKE: 'Rogue Like',
  METROIDVANIA: 'Metroidvania',
  
  // Genres spécialisés
  HORREUR: 'Horreur',
  VR: 'VR',
  
  // Dimensions graphiques
  '2D': '2D',
  '3D': '3D',
  ISOMETRIQUE: 'Isométrique'
} as const;

// Type pour les genres (pour TypeScript)
export type GameGenre = typeof GAME_GENRES[keyof typeof GAME_GENRES];

// Array de tous les genres pour les dropdowns et validations
export const ALL_GENRES = Object.values(GAME_GENRES);

// Genres par catégorie pour une organisation plus claire
export const GENRES_BY_CATEGORY = {
  'Action & Aventure': [
    GAME_GENRES.ACTION,
    GAME_GENRES.AVENTURE,
    GAME_GENRES.NARRATIF
  ],
  'Gameplay': [
    GAME_GENRES.PLATEFORME,
    GAME_GENRES.PUZZLE,
    GAME_GENRES.TACTIQUE,
    GAME_GENRES.RYTHME,
    GAME_GENRES.POINT_AND_CLICK
  ],
  'Styles de jeu': [
    GAME_GENRES.DECKBUILDING,
    GAME_GENRES.ROGUE_LIKE,
    GAME_GENRES.METROIDVANIA
  ],
  'Genres spécialisés': [
    GAME_GENRES.HORREUR,
    GAME_GENRES.VR
  ],
  'Dimensions': [
    GAME_GENRES['2D'],
    GAME_GENRES['3D'],
    GAME_GENRES.ISOMETRIQUE
  ]
} as const;

// Fonction utilitaire pour valider qu'un genre existe
export const isValidGenre = (genre: string): genre is GameGenre => {
  return ALL_GENRES.includes(genre as GameGenre);
}; 