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

- **Framework** : Next.js 15 avec App Router
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Polices** : Geist (optimisées avec next/font)
- **Images** : Optimisation automatique Next.js
- **Cache** : Service Worker personnalisé

## 📁 Structure du Projet

```
src/
├── app/                 # Pages et composants Next.js
│   ├── components/      # Composants réutilisables
│   ├── [slug]/         # Pages dynamiques des jeux
│   └── games/[id]/     # Pages des jeux par ID
├── data/               # Données JSON des jeux
├── utils/              # Utilitaires et helpers
└── styles/             # Styles globaux

public/
├── games/              # Assets des jeux (images, vidéos)
├── images/             # Images du site
└── sw.js              # Service Worker
```

## 🎮 Ajout d'un Nouveau Jeu

1. Ajouter les données dans `src/data/games.json`
2. Créer le dossier `public/games/[nom-du-jeu]/`
3. Ajouter les images (1.webp, 2.webp, etc.) et le logo (logo.webp)
4. Optionnel : ajouter une vidéo (video.webm)

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

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

- **Association Ludhic** : ludhic.association@gmail.com
- **Site Web** : https://ludhic.fr
- **Master HIC** : https://univ-cotedazur.fr/formation/offre-de-formation/majic-master-jeux-video-image-et-creativite
