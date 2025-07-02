import { MetadataRoute } from 'next'
import gamesData from '../data/games.json'

// Fonction pour créer un slug à partir du titre
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Supprimer les caractères spéciaux
    .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
    .replace(/-+/g, '-') // Supprimer les tirets multiples
    .trim();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ludhic.fr'
  
  // Pages statiques principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/bingodir`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Pages individuelles des jeux (SEO optimisé)
  const gamePages: MetadataRoute.Sitemap = gamesData.map(game => ({
    url: `${baseUrl}/games/${createSlug(game.title)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9, // Priorité élevée pour les pages de jeux
  }))

  // Pages par année (pour le SEO)
  const yearPages: MetadataRoute.Sitemap = []
  const years = [...new Set(gamesData.map(game => game.year))]
  years.forEach(year => {
    yearPages.push({
      url: `${baseUrl}/games/year/${year}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })
  })

  return [...staticPages, ...gamePages, ...yearPages]
} 