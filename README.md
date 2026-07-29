# Ludhic - Portfolio Jeux Étudiants Master HIC

Portfolio interactif des projets de jeux vidéo créés par les étudiants du Master Humanités et Industries Créatives (HIC). Anciennement MAJIC.

## Démarrage Rapide

### Prérequis
- Node.js 18+
- pnpm

### Installation
```bash
pnpm install
```

### Développement
```bash
pnpm dev
# http://localhost:3000
```

### Production
```bash
pnpm build
pnpm start
```

## Scripts

```bash
pnpm dev              # Serveur de développement
pnpm build            # Build de production (génération statique)
pnpm start            # Serveur de production
pnpm lint             # ESLint
pnpm type-check       # Vérification TypeScript (tsc --noEmit)
pnpm generate-videos  # Génère les vidéos d'arrière-plan (nécessite FFmpeg)
```

## Architecture

- **Framework** : Next.js 15 (App Router), React 19, TypeScript
- **Styling** : Tailwind CSS 4
- **Polices** : Plus Jakarta Sans + Pixelify Sans (locales)
- **Données** : `src/data/games.json` (source unique, pas de base de données)
- **Génération** : Pages pré-rendues statiquement (sauf `/bingodir` — temps réel via SSE)

### Structure

```
src/
├── app/
│   ├── components/
│   │   ├── game/           # GameCard, GameGrid, GameHero, GameCredits, GamePageContent,
│   │   │                   # GamesPageContent, ImageCarousel, GameVideo, FilterBar, RelatedGames
│   │   ├── layout/         # Navigation, Hero, FAQ, Footer
│   │   ├── legal/          # Modal, CGUModal, PrivacyModal
│   │   ├── seo/            # SEOSchema (JSON-LD homepage)
│   │   └── ui/             # GamingButton, GenreBadge
│   ├── games/
│   │   ├── page.tsx        # /games — Catalogue complet
│   │   ├── [title]/        # /games/[slug] — Page individuelle
│   │   └── year/[year]/    # /games/year/[year] — Filtre par année
│   ├── layout.tsx          # Layout racine
│   ├── page.tsx            # Page d'accueil
│   ├── robots.ts           # /robots.txt (dynamique)
│   ├── sitemap.ts          # /sitemap.xml (dynamique, avec images)
│   └── globals.css         # Styles globaux + thème gaming
├── constants/              # SITE_URL, FEATURED_YEAR
├── data/                   # games.json
├── lib/                    # slug, images, schemas, filters, genres, validation, scroll
└── types/                  # GameData, Credit, JsonLdSchema

public/
├── games/                  # Assets des jeux (images, vidéos, logos)
├── images/                 # Images du site
├── fonts/                  # Polices locales
└── videos/                 # Vidéos d'arrière-plan générées
```

## Ajout d'un Nouveau Jeu

1. Ajouter l'entrée dans `src/data/games.json` :
   ```json
   {
     "id": 25,
     "title": "Mon Nouveau Jeu",
     "longDescription": "Description détaillée...",
     "genres": ["Action", "Aventure"],
     "year": 2025,
     "contentFolder": "/games/mon-nouveau-jeu",
     "imageCount": 4,
     "hasVideo": true,
     "customButton": {
       "enabled": true,
       "name": "Jouer",
       "link": "https://example.com"
     },
     "credits": [
       { "firstName": "Prénom", "lastName": "NOM", "roles": ["Developer"] }
     ],
     "featured": false
   }
   ```

2. Créer le dossier `public/games/mon-nouveau-jeu/` avec :
   - `logo.webp` — Logo du jeu
   - `1.webp`, `2.webp`, ... — Screenshots (nombre = `imageCount`)
   - `video.webm` — Vidéo optionnelle (si `hasVideo: true`)

3. Rebuild : `pnpm build`

## Génération des Vidéos d'Arrière-plan

Le script `scripts/generate-videos.js` génère 3 vidéos d'arrière-plan à partir des vidéos des jeux.

```bash
# Nécessite FFmpeg installé
pnpm generate-videos
```

Paramètres modifiables dans le script :
```js
const SEGMENT_DURATION = 5;       // Durée par jeu (secondes)
const TRANSITION_DURATION = 1;    // Durée de transition (secondes)
const TOTAL_VIDEOS = 3;           // Nombre de vidéos à générer
```

## SEO

- Metadata dynamiques sur toutes les pages (title, description, OG, Twitter, canonical)
- JSON-LD : VideoGame, BreadcrumbList, ItemList, FAQPage, EducationalOrganization
- Sitemap avec images pour chaque jeu
- robots.ts dynamique
- `<h1>` textuel sur toutes les pages
- Maillage interne via la section "Jeux similaires"

## Déploiement

Hébergé sur [Railway](https://railway.com/) (serveur Node.js persistant, nécessaire pour le SSE temps réel du Bingodir).

```bash
pnpm build
pnpm start
```

Railway détecte automatiquement Next.js et lance `pnpm install` → `pnpm build` → `pnpm start` à chaque push.

## Contact

- **Association Ludhic** : ludhic.association@gmail.com
- **Site** : https://ludhic.fr
- **Master HIC** : https://univ-cotedazur.fr/formation/offre-de-formation/majic-master-jeux-video-image-et-creativite
