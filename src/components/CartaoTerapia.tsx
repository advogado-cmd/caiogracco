import Link from 'next/link'
import type { Terapia } from '@/content/tipos'
import { Icone } from './Icone'

/**
 * Filete de acento no topo do cartão. Os nomes vêm da identidade anterior,
 * quando havia coral, magenta e violeta; a paleta do manual tem seis cores e
 * nenhuma delas é rosa. Cada acento passou a ser um par distinto dentro
 * dessas seis, para as terapias seguirem distinguíveis à primeira vista.
 */
const ACENTOS: Record<Terapia['acento'], string> = {
  ouro: 'from-ouro-300/90 to-ouro-500/90',
  coral: 'from-ouro-500/90 to-ouro-600/90',
  magenta: 'from-areia-200 to-ouro-500/90',
  violeta: 'from-noite-500/90 to-noite-800/90',
  agua: 'from-noite-200 to-noite-500/90',
}

export function CartaoTerapia({ terapia, destaque = false }: { terapia: Terapia; destaque?: boolean }) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-cartao transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-noite-900/8 ${
        destaque ? 'border-ouro-300' : 'border-noite-100'
      }`}
    >
      <span className={`h-1 w-full bg-gradient-to-r ${ACENTOS[terapia.acento]}`} aria-hidden="true" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-areia-200/55 text-brasa-500">
            <Icone nome={terapia.icone} tamanho={21} />
          </span>
          {terapia.sessao.distancia === 'sim' && (
            <span className="rounded-full bg-noite-600/10 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-noite-600">
              Online
            </span>
          )}
        </div>
        <div className="mt-4">
          <h3 className="font-display text-xl text-noite-800">
            <Link href={`/terapias/${terapia.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {terapia.nome}
            </Link>
          </h3>
        </div>
        <p className="mt-1 text-[0.82rem] uppercase tracking-[0.16em] text-ouro-600">{terapia.tagline}</p>
        <p className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-tinta-700">{terapia.resumo}</p>
        <p className="mt-5 inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-noite-600 transition group-hover:gap-2.5">
          Conhecer
          <Icone nome="seta" tamanho={16} />
        </p>
      </div>
    </article>
  )
}
