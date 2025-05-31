import { isValidGenre, ALL_GENRES } from '../constants/gameGenres';

interface GameData {
  id: number;
  title: string;
  longDescription: string;
  genres: string[];
  contentFolder: string;
  imageCount: number;
  year: number;
  hasVideo: boolean;
  featured: boolean;
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
}

// Valide qu'un jeu utilise des genres valides
export const validateGameGenres = (game: GameData): string[] => {
  const invalidGenres: string[] = [];
  
  game.genres.forEach(genre => {
    if (!isValidGenre(genre)) {
      invalidGenres.push(genre);
    }
  });
  
  return invalidGenres;
};

// Valide tous les jeux et retourne un rapport
export const validateAllGames = (games: GameData[]): {
  isValid: boolean;
  errors: { gameId: number; title: string; invalidGenres: string[] }[];
  availableGenres: string[];
} => {
  const errors: { gameId: number; title: string; invalidGenres: string[] }[] = [];
  
  games.forEach(game => {
    const invalidGenres = validateGameGenres(game);
    if (invalidGenres.length > 0) {
      errors.push({
        gameId: game.id,
        title: game.title,
        invalidGenres
      });
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
    availableGenres: ALL_GENRES
  };
};

// Fonction utilitaire pour logger les erreurs de validation
export const logValidationErrors = (games: GameData[]): void => {
  if (process.env.NODE_ENV === 'development') {
    const validation = validateAllGames(games);
    
    if (!validation.isValid) {
      console.warn('⚠️ Genres invalides détectés dans les données des jeux:');
      validation.errors.forEach(error => {
        console.warn(`- ${error.title} (ID: ${error.gameId}): genres invalides [${error.invalidGenres.join(', ')}]`);
      });
      console.warn('Genres disponibles:', validation.availableGenres.join(', '));
    } else {
      console.log('✅ Tous les genres des jeux sont valides');
    }
  }
}; 