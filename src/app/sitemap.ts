import { MetadataRoute } from 'next'
import gamesData from '@/data/games.json'
import { createSlug } from '@/lib/slug'
import { SITE_URL } from '@/constants/site'
import { getAvailableYears } from '@/lib/filters'
import { getMainImageUrl, getLogoUrl } from '@/lib/images'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/games`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  const gamePages: MetadataRoute.Sitemap = gamesData.map(game => ({
    url: `${SITE_URL}/games/${createSlug(game.title)}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
    images: [
      `${SITE_URL}${getMainImageUrl(game.contentFolder)}`,
      `${SITE_URL}${getLogoUrl(game.contentFolder)}`,
    ],
  }))

  const yearPages: MetadataRoute.Sitemap = getAvailableYears(gamesData).map(year => ({
    url: `${SITE_URL}/games/year/${year}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...gamePages, ...yearPages]
}
