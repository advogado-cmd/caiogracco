import type { Metadata } from 'next'
import { Secao, TituloSecao } from '@/components/Secao'
import { AvisoCuidado } from '@/components/AvisoCuidado'
import { JsonLd } from '@/components/JsonLd'
import { site, whatsappLink } from '@/content/site'
import { terapias } from '@/content/terapias'
import { schemaBreadcrumb, schemaNegocio } from '@/lib/estrutura'
import { FormularioContato } from '@/components/FormularioContato'
import { Foto } from '@/components/Foto'
import { Icone } from '@/components/Icone'
import { BarraCompartilhar } from '@/components/BarraCompartilhar'
import { CTA } from '@/components/CTA'

export const metadata: Metadata = {
  title: 'Contato e agendamento',
  description: `Agende com Caio Gracco pelo WhatsApp ${site.telefoneFormatado}. Espaço da Completude, ${site.endereco.rua}, ${site.endereco.cidade}/${site.endereco.estado}. Presencial e online.`,
  alternates: { canonical: '/contato' },
  openGraph: { url: `${site.url}/contato`, title: 'Contato — Espaço da Completude' },
}

const mapa = `https://www.google.com/maps?q=${encodeURIComponent(
  `${site.endereco.rua}, ${site.endereco.bairro}, ${site.endereco.cidade} - ${site.endereco.estado}, ${site.endereco.cep}`,
)}&output=embed`

export default function PaginaContato() {
  const online = terapias.filter((t) => t.sessao.distancia === 'sim')
  const presencial = terapias.filter((t) => t.sessao.distancia !== 'sim')

  return (
    <>
      <BarraCompartilhar titulo="Contato — Espaço da Completude" />
      <JsonLd dados={[schemaNegocio(), schemaBreadcrumb([{ nome: 'Início', href: '/' }, { nome: 'Contato', href: '/contato' }])]} />

      <div className="aurora">
        <Secao className="pb-16 pt-14 lg:pb-20 lg:pt-20">
          <TituloSecao
            claro
            icone="conversa"
            sobretitulo="Contato"
            titulo="Vamos conversar"
            nivel={1}
            texto="O primeiro passo é uma mensagem. Conte o que está acontecendo, com suas palavras — não precisa saber o nome da terapia."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#25D366] px-6 py-3.5 text-[0.95rem] font-semibold text-white transition hover:bg-[#1FBB59]"
            >
              WhatsApp {site.telefoneFormatado}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="rounded-full border border-noite-300/50 px-6 py-3.5 text-[0.95rem] font-medium text-areia-100 transition hover:border-ouro-400 hover:text-ouro-300"
            >
              Enviar e-mail
            </a>
          </div>
        </Secao>
      </div>

      <Secao className="py-14 lg:py-20">
        <FormularioContato />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="flex items-center gap-3 font-display text-2xl text-noite-800 sm:text-3xl">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ouro-200/50 text-ouro-600">
                <Icone nome="mapa" tamanho={21} />
              </span>
              Onde atendemos
            </h2>

            <div className="mt-6 rounded-2xl border border-noite-100 bg-white p-6">
              <h3 className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ouro-600">Presencial</h3>
              <address className="mt-3 not-italic text-[0.98rem] leading-relaxed text-tinta-700">
                {site.nome}
                <br />
                {site.endereco.rua} — {site.endereco.bairro}
                <br />
                {site.endereco.cidade}/{site.endereco.estado} · CEP {site.endereco.cep}
              </address>
              <p className="mt-4 text-[0.88rem] text-tinta-500">{site.atendimento.horario}. Atendimento com hora marcada.</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {presencial.map((t) => (
                  <li key={t.slug} className="rounded-full bg-areia-100 px-3 py-1.5 text-[0.78rem] text-tinta-700">{t.nomeCurto}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-2xl border border-noite-100 bg-white p-6">
              <h3 className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ouro-600">À distância</h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-tinta-700">
                Para todo o Brasil, nas práticas em que a tradição permite o atendimento remoto.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {online.map((t) => (
                  <li key={t.slug} className="rounded-full bg-agua-400/15 px-3 py-1.5 text-[0.78rem] text-agua-500">{t.nomeCurto}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-2xl border border-noite-100 bg-white p-6">
              <h3 className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ouro-600">Nas redes</h3>
              <ul className="mt-4 flex gap-3">
                {([
                  { href: site.redes.instagram, icone: 'instagram', rotulo: 'Instagram' },
                  { href: site.redes.youtube, icone: 'youtube', rotulo: 'YouTube' },
                  { href: site.redes.facebook, icone: 'facebook', rotulo: 'Facebook' },
                ] as const).map((rede) => (
                  <li key={rede.rotulo}>
                    <a
                      href={rede.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      aria-label={`${rede.rotulo} de Caio Gracco`}
                      title={rede.rotulo}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-noite-200 text-tinta-700 transition hover:border-ouro-400 hover:text-noite-800"
                    >
                      <Icone nome={rede.icone} tamanho={21} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <AvisoCuidado />
            </div>
          </div>

          <div>
            <Foto numero={6} className="mb-8" />
            <h2 className="font-display text-2xl text-noite-800 sm:text-3xl">Como chegar</h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-noite-100">
              <iframe
                src={mapa}
                title={`Mapa da localização do ${site.nome} em ${site.endereco.cidade}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[22rem] w-full border-0 sm:h-[28rem]"
              />
            </div>

            <div className="mt-8 rounded-2xl border border-ouro-300/70 bg-ouro-200/25 p-6">
              <h3 className="font-display text-lg text-noite-800">O que escrever na primeira mensagem</h3>
              <ul className="mt-3 flex flex-col gap-2 text-[0.92rem] leading-relaxed text-tinta-700">
                <li>· O que está acontecendo, do seu jeito — sem precisar de termos técnicos.</li>
                <li>· Há quanto tempo isso vem acontecendo.</li>
                <li>· Se você prefere atendimento presencial ou online.</li>
                <li>· Se já faz algum acompanhamento de saúde (isso ajuda, e não impede nada).</li>
              </ul>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 block rounded-xl bg-noite-800 px-4 py-3 text-center text-[0.9rem] font-semibold text-areia-50 transition hover:bg-noite-700"
              >
                Escrever agora
              </a>
            </div>
          </div>
        </div>

        <CTA className="mt-16" />
      </Secao>
    </>
  )
}
