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
