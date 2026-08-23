import type { Metadata } from 'next'
import { Secao, TituloSecao } from '@/components/Secao'
import { JsonLd } from '@/components/JsonLd'
import { videos, canalUrl, canalHandle, playlistUploads, thumbnail, watchUrl } from '@/content/videos'
import { schemaBreadcrumb } from '@/lib/estrutura'
import { site, imagemCompartilhamento } from '@/content/site'
import { BarraCompartilhar } from '@/components/BarraCompartilhar'
import { CTA } from '@/components/CTA'

export const metadata: Metadata = {
  title: 'Vídeos de Caio Gracco',
  description:
    'Os vídeos de Caio Gracco no YouTube sobre Osatoshi, limpeza espiritual, EMF Balancing Technique® e as demais terapias que ele atende.',
  alternates: { canonical: '/videos' },
  openGraph: { url: `${site.url}/videos`, title: 'Vídeos de Caio Gracco, Terapias da Completude', images: imagemCompartilhamento,
  },
}

export default function PaginaVideos() {
  const temVideos = videos.length > 0

  return (
    <>
      <BarraCompartilhar titulo="Vídeos de Caio Gracco" />
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
            icone="video"
            sobretitulo="Vídeos"
            titulo="O Caio explicando, com as próprias palavras"
            nivel={1}
            texto="Conversas curtas sobre carmas, proteção, como funciona o Osatoshi e o que esperar de cada terapia. Às vezes ouvir a pessoa falando diz mais do que qualquer texto."
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
                <article className="overflow-hidden rounded-2xl border border-noite-100 bg-cartao">
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
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl text-noite-800 sm:text-3xl">Todos os vídeos do canal</h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-tinta-700">
              É só apertar o play. Os vídeos vêm do mais recente ao mais antigo, e novas
              publicações aparecem aqui sozinhas.
            </p>
            <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-noite-100 bg-noite-900">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/videoseries?list=${playlistUploads}&rel=0`}
                title={`Vídeos de Caio Gracco no YouTube (${canalHandle})`}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <p className="mt-3 text-[0.85rem] text-tinta-500">
              O player não carregou?{' '}
              <a href={canalUrl} target="_blank" rel="noopener noreferrer" className="text-noite-600 underline underline-offset-4">
                Assista direto no YouTube
              </a>
              .
            </p>
          </div>
        )}

        <CTA className="mt-16" />
      </Secao>
    </>
  )
}
