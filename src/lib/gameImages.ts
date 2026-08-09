import { getImage } from 'astro:assets';
import { getMainImageUrl, getLogoUrl } from '@/lib/images';
import { resolveGameImage } from '@/lib/assetImages';
import type { GameData } from '@/types/game';
import type { ResolvedImage } from '@/components/GameCardIsland';

export interface GameWithImages extends GameData {
  mainImage: ResolvedImage;
  logoImage: ResolvedImage;
}

/**
 * Précalcule au build les URL optimisées (main + logo) pour une liste de
 * jeux, afin de les passer en props aux îlots Preact (GameGrid, FilterBar)
 * qui ne peuvent pas appeler `astro:assets` eux-mêmes côté client.
 */
export async function withResolvedImages(games: GameData[]): Promise<GameWithImages[]> {
  return Promise.all(
    games.map(async (game) => {
      const [main, logo] = await Promise.all([
        getImage({ src: resolveGameImage(getMainImageUrl(game.contentFolder)), width: 640, format: 'webp' }),
        // Hauteur seule : la contrainte CSS dominante du badge (GameCardIsland)
        // est `h-8`/`max-h-full`. Forcer width+height distordrait les logos
        // dont le ratio source ne colle pas à 64:32.
        getImage({ src: resolveGameImage(getLogoUrl(game.contentFolder)), height: 32, format: 'webp' }),
      ]);
      return {
        ...game,
        mainImage: { src: main.src, width: main.attributes.width as number, height: main.attributes.height as number },
        logoImage: { src: logo.src, width: logo.attributes.width as number, height: 32 },
      };
    })
  );
}
