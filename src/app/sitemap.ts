import type { MetadataRoute } from 'next'
import { terapias } from '@/content/terapias'
import { site } from '@/content/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date()

  const fixas: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: agora, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/terapias`, lastModified: agora, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/sobre`, lastModified: agora, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${site.url}/glossario`, lastModified: agora, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/perguntas-frequentes`, lastModified: agora, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/videos`, lastModified: agora, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${site.url}/contato`, lastModified: agora, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${site.url}/aviso-de-cuidado`, lastModified: agora, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${site.url}/termos-de-uso`, lastModified: agora, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${site.url}/privacidade`, lastModified: agora, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const paginasTerapias: MetadataRoute.Sitemap = terapias.map((t) => ({
    url: `${site.url}/terapias/${t.slug}`,
    lastModified: agora,
    changeFrequency: 'monthly',
    priority: t.destaque ? 0.9 : 0.8,
  }))

  return [...fixas, ...paginasTerapias]
}
