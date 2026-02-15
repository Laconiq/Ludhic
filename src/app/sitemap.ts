import { MetadataRoute } from 'next'
import gamesData from '@/data/games.json'
import { createSlug } from '@/lib/slug'
import { SITE_URL } from '@/constants/site'
import { getAvailableYears } from '@/lib/filters'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  // Pages statiques principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  // Pages individuelles des jeux (SEO optimisé)
  const gamePages: MetadataRoute.Sitemap = gamesData.map(game => ({
    url: `${SITE_URL}/games/${createSlug(game.title)}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
    alternates: {
      languages: {
        'fr-FR': `${SITE_URL}/games/${createSlug(game.title)}`,
      },
    },
  }))

  // Pages par année (pour le SEO)
  const yearPages: MetadataRoute.Sitemap = []
  const years = getAvailableYears(gamesData)
  years.forEach(year => {
    yearPages.push({
      url: `${SITE_URL}/games/year/${year}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          'fr-FR': `${SITE_URL}/games/year/${year}`,
        },
      },
    })
  })

  return [...staticPages, ...gamePages, ...yearPages]
}
