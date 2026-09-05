import Link from 'next/link'
import type { Metadata } from 'next'
import { Secao, TituloSecao } from '@/components/Secao'
import { CartaoTerapia } from '@/components/CartaoTerapia'
import { BuscaIA } from '@/components/BuscaIA'
import { Perguntas } from '@/components/Perguntas'
import { AvisoCuidado } from '@/components/AvisoCuidado'
import { JsonLd } from '@/components/JsonLd'
import { Icone, type NomeIcone } from '@/components/Icone'
import { SimboloMarca } from '@/components/SimboloMarca'
import { Foto } from '@/components/Foto'
import { CTA } from '@/components/CTA'
import { SecaoVideos } from '@/components/SecaoVideos'
import { SecaoBlog } from '@/components/SecaoBlog'
import { Depoimentos } from '@/components/Depoimentos'
import { Carrossel } from '@/components/Carrossel'
import { BarraCompartilhar } from '@/components/BarraCompartilhar'
import { terapias, terapiasDestaque } from '@/content/terapias'
import { site, whatsappLink } from '@/content/site'
import { schemaFAQ } from '@/lib/estrutura'
import home from '@/content/dados/home.json'

export const metadata: Metadata = {
  // Título da aba do navegador, pedido pelo cliente. As palavras-chave ficam no H1
  // e na descrição. O Google usa os dois para montar o resultado de busca.
  title: 'Caio Gracco - Terapias da Completude',
  description:
    'Osatoshi, EMF Balancing Technique®, Reiki, Shiatsu e mais quatro terapias com Caio Gracco. Atendimento online para todo o Brasil e presencial, com hora marcada.',
  alternates: { canonical: '/' },
}

/**
 * Todo o texto desta página mora em `src/content/dados/home.json`, editável
 * pelo painel em /admin. O que fica aqui é só a montagem: quem escreve o
 * conteúdo é o Caio, quem decide como ele aparece na tela é o código.
 */
const MOTIVOS = home.motivos as { icone: NomeIcone; titulo: string; texto: string }[]
const ETAPAS = home.etapas as { icone: NomeIcone; titulo: string; texto: string }[]
const PERGUNTAS_GERAIS = home.perguntas

