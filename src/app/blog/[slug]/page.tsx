import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Secao } from '@/components/Secao'
import { JsonLd } from '@/components/JsonLd'
import { CTA } from '@/components/CTA'
import { CartaoArtigo } from '@/components/CartaoArtigo'
import { BarraCompartilhar } from '@/components/BarraCompartilhar'
import { Icone, type NomeIcone } from '@/components/Icone'
import { todosArtigos, getArtigo, artigosRelacionados, CATEGORIAS } from '@/lib/blog'
import { renderizarMarkdown, textoPuro } from '@/lib/markdown'
import { dicionarioDeLigacoes } from '@/lib/ligacoes'
import { OuvirTexto } from '@/components/OuvirTexto'
import { schemaArtigo, schemaBreadcrumb, schemaFAQ } from '@/lib/estrutura'
import { getTerapia } from '@/content/terapias'
import { site } from '@/content/site'

export function generateStaticParams() {
  return todosArtigos().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const a = getArtigo(slug)
  if (!a) return {}
  return {
    title: a.tituloCurto ?? a.titulo,
    description: a.descricao,
    keywords: a.palavrasChave,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: {
      type: 'article',
      url: `${site.url}/blog/${a.slug}`,
      title: a.titulo,
      description: a.descricao,
      publishedTime: a.publicadoEm,
      modifiedTime: a.atualizadoEm ?? a.publicadoEm,
      authors: [site.terapeuta],
    },
  }
}

const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

function dataPorExtenso(iso: string) {
  const [ano, mes, dia] = iso.split('-').map(Number)
  return `${dia} de ${MESES[mes - 1]} de ${ano}`
}

