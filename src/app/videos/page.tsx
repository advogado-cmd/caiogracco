import type { Metadata } from 'next'
import { Secao, TituloSecao } from '@/components/Secao'
import { JsonLd } from '@/components/JsonLd'
import { videos, canalUrl, canalHandle, thumbnail, watchUrl } from '@/content/videos'
import { schemaBreadcrumb } from '@/lib/estrutura'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Vídeos de Caio Gracco',
  description:
    'Os vídeos publicados por Caio Gracco no YouTube sobre Osatoshi, limpeza espiritual, EMF Balancing Technique® e as demais terapias do Espaço da Completude.',
  alternates: { canonical: '/videos' },
  openGraph: { url: `${site.url}/videos`, title: 'Vídeos de Caio Gracco — Espaço da Completude' },
}

export default function PaginaVideos() {
  const temVideos = videos.length > 0

  return (
    <>
      <JsonLd
        dados={[
          schemaBreadcrumb([{ nome: 'Início', href: '/' }, { nome: 'Vídeos', href: '/videos' }]),
          ...(temVideos
            ? [{
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Vídeos de Caio Gracco',
                itemListElement: videos.map((v, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  item: {
                    '@type': 'VideoObject',
                    name: v.titulo,
                    description: v.descricao,
                    thumbnailUrl: thumbnail(v.id),
                    uploadDate: v.publicadoEm,
                    contentUrl: watchUrl(v.id),
                    embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
                  },
                })),
              }]
            : []),
        ]}
      />

      <div className="aurora">
        <Secao className="pb-16 pt-14 lg:pb-20 lg:pt-20">
          <TituloSecao
            claro
            sobretitulo="Vídeos"
            titulo="O Caio explicando, com as próprias palavras"
            texto="Reunimos aqui os vídeos publicados no canal. São conversas curtas sobre carmas, proteção, como funciona o Osatoshi e o que esperar de cada terapia."
          />
          <a
            href={canalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ouro-400 px-6 py-3.5 text-[0.92rem] font-semibold text-noite-900 transition hover:bg-ouro-300"
          >
            Abrir o canal {canalHandle}
          </a>
        </Secao>
      </div>

      <Secao className="py-14 lg:py-20">
        {temVideos ? (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <li key={v.id} id={v.id} className="scroll-mt-24">
                <article className="overflow-hidden rounded-2xl border border-noite-100 bg-white">
                  <div className="relative aspect-video w-full bg-noite-900">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                      title={v.titulo}
                      loading="lazy"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                  <div className="p-5">
                    <h2 className="font-display text-lg leading-snug text-noite-800">{v.titulo}</h2>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-tinta-700">{v.descricao}</p>
                    {v.terapia && (
                      <p className="mt-3 text-[0.72rem] font-semibold uppercase tracking-wide text-ouro-600">{v.terapia}</p>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border border-dashed border-noite-200 bg-white p-8 text-center sm:p-12">
            <h2 className="font-display text-2xl text-noite-800">Os vídeos entram aqui</h2>
            <p className="mx-auto mt-3 max-w-xl text-[0.95rem] leading-relaxed text-tinta-700">
              A galeria já está pronta e integrada à busca do site. Basta cadastrar os vídeos em{' '}
              <code className="rounded bg-areia-100 px-1.5 py-0.5 text-[0.85em]">src/content/videos.ts</code>{' '}
              — ou rodar o importador automático com a chave da API do YouTube — que eles aparecem
              nesta página, com miniatura, player e dados estruturados para o Google.
            </p>
            <a
              href={canalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full border border-noite-200 px-6 py-3 text-sm font-medium text-noite-700 transition hover:border-ouro-400"
            >
              Ver o canal no YouTube
            </a>
          </div>
        )}
      </Secao>
    </>
  )
}
