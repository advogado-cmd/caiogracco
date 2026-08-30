import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Secao } from '@/components/Secao'
import { Perguntas } from '@/components/Perguntas'
import { AvisoCuidado } from '@/components/AvisoCuidado'
import { JsonLd } from '@/components/JsonLd'
import { terapias, getTerapia } from '@/content/terapias'
import { site, whatsappLink, imagemCompartilhamento } from '@/content/site'
import { schemaServico, schemaFAQ, schemaBreadcrumb } from '@/lib/estrutura'
import { slugificar } from '@/lib/busca'
import { Icone } from '@/components/Icone'
import { Foto } from '@/components/Foto'
import { CTA } from '@/components/CTA'
import { BarraCompartilhar } from '@/components/BarraCompartilhar'
import { CartaoArtigo } from '@/components/CartaoArtigo'
import { Depoimentos } from '@/components/Depoimentos'
import { depoimentosDaTerapia } from '@/content/depoimentos'
import { artigosDaTerapia } from '@/lib/blog'
import { fotoPorTerapia } from '@/content/fotos'

export const dynamicParams = false

export function generateStaticParams() {
  return terapias.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const t = getTerapia(slug)
  if (!t) return {}
  const titulo = `${t.nomeCurto}: o que é e como funciona`
  const onde = t.sessao.distancia === 'sim' ? 'online, para todo o Brasil' : 'presencialmente, com hora marcada'
  const descricao = `${t.nome}: ${t.tagline.toLowerCase()}. ${t.resumo.split('. ')[0]}. Com Caio Gracco, ${onde}.`
  return {
    title: titulo,
    description: descricao.length > 158 ? `${descricao.slice(0, 155).trimEnd()}…` : descricao,
    alternates: { canonical: `/terapias/${t.slug}` },
    keywords: t.keywords,
    openGraph: {
      url: `${site.url}/terapias/${t.slug}`,
      title: titulo,
      description: descricao,
      type: 'article',
      images: imagemCompartilhamento,
    },
  }
}

const FORMATO: Record<string, string> = {
  sim: 'Presencial e à distância',
  parcial: 'Presencial (avaliação inicial pode ser online)',
  nao: 'Somente presencial',
}

/** Alcance da prática. As que a tradição permite à distância atendem o país inteiro. */
const ALCANCE: Record<string, string> = {
  sim: 'Todo o Brasil, à distância',
  parcial: 'Todo o Brasil na avaliação inicial',
  nao: 'No meu espaço, com hora marcada',
}

