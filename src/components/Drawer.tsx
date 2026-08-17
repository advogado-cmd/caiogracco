'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { Icone } from './Icone'
import { navPrincipal, navDrawer, navLegal } from '@/content/navegacao'
import { terapias } from '@/content/terapias'
import { site, whatsappLink } from '@/content/site'

type Props = { aberto: boolean; aoFechar: () => void }

export function Drawer({ aberto, aoFechar }: Props) {
  const caminho = usePathname()
  const painelRef = useRef<HTMLDivElement>(null)
  const fecharRef = useRef<HTMLButtonElement>(null)

  // Trava a rolagem do fundo e devolve o foco ao fechar.
  useEffect(() => {
    if (!aberto) return
    const anterior = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    fecharRef.current?.focus()

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { aoFechar(); return }
      if (e.key !== 'Tab' || !painelRef.current) return
      // Mantém o foco preso dentro do painel enquanto ele estiver aberto.
      const focaveis = painelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focaveis.length) return
      const primeiro = focaveis[0]
      const ultimo = focaveis[focaveis.length - 1]
      if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus() }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus() }
    }

    document.addEventListener('keydown', aoTeclar)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', aoTeclar)
      anterior?.focus?.()
    }
  }, [aberto, aoFechar])

  const ativo = (href: string) => (href === '/' ? caminho === '/' : caminho.startsWith(href))

  return (
    <>
      <div
        onClick={aoFechar}
        aria-hidden="true"
        className={`sem-impressao fixed inset-0 z-[70] bg-noite-900/60 backdrop-blur-sm transition-opacity duration-300 ${
          aberto ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        ref={painelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={`sem-impressao aurora fixed right-0 top-0 z-[80] flex h-full w-[min(23rem,88vw)] flex-col overflow-y-auto shadow-2xl transition-transform duration-300 ease-out ${
          aberto ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-noite-400/25 px-5 py-4">
          <span className="font-display text-[0.9rem] uppercase tracking-[0.2em] text-areia-50">Navegar</span>
          <button
            ref={fecharRef}
            type="button"
            onClick={aoFechar}
            aria-label="Fechar menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-areia-100 transition hover:bg-noite-700/50"
          >
            <Icone nome="fechar" tamanho={22} />
          </button>
        </div>

        <nav aria-label="Páginas principais" className="px-4 pt-5">
          <ul className="flex flex-col gap-1">
            {navPrincipal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={aoFechar}
                  aria-current={ativo(item.href) ? 'page' : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-[1rem] transition ${
                    ativo(item.href) ? 'bg-noite-700/60 text-ouro-400' : 'text-areia-100 hover:bg-noite-700/35'
                  }`}
                >
                  <Icone nome={item.icone} tamanho={20} />
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 px-4">
          <h2 className="px-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-ouro-400">
            Conteúdo
          </h2>
          <ul className="mt-2 flex flex-col gap-1">
            {navDrawer.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={aoFechar}
                  aria-current={ativo(item.href) ? 'page' : undefined}
                  className={`flex gap-3 rounded-xl px-3.5 py-3 transition ${
                    ativo(item.href) ? 'bg-noite-700/60' : 'hover:bg-noite-700/35'
                  }`}
                >
                  <span className={ativo(item.href) ? 'mt-0.5 text-ouro-400' : 'mt-0.5 text-noite-200'}>
                    <Icone nome={item.icone} tamanho={20} />
                  </span>
                  <span>
                    <span className={`block text-[0.98rem] ${ativo(item.href) ? 'text-ouro-400' : 'text-areia-100'}`}>
                      {item.rotulo}
                    </span>
                    {item.descricao && (
                      <span className="mt-0.5 block text-[0.8rem] leading-snug text-noite-300">{item.descricao}</span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 px-4">
          <h2 className="px-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-ouro-400">
            As oito terapias
          </h2>
          <ul className="mt-2 grid grid-cols-2 gap-1">
            {terapias.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/terapias/${t.slug}`}
                  onClick={aoFechar}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-2.5 text-[0.85rem] transition ${
                    caminho === `/terapias/${t.slug}` ? 'bg-noite-700/60 text-ouro-400' : 'text-noite-200 hover:bg-noite-700/35'
                  }`}
                >
                  <Icone nome={t.icone} tamanho={17} />
                  {t.nomeCurto}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto px-4 pb-6 pt-8">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={aoFechar}
            className="flex items-center justify-center gap-2 rounded-xl bg-ouro-400 px-4 py-3.5 text-[0.95rem] font-semibold text-noite-900 transition hover:bg-ouro-300"
          >
            <Icone nome="whatsapp" tamanho={20} />
            Quero iniciar minha terapia
          </a>

          <div className="mt-5 flex items-center justify-center gap-3">
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
                className="flex h-11 w-11 items-center justify-center rounded-full border border-noite-400/45 text-noite-200 transition hover:border-ouro-400 hover:text-ouro-300"
              >
                <Icone nome={rede.icone} tamanho={20} />
              </a>
            ))}
          </div>

          <ul className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[0.75rem] text-noite-300">
            {navLegal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={aoFechar} className="hover:text-areia-100">
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
