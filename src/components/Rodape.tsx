import Link from 'next/link'
import { site, whatsappLink } from '@/content/site'
import { terapias } from '@/content/terapias'
import { navegacao, navLegal } from '@/content/navegacao'
import { Icone } from './Icone'
import { BotaoPreferenciasCookies } from './ConsentimentoCookies'

export function Rodape() {
  const ano = 2026

  return (
    <footer className="aurora mt-24 text-areia-100">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4">
          <div className="lg:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-mark-escuro.svg" alt="" aria-hidden="true" width={64} height={64} className="h-16 w-16" />
            <p className="mt-4 font-display text-lg uppercase tracking-[0.24em] text-areia-50">
              Caio Gracco
            </p>
            <p className="mt-1.5 text-[0.68rem] uppercase tracking-[0.26em] text-ouro-400">Terapias da Completude</p>
            <p className="mt-4 max-w-xs text-[0.86rem] leading-relaxed text-noite-200">
              Cuidado integrativo à distância, para todo o Brasil, e presencial, com hora marcada.
            </p>
          </div>

          <nav aria-label="Terapias" className="text-[0.88rem]">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-ouro-400">Terapias</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {terapias.map((t) => (
                <li key={t.slug}>
                  <Link href={`/terapias/${t.slug}`} className="text-noite-200 transition hover:text-areia-50">
                    {t.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Navegação do rodapé" className="text-[0.88rem]">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-ouro-400">Navegar</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-noite-200 transition hover:text-areia-50">
                    {item.rotulo}
                  </Link>
                </li>
              ))}
              {navLegal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-noite-200 transition hover:text-areia-50">
                    {item.rotulo}
                  </Link>
                </li>
              ))}
              <li>
                <BotaoPreferenciasCookies className="text-left text-noite-200 transition hover:text-areia-50" />
              </li>
            </ul>
          </nav>

          <div className="text-[0.88rem]">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-ouro-400">Contato</h2>
            <address className="mt-4 flex flex-col gap-2.5 not-italic text-noite-200">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="transition hover:text-areia-50">
                WhatsApp {site.telefoneFormatado}
              </a>
              <a href={`mailto:${site.email}`} className="break-all transition hover:text-areia-50">
                {site.email}
              </a>
              <span>
                {site.endereco.rua}, {site.endereco.bairro}
                <br />
                {site.endereco.cidade}/{site.endereco.estado} · CEP {site.endereco.cep}
              </span>
              <span className="text-noite-300">{site.atendimento.horario}</span>
            </address>

            <div className="mt-5 flex gap-3">
              {([
                { href: site.redes.instagram, icone: 'instagram', rotulo: 'Instagram' },
                { href: site.redes.youtube, icone: 'youtube', rotulo: 'YouTube' },
                { href: site.redes.facebook, icone: 'facebook', rotulo: 'Facebook' },
              ] as const).map((rede) => (
                <a
                  key={rede.rotulo}
                  href={rede.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={`${rede.rotulo} de Caio Gracco`}
                  title={rede.rotulo}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-noite-400/50 text-noite-200 transition hover:border-ouro-400 hover:text-ouro-300"
                >
                  <Icone nome={rede.icone} tamanho={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="regua-ouro my-9" />

        <div className="flex flex-col gap-3 text-[0.78rem] text-noite-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© {ano} Caio Gracco · Terapias da Completude · CNPJ {site.cnpj}</p>
          <p className="max-w-xl sm:text-right">
            Práticas complementares de bem-estar. Não substituem acompanhamento médico, psicológico ou psiquiátrico.
          </p>
        </div>
      </div>
    </footer>
  )
}