export default async function PaginaTerapia({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const t = getTerapia(slug)
  if (!t) notFound()
  const leituras = artigosDaTerapia(t.slug, 3)
  const relatos = depoimentosDaTerapia(t.slug)

  const outras = terapias.filter((o) => o.slug !== t.slug).slice(0, 3)

  return (
    <>
      <BarraCompartilhar titulo={`${t.nome}, Caio Gracco`} />
      <JsonLd
        dados={[
          schemaServico(t),
          schemaFAQ(t.faq),
          schemaBreadcrumb([
            { nome: 'Início', href: '/' },
            { nome: 'Terapias', href: '/terapias' },
            { nome: t.nome, href: `/terapias/${t.slug}` },
          ]),
        ]}
      />

      {/* Cabeçalho da terapia */}
      <div className="aurora">
        <Secao className="pb-14 pt-12 lg:pb-18 lg:pt-16">
          <nav aria-label="Trilha de navegação" className="text-[0.8rem] text-noite-300">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-areia-100">Início</Link></li>
              <li aria-hidden="true">·</li>
              <li><Link href="/terapias" className="hover:text-areia-100">Terapias</Link></li>
              <li aria-hidden="true">·</li>
              <li aria-current="page" className="text-ouro-300">{t.nome}</li>
            </ol>
          </nav>

          <span className="mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-noite-700/70 text-magenta-400">
            <Icone nome={t.icone} tamanho={32} />
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight text-areia-50 sm:text-5xl">{t.nome}</h1>
          <p className="mt-3 text-[0.8rem] uppercase tracking-[0.24em] text-ouro-300">{t.tagline}</p>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-noite-200">{t.resumo}</p>

          <dl className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Formato', FORMATO[t.sessao.distancia]],
              ['Duração', t.sessao.duracao],
              ['Ciclo sugerido', t.sessao.frequencia],
              ['Onde', ALCANCE[t.sessao.distancia]],
            ].map(([rotulo, valor]) => (
              <div key={rotulo} className="rounded-2xl border border-noite-400/30 bg-noite-900/25 p-4">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-wider text-ouro-300">{rotulo}</dt>
                <dd className="mt-1.5 text-[0.9rem] leading-snug text-areia-100">{valor}</dd>
              </div>
            ))}
          </dl>

          <a
            href={whatsappLink(`Olá, Caio! Vi a página sobre ${t.nome} no site e gostaria de saber mais.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-ouro-400 px-6 py-3.5 text-[1rem] font-semibold text-noite-900 transition hover:bg-ouro-300"
          >
            <Icone nome="whatsapp" tamanho={20} />
            Quero iniciar minha terapia agora
          </a>
        </Secao>
      </div>

      <Secao className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_18rem]">
          <div className="max-w-3xl">
            <section aria-labelledby="oque">
              <h2 id="oque" className="font-display text-2xl text-noite-800 sm:text-3xl">O que é</h2>
              <div className="prosa mt-4">
                {t.oQueE.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </section>

            <Foto numero={fotoPorTerapia[t.slug]} className="mt-10" />

            <section aria-labelledby="origem" className="mt-12">
              <h2 id="origem" className="font-display text-2xl text-noite-800 sm:text-3xl">De onde vem</h2>
              <p className="prosa mt-4">{t.origem}</p>
            </section>

            <section aria-labelledby="funciona" className="mt-12">
              <h2 id="funciona" className="font-display text-2xl text-noite-800 sm:text-3xl">Como funciona</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {t.comoFunciona.map((p, i) => (
                  <li key={i} className="flex gap-3 text-[1.0rem] leading-relaxed text-tinta-700">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ouro-400" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="evidencia" className="mt-12">
              <h2 id="evidencia" className="font-display text-2xl text-noite-800 sm:text-3xl">
                O que se sabe e o que não se sabe
              </h2>
              <div className="mt-4 rounded-2xl border-l-4 border-noite-400 bg-noite-100/60 p-5 sm:p-6">
                <p className="text-[0.98rem] leading-relaxed text-tinta-700">{t.evidencia}</p>
              </div>
            </section>

            <section aria-labelledby="sessao" className="mt-12">
              <h2 id="sessao" className="font-display text-2xl text-noite-800 sm:text-3xl">Como é a sessão</h2>
              <dl className="mt-4 divide-y divide-noite-100 rounded-2xl border border-noite-100 bg-cartao">
                {[
                  ['Duração', t.sessao.duracao],
                  ['Formato', t.sessao.formato],
                  ['O que você sente', t.sessao.sensacao],
                  ['Quantas sessões', t.sessao.frequencia],
                ].map(([rotulo, valor]) => (
                  <div key={rotulo} className="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4 sm:px-6">
                    <dt className="text-[0.82rem] font-semibold uppercase tracking-wide text-ouro-600">{rotulo}</dt>
                    <dd className="text-[0.95rem] leading-relaxed text-tinta-700">{valor}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <CTA
              variante="discreto"
              className="mt-12"
              titulo={`Quer saber se ${t.nomeCurto} é o caminho para você?`}
              mensagem={`Olá, Caio! Estou lendo sobre ${t.nome} no site e queria entender se faz sentido para o meu caso.`}
            />

            <section aria-labelledby="indicacoes" className="mt-12">
              <h2 id="indicacoes" className="font-display text-2xl text-noite-800 sm:text-3xl">
                Para que as pessoas costumam procurar
              </h2>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {t.indicacoes.map((i) => (
                  <li key={i} className="flex gap-2.5 rounded-xl bg-areia-200/35 px-4 py-3 text-[0.92rem] text-tinta-700">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ouro-500" />
                    {i}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="limites" className="mt-12">
              <h2 id="limites" className="font-display text-2xl text-noite-800 sm:text-3xl">Limites e ressalvas</h2>
              <p className="prosa mt-4">{t.limites}</p>
              <div className="mt-6">
                <AvisoCuidado />
              </div>
            </section>

            <div className="mt-12">
              <Perguntas perguntas={t.faq} titulo={`Perguntas sobre ${t.nomeCurto}`} />
            </div>

            {relatos.length > 0 && (
              <section aria-labelledby="relatos" className="mt-14">
                <h2 id="relatos" className="font-display text-2xl text-noite-800 sm:text-3xl">
                  Elas voltaram para contar
                </h2>
                <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-tinta-700">
                  Mensagens que chegaram depois do atendimento, do jeito que vieram.
                </p>
                <Depoimentos lista={relatos} className="mt-8" />
              </section>
            )}

            {leituras.length > 0 && (
              <section aria-labelledby="leituras" className="mt-14">
                <h2 id="leituras" className="font-display text-2xl text-noite-800 sm:text-3xl">
                  Para ler sobre {t.nomeCurto}
                </h2>
                <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-tinta-700">
                  Se ficou alguma dúvida, ou se você quer entender melhor antes de marcar.
                </p>
                <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {leituras.map((a) => (
                    <CartaoArtigo key={a.slug} artigo={a} compacto />
                  ))}
                </div>
              </section>
            )}

            <section aria-labelledby="termos" className="mt-12">
              <h2 id="termos" className="font-display text-2xl text-noite-800 sm:text-3xl">
                Palavras desta tradição
              </h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                {t.termos.map((termo) => (
                  <div key={termo.termo} id={slugificar(termo.termo)} className="scroll-mt-24 rounded-2xl border border-noite-100 bg-cartao p-5">
                    <dt className="font-display text-lg text-noite-800">{termo.termo}</dt>
                    <dd className="mt-1.5 text-[0.9rem] leading-relaxed text-tinta-700">{termo.definicao}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/glossario" className="mt-5 inline-block text-sm font-medium text-noite-600 underline underline-offset-4">
                Ver o glossário completo
              </Link>
            </section>

            <CTA
              className="mt-14"
              mensagem={`Olá, Caio! Quero iniciar minha terapia com ${t.nome}.`}
            />

            {t.fontes.length > 0 && (
              <section aria-labelledby="fontes" className="mt-12">
                <h2 id="fontes" className="font-display text-xl text-noite-800">Fontes consultadas</h2>
                <ul className="mt-3 flex flex-col gap-2 text-[0.88rem]">
                  {t.fontes.map((f) => (
                    <li key={f.url}>
                      <a href={f.url} target="_blank" rel="noopener noreferrer nofollow" className="text-noite-600 underline underline-offset-4 hover:text-noite-500">
                        {f.titulo}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Coluna lateral */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-ouro-500/45 bg-areia-200/40 p-6">
              <p className="font-display text-lg text-noite-800">Quer conversar antes?</p>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-tinta-700">
                Conte o que está acontecendo. O Caio responde pessoalmente e diz com honestidade se o
                {' '}{t.nomeCurto} é o caminho, ou se há um melhor.
              </p>
              <a
                href={whatsappLink(`Olá, Caio! Gostaria de saber mais sobre ${t.nome}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block rounded-xl bg-noite-600 px-4 py-3 text-center text-[0.9rem] font-semibold text-areia-50 transition hover:bg-noite-400"
              >
                Falar no WhatsApp
              </a>
            </div>

            <nav aria-label="Outras terapias" className="mt-8">
              <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ouro-600">
                Outras terapias
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {outras.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/terapias/${o.slug}`} className="flex items-center gap-3 rounded-xl border border-noite-100 bg-cartao p-4 transition hover:border-ouro-300">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-areia-200/55 text-brasa-500">
                        <Icone nome={o.icone} tamanho={19} />
                      </span>
                      <span>
                        <span className="block font-display text-[1.05rem] text-noite-800">{o.nome}</span>
                        <span className="mt-0.5 block text-[0.82rem] text-tinta-500">{o.tagline}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </Secao>
    </>
  )
}
