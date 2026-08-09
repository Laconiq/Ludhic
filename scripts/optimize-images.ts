#!/usr/bin/env tsx
/**
 * Normalise les images sources de `public/games/`.
 *
 * Deux problèmes distincts :
 *
 * - Les logos montaient jusqu'à 6726x4290 alors qu'ils sont affichés au plus
 *   dans ~900 px (bandeau de la page jeu) et souvent dans 64 px (vignette de
 *   carte). Chaque variante non encore en cache obligeait l'optimiseur à
 *   décoder 28,9 mégapixels pour produire une image de 64 px.
 *
 * - Quelques captures dépassaient 700 Ko. L'optimiseur les allège pour le
 *   `srcset`, mais `GameVideo` sert `1.webp` telle quelle en `poster` : la
 *   source brute partait donc sur le réseau.
 *
 * À lancer manuellement après l'ajout d'un jeu : `pnpm optimize-images`.
 * Le script est idempotent, il ignore ce qui est déjà sous les limites.
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const GAMES_DIR = 'public/games';

// Au-delà, on ne fait que payer du décodage : aucune variante servie ne dépasse
// 1080 px (cf. `images.deviceSizes` dans next.config.ts).
const MAX_LOGO_DIMENSION = 1024;

// Les captures restent en 1920 (elles alimentent le carrousel), on ne ré-encode
// que celles dont le poids trahit une compression trop timide.
const SCREENSHOT_SIZE_THRESHOLD = 250 * 1024;
const SCREENSHOT_QUALITY = 80;

type Result = { before: number; after: number };

function readIfExists(path: string): Buffer | null {
  // On lit le fichier en mémoire plutôt que de laisser sharp ouvrir le chemin :
  // sous Windows, le handle de lecture resterait ouvert et empêcherait de
  // réécrire au même endroit.
  try {
    return readFileSync(path);
  } catch {
    return null;
  }
}

async function optimizeLogo(gameFolder: string): Promise<Result | null> {
  const logoPath = join(GAMES_DIR, gameFolder, 'logo.webp');
  const source = readIfExists(logoPath);
  if (!source) return null;

  const { width = 0, height = 0 } = await sharp(source).metadata();
  if (width <= MAX_LOGO_DIMENSION && height <= MAX_LOGO_DIMENSION) return null;

  const optimized = await sharp(source)
    .resize({
      width: MAX_LOGO_DIMENSION,
      height: MAX_LOGO_DIMENSION,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 82 })
    .toBuffer();

  writeFileSync(logoPath, optimized);
  const meta = await sharp(optimized).metadata();

  console.log(
    `  ${`${gameFolder}/logo.webp`.padEnd(32)} ${`${width}x${height}`.padEnd(11)} -> ` +
      `${`${meta.width}x${meta.height}`.padEnd(11)} ` +
      `${Math.round(source.length / 1024)} Ko -> ${Math.round(optimized.length / 1024)} Ko`
  );

  return { before: source.length, after: optimized.length };
}

async function optimizeScreenshot(
  gameFolder: string,
  file: string
): Promise<Result | null> {
  const shotPath = join(GAMES_DIR, gameFolder, file);
  const source = readIfExists(shotPath);
  if (!source || source.length <= SCREENSHOT_SIZE_THRESHOLD) return null;

  const optimized = await sharp(source)
    .webp({ quality: SCREENSHOT_QUALITY })
    .toBuffer();

  // Un ré-encodage peut grossir si la source était déjà bien compressée.
  if (optimized.length >= source.length) return null;

  writeFileSync(shotPath, optimized);

  console.log(
    `  ${`${gameFolder}/${file}`.padEnd(32)} ${''.padEnd(26)} ` +
      `${Math.round(source.length / 1024)} Ko -> ${Math.round(optimized.length / 1024)} Ko`
  );

  return { before: source.length, after: optimized.length };
}

async function main(): Promise<void> {
  console.log(
    `Sources de ${GAMES_DIR} — logos plafonnés à ${MAX_LOGO_DIMENSION} px, ` +
      `captures ré-encodées au-delà de ${Math.round(SCREENSHOT_SIZE_THRESHOLD / 1024)} Ko\n`
  );

  const folders = readdirSync(GAMES_DIR).filter((entry) =>
    statSync(join(GAMES_DIR, entry)).isDirectory()
  );

  const results: Result[] = [];

  for (const folder of folders) {
    const logo = await optimizeLogo(folder);
    if (logo) results.push(logo);

    const screenshots = readdirSync(join(GAMES_DIR, folder))
      .filter((file) => /^\d+\.webp$/.test(file))
      .sort();

    for (const file of screenshots) {
      const shot = await optimizeScreenshot(folder, file);
      if (shot) results.push(shot);
    }
  }

  if (results.length === 0) {
    console.log('  Rien à faire, tout est déjà sous les limites.');
    return;
  }

  const before = results.reduce((sum, r) => sum + r.before, 0);
  const after = results.reduce((sum, r) => sum + r.after, 0);
  console.log(
    `\n${results.length} fichier(s) réécrit(s) : ` +
      `${(before / 1048576).toFixed(1)} Mo -> ${(after / 1048576).toFixed(1)} Mo ` +
      `(-${Math.round((1 - after / before) * 100)} %)`
  );
}

main().catch((error: unknown) => {
  console.error('Échec :', error);
  process.exit(1);
});
