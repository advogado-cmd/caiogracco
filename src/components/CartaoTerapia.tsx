import Link from 'next/link'
import type { Terapia } from '@/content/tipos'

const ACENTOS: Record<Terapia['acento'], string> = {
  ouro: 'from-ouro-400/85 to-ouro-500/85',
  coral: 'from-brasa-400/85 to-brasa-500/85',
  magenta: 'from-magenta-400/85 to-magenta-500/85',
  violeta: 'from-violeta-400/85 to-violeta-500/85',
  agua: 'from-agua-400/85 to-agua-500/85',
}

export function CartaoTerapia({ terapia, destaque = false }: { terapia: Terapia; destaque?: boolean }) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-noite-900/8 ${
        destaque ? 'border-ouro-300' : 'border-noite-100'
      }`}
    >
      <span className={`h-1 w-full bg-gradient-to-r ${ACENTOS[terapia.acento]}`} aria-hidden="true" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl text-noite-800">
            <Link href={`/terapias/${terapia.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {terapia.nome}
            </Link>
          </h3>
          {terapia.sessao.distancia === 'sim' && (
            <span className="shrink-0 rounded-full bg-agua-400/15 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-agua-500">
              Online
            </span>
          )}
        </div>
        <p className="mt-1 text-[0.8rem] uppercase tracking-[0.16em] text-ouro-600">{terapia.tagline}</p>
        <p className="mt-4 flex-1 text-[0.92rem] leading-relaxed text-tinta-700">{terapia.resumo}</p>
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-noite-600 transition group-hover:gap-2.5">
          Conhecer
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </p>
      </div>
    </article>
  )
}
