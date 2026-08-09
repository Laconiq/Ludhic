# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ludhic is a portfolio website for video game projects created by students of the Master Humanités et Industries Créatives (HIC). Built with Astro 7, Preact islands, TypeScript, and Tailwind CSS 4. Migrated from Next.js/React in August 2026 — the site is fully static, so Astro's zero-JS-by-default model cut the JS shipped per page from ~180 KB to ~15-20 KB.

## Commands

```bash
pnpm dev              # Start development server (localhost:4321)
pnpm build            # Production build (validates games.json, then astro build)
pnpm start            # Preview the production build locally
pnpm lint             # Run ESLint (eslint-plugin-astro + typescript-eslint)
pnpm type-check       # Run astro check
pnpm generate-videos  # Generate background videos from game videos (requires FFmpeg)
pnpm optimize-images  # Normalize oversized game images in src/assets/games/ (requires sharp, already a devDependency)
```

## Architecture

### Data Flow

- **Single source of truth**: `src/data/games.json` contains all game data (no database, no API)
- **Slugs are computed, not stored**: `createSlug(game.title)` in `src/lib/slug.ts` generates URL slugs at build time. Changing a title changes the URL.
- **Convention-based assets**: Image/video paths are derived from `contentFolder` field — not stored as URLs. Helpers in `src/lib/images.ts` build the convention path (e.g., `getMainImageUrl()`, `getAllImageUrls()`, `getLogoUrl()`); `src/lib/assetImages.ts` resolves those paths to build-time-processed `astro:assets` image modules via `import.meta.glob`.
- **Static generation**: Every route is prerendered at build time (`output: 'static'` in `astro.config.mjs`) — no runtime server, no runtime data fetching. `/bingodir` is a static stub (see below), not SSR.

### Client/Server Boundary (Islands)

Pages are `.astro` files (server-only, zero JS unless they mount an island) that compose:
- **Static `.astro` components** for anything with no client-side state: `GameCard.astro`, `GameHero.astro`, `GameCredits.astro`, `RelatedGames.astro`, `GamingButton.astro`, `GenreBadge.astro`, `SEOSchema.astro`, `JsonLd.astro`.
- **Preact islands** (`.tsx`, hydrated via `client:load`/`client:visible`) for genuinely interactive pieces: `Navigation`, `Hero`, `FilterBar`, `GameGrid`, `ImageCarousel`, `GameVideo`, `FAQ`, `Footer` (+ its `Modal`/`CGUModal`/`PrivacyModal` children).
- **Two `GameCard` implementations exist on purpose**: `GameCard.astro` (zero JS, used wherever the game list is fixed at build time — `RelatedGames`, the year page) and `GameCardIsland.tsx` (Preact, used inside `GameGrid` where the visible set changes client-side as the user filters). Same for `GamingButton.astro` vs `GamingButtonIsland.tsx` and `GenreBadge.astro` vs `GenreBadgeIsland.tsx` — the Astro version can't take an `onClick`, so anything living inside a Preact island needs the island variant.
- **Images inside islands are pre-resolved**: `astro:assets` (`getImage()`) only runs at build/server time, never in the browser. Pages that mount an image-bearing island (`GameGrid`, `ImageCarousel`, `Hero`, `Navigation`) resolve those images in the `.astro` frontmatter first (see `src/lib/gameImages.ts`) and pass plain `{ src, width, height }` props down — the island itself never imports from `astro:assets`.

### Deployment

Self-hosted on VPS via Dokploy. GitHub Actions auto-deploys on push to `main`: build the Docker image → push to GHCR → POST the Dokploy redeploy webhook (`.github/workflows/deploy.yml`). No SSH key, no secret on the server — only `DOKPLOY_REFRESH_TOKEN` on the repo.

**No runtime image cache**: unlike the old Next.js setup, there is no image-optimizer runtime or cache volume to keep warm — `astro:assets` bakes every image variant into the build output once, at build time. The Docker image is `nginx:alpine` serving `dist/` directly (`Dockerfile`, `nginx.conf`); `docker-compose.yml` has no volumes. `nginx.conf` reproduces the old `next.config.ts` header rules by hand: `Cache-Control: public, max-age=31536000, immutable` on `/_astro/*`, `/images/`, `/videos/`, `/fonts/`, and game asset files under `/games/<slug>/*.<ext>` — but **not** on the HTML pages under `/games/`, which must stay revalidatable.

### Route Structure

