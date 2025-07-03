# Ludhic - Portfolio Jeux Étudiants Master HIC

Portfolio interactif des projets de jeux vidéo créés par les étudiants du Master Humanités et Industries Créatives (HIC). Anciennement MAJIC.

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- pnpm (recommandé)

### Installation
```bash
# Installer pnpm si pas déjà installé
npm install -g pnpm

# Cloner le projet
git clone <repository-url>
cd ludhic

# Installer les dépendances
pnpm install
```

### Développement
```bash
# Démarrer le serveur de développement
pnpm dev

# Ouvrir http://localhost:3000 dans votre navigateur
```

### Production
```bash
# Build de production
pnpm build

# Démarrer le serveur de production
pnpm start
```

## 🛠️ Scripts Disponibles

```bash
pnpm dev          # Démarre le serveur de développement
pnpm build        # Build de production optimisé
pnpm start        # Démarre le serveur de production
pnpm lint         # Vérifie le code avec ESLint
pnpm type-check   # Vérifie les types TypeScript
pnpm generate-videos # Génère les vidéos d'arrière-plan (voir section dédiée)
```

## 🎬 Génération Automatique des Vidéos d'Arrière-plan

Le script `scripts/generate-videos.js` permet de générer automatiquement 3 vidéos d'arrière-plan à partir des vidéos individuelles des jeux.

### Prérequis
- **FFmpeg** installé sur votre système
- Vidéos des jeux dans `public/games/[slug-du-jeu]/video.webm`

#### Installation de FFmpeg
- **Windows** : `choco install ffmpeg` ou télécharger depuis https://ffmpeg.org/download.html
- **macOS** : `brew install ffmpeg`
- **Linux** : `sudo apt install ffmpeg` (Debian/Ubuntu)

### Génération des vidéos
```bash
pnpm generate-videos
```
Cela crée 3 vidéos d'arrière-plan dans `public/videos/` et un fichier de configuration `video-config.json`.

#### Structure générée
```
public/
└── videos/
    ├── background-1.webm    # Vidéo 1 (variation 1)
    ├── background-2.webm    # Vidéo 2 (variation 2)
    ├── background-3.webm    # Vidéo 3 (variation 3)
    └── video-config.json    # Configuration automatique
```

#### Fonctionnement
- Lecture de `src/data/games.json` pour trouver les jeux avec `hasVideo: true`
- Vérification de l'existence des fichiers `video.webm`
- Génération de 3 vidéos avec des variations (ordre, transitions, etc.)
- Compression VP9, résolution 1920x1080, transitions fluides

#### Personnalisation
Modifiez les paramètres dans `scripts/generate-videos.js` :
```js
const SEGMENT_DURATION = 5;        // Durée par jeu (secondes)
const TRANSITION_DURATION = 1;     // Durée de transition (secondes)
const TOTAL_VIDEOS = 3;            // Nombre de vidéos à générer
```

#### Dépannage
- **FFmpeg not found** : Vérifiez l'installation avec `ffmpeg -version`
- **Vidéos manquantes** : Vérifiez que chaque jeu a bien `video.webm` et `hasVideo: true` dans `games.json`
- **Erreur de génération** : Consultez les logs détaillés :
  ```bash
  pnpm generate-videos 2>&1 | tee generate.log
  ```

## ⚡ Optimisations de Performance

Ce projet inclut plusieurs optimisations de performance :

- **Images optimisées** : Support WebP/AVIF avec Next.js Image
- **Service Worker** : Cache intelligent des ressources statiques
- **Lazy Loading** : Chargement différé des images et composants
- **Bundle splitting** : Optimisation du code JavaScript
- **Cache headers** : Mise en cache agressive des assets statiques
- **Preloads** : Préchargement des ressources critiques

## 🏗️ Architecture

- **Framework** : Next.js 15 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Polices** : Geist (optimisées avec next/font)
- **Images** : Optimisation automatique Next.js
- **Cache** : Service Worker personnalisé

## 📁 Structure du Projet

```
src/
├── app/                     # Pages et composants Next.js
│   ├── games/[title]/       # Pages dynamiques pour chaque jeu (slug)
│   └── games/year/[year]/   # Pages dynamiques par année
├── components/              # Composants réutilisables
├── data/                    # Données JSON des jeux
├── pages/                   # Pages Next.js (redirection vers app/)
└── utils/                   # Utilitaires, helpers et constantes

public/
├── games/                   # Assets des jeux (images, vidéos)
├── images/                  # Images du site
└── sw.js                    # Service Worker
```

## 🧑‍💻 Pages Dynamiques & Slugs

- Les pages `/games/[title]` sont générées dynamiquement à partir du titre du jeu.
- Les slugs sont générés automatiquement à partir du titre, avec gestion des accents et caractères spéciaux (ex : "Anirya et le monde inversé" → `anirya-et-le-monde-inverse`).
- Les pages `/games/year/[year]` listent tous les jeux d'une année donnée.
- Les paramètres dynamiques (`params`) sont typés de façon **asynchrone** (Next.js 15) :
  ```ts
  export default async function Page({ params }: { params: Promise<{ title: string }> }) { ... }
  ```

## 🎮 Ajout d'un Nouveau Jeu

1. Ajouter les données dans `src/data/games.json` (voir exemples existants).
2. Créer le dossier `public/games/[slug-du-jeu]/` (le slug est généré automatiquement à partir du titre).
3. Ajouter les images (`1.webp`, `2.webp`, etc.) et le logo (`logo.webp`).
4. Optionnel : ajouter une vidéo (`video.webm`).

## 🚩 Gestion des erreurs courantes

- **Erreur 404 ou 500 sur une page jeu ou année** :
  - Vérifiez que le slug généré correspond bien au dossier et aux données.
  - Si vous accédez à `/games/year/XXXX` pour une année sans jeux, un message personnalisé s'affiche.
- **Erreur `Cannot find module './xx.js'`** :
  - Supprimez le dossier `.next` puis relancez la build :
    ```bash
    rm -rf .next
    pnpm build
    ```
- **Problèmes de slugs accentués** :
  - La fonction de slug retire désormais les accents pour garantir la cohérence entre les titres et les URLs.

## 🚀 Déploiement

Le projet est optimisé pour le déploiement sur Vercel :

```bash
# Déploiement automatique avec Vercel
pnpm build
vercel --prod
```

## 📊 Performance

- **Lighthouse Score** : 90+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

- **Association Ludhic** : ludhic.association@gmail.com
- **Site Web** : https://ludhic.fr
- **Master HIC** : https://univ-cotedazur.fr/formation/offre-de-formation/majic-master-jeux-video-image-et-creativite
