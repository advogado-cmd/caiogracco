import Link from 'next/link'
import type { Artigo } from '@/lib/blog'
import { CATEGORIAS } from '@/lib/blog'
import { Icone, type NomeIcone } from './Icone'

/** Mesma lógica do cartão de terapia: seis cores, pares distintos. */
const ACENTO: Record<string, string> = {
  corpo: 'from-areia-200 to-ouro-500/90',
  espiritual: 'from-ouro-300/90 to-ouro-500/90',
  praticas: 'from-ouro-500/90 to-ouro-600/90',
  orientacao: 'from-noite-400/90 to-noite-600/90',
}

export function CartaoArtigo({ artigo, compacto = false }: { artigo: Artigo; compacto?: boolean }) {
  const cat = CATEGORIAS[artigo.categoria]

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-noite-100 bg-cartao transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-noite-900/8">
      <span className={`h-1 w-full bg-gradient-to-r ${ACENTO[artigo.categoria]}`} aria-hidden="true" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-areia-200/55 text-brasa-500">
            <Icone nome={cat.icone} tamanho={17} />
          </span>
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ouro-600">{cat.nome}</span>
        </div>

        <h3 className={`mt-4 font-display leading-snug text-noite-800 ${compacto ? 'text-lg' : 'text-xl'}`}>
          <Link prefetch={false} href={`/blog/${artigo.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {artigo.tituloCurto ?? artigo.titulo}
          </Link>
        </h3>

        <p className={`mt-3 flex-1 leading-relaxed text-tinta-700 ${compacto ? 'text-[0.92rem]' : 'text-[0.98rem]'}`}>
          {artigo.resumo}
        </p>

        <p className="mt-5 flex items-center gap-2 text-[0.8rem] text-tinta-500">
          <Icone nome="relogio" tamanho={15} />
          {artigo.minutos} min de leitura
        </p>
      </div>
    </article>
  )
}
