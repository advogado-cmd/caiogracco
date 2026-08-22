import Link from 'next/link'
import { CartaoArtigo } from './CartaoArtigo'
import { Icone } from './Icone'
import { artigosPopulares } from '@/lib/blog'

/**
 * Vitrine do blog na home.
 *
 * A ordem vem de `src/content/populares.json`, que pode ser regerado a partir
 * dos dados de audiência (ver `scripts/atualizar-populares.mjs`). Sem esse
 * arquivo, entra o peso editorial definido em cada artigo — ou seja, a seção
 * funciona desde o primeiro dia e fica mais precisa quando houver audiência.
 */
export function SecaoBlog({ limite = 3 }: { limite?: number }) {
  const artigos = artigosPopulares(limite)
  if (!artigos.length) return null

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {artigos.map((a) => (
          <CartaoArtigo key={a.slug} artigo={a} />
        ))}
      </div>

      <Link
        href="/blog"
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-noite-200 px-6 py-3 text-[0.95rem] font-medium text-noite-700 transition hover:border-ouro-400 hover:text-noite-800"
      >
        Ver todos os textos
        <Icone nome="seta" tamanho={17} />
      </Link>
    </div>
  )
}
