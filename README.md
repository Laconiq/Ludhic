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
- **Static Generation** : Génération statique de toutes les pages pour des performances optimales

## ♿ Accessibilité (WCAG 2.1 AA)

Le site respecte les standards d'accessibilité WCAG 2.1 AA :

- **Contraste** : Ratios de contraste suffisants (4.5:1 minimum)
- **Navigation clavier** : Navigation complète au clavier
- **Screen readers** : Noms accessibles pour tous les boutons et liens
- **Structure sémantique** : Balises HTML appropriées
- **Alternatives textuelles** : Alt text pour toutes les images
- **Focus visible** : Indicateurs de focus clairs
- **Lighthouse Score** : 90+ en accessibilité

## 🏗️ Architecture

- **Framework** : Next.js 15 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Polices** : Plus Jakarta Sans + Pixelify Sans (locales)
- **Images** : Optimisation automatique Next.js
- **Cache** : Service Worker personnalisé
- **Accessibilité** : WCAG 2.1 AA compliant

## 📁 Structure du Projet

```
src/
├── app/                     # Architecture App Router Next.js 15
│   ├── components/          # Tous les composants réutilisables
│   ├── games/
│   │   ├── [title]/        # Pages dynamiques pour chaque jeu
│   │   └── year/[year]/     # Pages dynamiques par année
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Page d'accueil
│   ├── not-found.tsx       # Page 404 personnalisée
│   ├── globals.css         # Styles globaux
│   └── sitemap.ts          # Génération automatique du sitemap
├── data/                   # Données JSON des jeux
└── utils/                  # Utilitaires et helpers

public/
├── games/                  # Assets des jeux (images, vidéos, logos)
├── images/                 # Images du site
├── fonts/                  # Polices locales
└── videos/                 # Vidéos d'arrière-plan générées
```

## 🧑‍💻 Pages Dynamiques & Génération Statique

- **Pages `/games/[title]`** : Générées statiquement pour chaque jeu avec `generateStaticParams`
- **Pages `/games/year/[year]`** : Générées statiquement pour chaque année
- **Slugs automatiques** : Génération à partir du titre avec gestion des accents
- **Métadonnées dynamiques** : SEO optimisé avec `generateMetadata`
- **Types TypeScript** : Params typés avec Promise (Next.js 15)

### Exemple de génération statique
```ts
export async function generateStaticParams() {
  return gamesData.map((game) => ({
    title: createSlug(game.title),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ title: string }> }) {
  // Métadonnées dynamiques pour le SEO
}
```

## 🎮 Ajout d'un Nouveau Jeu

1. **Ajouter les données** dans `src/data/games.json` :
   ```json
   {
     "id": 25,
     "title": "Mon Nouveau Jeu",
     "longDescription": "Description détaillée...",
     "genres": ["Action", "Aventure"],
     "year": 2024,
     "contentFolder": "/games/mon-nouveau-jeu",
     "imageCount": 4,
     "hasVideo": true,
     "customButton": {
       "enabled": true,
       "name": "Jouer maintenant",
       "link": "https://example.com"
     },
     "credits": [
       { "firstName": "Prénom", "lastName": "NOM", "roles": ["Developer"] }
     ]
   }
   ```

2. **Créer le dossier** `public/games/[slug-du-jeu]/` (slug généré automatiquement)

3. **Ajouter les assets** :
   - Images : `1.webp`, `2.webp`, etc. (selon `imageCount`)
   - Logo : `logo.webp`
   - Vidéo (optionnel) : `video.webm`

4. **Rebuild** : `pnpm build` pour générer les nouvelles pages statiques

## 🚩 Gestion des erreurs courantes

- **Erreur de build** : Vérifiez que tous les imports pointent vers `/app/components/`
- **Pages non générées** : Assurez-vous que `generateStaticParams` retourne les bonnes données
- **Images manquantes** : Vérifiez que `contentFolder` correspond au dossier dans `public/games/`
- **Problèmes de types** : Les params sont maintenant des `Promise<{ param: string }>` dans Next.js 15

## 🚀 Déploiement

Le projet est optimisé pour le déploiement sur Vercel :

```bash
# Build de production
pnpm build

# Déploiement automatique
vercel --prod
```

### Optimisations de déploiement
- **Génération statique** : Toutes les pages sont pré-générées
- **Edge Functions** : Service Worker pour le cache
- **CDN** : Images et assets optimisés
- **SEO** : Sitemap automatique et métadonnées dynamiques

## 📊 Performance & Métriques

- **Lighthouse Score** : 99 (Performance), 96 (Accessibilité), 96 (Bonnes pratiques), 100 (SEO)
- **First Contentful Paint** : 0,3 s
- **Largest Contentful Paint** : 0,6 s
- **Total Blocking Time** : 80 ms
- **Cumulative Layout Shift** : 0
- **Accessibility Score** : 96 (WCAG 2.1 AA)
- **SEO Score** : 100 (Métadonnées optimisées)

## 🔧 Technologies & Outils

- **Frontend** : Next.js 15, React 18, TypeScript
- **Styling** : Tailwind CSS, CSS Variables
- **Polices** : Plus Jakarta Sans, Pixelify Sans (locales)
- **Images** : Next.js Image, WebP/AVIF
- **Performance** : Service Worker, Lazy Loading
- **Accessibilité** : ARIA labels, Contrast ratios
- **SEO** : Dynamic metadata, Sitemap generation

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

- **Association Ludhic** : ludhic.association@gmail.com
- **Site Web** : https://ludhic.fr
- **Master HIC** : https://univ-cotedazur.fr/formation/offre-de-formation/majic-master-jeux-video-image-et-creativite

---

**Dernière mise à jour** : Migration vers Next.js 15 App Router, amélioration de l'accessibilité WCAG 2.1 AA, optimisation des performances et de la structure du projet.
