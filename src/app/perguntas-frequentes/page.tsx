import Link from 'next/link'
import type { Metadata } from 'next'
import { Secao, TituloSecao } from '@/components/Secao'
import { Perguntas } from '@/components/Perguntas'
import { BuscaIA } from '@/components/BuscaIA'
import { JsonLd } from '@/components/JsonLd'
import { terapias } from '@/content/terapias'
import { construirIndice } from '@/lib/busca'
import { schemaBreadcrumb, schemaFAQ } from '@/lib/estrutura'
import { site } from '@/content/site'
import { BarraCompartilhar } from '@/components/BarraCompartilhar'
import { CTA } from '@/components/CTA'

export const metadata: Metadata = {
  title: 'Perguntas frequentes sobre as terapias',
  description:
    'Dúvidas respondidas terapia por terapia: como funciona, se dói, se pode ser online, quantas sessões e as contraindicações de cada prática.',
  alternates: { canonical: '/perguntas-frequentes' },
  openGraph: { url: `${site.url}/perguntas-frequentes`, title: 'Perguntas frequentes — Espaço da Completude' },
}

export default function PaginaPerguntas() {
  const indice = construirIndice()
  const todas = terapias.flatMap((t) => t.faq)

  return (
    <>
      <BarraCompartilhar titulo="Perguntas frequentes — Caio Gracco" />
      <JsonLd
        dados={[
          schemaFAQ(todas),
          schemaBreadcrumb([{ nome: 'Início', href: '/' }, { nome: 'Perguntas frequentes', href: '/perguntas-frequentes' }]),
        ]}
      />

      <div className="aurora">
        <Secao className="pb-16 pt-14 lg:pb-20 lg:pt-20">
          <TituloSecao
            claro
            icone="mente"
            sobretitulo="Perguntas frequentes"
            titulo="Tudo o que costumam perguntar"
            nivel={1}
            texto="Organizado por terapia. Se a sua dúvida não estiver aqui, escreva — ela provavelmente merece entrar nesta página."
          />
          <div className="mt-8 max-w-xl">
            <BuscaIA indice={indice} variante="escura" />
          </div>
        </Secao>
      </div>

      <Secao className="py-14 lg:py-20">
        <nav aria-label="Ir para uma terapia" className="flex flex-wrap gap-2">
          {terapias.map((t) => (
            <a key={t.slug} href={`#faq-${t.slug}`} className="rounded-full border border-noite-100 bg-white px-4 py-2 text-[0.82rem] text-tinta-700 transition hover:border-ouro-400">
              {t.nomeCurto}
            </a>
          ))}
        </nav>

        <div className="mt-12 flex flex-col gap-14">
          {terapias.map((t) => (
            <section key={t.slug} id={`faq-${t.slug}`} className="scroll-mt-24" aria-labelledby={`faq-titulo-${t.slug}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 id={`faq-titulo-${t.slug}`} className="font-display text-2xl text-noite-800 sm:text-3xl">{t.nome}</h2>
                <Link href={`/terapias/${t.slug}`} className="text-sm font-medium text-noite-600 underline underline-offset-4">
                  Ver a página completa
                </Link>
              </div>
              <div className="mt-5">
                <Perguntas perguntas={t.faq} id={`perguntas-${t.slug}`} />
              </div>
            </section>
          ))}
        </div>

        <CTA className="mt-16" />
      </Secao>
    </>
  )
}
