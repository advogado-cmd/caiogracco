'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import { Drawer } from './Drawer'
import { Icone } from './Icone'
import { BarraLeitura } from './BarraLeitura'
import { navPrincipal } from '@/content/navegacao'
import { whatsappLink } from '@/content/site'

export function Cabecalho() {
  const [rolou, setRolou] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const caminho = usePathname()

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  useEffect(() => setDrawer(false), [caminho])

  const ativo = (href: string) => (href === '/' ? caminho === '/' : caminho.startsWith(href))

  return (
    <>
      <header
        className={`sem-impressao sticky top-0 z-50 bg-noite-800 transition-all duration-300 ${
          rolou ? 'border-b border-noite-400/25 bg-noite-800/94 shadow-lg shadow-noite-900/25 backdrop-blur-lg' : ''
        }`}
      >
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-noite-800"
        >
          Pular para o conteúdo
        </a>

        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 lg:px-8">
          <Logo compacta />

          <div className="flex items-center gap-2">
            <nav aria-label="Navegação principal" className="hidden items-center gap-1 md:flex">
              {navPrincipal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={ativo(item.href) ? 'page' : undefined}
                  className={`rounded-lg px-3 py-2 text-[0.92rem] transition ${
                    ativo(item.href) ? 'text-ouro-400' : 'text-areia-100/85 hover:text-areia-50'
                  }`}
                >
                  {item.rotulo}
                </Link>
              ))}
            </nav>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-ouro-400/70 px-4 py-2 text-[0.88rem] font-medium text-ouro-300 transition hover:bg-ouro-400 hover:text-noite-900 lg:inline-block"
            >
              Agendar
            </a>

            <button
              type="button"
              onClick={() => setDrawer(true)}
              aria-expanded={drawer}
              aria-haspopup="dialog"
              aria-label="Abrir menu"
              className="flex h-11 items-center gap-2 rounded-lg px-3 text-areia-50 transition hover:bg-noite-700/50"
            >
              <Icone nome="menu" tamanho={22} />
              <span className="hidden text-[0.88rem] sm:inline">Menu</span>
            </button>
          </div>
        </div>

        <BarraLeitura />
      </header>

      <Drawer aberto={drawer} aoFechar={() => setDrawer(false)} />
    </>
  )
}
