import Link from 'next/link'
import type { Metadata } from 'next'
import { Secao, TituloSecao } from '@/components/Secao'
import { JsonLd } from '@/components/JsonLd'
import { site, whatsappLink } from '@/content/site'
import { terapias } from '@/content/terapias'
import { schemaBreadcrumb, schemaPessoa } from '@/lib/estrutura'
import { Foto } from '@/components/Foto'
import { Icone } from '@/components/Icone'
import { CTA } from '@/components/CTA'
import { Galeria } from '@/components/Galeria'
import { galeria, grande } from '@/content/galeria'
import { BarraCompartilhar } from '@/components/BarraCompartilhar'

export const metadata: Metadata = {
  title: 'Sobre Caio Gracco',
  description:
    'Caio Gracco começou sua missão como terapeuta aos 14 anos. Atende online para todo o Brasil e presencialmente, com oito abordagens integrativas.',
  alternates: { canonical: '/sobre' },
  openGraph: { url: `${site.url}/sobre`, title: 'Sobre Caio Gracco, Terapias da Completude', type: 'profile' },
}

export default function PaginaSobre() {
  return (
    <>
      <BarraCompartilhar titulo="Sobre Caio Gracco" />
      <JsonLd
        dados={[
          {
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: 'Formação e trajetória de Caio Gracco',
            description:
              'Registros dos cursos, formaturas e exames internacionais que compõem a formação de Caio Gracco em terapias integrativas.',
            url: `${site.url}/sobre#galeria`,
            image: galeria.map((g) => ({
              '@type': 'ImageObject',
              contentUrl: `${site.url}${grande(g.id)}`,
              name: g.legenda,
              description: `${g.contexto}${g.ano ? ` · ${g.ano}` : ''}`,
            })),
          },
        ]}
      />
      <JsonLd dados={[schemaPessoa(), schemaBreadcrumb([{ nome: 'Início', href: '/' }, { nome: 'Sobre', href: '/sobre' }])]} />

      <div className="aurora">
        <Secao className="pb-16 pt-14 lg:pb-20 lg:pt-20">
          <TituloSecao
            claro
            icone="coracao"
            sobretitulo="Quem atende"
            titulo="Caio Gracco"
            nivel={1}
            texto="“Comecei minha missão como terapeuta aos 14 anos de idade e venho me dedicando até hoje.”"
          />
        </Secao>
      </div>

      <Secao className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div className="max-w-3xl">
            <div className="prosa">
              <p>
                A caminhada de Caio Gracco começou cedo, aos 14 anos, quando o cuidado com o outro
                deixou de ser curiosidade e virou vocação. De lá para cá, foram décadas de estudo e de
                prática, passando por tradições muito diferentes entre si: o toque das terapias manuais
                japonesas, os pontos da medicina chinesa, o trabalho energético contemporâneo e, mais
                recentemente, o Osatoshi, a técnica japonesa transmitida pela Shinri, à qual ele hoje
                mais se dedica.
              </p>
              <p>
                O <strong>Terapias da Completude</strong> nasceu dessa reunião. O nome não é acidental:
                a proposta é olhar a pessoa inteira (corpo, emoção, história e sentido) em vez de
                atacar sintomas isolados. Em muitos atendimentos, mais de uma abordagem se combina, e
                em alguns o caminho mais honesto é encaminhar para outro profissional. Essa honestidade
                faz parte do trabalho.
              </p>
              <p>
                Boa parte do trabalho acontece à distância, com pessoas de todo o Brasil. O Osatoshi,
                o EMF Balancing e o Reiki não pedem que você esteja na mesma sala. As terapias de toque
                são atendidas presencialmente, no espaço do Caio. Quem chega costuma vir com
                algo que se repete: uma dor que volta, um ciclo que não fecha, um cansaço que dormir
                não resolve.
              </p>
            </div>

            <Foto numero={5} className="mt-10" />

            <CTA variante="discreto" className="mt-10" titulo="Quer conversar com o Caio?" />

            <section aria-labelledby="formacao" className="mt-12">
              <h2 id="formacao" className="font-display text-2xl text-noite-800 sm:text-3xl">
                Formação e credenciamento
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {site.credenciais.map((c) => (
                  <li key={c} className="flex gap-3 rounded-xl border border-noite-100 bg-cartao px-5 py-4 text-[0.94rem] text-tinta-700">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ouro-500" />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.85rem] text-tinta-500">
                O credenciamento em Osatoshi pode ser verificado na lista pública de terapeutas da{' '}
                <a href="https://www.osatoshi.com.br/terapeutas-credenciados" target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2">
                  Shinri do Brasil
                </a>.
              </p>
            </section>

            <section aria-labelledby="abordagens" className="mt-12">
              <h2 id="abordagens" className="font-display text-2xl text-noite-800 sm:text-3xl">
                As abordagens que domina hoje
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {terapias.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/terapias/${t.slug}`} className="flex items-center gap-3 rounded-xl border border-noite-100 bg-cartao px-5 py-4 transition hover:border-ouro-300">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-areia-200/55 text-brasa-500">
                        <Icone nome={t.icone} tamanho={19} />
                      </span>
                      <span>
                        <span className="block font-display text-[1.1rem] text-noite-800">{t.nome}</span>
                        <span className="mt-0.5 block text-[0.85rem] text-tinta-500">{t.tagline}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section id="galeria" aria-labelledby="galeria-titulo" className="mt-14 scroll-mt-24">
              <h2 id="galeria-titulo" className="flex items-center gap-3 font-display text-2xl text-noite-800 sm:text-3xl">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-areia-200/55 text-brasa-500">
                  <Icone nome="foto" tamanho={21} />
                </span>
                Formação e trajetória
              </h2>
              <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-tinta-700">
                Décadas de estudo deixam rastro. Estas são imagens dos cursos, formaturas e exames
                internacionais que sustentam o trabalho de hoje, do curso de Acupuntura do CEMETRAC
                ao exame de proficiência da Federação Mundial das Sociedades de Medicina Chinesa.
                Clique em qualquer foto para ampliar.
              </p>
              <div className="mt-8">
                <Galeria />
              </div>
            </section>

            <section aria-labelledby="postura" className="mt-14">
              <h2 id="postura" className="font-display text-2xl text-noite-800 sm:text-3xl">
                O jeito como eu trabalho
              </h2>
              <div className="prosa mt-4">
                <p>
                  Cada uma dessas tradições chegou até mim por um caminho diferente, e todas me
                  ensinaram a mesma coisa: quem procura ajuda não está atrás de promessa. Está atrás
                  de ser levado a sério.
                </p>
                <p>
                  Então é isso que ofereço. Escuto sem pressa. Explico o que vamos fazer e por quê,
                  em palavras que você entenda. E digo com franqueza quando percebo que o caminho é
                  outro. Às vezes o melhor que posso fazer por alguém é indicar um médico, um
                  psicólogo, alguém mais preparado para o que aquela pessoa está atravessando.
                </p>
                <p>
                  Nas páginas de cada terapia você encontra o que ela é, de onde veio e o que
                  esperar de uma sessão. Não por formalidade, mas porque acho que ninguém deveria
                  começar um processo sem saber onde está pisando.
                </p>
              </div>

              <CTA className="mt-12" />
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="overflow-hidden rounded-2xl border border-noite-100 bg-cartao">
              <Foto numero={4} className="rounded-none" />
              <div className="p-6">
                <p className="font-display text-lg text-noite-800">{site.nomeCompleto}</p>
                <p className="mt-1 text-[0.9rem] text-tinta-500">Terapeuta integrativo</p>
                <dl className="mt-4 flex flex-col gap-2 text-[0.86rem] text-tinta-700">
                  <div><dt className="inline font-medium">Onde: </dt><dd className="inline">todo o Brasil, à distância</dd></div>
                  <div><dt className="inline font-medium">Atende: </dt><dd className="inline">online e presencial</dd></div>
                  <div><dt className="inline font-medium">Instagram: </dt><dd className="inline">{site.redes.instagramHandle}</dd></div>
                </dl>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 block rounded-xl bg-noite-600 px-4 py-3 text-center text-[0.9rem] font-semibold text-areia-50 transition hover:bg-noite-400"
                >
                  Falar com o Caio
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Secao>
    </>
  )
}
