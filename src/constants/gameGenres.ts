// Constantes pour les genres de jeux
export const GAME_GENRES = {
  '2D': '2D',
  '3D': '3D',
  ACTION: 'Action',
  AVENTURE: 'Aventure',
  DECKBUILDING: 'Deckbuilding',
  HORREUR: 'Horreur',
  ISOMETRIQUE: 'Isométrique',
  METROIDVANIA: 'Metroidvania',
  NARRATIF: 'Narratif',
  PLATEFORME: 'Plateforme',
  POINT_AND_CLICK: 'Point & Click',
  PUZZLE: 'Puzzle',
  ROGUE_LIKE: 'Rogue Like',
  RYTHME: 'Rythme',
  TACTIQUE: 'Tactique',
  VR: 'VR'
} as const;

export type GameGenre = typeof GAME_GENRES[keyof typeof GAME_GENRES];

export const ALL_GENRES = Object.values(GAME_GENRES);

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