/**
 * Génère l'URL de l'image principale (1.webp) pour un jeu
 */
export function getMainImageUrl(imageFolder: string): string {
  return `${imageFolder}/1.webp`;
}

/**
 * Génère un tableau d'URLs pour toutes les images d'un jeu
 */
export function getAllImageUrls(imageFolder: string, imageCount: number): string[] {
  return Array.from({ length: imageCount }, (_, index) => 
    `${imageFolder}/${index + 1}.webp`
  );
}

/**
 * Génère l'URL d'une image spécifique
 */
export function getImageUrl(imageFolder: string, imageNumber: number): string {
  return `${imageFolder}/${imageNumber}.webp`;
}

/**
 * Génère l'URL du logo d'un jeu (toujours logo.webp)
 */
export function getLogoUrl(imageFolder: string): string {
  return `${imageFolder}/logo.webp`;
} 