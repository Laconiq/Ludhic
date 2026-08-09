# Ludhic - Portfolio Jeux Étudiants Master HIC

Portfolio interactif des projets de jeux vidéo créés par les étudiants du Master Humanités et Industries Créatives (HIC). Anciennement MAJIC.

## Démarrage Rapide

### Prérequis
- Node.js 22+
- pnpm

### Installation
```bash
pnpm install
```

### Développement
```bash
pnpm dev
# http://localhost:4321
```

### Production
```bash
pnpm build
pnpm start
```

## Scripts

```bash
pnpm dev              # Serveur de développement
pnpm build            # Valide games.json puis build de production (génération statique)
pnpm start            # Prévisualise le build de production en local
pnpm lint             # ESLint
pnpm type-check       # Vérification TypeScript (astro check)
pnpm generate-videos  # Génère les vidéos d'arrière-plan (nécessite FFmpeg)
pnpm optimize-images  # Normalise les images surdimensionnées dans public/games/
```

## Architecture

- **Framework** : Astro 7 (sortie 100% statique), îlots Preact pour l'interactivité, TypeScript
- **Styling** : Tailwind CSS 4
- **Polices** : Plus Jakarta Sans + Pixelify Sans (locales, via `@font-face`)
- **Données** : `src/data/games.json` (source unique, pas de base de données)
- **Génération** : Toutes les pages sont pré-rendues au build — aucun serveur au runtime (`/bingodir` est un stub statique, la fonctionnalité temps réel a été désactivée avant la migration)

### Structure

```
src/
├── components/          # Composants .astro (statiques) et .tsx (îlots Preact) à plat
│   ├── GameCard.astro / GameCardIsland.tsx     # statique (RelatedGames, year) vs. dynamique (GameGrid filtré)
│   ├── GamingButton.astro / GamingButtonIsland.tsx
│   ├── GenreBadge.astro / GenreBadgeIsland.tsx
│   ├── Navigation.tsx, Hero.tsx, FAQ.tsx, Footer.tsx, Modal.tsx, CGUModal.tsx, PrivacyModal.tsx
│   ├── FilterBar.tsx, GameGrid.tsx, ImageCarousel.tsx, GameVideo.tsx
│   ├── GameHero.astro, GameCredits.astro, RelatedGames.astro
│   └── SEOSchema.astro, JsonLd.astro
├── layouts/
│   └── BaseLayout.astro # <head> : title, meta, OG, Twitter, favicons, JSON-LD host
├── pages/
│   ├── index.astro          # /
│   ├── games/index.astro    # /games — Catalogue complet
│   ├── games/[slug].astro   # /games/[slug] — Page individuelle
│   ├── games/year/[year].astro
│   ├── bingodir/index.astro # stub désactivé
│   ├── sitemap.xml.ts       # /sitemap.xml (endpoint statique, avec images)
│   ├── robots.txt.ts        # /robots.txt (endpoint statique)
│   └── 404.astro
├── styles/global.css    # Styles globaux + thème gaming + @font-face
├── constants/           # SITE_URL, FEATURED_YEAR
├── data/                # games.json, bingoData.json
├── lib/                 # slug, images (chemins), assetImages (résolution astro:assets),
│                         # gameImages (pré-résolution pour les îlots), schemas, filters, genres
├── types/                # GameData, Credit, JsonLdSchema
└── assets/
    ├── games/            # symlink -> ../../public/games (voir plus bas)
    └── images/logo.png   # symlink -> ../../../public/images/logo.png

public/
├── games/                # Assets des jeux (vraie source : images + vidéos + logos)
├── images/               # Images du site (favicons, logo)
├── fonts/                # Polices locales
└── videos/               # Vidéos d'arrière-plan générées
```

`src/assets/games` est un lien symbolique vers `public/games` : il n'existe qu'une seule copie de chaque image sur le disque. Le lien sert uniquement à ce qu'`astro:assets` (qui ne traite que les fichiers sous `src/`) puisse les optimiser au build. `public/games` reste la source que lisent `optimize-images.ts`, `generate-videos.js` et `validate-games.ts` (pour la vidéo) — ajouter un jeu ne demande donc aucune adaptation à ces scripts.

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

3. Rebuild : `pnpm build` (valide `games.json` puis génère le site)

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
- Sitemap avec images pour chaque jeu (`src/pages/sitemap.xml.ts`)
- `src/pages/robots.txt.ts`
- `<h1>` textuel sur toutes les pages
- Maillage interne via la section "Jeux similaires"

## Déploiement

Auto-hébergé sur un VPS via Dokploy. GitHub Actions build l'image Docker (nginx servant la sortie statique d'Astro) → push sur GHCR → webhook de redéploiement Dokploy à chaque push sur `main`. Voir `CLAUDE.md` pour le détail de l'infra (headers, pas de cache runtime).

## Contact

- **Association Ludhic** : ludhic.association@gmail.com
- **Site** : https://ludhic.fr
- **Master HIC** : https://univ-cotedazur.fr/formation/offre-de-formation/majic-master-jeux-video-image-et-creativite
