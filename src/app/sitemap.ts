import { MetadataRoute } from 'next'
import gamesData from '../data/games.json'

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

  return [...staticPages, ...yearPages]
} 