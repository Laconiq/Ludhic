import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

export interface OgImage {
  /** Chemin absolu depuis la racine du site (`/_astro/...`) ou URL complète. */
  src: string;
  width: number;
  height: number;
  alt: string;
}

// Aperçu pour les partages (LinkedIn, Discord, Facebook, X) : 1200x630, le
// ratio 1.91:1 que tous affichent en grand sans recadrer, et en JPEG, que
// tous acceptent — le webp n'est pas pris en charge partout.
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

export async function createOgImage(src: ImageMetadata, alt: string): Promise<OgImage> {
  const image = await getImage({ src, width: OG_WIDTH, height: OG_HEIGHT, fit: 'cover', format: 'jpg', quality: 80 });
  // Le service d'images n'agrandit jamais : une source plus petite que
  // 1200x630 ressort à sa taille d'origine, alors que `image.attributes`
  // annonce quand même 1200x630. On publie la taille réellement produite.
  const fits = src.width >= OG_WIDTH && src.height >= OG_HEIGHT;
  return {
    src: image.src,
    width: fits ? OG_WIDTH : src.width,
    height: fits ? OG_HEIGHT : src.height,
    alt,
  };
}
