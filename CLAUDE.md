# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ludhic is a portfolio website for video game projects created by students of the Master Humanités et Industries Créatives (HIC). Built with Next.js 15 App Router, TypeScript, and Tailwind CSS 4.

## Commands

```bash
pnpm dev              # Start development server (localhost:3000)
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm type-check       # Run TypeScript type checking
pnpm generate-videos  # Generate background videos from game videos (requires FFmpeg)
```

## Architecture

### Data Flow
- Game data lives in `src/data/games.json` - single source of truth for all game information
- Games have slugs auto-generated from titles via `createSlug()` function in page files
- Static generation via `generateStaticParams()` for all game and year pages

### Key Patterns
- **Next.js 15 params**: Route params are `Promise<{ param: string }>` - must be awaited
- **Path alias**: Use `@/*` to import from `src/*` (configured in tsconfig.json)
- **Components location**: All components in `src/app/components/` (not a separate components folder)

### Route Structure
- `/` - Homepage with hero, game grid, FAQ
- `/games/[title]` - Individual game pages (slug-based)
- `/games/year/[year]` - Games filtered by year

### Game Data Schema
Each game in `games.json` requires:
- `id`, `title`, `longDescription`, `genres[]`, `year`
- `contentFolder` - path to assets in `public/games/[slug]/`
- `imageCount` - number of screenshots (1.webp, 2.webp, etc.)
- `hasVideo` - whether video.webm exists
- `customButton` - { enabled, name, link } for external links
- `credits[]` - { firstName, lastName, roles[] }
- `featured` - boolean for homepage featuring

### Genre System
Valid genres are defined in `src/constants/gameGenres.ts` and `src/utils/gameGenres.ts`. Use `isValidGenre()` to validate. Available: Action, Aventure, Narratif, Plateforme, Puzzle, Tactique, Rythme, Point & Click, Deckbuilding, Rogue Like, Metroidvania, Horreur, VR, 2D, 3D, Isométrique.

### Asset Structure
```
public/games/[slug]/
├── logo.webp          # Game logo
├── 1.webp, 2.webp...  # Screenshots (count matches imageCount)
└── video.webm         # Optional game video
```

## Tech Stack Notes
- Next.js 15.3.3 with App Router
- React 19
- Tailwind CSS 4 via PostCSS
- pnpm as package manager
- Static site generation (all pages pre-rendered)