- `/` — Homepage with hero, game grid (featured year only by default), FAQ
- `/games` — Catalog page listing all games (no filters via URL params — client-side search/genre/year filtering only)
- `/games/[slug]` — Individual game pages with related games section
- `/games/year/[year]` — Games filtered by year
- `/bingodir` — Static "temporarily disabled" stub. The real-time multiplayer bingo feature (SSE + chat) was already disabled server-side before the migration (`BINGODIR_DISABLED` in the old Next app's `state.ts`, to cut server load) and was **not** ported — see "Dormant features" below.

### Key Modules

- **`src/lib/slug.ts`**: `createSlug()` — Unicode normalization, strips accents, kebab-case
- **`src/lib/genres.ts`**: `ALL_GENRES` const array + `isValidGenre()` type guard. Add new genres here before using in JSON.
- **`src/lib/images.ts`**: Convention-based image *path* builders (pure strings, framework-agnostic)
- **`src/lib/assetImages.ts`**: `resolveGameImage()` — maps a convention path (`/games/<slug>/1.webp`) to the matching `astro:assets` `ImageMetadata` module, via `import.meta.glob('/src/assets/games/**/*.{webp,png,jpg,jpeg}', { eager: true })`
- **`src/lib/gameImages.ts`**: `withResolvedImages()` — precomputes `{ mainImage, logoImage }` for a list of games, for pages that pass game data into a Preact island
- **`src/lib/schemas.ts`**: JSON-LD schema generators (`createBreadcrumbSchema()`, `createVideoGameSchema()`)
- **`src/lib/filters.ts`**: Game filtering logic (`filterGames()`, `getAvailableYears()`)
- **`scripts/validate-games.ts`**: Build-time validation of `games.json` (required fields, genres, slug collisions, asset existence) — runs before `astro build` and fails it on error. Checks images/logos under `src/assets/games/<slug>/`, video under `public/games/<slug>/` (see Asset Convention below).
- **`src/constants/site.ts`**: `SITE_URL`, `FEATURED_YEAR` — update `FEATURED_YEAR` annually to feature new cohort on homepage

### Key Patterns

- **Path alias**: Use `@/*` to import from `src/*` (configured in `tsconfig.json`)
- **Components location**: `src/components/` — flat, not organized by subfolder (unlike the old Next app's `game/`, `layout/`, `legal/`, `seo/`, `ui/` split). Islands and static components sit side by side; the filename convention (`XxxIsland.tsx` when both variants of a component exist) tells them apart.
- **`GamingButtonIsland`/`GenreBadgeIsland`**: polymorphic — render as `<button>` or `<a>` based on an `href` prop, same as their `.astro` counterparts, just with real event handlers.
- **CSS variables**: Gaming theme defined in `src/styles/global.css` (`--bg-primary`, `--bg-secondary`, `--bg-tertiary`, `--primary-blue`, `--text-primary`, `--border-primary`, `--shadow-glow`, `--shadow-dark`)
- **Fonts**: Plus Jakarta Sans (body) + PixelifySans (gaming headers, via `.font-gaming` class) — loaded via `@font-face` in `global.css` pointing at `public/fonts/*.woff2`, no Google Fonts, no `next/font` equivalent needed
- **Related games**: On each game page, 4 related games are computed server-side (scored by shared year + genres) and rendered via the static `RelatedGames.astro` → `GameCard.astro` (no JS)
- **Dynamic robots/sitemap**: `src/pages/robots.txt.ts` and `src/pages/sitemap.xml.ts` are Astro API routes (prerendered to static files at build, same as Next's route handlers were)

### Dormant / deliberately-not-ported features

- **`/bingodir`**: real-time bingo + chat over SSE. Already disabled server-side pre-migration; the 475-line Next component (grid generation, SSE client, localStorage pseudo) lives in git history on the pre-migration commits, not in this tree. Reactivating it needs an SSR adapter (`@astrojs/node`, `prerender = false` on those routes) since SSE requires a live server — Astro's static output can't serve it.
- **`error.tsx`-style error boundary**: Next's App Router had a client error boundary for route-segment runtime errors. A fully static site has no per-request render to fail at runtime — build errors fail the build instead. No equivalent needed.
- **`loading.tsx`/`SkeletonGrid`/`SkeletonCard`**: solved Next's streaming-SSR loading-state flash. Astro's static islands hydrate over already-rendered HTML, so there's no fetch-latency gap to skeleton over.

### Game Data Schema

Each game in `games.json` requires:
- `id`, `title`, `longDescription`, `genres[]`, `year`
- `contentFolder` — path convention, e.g. `/games/[slug]`; resolved to real assets under `public/games/[slug]/` (video) and `src/assets/games/[slug]/` (images, processed at build)
- `imageCount` — number of screenshots (named `1.webp`, `2.webp`, etc.)
- `hasVideo` — whether `video.webm` exists
- `customButton` — `{ enabled, name, link }` for external links
- `credits[]` — `{ firstName, lastName, roles[] }`
- `featured` — boolean (currently unused; homepage uses `FEATURED_YEAR` constant instead)

### Asset Convention

```
public/games/[slug]/
├── video.webm          # Optional game video — served as-is, not processed
src/assets/games/[slug]/
├── logo.webp           # Game logo — processed by astro:assets at build
├── 1.webp, 2.webp...   # Screenshots (count matches imageCount) — processed at build
```

Images and video are deliberately split across two directories, not just by convention but physically: `astro:assets`' `import.meta.glob` only processes files under `src/`, and Astro copies the entire `public/` directory verbatim into the build output. Putting images under `public/games/` (as the old Next.js convention did) would ship both the build-time-optimized `_astro/*` variant *and* the untouched multi-megabyte source next to it — that regression is exactly why this split exists. `optimize-images.ts` was updated accordingly to operate on `src/assets/games/`; `generate-videos.js` still reads `public/games/*/video.webm`, unchanged.

**Trap to avoid**: `getMainImageUrl()`/`getLogoUrl()`/`getAllImageUrls()` (in `src/lib/images.ts`) return the *convention path* (`/games/<slug>/1.webp`) — since images moved out of `public/`, that path is no longer a real file. It's only ever meant to be fed into `resolveGameImage()` + `astro:assets`' `getImage()`/`<Image>`, which return the actual built URL. Never embed the raw convention path directly into HTML, JSON-LD, or the sitemap — that exact mistake shipped once (sitemap `<image:loc>` and every game page's JSON-LD silently 404ing, since nothing renders those URLs as a visible `<img>` for QA to catch) and was fixed by routing `sitemap.xml.ts` and `createVideoGameSchema()` through resolved image URLs instead.
