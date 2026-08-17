import type { Metadata } from 'next'
import { Secao, TituloSecao } from '@/components/Secao'
import { AvisoCuidado } from '@/components/AvisoCuidado'
import { JsonLd } from '@/components/JsonLd'
import { site, whatsappLink } from '@/content/site'
import { terapias } from '@/content/terapias'
import { schemaBreadcrumb, schemaNegocio } from '@/lib/estrutura'

export const metadata: Metadata = {
  title: 'Contato e agendamento',
  description: `Agende um atendimento com Caio Gracco: WhatsApp ${site.telefoneFormatado}, e-mail ${site.email}. Espaço da Completude, ${site.endereco.rua}, ${site.endereco.cidade}/${site.endereco.estado}. Atendimento presencial e online.`,
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
      <JsonLd dados={[schemaNegocio(), schemaBreadcrumb([{ nome: 'Início', href: '/' }, { nome: 'Contato', href: '/contato' }])]} />

      <div className="aurora">
        <Secao className="pb-16 pt-14 lg:pb-20 lg:pt-20">
          <TituloSecao
            claro
            sobretitulo="Contato"
            titulo="Vamos conversar"
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
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="font-display text-2xl text-noite-800 sm:text-3xl">Onde atendemos</h2>

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
              <ul className="mt-3 flex flex-col gap-2 text-[0.94rem]">
                <li><a href={site.redes.instagram} target="_blank" rel="noopener noreferrer me" className="text-noite-600 underline underline-offset-4">Instagram {site.redes.instagramHandle}</a></li>
                <li><a href={site.redes.youtube} target="_blank" rel="noopener noreferrer me" className="text-noite-600 underline underline-offset-4">YouTube</a></li>
                <li><a href={site.redes.facebook} target="_blank" rel="noopener noreferrer me" className="text-noite-600 underline underline-offset-4">Facebook</a></li>
              </ul>
            </div>

            <div className="mt-8">
              <AvisoCuidado />
            </div>
          </div>

          <div>
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
      </Secao>
    </>
  )
}
