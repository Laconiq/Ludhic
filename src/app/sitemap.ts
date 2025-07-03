import { MetadataRoute } from 'next'
import gamesData from '../data/games.json'

// Fonction pour créer un slug à partir du titre
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ludhic.fr'
  const currentDate = new Date()
  
  // Pages statiques principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  // Pages individuelles des jeux (SEO optimisé)
  const gamePages: MetadataRoute.Sitemap = gamesData.map(game => ({
    url: `${baseUrl}/games/${createSlug(game.title)}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
    alternates: {
      languages: {
        'fr-FR': `${baseUrl}/games/${createSlug(game.title)}`,
      },
    },
  }))

  // Pages par année (pour le SEO)
  const yearPages: MetadataRoute.Sitemap = []
  const years = [...new Set(gamesData.map(game => game.year))].sort((a, b) => b - a) // Tri décroissant
  years.forEach(year => {
    yearPages.push({
      url: `${baseUrl}/games/year/${year}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          'fr-FR': `${baseUrl}/games/year/${year}`,
        },
      },
    })
  })

  // Pages de catégories par genre (SEO additionnel)
  const genrePages: MetadataRoute.Sitemap = []
  const allGenres = [...new Set(gamesData.flatMap(game => game.genres))]
  allGenres.forEach(genre => {
    genrePages.push({
      url: `${baseUrl}/games/genre/${genre.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: {
        languages: {
          'fr-FR': `${baseUrl}/games/genre/${genre.toLowerCase().replace(/\s+/g, '-')}`,
        },
      },
    })
  })

  return [...staticPages, ...gamePages, ...yearPages, ...genrePages]
} 