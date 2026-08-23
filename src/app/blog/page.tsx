import type { Metadata } from 'next'
import Link from 'next/link'
import { Secao, TituloSecao } from '@/components/Secao'
import { JsonLd } from '@/components/JsonLd'
import { CartaoArtigo } from '@/components/CartaoArtigo'
import { CTA } from '@/components/CTA'
import { BarraCompartilhar } from '@/components/BarraCompartilhar'
import { Icone, type NomeIcone } from '@/components/Icone'
import { todosArtigos, artigosPopulares, CATEGORIAS, type CategoriaBlog } from '@/lib/blog'
import { schemaBlog, schemaBreadcrumb } from '@/lib/estrutura'
import { site, imagemCompartilhamento } from '@/content/site'

export const metadata: Metadata = {
  title: 'Blog sobre carma, trauma e prosperidade',
  description:
    'Textos de Caio Gracco sobre limpeza espiritual, carma familiar, trauma guardado no corpo, bloqueio financeiro e as oito práticas que ele atende.',
  alternates: { canonical: '/blog', types: { 'application/rss+xml': `${site.url}/blog/rss.xml` } },
  openGraph: { url: `${site.url}/blog`, title: `Blog, ${site.nome}`, images: imagemCompartilhamento,
  },
}

export default function PaginaBlog() {
  const artigos = todosArtigos()
  const populares = artigosPopulares(3)
  const destacados = new Set(populares.map((a) => a.slug))
  const restantes = artigos.filter((a) => !destacados.has(a.slug))
  const ordem: CategoriaBlog[] = [
    'osatoshi', 'espiritual', 'relacionamentos', 'familia', 'convivencia',
    'prosperidade', 'corpo', 'praticas', 'orientacao',
  ]

  return (
    <>
      <BarraCompartilhar titulo={`Blog, ${site.nome}`} />
      <JsonLd
        dados={[
          schemaBreadcrumb([{ nome: 'Início', href: '/' }, { nome: 'Blog', href: '/blog' }]),
          // Só os mais recentes entram no schema. A descoberta do resto é trabalho do
          // sitemap, e listar 169 posts aqui pesaria a página sem ganho de indexação.
          schemaBlog(artigos.slice(0, 24).map((a) => ({ titulo: a.titulo, slug: a.slug, publicadoEm: a.publicadoEm, resumo: a.resumo }))),
        ]}
      />

      <div className="aurora">
        <Secao className="pb-16 pt-14 lg:pb-20 lg:pt-20">
          <TituloSecao
            claro
            icone="artigo"
            sobretitulo="Blog"
            titulo="O que costuma trazer alguém até aqui"
            nivel={1}
            texto="Carma que se repete na família, dor que os exames não explicam, dinheiro que não para na mão, um vínculo que não se desfaz. São os assuntos que mais aparecem nas conversas, e que ficam melhor explicados por escrito, com calma."
          />

          <div className="mt-9 flex flex-wrap gap-2.5">
            {ordem.map((c) => (
              <Link
                key={c}
                href={`/blog/categoria/${CATEGORIAS[c].slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-noite-300/45 px-4 py-2 text-[0.88rem] text-areia-100 transition hover:border-ouro-400 hover:text-ouro-300"
              >
                <Icone nome={CATEGORIAS[c].icone} tamanho={16} />
                {CATEGORIAS[c].nome}
              </Link>
            ))}
          </div>
        </Secao>
      </div>

      {populares.length > 0 && (
        <Secao className="py-14 lg:py-20">
          <TituloSecao
            icone="estrela"
            sobretitulo="Os mais lidos"
            titulo="Por onde a maioria das pessoas começa"
          />
          <div className="mt-9 grid gap-6 md:grid-cols-3">
            {populares.map((a) => (
              <CartaoArtigo key={a.slug} artigo={a} />
            ))}
          </div>
        </Secao>
      )}

      <div className="border-y border-areia-200 bg-areia-200/25 py-14 lg:py-20">
        <Secao>
          <TituloSecao
            icone="artigo"
            sobretitulo="Por assunto"
            titulo="Cada dor tem um lugar aqui"
            texto="Umas pessoas chegam pelo corpo, outras pelo que se repete na família, outras porque um vínculo não se desfaz. Procure pelo que está acontecendo com você."
          />

          <div className="mt-10 flex flex-col gap-14">
            {ordem.map((c) => {
              const daCategoria = restantes.filter((a) => a.categoria === c)
              if (!daCategoria.length) return null
              const mostrados = daCategoria.slice(0, 6)
              return (
                <div key={c}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-areia-200 pb-3">
                    <h3 className="font-display text-2xl text-noite-800">{CATEGORIAS[c].nome}</h3>
                    <Link
                      href={`/blog/categoria/${CATEGORIAS[c].slug}`}
                      className="inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-noite-600 transition hover:text-brasa-500"
                    >
                      Ver a categoria
                      <Icone nome="seta" tamanho={15} />
                    </Link>
                  </div>
                  <p className="mt-3 max-w-2xl text-[0.98rem] leading-relaxed text-tinta-700">{CATEGORIAS[c].descricao}</p>
                  <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {mostrados.map((a) => (
                      <CartaoArtigo key={a.slug} artigo={a} compacto />
                    ))}
                  </div>
                  {daCategoria.length > mostrados.length && (
                    <Link
                      href={`/blog/categoria/${CATEGORIAS[c].slug}`}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-noite-200 px-5 py-2.5 text-[0.9rem] font-medium text-noite-700 transition hover:border-ouro-400 hover:text-noite-800"
                    >
                      Ver os outros {daCategoria.length - mostrados.length} de {CATEGORIAS[c].nome.toLowerCase()}
                      <Icone nome="seta" tamanho={16} />
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </Secao>
      </div>

      <Secao className="py-14 lg:py-20">
        <CTA
          titulo="Quero iniciar minha terapia agora"
          texto="Ler ajuda a entender. Mas o que se repete há anos costuma pedir uma conversa. Escreva contando o que está acontecendo. O Caio responde pessoalmente."
        />
      </Secao>
    </>
  )
}
