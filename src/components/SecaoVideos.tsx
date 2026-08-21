import Link from 'next/link'
import { Icone } from './Icone'
import { videos, canalUrl, canalHandle, playlistUploads } from '@/content/videos'

/** Vídeos do canal, incorporados. Se ainda não há vídeos cadastrados um a um,
 *  entra o player da playlist de uploads — que se atualiza sozinho. */
export function SecaoVideos({ limite = 3 }: { limite?: number }) {
  const destaques = videos.slice(0, limite)

  return (
    <div>
      {destaques.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destaques.map((v) => (
            <li key={v.id}>
              <article className="overflow-hidden rounded-2xl border border-noite-100 bg-cartao">
                <div className="relative aspect-video w-full bg-noite-900">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0`}
                    title={v.titulo}
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg leading-snug text-noite-800">{v.titulo}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-tinta-700">{v.descricao}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-noite-200 bg-noite-900">
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/videoseries?list=${playlistUploads}&rel=0`}
              title={`Vídeos de Caio Gracco no YouTube (${canalHandle})`}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={canalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-noite-600 px-6 py-3 text-[0.95rem] font-semibold text-areia-50 transition hover:bg-noite-400"
        >
          <Icone nome="youtube" tamanho={19} />
          Ver o canal {canalHandle}
        </a>
        <Link
          href="/videos"
          className="inline-flex items-center gap-2 rounded-full border border-noite-200 px-6 py-3 text-[0.95rem] font-medium text-noite-700 transition hover:border-brasa-500 hover:text-brasa-500"
        >
          Todos os vídeos
          <Icone nome="seta" tamanho={17} />
        </Link>
      </div>
    </div>
  )
}
