'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import { navegacao } from '@/content/navegacao'
import { whatsappLink } from '@/content/site'

export function Cabecalho() {
  const [rolou, setRolou] = useState(false)
  const [menu, setMenu] = useState(false)
  const caminho = usePathname()

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  useEffect(() => setMenu(false), [caminho])
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menu])

  const ativo = (href: string) => (href === '/' ? caminho === '/' : caminho.startsWith(href))

  return (
    <header
      className={`sem-impressao sticky top-0 z-40 bg-noite-800 transition-all duration-300 ${
        rolou ? 'border-b border-noite-400/25 bg-noite-800/94 shadow-lg shadow-noite-900/25 backdrop-blur-lg' : ''
      }`}
    >
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-noite-800">
        Pular para o conteúdo
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 lg:px-8">
        <Logo compacta />

        <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
          {navegacao.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={ativo(item.href) ? 'page' : undefined}
              className={`rounded-lg px-3 py-2 text-[0.86rem] transition ${
                ativo(item.href) ? 'text-ouro-400' : 'text-areia-100/85 hover:text-areia-50'
              }`}
            >
              {item.rotulo}
            </Link>
          ))}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-full border border-ouro-400/70 px-4 py-2 text-[0.84rem] font-medium text-ouro-300 transition hover:bg-ouro-400 hover:text-noite-900"
          >
            Agendar
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMenu((v) => !v)}
          aria-expanded={menu}
          aria-controls="menu-mobile"
          aria-label={menu ? 'Fechar menu' : 'Abrir menu'}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-areia-50 lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            {menu ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {menu && (
        <div id="menu-mobile" className="aurora border-t border-noite-400/25 lg:hidden">
          <nav aria-label="Navegação principal" className="mx-auto flex max-w-6xl flex-col gap-1 px-5 pb-6 pt-3">
            {navegacao.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={ativo(item.href) ? 'page' : undefined}
                className={`rounded-xl px-4 py-3 text-[0.95rem] transition ${
                  ativo(item.href) ? 'bg-noite-700/70 text-ouro-400' : 'text-areia-100/90 hover:bg-noite-700/40'
                }`}
              >
                {item.rotulo}
              </Link>
            ))}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-xl bg-ouro-400 px-4 py-3 text-center text-[0.95rem] font-semibold text-noite-900"
            >
              Agendar pelo WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
