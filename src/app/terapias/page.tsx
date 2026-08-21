import type { Metadata } from 'next'
import { Secao, TituloSecao } from '@/components/Secao'
import { CartaoTerapia } from '@/components/CartaoTerapia'
import { AvisoCuidado } from '@/components/AvisoCuidado'
import { JsonLd } from '@/components/JsonLd'
import { terapias } from '@/content/terapias'
import { schemaBreadcrumb } from '@/lib/estrutura'
import { site } from '@/content/site'
import { BarraCompartilhar } from '@/components/BarraCompartilhar'
import { CTA } from '@/components/CTA'

export const metadata: Metadata = {
  title: 'Terapias — Osatoshi, Reiki, Shiatsu e mais',
  description:
    'As oito terapias atendidas por Caio Gracco: Osatoshi, EMF Balancing Technique®, Elementoterapia Magnética, Reiki, Shiatsu, Acupuntura, Auriculoterapia e Seitai.',
  alternates: { canonical: '/terapias' },
  openGraph: { url: `${site.url}/terapias`, title: 'Terapias oferecidas por Caio Gracco' },
}

export default function PaginaTerapias() {
  return (
    <>
      <BarraCompartilhar titulo="Terapias — Caio Gracco" />
      <JsonLd
        dados={[
          schemaBreadcrumb([{ nome: 'Início', href: '/' }, { nome: 'Terapias', href: '/terapias' }]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Terapias oferecidas por Caio Gracco',
            itemListElement: terapias.map((t, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: t.nome,
              url: `${site.url}/terapias/${t.slug}`,
            })),
          },
        ]}
      />

      <div className="aurora">
        <Secao className="pb-16 pt-14 lg:pb-20 lg:pt-20">
          <TituloSecao
            claro
            icone="folha"
            sobretitulo="Terapias"
            titulo="Oito tradições, reunidas num só cuidado"
            nivel={1}
            texto="Cada abordagem tem sua origem, seu jeito de olhar e seus limites. Aqui você encontra o que cada uma é, para quem costuma fazer sentido e o que ela não promete."
          />
        </Secao>
      </div>

      <Secao className="py-14 lg:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {terapias.map((t) => (
            <CartaoTerapia key={t.slug} terapia={t} destaque={t.destaque} />
          ))}
        </div>

        <div className="mt-14 overflow-x-auto rounded-2xl border border-noite-100 bg-cartao">
          <table className="w-full min-w-[46rem] text-left text-[0.9rem]">
            <caption className="sr-only">
              Comparativo das terapias: formato de atendimento, duração e ciclo sugerido
            </caption>
            <thead className="bg-areia-200/45 text-[0.78rem] uppercase tracking-wider text-tinta-700">
              <tr>
                <th scope="col" className="px-5 py-3.5 font-semibold">Terapia</th>
                <th scope="col" className="px-5 py-3.5 font-semibold">À distância</th>
                <th scope="col" className="px-5 py-3.5 font-semibold">Duração</th>
                <th scope="col" className="px-5 py-3.5 font-semibold">Ciclo sugerido</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-noite-100">
              {terapias.map((t) => (
                <tr key={t.slug} className="align-top">
                  <th scope="row" className="px-5 py-4 font-medium text-noite-800">{t.nome}</th>
                  <td className="px-5 py-4 text-tinta-700">
                    {t.sessao.distancia === 'sim' ? 'Sim' : t.sessao.distancia === 'parcial' ? 'Parcial' : 'Presencial'}
                  </td>
                  <td className="px-5 py-4 text-tinta-700">{t.sessao.duracao}</td>
                  <td className="px-5 py-4 text-tinta-700">{t.sessao.frequencia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 max-w-3xl">
          <AvisoCuidado />
        </div>

        <CTA className="mt-16" />
      </Secao>
    </>
  )
}
