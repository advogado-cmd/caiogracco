import type { MetadataRoute } from 'next'
import { site, ehProducao } from '@/content/site'

export default function robots(): MetadataRoute.Robots {
  // Ambientes de teste (beta, preview) nunca devem ser indexados: evita
  // conteúdo duplicado e impede que o beta ranqueie no lugar do site oficial.
  if (!ehProducao) {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }

  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // Motores de resposta e assistentes: liberados de propósito (estratégia GEO).
      { userAgent: ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot'], allow: '/' },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