export default async function PaginaArtigo({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const artigo = getArtigo(slug)
  if (!artigo) notFound()

  const cat = CATEGORIAS[artigo.categoria]
  const relacionados = artigosRelacionados(artigo, 3)
  // Ligação automática: tudo do dicionário, menos o que aponta para esta própria página.
  const ligacoes = dicionarioDeLigacoes().filter((l) => l.href !== `/blog/${artigo.slug}`)
  const terapias = (artigo.terapias ?? []).map(getTerapia).filter((t) => Boolean(t))

  return (
    <>
      <BarraCompartilhar titulo={artigo.titulo} />
      <JsonLd
        dados={[
          schemaBreadcrumb([
            { nome: 'Início', href: '/' },
            { nome: 'Blog', href: '/blog' },
            { nome: cat.nome, href: `/blog/categoria/${cat.slug}` },
            { nome: artigo.tituloCurto ?? artigo.titulo, href: `/blog/${artigo.slug}` },
          ]),
          schemaArtigo({ ...artigo, categoria: cat.nome }),
          ...(artigo.faq?.length ? [schemaFAQ(artigo.faq)] : []),
        ]}
      />

      <div className="aurora">
        <Secao className="pb-14 pt-12 lg:pb-16 lg:pt-16">
          <nav aria-label="Trilha" className="flex flex-wrap items-center gap-2 text-[0.82rem] text-noite-200">
            <Link href="/blog" className="transition hover:text-ouro-300">Blog</Link>
            <span aria-hidden="true">·</span>
            <Link href={`/blog/categoria/${cat.slug}`} className="transition hover:text-ouro-300">{cat.nome}</Link>
          </nav>

          <h1 className="mt-5 max-w-4xl font-display text-3xl leading-[1.15] text-areia-50 sm:text-4xl lg:text-[2.9rem]">
            {artigo.titulo}
          </h1>
          <p className="mt-5 max-w-2xl text-[1.1rem] leading-relaxed text-noite-200">{artigo.resumo}</p>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.85rem] text-noite-300">
            <span className="flex items-center gap-2">
              <Icone nome="coracao" tamanho={15} />
              Por {site.terapeuta}
            </span>
            <span className="flex items-center gap-2">
              <Icone nome="relogio" tamanho={15} />
              {artigo.minutos} min de leitura
            </span>
            <time dateTime={artigo.publicadoEm}>
              {artigo.atualizadoEm ? `Atualizado em ${dataPorExtenso(artigo.atualizadoEm)}` : dataPorExtenso(artigo.publicadoEm)}
            </time>
          </div>
        </Secao>
      </div>

      <Secao className="py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem]">
          <article className="max-w-[46rem] text-[1.08rem]">
            <OuvirTexto titulo={artigo.titulo} texto={textoPuro(artigo.corpo)} />

            {renderizarMarkdown(artigo.corpo, ligacoes)}

            <CTA
              variante="discreto"
              className="mt-12"
              titulo="Quer conversar sobre o seu caso?"
              rotulo="Falar comigo"
              mensagem={`Olá, Caio! Li o texto "${artigo.tituloCurto ?? artigo.titulo}" no site e gostaria de conversar.`}
            />

            {artigo.faq && artigo.faq.length > 0 && (
              <section aria-labelledby="perguntas" className="mt-14">
                <h2 id="perguntas" className="font-display text-2xl text-noite-800 sm:text-[1.75rem]">
                  Perguntas frequentes
                </h2>
                <dl className="mt-6 flex flex-col gap-4">
                  {artigo.faq.map((f) => (
                    <div key={f.pergunta} className="rounded-2xl border border-areia-200 bg-cartao p-5">
                      <dt className="font-display text-[1.1rem] leading-snug text-noite-800">{f.pergunta}</dt>
                      <dd className="mt-2.5 leading-relaxed text-tinta-700">{f.resposta}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            <aside className="mt-12 rounded-2xl border border-noite-200/60 bg-areia-100/70 p-6">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-noite-600">Sobre este texto</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-tinta-700">
                Escrito por {site.nomeCompleto}, terapeuta integrativo. Este conteúdo tem finalidade informativa e de
                orientação. Não é diagnóstico, não substitui consulta médica, psicológica ou psiquiátrica, e nenhum
                tratamento em curso deve ser interrompido por causa dele.{' '}
                <Link href="/aviso-de-cuidado" className="text-noite-600 underline underline-offset-[3px]">
                  Leia o aviso de cuidado
                </Link>
                .
              </p>
            </aside>
          </article>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            {artigo.secoes.length > 2 && (
              <nav aria-labelledby="sumario" className="rounded-2xl border border-areia-200 bg-cartao p-5">
                <p id="sumario" className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ouro-600">
                  Neste texto
                </p>
                <ol className="mt-3.5 flex flex-col gap-2.5">
                  {artigo.secoes.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="text-[0.88rem] leading-snug text-tinta-700 transition hover:text-noite-600">
                        {s.titulo}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {terapias.length > 0 && (
              <div className="mt-6 rounded-2xl border border-areia-200 bg-cartao p-5">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ouro-600">
                  Práticas relacionadas
                </p>
                <ul className="mt-3.5 flex flex-col gap-2.5">
                  {terapias.map((t) => (
                    <li key={t!.slug}>
                      <Link
                        href={`/terapias/${t!.slug}`}
                        className="flex items-center gap-2.5 text-[0.9rem] text-tinta-700 transition hover:text-noite-600"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-areia-200/55 text-brasa-500">
                          <Icone nome={t!.icone as NomeIcone} tamanho={15} />
                        </span>
                        {t!.nomeCurto}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Secao>

      {relacionados.length > 0 && (
        <div className="border-y border-areia-200 bg-areia-200/25 py-14 lg:py-20">
          <Secao>
            <h2 className="font-display text-2xl text-noite-800 sm:text-3xl">Para continuar lendo</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relacionados.map((a) => (
                <CartaoArtigo key={a.slug} artigo={a} compacto />
              ))}
            </div>
          </Secao>
        </div>
      )}

      <Secao className="py-14 lg:py-20">
        <CTA />
      </Secao>
    </>
  )
}
