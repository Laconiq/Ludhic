import type { ImageMetadata } from 'astro';

// Les visuels de jeu vivent sous `src/assets/games/<slug>/...` pour qu'Astro
// les traite au build (redimensionnement, conversion de format, hash de
// nom de fichier). `games.json` référence toujours ces mêmes fichiers par
// leur chemin `/games/<slug>/...` (convention héritée de `public/`) : cette
// table fait la correspondance entre les deux.
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/games/**/*.{webp,png,jpg,jpeg}',
  { eager: true }
);

const byPublicPath = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(modules)) {
  const publicPath = path.replace('/src/assets', '');
  byPublicPath.set(publicPath, mod.default);
}

export function resolveGameImage(publicPath: string): ImageMetadata {
  const image = byPublicPath.get(publicPath);
  if (!image) {
    throw new Error(`Image introuvable dans src/assets/games : ${publicPath}`);
  }
  return image;
}
