import { todosArtigos } from '@/lib/blog'
import { textoPuro } from '@/lib/markdown'
import { site } from '@/content/site'

export const dynamic = 'force-static'

const escapar = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Feed do blog. Serve a leitores de RSS e a agregadores — e é mais um caminho de descoberta. */
export function GET() {
  const artigos = todosArtigos()
  const itens = artigos
    .map((a) => {
      const url = `${site.url}/blog/${a.slug}`
      const resumo = textoPuro(a.corpo).slice(0, 400)
      return `    <item>
      <title>${escapar(a.titulo)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${a.publicadoEm}T09:00:00-03:00`).toUTCString()}</pubDate>
      <description>${escapar(a.resumo)}</description>
      <content:encoded><![CDATA[${resumo}…]]></content:encoded>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog — ${escapar(site.nome)}</title>
    <link>${site.url}/blog</link>
    <description>Textos de ${escapar(site.terapeuta)} sobre carma, trauma, prosperidade, limpeza espiritual e as práticas integrativas.</description>
    <language>pt-BR</language>
    <atom:link href="${site.url}/blog/rss.xml" rel="self" type="application/rss+xml" />
${itens}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
