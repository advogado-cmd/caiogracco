import Link from 'next/link'
import type { Metadata } from 'next'
import { Secao, TituloSecao } from '@/components/Secao'
import { JsonLd } from '@/components/JsonLd'
import { AvisoCuidado } from '@/components/AvisoCuidado'
import { site, whatsappLink } from '@/content/site'
import { terapias } from '@/content/terapias'
import { schemaBreadcrumb, schemaPessoa } from '@/lib/estrutura'

export const metadata: Metadata = {
  title: 'Sobre Caio Gracco — terapeuta desde os 14 anos',
  description:
    'Caio Gracco começou sua missão como terapeuta aos 14 anos. Hoje atende no Espaço da Completude, em Santa Rosa de Viterbo (SP), com Osatoshi, EMF Balancing Technique®, Elementoterapia Magnética e outras cinco abordagens.',
  alternates: { canonical: '/sobre' },
  openGraph: { url: `${site.url}/sobre`, title: 'Sobre Caio Gracco — Espaço da Completude', type: 'profile' },
}

export default function PaginaSobre() {
  return (
    <>
      <JsonLd dados={[schemaPessoa(), schemaBreadcrumb([{ nome: 'Início', href: '/' }, { nome: 'Sobre', href: '/sobre' }])]} />

      <div className="aurora">
        <Secao className="pb-16 pt-14 lg:pb-20 lg:pt-20">
          <TituloSecao
            claro
            sobretitulo="Quem atende"
            titulo="Caio Gracco"
            texto="“Comecei minha missão como terapeuta aos 14 anos de idade e venho me dedicando até hoje.”"
          />
        </Secao>
      </div>

      <Secao className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div className="max-w-3xl">
            <div className="prosa">
              <p>
                A caminhada de Caio Gracco começou cedo — aos 14 anos, quando o cuidado com o outro
                deixou de ser curiosidade e virou vocação. De lá para cá, foram décadas de estudo e de
                prática, passando por tradições muito diferentes entre si: o toque das terapias manuais
                japonesas, os pontos da medicina chinesa, o trabalho energético contemporâneo e, mais
                recentemente, o Osatoshi — a técnica japonesa transmitida pela Shinri, à qual ele hoje
                mais se dedica.
              </p>
              <p>
                O <strong>Espaço da Completude</strong> nasceu dessa reunião. O nome não é acidental:
                a proposta é olhar a pessoa inteira — corpo, emoção, história e sentido — em vez de
                atacar sintomas isolados. Em muitos atendimentos, mais de uma abordagem se combina, e
                em alguns o caminho mais honesto é encaminhar para outro profissional. Essa honestidade
                faz parte do trabalho.
              </p>
              <p>
                O atendimento acontece em Santa Rosa de Viterbo, no interior paulista, e também à
                distância — para as práticas em que a tradição permite. Quem chega costuma vir com
                algo que se repete: uma dor que volta, um ciclo que não fecha, um cansaço que dormir
                não resolve.
              </p>
            </div>

            <section aria-labelledby="formacao" className="mt-12">
              <h2 id="formacao" className="font-display text-2xl text-noite-800 sm:text-3xl">
                Formação e credenciamento
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {site.credenciais.map((c) => (
                  <li key={c} className="flex gap-3 rounded-xl border border-noite-100 bg-white px-5 py-4 text-[0.94rem] text-tinta-700">
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
                    <Link href={`/terapias/${t.slug}`} className="block rounded-xl border border-noite-100 bg-white px-5 py-4 transition hover:border-ouro-300">
                      <span className="font-display text-[1.05rem] text-noite-800">{t.nome}</span>
                      <span className="mt-0.5 block text-[0.82rem] text-tinta-500">{t.tagline}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="postura" className="mt-12">
              <h2 id="postura" className="font-display text-2xl text-noite-800 sm:text-3xl">
                Como este trabalho se apresenta
              </h2>
              <div className="prosa mt-4">
                <p>
                  Nada do que é oferecido aqui promete cura. As práticas têm origens, linguagens e
                  níveis de comprovação bem diferentes entre si — algumas integram as políticas públicas
                  de saúde, outras pertencem inteiramente ao campo da tradição e da fé. Em cada página
                  de terapia, isso está dito com clareza, sem exagero para mais nem para menos.
                </p>
                <p>
                  O compromisso é simples: acolher sem prometer, informar sem confundir e nunca ocupar
                  o lugar de um profissional de saúde.
                </p>
              </div>
              <div className="mt-6">
                <AvisoCuidado />
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="overflow-hidden rounded-2xl border border-noite-100 bg-white">
              <div className="aurora flex items-center justify-center p-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/logo-mark.svg" alt="" aria-hidden="true" width={160} height={160} className="h-32 w-32" />
              </div>
              <div className="p-6">
                <p className="font-display text-lg text-noite-800">{site.nomeCompleto}</p>
                <p className="mt-1 text-[0.85rem] text-tinta-500">Terapeuta integrativo · desde {site.desde} como MEI</p>
                <dl className="mt-4 flex flex-col gap-2 text-[0.86rem] text-tinta-700">
                  <div><dt className="inline font-medium">Onde: </dt><dd className="inline">{site.endereco.cidade}/{site.endereco.estado}</dd></div>
                  <div><dt className="inline font-medium">Atende: </dt><dd className="inline">presencial e online</dd></div>
                  <div><dt className="inline font-medium">Instagram: </dt><dd className="inline">{site.redes.instagramHandle}</dd></div>
                </dl>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 block rounded-xl bg-noite-800 px-4 py-3 text-center text-[0.9rem] font-semibold text-areia-50 transition hover:bg-noite-700"
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
