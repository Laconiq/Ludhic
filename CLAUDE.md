# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ludhic is a portfolio website for video game projects created by students of the Master Humanités et Industries Créatives (HIC). Built with Next.js 15 App Router, React 19, TypeScript, and Tailwind CSS 4.

## Commands

```bash
pnpm dev              # Start development server (localhost:3000)
pnpm build            # Production build (static generation)
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm type-check       # Run TypeScript type checking (tsc --noEmit)
pnpm generate-videos  # Generate background videos from game videos (requires FFmpeg)
```

## Architecture

### Data Flow

- **Single source of truth**: `src/data/games.json` contains all game data (no database, no API)
- **Slugs are computed, not stored**: `createSlug(game.title)` in `src/lib/slug.ts` generates URL slugs at build time. Changing a title changes the URL.
- **Convention-based assets**: Image/video paths are derived from `contentFolder` field — not stored as URLs. Helpers in `src/lib/images.ts` build paths (e.g., `getMainImageUrl()`, `getAllImageUrls()`, `getLogoUrl()`).
- **Static generation**: All pages pre-rendered via `generateStaticParams()` — no runtime data fetching (except `/bingodir` which uses SSE for real-time multiplayer).

### Client/Server Boundary

Pages are **server components** (for metadata + SEO + JSON-LD), which pass data to **client components** (`'use client'`) for interactivity. Pattern: server wrapper finds game data, calls `notFound()` if missing, then renders client content component.

### Deployment

Self-hosted on VPS via Dokploy. GitHub Actions auto-deploys on push to `main`: build the Docker image → push to GHCR → POST the Dokploy redeploy webhook (`.github/workflows/deploy.yml`). No SSH key, no secret on the server — only `DOKPLOY_REFRESH_TOKEN` on the repo. Next.js runs in standalone mode behind Docker.

### Route Structure

- `/` — Homepage with hero, game grid (featured year only by default), FAQ
- `/games` — Catalog page listing all games with filters
- `/games/[title]` — Individual game pages (slug-based) with related games section
- `/games/year/[year]` — Games filtered by year
- `/bingodir` — Real-time multiplayer bingo game (hidden page, SSE + in-memory state)

### Key Modules

- **`src/lib/slug.ts`**: `createSlug()` — Unicode normalization, strips accents, kebab-case
- **`src/lib/genres.ts`**: `ALL_GENRES` const array + `isValidGenre()` type guard. Add new genres here before using in JSON.
- **`src/lib/images.ts`**: Convention-based image URL builders
- **`src/lib/schemas.ts`**: JSON-LD schema generators (`createBreadcrumbSchema()`, `createVideoGameSchema()`)
- **`src/lib/scroll.ts`**: `scrollToSection()` — handles same-page and cross-page smooth scrolling
- **`src/lib/filters.ts`**: Game filtering logic (`filterGames()`, `getAvailableYears()`)
- **`scripts/validate-games.ts`**: Build-time validation of `games.json` (required fields, genres, slug collisions, asset existence) — runs before `next build` and fails it on error
- **`src/constants/site.ts`**: `SITE_URL`, `FEATURED_YEAR` — update `FEATURED_YEAR` annually to feature new cohort on homepage
- **`src/app/api/bingodir/state.ts`**: In-memory shared state (players, chat messages, SSE clients) via `globalThis` — persists across requests on Railway, NOT on serverless
- **`src/app/api/bingodir/`**: SSE events (`events/`), chat (`chat/`), player management (`players/`) — all `force-dynamic`

### Key Patterns

- **Next.js 15 params**: Route params are `Promise<{ param: string }>` — must be awaited
- **Path alias**: Use `@/*` to import from `src/*` (configured in tsconfig.json)
- **Components location**: `src/app/components/` organized by purpose: `game/`, `layout/`, `legal/`, `seo/`, `ui/`
- **GamingButton**: Polymorphic component — renders as `<button>` or `<Link>` based on `href` prop, enforced by union types
- **CSS variables**: Gaming theme defined in `globals.css` (`--bg-primary`, `--bg-secondary`, `--bg-tertiary`, `--primary-blue`, `--text-primary`, `--border-primary`, `--shadow-glow`, `--shadow-dark`)
- **Fonts**: Plus Jakarta Sans (body) + PixelifySans (gaming headers, via `.font-gaming` class) — loaded locally, no Google Fonts
- **Related games**: On each game page, 4 related games are computed server-side (scored by shared year + genres) and rendered via `RelatedGames` component
- **Performance**: React Compiler (enabled in `next.config.ts` via `reactCompiler: true`) auto-memoizes components and values — don't add `memo()`, `useCallback`, or `useMemo` manually unless profiling shows a real problem. Legal modals lazy-loaded via `next/dynamic` in `Footer`.
- **Dynamic robots/sitemap**: `src/app/robots.ts` and `src/app/sitemap.ts` generate `/robots.txt` and `/sitemap.xml` at build time using `SITE_URL`

### Game Data Schema

Each game in `games.json` requires:
- `id`, `title`, `longDescription`, `genres[]`, `year`
- `contentFolder` — path to assets in `public/games/[slug]/`
- `imageCount` — number of screenshots (named `1.webp`, `2.webp`, etc.)
- `hasVideo` — whether `video.webm` exists
- `customButton` — `{ enabled, name, link }` for external links
- `credits[]` — `{ firstName, lastName, roles[] }`
- `featured` — boolean (currently unused; homepage uses `FEATURED_YEAR` constant instead)

### Asset Convention

```
public/games/[slug]/
├── logo.webp          # Game logo
├── 1.webp, 2.webp...  # Screenshots (count matches imageCount)
└── video.webm         # Optional game video
```
