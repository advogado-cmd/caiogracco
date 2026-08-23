import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Secao, TituloSecao } from '@/components/Secao'
import { JsonLd } from '@/components/JsonLd'
import { CartaoArtigo } from '@/components/CartaoArtigo'
import { CTA } from '@/components/CTA'
import { Icone, type NomeIcone } from '@/components/Icone'
import { CATEGORIAS, artigosDaCategoria, type CategoriaBlog } from '@/lib/blog'
import { schemaBreadcrumb } from '@/lib/estrutura'
import { site, imagemCompartilhamento } from '@/content/site'

const PORSLUG = Object.entries(CATEGORIAS).map(([chave, dados]) => ({ chave: chave as CategoriaBlog, ...dados }))

export function generateStaticParams() {
  return PORSLUG.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cat = PORSLUG.find((c) => c.slug === slug)
  if (!cat) return {}
  return {
    title: `${cat.nome}, Blog`,
    description: cat.descricao,
    alternates: { canonical: `/blog/categoria/${cat.slug}` },
    openGraph: { url: `${site.url}/blog/categoria/${cat.slug}`, title: `${cat.nome}, Blog de ${site.terapeuta}`, images: imagemCompartilhamento,
    },
  }
}

export default async function PaginaCategoria({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cat = PORSLUG.find((c) => c.slug === slug)
  if (!cat) notFound()

  const artigos = artigosDaCategoria(cat.chave)
  const outras = PORSLUG.filter((c) => c.slug !== cat.slug)

  return (
    <>
      <JsonLd
        dados={[
          schemaBreadcrumb([
            { nome: 'Início', href: '/' },
            { nome: 'Blog', href: '/blog' },
            { nome: cat.nome, href: `/blog/categoria/${cat.slug}` },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: cat.nome,
            description: cat.descricao,
            url: `${site.url}/blog/categoria/${cat.slug}`,
            isPartOf: { '@id': `${site.url}/blog#blog` },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: artigos.map((a, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `${site.url}/blog/${a.slug}`,
                name: a.titulo,
              })),
            },
          },
        ]}
      />

      <div className="aurora">
        <Secao className="pb-14 pt-14 lg:pb-16 lg:pt-20">
          <nav aria-label="Trilha" className="text-[0.82rem] text-noite-200">
            <Link href="/blog" className="transition hover:text-ouro-300">Blog</Link>
          </nav>
          <TituloSecao
            claro
            icone={cat.icone}
            sobretitulo="Categoria"
            titulo={cat.nome}
            nivel={1}
            texto={cat.descricao}
          />
        </Secao>
      </div>

      <Secao className="py-14 lg:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artigos.map((a) => (
            <CartaoArtigo key={a.slug} artigo={a} />
          ))}
        </div>

        <div className="mt-14 border-t border-areia-200 pt-8">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ouro-600">Outras categorias</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {outras.map((c) => (
              <Link
                key={c.slug}
                href={`/blog/categoria/${c.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-noite-200 px-4 py-2 text-[0.88rem] text-tinta-700 transition hover:border-ouro-400 hover:text-noite-800"
              >
                <Icone nome={c.icone} tamanho={16} />
                {c.nome}
              </Link>
            ))}
          </div>
        </div>

        <CTA className="mt-14" />
      </Secao>
    </>
  )
}
