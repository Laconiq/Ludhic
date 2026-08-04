export function getMainImageUrl(imageFolder: string): string {
  return `${imageFolder}/1.webp`;
}

export function getAllImageUrls(imageFolder: string, imageCount: number): string[] {
  return Array.from({ length: imageCount }, (_, index) =>
    `${imageFolder}/${index + 1}.webp`
  );
}

export function getLogoUrl(imageFolder: string): string {
  return `${imageFolder}/logo.webp`;
}

/**
 * URL passant par l'optimiseur de Next, pour les cas où `next/image` n'est pas
 * utilisable — l'attribut `poster` d'une balise `<video>`, par exemple, qui
 * servirait sinon la source en pleine résolution.
 *
 * `width` doit figurer dans `images.deviceSizes` ou `images.imageSizes`, et
 * `quality` dans `images.qualities` (cf. next.config.ts), sinon l'optimiseur
 * répond 400.
 */
export function getOptimizedImageUrl(
  src: string,
  width: number,
  quality = 75
): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}