export default function Home() {

  return (
    <>
      <JsonLd dados={schemaFAQ(PERGUNTAS_GERAIS)} />
      <BarraCompartilhar titulo="Caio Gracco, Terapias da Completude" />

      {/* ---------- Abertura ---------- */}
      <div className="aurora relative">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-24">
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-ouro-300">
              {home.hero.sobretitulo}
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.1] text-areia-50 sm:text-5xl lg:text-[3.5rem]">
              {home.hero.tituloInicio} <span className="texto-ouro">{home.hero.tituloDestaque}</span>{home.hero.tituloFim}
            </h1>
            <p className="mt-6 max-w-xl text-[1.15rem] leading-relaxed text-noite-200">
              {home.hero.texto}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-ouro-400 px-6 py-3.5 text-[1rem] font-semibold text-noite-900 transition hover:bg-ouro-300"
              >
                <Icone nome="whatsapp" tamanho={20} />
                {home.hero.botaoWhatsapp}
              </a>
              <Link
                href="/terapias"
                className="inline-flex items-center gap-2 rounded-full border border-noite-300/50 px-6 py-3.5 text-[1rem] font-medium text-areia-100 transition hover:border-ouro-400 hover:text-ouro-300"
              >
                {home.hero.botaoTerapias}
                <Icone nome="seta" tamanho={18} />
              </Link>
            </div>

            <div className="relative mt-10 max-w-xl">
              <p className="mb-2.5 text-[0.82rem] uppercase tracking-[0.2em] text-noite-300">
                {home.hero.rotuloBusca}
              </p>
              <BuscaIA variante="escura" />
            </div>
          </div>

          <div className="relative flex flex-col items-center gap-6">
            <Foto numero={1} prioridade larguras="(min-width: 1024px) 352px, 90vw" className="max-w-[22rem] border border-noite-400/25" />
            <SimboloMarca
              tamanho={160}
              decorativo={false}
              className="w-32 sm:w-40"
            />
          </div>
        </div>
      </div>

      {/* ---------- Para quem ---------- */}
      <Secao className="py-16 lg:py-24">
        <TituloSecao
          icone="bussola"
          sobretitulo={home.secaoMotivos.sobretitulo}
          titulo={home.secaoMotivos.titulo}
          texto={home.secaoMotivos.texto}
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <ul className="grid gap-4 sm:grid-cols-2">
            {MOTIVOS.map((m) => (
              <li key={m.titulo} className="rounded-2xl border border-noite-100 bg-cartao p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-areia-200/55 text-brasa-500">
                  <Icone nome={m.icone} tamanho={21} />
                </span>
                <h3 className="mt-4 font-display text-xl text-noite-800">{m.titulo}</h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-tinta-700">{m.texto}</p>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-6">
            <Foto numero={2} />
            <AvisoCuidado compacto />
          </div>
        </div>

        <CTA
          variante="discreto"
          className="mt-10"
          titulo={home.secaoMotivos.chamada}
          rotulo={home.secaoMotivos.rotuloChamada}
        />
      </Secao>

      {/* ---------- Destaque ---------- */}
      <div className="border-y border-areia-200 bg-areia-200/25 py-16 lg:py-24">
        <Secao>
          <TituloSecao
            icone="estrela"
            sobretitulo={home.secaoDestaque.sobretitulo}
            titulo={home.secaoDestaque.titulo}
            texto={home.secaoDestaque.texto}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {terapiasDestaque.map((t) => (
              <CartaoTerapia key={t.slug} terapia={t} destaque />
            ))}
          </div>
        </Secao>
      </div>

      {/* ---------- Todas ---------- */}
      <Secao className="py-16 lg:py-24">
        <TituloSecao
          icone="folha"
          sobretitulo={home.secaoTodas.sobretitulo}
          titulo={home.secaoTodas.titulo}
          texto={home.secaoTodas.texto}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {terapias.map((t) => (
            <CartaoTerapia key={t.slug} terapia={t} />
          ))}
        </div>
        <Link
          href="/terapias"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-noite-200 px-6 py-3 text-[0.95rem] font-medium text-noite-700 transition hover:border-ouro-400 hover:text-noite-800"
        >
          {home.secaoTodas.rotuloLink}
          <Icone nome="seta" tamanho={17} />
        </Link>
      </Secao>

      {/* ---------- Formação em imagens ---------- */}
      <div className="aurora py-16 text-areia-100 lg:py-24">
        <Secao>
          <TituloSecao
            claro
            icone="foto"
            sobretitulo={home.secaoFormacao.sobretitulo}
            titulo={home.secaoFormacao.titulo}
            texto={home.secaoFormacao.texto}
          />
          <div className="mt-10">
            <Carrossel />
          </div>
        </Secao>
      </div>

      {/* ---------- Depoimentos ---------- */}
      <div className="border-y border-areia-200 bg-areia-200/25 py-16 lg:py-24">
        <Secao>
          <TituloSecao
            icone="conversa"
            sobretitulo={home.secaoDepoimentos.sobretitulo}
            titulo={home.secaoDepoimentos.titulo}
            texto={home.secaoDepoimentos.texto}
          />
          <Depoimentos className="mt-10" />
        </Secao>
      </div>

      {/* ---------- Blog ---------- */}
      <Secao className="py-16 lg:py-24">
        <TituloSecao
          icone="artigo"
          sobretitulo={home.secaoBlog.sobretitulo}
          titulo={home.secaoBlog.titulo}
          texto={home.secaoBlog.texto}
        />
        <div className="mt-10">
          <SecaoBlog />
        </div>
      </Secao>

      {/* ---------- Vídeos ---------- */}
      <div className="border-y border-areia-200 bg-areia-200/25 py-16 lg:py-24">
        <Secao>
          <TituloSecao
            icone="video"
            sobretitulo={home.secaoVideos.sobretitulo}
            titulo={home.secaoVideos.titulo}
            texto={home.secaoVideos.texto}
          />
          <div className="mt-10">
            <SecaoVideos />
          </div>
        </Secao>
      </div>

      {/* ---------- Como funciona ---------- */}
      <Secao className="py-16 lg:py-24">
        <TituloSecao
          icone="mapa"
          sobretitulo={home.secaoEtapas.sobretitulo}
          titulo={home.secaoEtapas.titulo}
          texto={home.secaoEtapas.texto}
        />
        <ol className="mt-10 grid gap-6 md:grid-cols-4">
          {ETAPAS.map((e, i) => (
            <li key={e.titulo} className="rounded-2xl border border-noite-100 bg-cartao p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-areia-200/55 text-brasa-500">
                  <Icone nome={e.icone} tamanho={21} />
                </span>
                <span className="font-display text-3xl text-ouro-600">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-4 font-display text-xl text-noite-800">{e.titulo}</h3>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-tinta-700">{e.texto}</p>
            </li>
          ))}
        </ol>
      </Secao>

      {/* ---------- Perguntas ---------- */}
      <div className="border-y border-areia-200 bg-areia-200/25 py-16 lg:py-24">
        <Secao>
          <TituloSecao
            icone="mente"
            sobretitulo={home.secaoPerguntas.sobretitulo}
            titulo={home.secaoPerguntas.titulo}
          />
          <div className="mt-8">
            <Perguntas perguntas={PERGUNTAS_GERAIS} />
          </div>
          <Link href="/perguntas-frequentes" className="mt-6 inline-flex items-center gap-2 text-[0.95rem] font-medium text-noite-600 underline underline-offset-4">
            {home.secaoPerguntas.rotuloLink}
            <Icone nome="seta" tamanho={16} />
          </Link>
        </Secao>
      </div>

      {/* ---------- Chamada final ---------- */}
      <Secao className="py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-center">
          <Foto numero={3} larguras="(min-width: 1152px) 1152px, 100vw" />
          <CTA
            titulo={home.chamadaFinal.titulo}
            texto={home.chamadaFinal.texto}
          />
        </div>
      </Secao>
    </>
  )
}
