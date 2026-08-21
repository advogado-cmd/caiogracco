import Link from 'next/link'
import type { Metadata } from 'next'
import { Secao, TituloSecao } from '@/components/Secao'
import { BuscaIA } from '@/components/BuscaIA'
import { JsonLd } from '@/components/JsonLd'
import { terapias } from '@/content/terapias'
import { construirIndice, slugificar, normalizar } from '@/lib/busca'
import { schemaBreadcrumb } from '@/lib/estrutura'
import { site } from '@/content/site'
import type { Termo } from '@/content/tipos'
import { BarraCompartilhar } from '@/components/BarraCompartilhar'
import { CTA } from '@/components/CTA'

export const metadata: Metadata = {
  title: 'Glossário das terapias integrativas',
  description:
    'Os termos das terapias explicados em linguagem simples: Osatoshi, Shinri, Omamori, Ki, Qi, meridianos, tsubo, hara, De Qi, Taiheki, Katsugen Undo, UCL e outros.',
  alternates: { canonical: '/glossario' },
  openGraph: { url: `${site.url}/glossario`, title: 'Glossário das terapias integrativas' },
}

type Verbete = Termo & { terapiaNome: string; terapiaSlug: string }

function montarVerbetes(): Verbete[] {
  const mapa = new Map<string, Verbete>()
  for (const t of terapias) {
    for (const termo of t.termos) {
      const chave = normalizar(termo.termo)
      if (!mapa.has(chave)) {
        mapa.set(chave, { ...termo, terapiaNome: t.nome, terapiaSlug: t.slug })
      }
    }
  }
  return [...mapa.values()].sort((a, b) =>
    normalizar(a.termo).localeCompare(normalizar(b.termo), 'pt-BR'),
  )
}

export default function PaginaGlossario() {
  const verbetes = montarVerbetes()
  const indice = construirIndice()

  const grupos = new Map<string, Verbete[]>()
  for (const v of verbetes) {
    const letra = normalizar(v.termo).charAt(0).toUpperCase()
    if (!grupos.has(letra)) grupos.set(letra, [])
    grupos.get(letra)!.push(v)
  }
  const letras = [...grupos.keys()]

  return (
    <>
      <BarraCompartilhar titulo="Glossário — Caio Gracco" />
      <JsonLd
        dados={[
          schemaBreadcrumb([{ nome: 'Início', href: '/' }, { nome: 'Glossário', href: '/glossario' }]),
          {
            '@context': 'https://schema.org',
            '@type': 'DefinedTermSet',
            '@id': `${site.url}/glossario#conjunto`,
            name: 'Glossário de Terapias Integrativas — Terapias da Completude',
            description: 'Termos das tradições japonesas, chinesas e contemporâneas praticadas por Caio Gracco.',
            url: `${site.url}/glossario`,
            hasDefinedTerm: verbetes.map((v) => ({
              '@type': 'DefinedTerm',
              name: v.termo,
              description: v.definicao,
              url: `${site.url}/glossario#${slugificar(v.termo)}`,
            })),
          },
        ]}
      />

      <div className="aurora">
        <Secao className="pb-16 pt-14 lg:pb-20 lg:pt-20">
          <TituloSecao
            claro
            icone="livro"
            sobretitulo="Glossário"
            titulo="As palavras destas tradições, sem mistério"
            nivel={1}
            texto="Cada prática traz seu vocabulário — em japonês, em chinês, em inglês. Aqui estão todos os termos usados no site, explicados em uma ou duas frases."
          />
          <div className="mt-8 max-w-xl">
            <BuscaIA indice={indice} variante="escura" />
          </div>
        </Secao>
      </div>

      <Secao className="py-14 lg:py-20">
        <nav aria-label="Navegar por letra" className="flex flex-wrap gap-2">
          {letras.map((l) => (
            <a
              key={l}
              href={`#letra-${l}`}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-noite-100 bg-cartao text-sm font-medium text-noite-700 transition hover:border-ouro-400 hover:text-noite-800"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="mt-12 flex flex-col gap-12">
          {letras.map((letra) => (
            <section key={letra} id={`letra-${letra}`} className="scroll-mt-24" aria-labelledby={`titulo-letra-${letra}`}>
              <h2 id={`titulo-letra-${letra}`} className="font-display text-3xl text-ouro-500">{letra}</h2>
              <div className="regua-ouro mt-2" />
              <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                {grupos.get(letra)!.map((v) => (
                  <div key={v.termo} id={slugificar(v.termo)} className="scroll-mt-24 rounded-2xl border border-noite-100 bg-cartao p-5">
                    <dt className="font-display text-lg text-noite-800">{v.termo}</dt>
                    <dd className="mt-2 text-[0.92rem] leading-relaxed text-tinta-700">{v.definicao}</dd>
                    <dd className="mt-3">
                      <Link href={`/terapias/${v.terapiaSlug}`} className="text-[0.78rem] font-medium uppercase tracking-wide text-ouro-600 underline underline-offset-4">
                        {v.terapiaNome}
                      </Link>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <CTA className="mt-16" />
      </Secao>
    </>
  )
}
