#!/usr/bin/env tsx

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createSlug } from '../src/lib/slug';
import { ALL_GENRES, isValidGenre } from '../src/lib/genres';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GAMES_PATH = path.join(__dirname, '..', 'src', 'data', 'games.json');
// Les captures et logos vivent sous src/assets (traités au build par
// astro:assets) ; seule la vidéo, servie telle quelle, reste sous public.
const ASSETS_PATH = path.join(__dirname, '..', 'src', 'assets');
const PUBLIC_PATH = path.join(__dirname, '..', 'public');

const REQUIRED_FIELDS = ['id', 'title', 'longDescription', 'genres', 'year', 'contentFolder', 'imageCount', 'hasVideo', 'customButton', 'credits', 'featured'];
let errors = 0;
let warnings = 0;

function error(msg: string) {
  console.error(`  ERROR: ${msg}`);
  errors++;
}

function warn(msg: string) {
  console.warn(`  WARN:  ${msg}`);
  warnings++;
}

let games: Record<string, unknown>[];
try {
  const raw = fs.readFileSync(GAMES_PATH, 'utf-8');
  games = JSON.parse(raw);
} catch (e) {
  console.error(`Failed to read/parse games.json: ${(e as Error).message}`);
  process.exit(1);
}

if (!Array.isArray(games)) {
  console.error('games.json must be an array');
  process.exit(1);
}

console.log(`Validating ${games.length} games...\n`);

const slugMap = new Map<string, string>();
const idSet = new Set<unknown>();

for (const game of games) {
  const title = game.title as string | undefined;
  const id = game.id;
  console.log(`[${id}] ${title}`);

  const slug = createSlug(title || '');
  if (slugMap.has(slug)) {
    error(`Slug collision: "${title}" and "${slugMap.get(slug)}" both produce slug "${slug}"`);
  }
  slugMap.set(slug, title || '');

  if (idSet.has(id)) {
    error(`Duplicate game ID: ${id}`);
  }
  idSet.add(id);

  for (const field of REQUIRED_FIELDS) {
    if (game[field] === undefined || game[field] === null) {
      error(`Missing required field: ${field}`);
    }
  }

  if (typeof game.year !== 'number') {
    error(`year must be a number, got ${typeof game.year}`);
  }

  if (typeof game.imageCount !== 'number' || game.imageCount < 1) {
    error(`imageCount must be a number >= 1, got ${game.imageCount}`);
  }

  if (typeof game.longDescription === 'string' && game.longDescription.trim() === '') {
    warn('longDescription is empty');
  }

  const genres = game.genres;
  if (!Array.isArray(genres) || genres.length === 0) {
    error('genres must be a non-empty array');
  } else {
    for (const genre of genres) {
      if (!isValidGenre(genre as string)) {
        error(`Invalid genre "${genre}". Valid: ${ALL_GENRES.join(', ')}`);
      }
    }
  }

  const btn = game.customButton as Record<string, unknown> | undefined;
  if (btn && btn.enabled) {
    if (!btn.link) error('customButton is enabled but link is empty');
    if (!btn.name) error('customButton is enabled but name is empty');
  }

  const credits = game.credits;
  if (Array.isArray(credits)) {
    for (let i = 0; i < credits.length; i++) {
      const credit = credits[i] as Record<string, unknown>;
      if (!credit.firstName && !credit.lastName) {
        warn(`credits[${i}] has no name`);
      }
      if (!Array.isArray(credit.roles)) {
        error(`credits[${i}].roles must be an array`);
      }
    }
  }

  const contentFolder = game.contentFolder as string | undefined;
  if (!contentFolder) continue;

  const assetDir = path.join(ASSETS_PATH, contentFolder);
  if (!fs.existsSync(assetDir)) {
    error(`Asset directory not found: ${contentFolder}`);
    continue;
  }

  const imageCount = game.imageCount;
  if (typeof imageCount === 'number') {
    for (let i = 1; i <= imageCount; i++) {
      const imgPath = path.join(assetDir, `${i}.webp`);
      if (!fs.existsSync(imgPath)) {
        error(`imageCount is ${imageCount} but ${contentFolder}/${i}.webp is missing`);
      }
    }
    const nextImg = path.join(assetDir, `${imageCount + 1}.webp`);
    if (fs.existsSync(nextImg)) {
      warn(`Found ${contentFolder}/${imageCount + 1}.webp but imageCount is ${imageCount}`);
    }
  }

  const logoPath = path.join(assetDir, 'logo.webp');
  if (!fs.existsSync(logoPath)) {
    error(`Logo missing: ${contentFolder}/logo.webp`);
  }

  if (game.hasVideo) {
    // La vidéo, elle, reste servie brute depuis public/.
    const videoPath = path.join(PUBLIC_PATH, contentFolder, 'video.webm');
    if (!fs.existsSync(videoPath)) {
      error(`hasVideo is true but ${contentFolder}/video.webm is missing`);
    }
  }
}

console.log('\n---');
console.log(`${games.length} games validated: ${errors} error(s), ${warnings} warning(s)`);

if (errors > 0) {
  process.exit(1);
}
