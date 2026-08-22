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
        className={`sem-impressao fixed right-0 top-0 z-[80] flex h-full w-[min(23rem,88vw)] flex-col overflow-y-auto bg-areia-50 shadow-2xl transition-transform duration-300 ease-out ${
          aberto ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-areia-200 px-5 py-4">
          <span className="font-sans text-[0.8rem] uppercase tracking-[0.24em] text-tinta-500">Navegar</span>
          <button
            ref={fecharRef}
            type="button"
            onClick={aoFechar}
            aria-label="Fechar menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-noite-800 transition hover:bg-areia-200/60"
          >
            <Icone nome="fechar" tamanho={22} />
          </button>
        </div>

        <nav aria-label="Páginas principais" className="px-4 pt-5">
          <ul className="flex flex-col gap-1">
            {navPrincipal.map((item) => (
              <li key={item.href}>
                <Link
                  prefetch={false}
                  href={item.href}
                  onClick={aoFechar}
                  aria-current={ativo(item.href) ? 'page' : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-[1rem] transition ${
                    ativo(item.href) ? 'bg-areia-200/55 text-brasa-500' : 'text-noite-800 hover:bg-areia-200/35'
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
          <h2 className="px-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-tinta-500">
            Conteúdo
          </h2>
          <ul className="mt-2 flex flex-col gap-1">
            {navDrawer.map((item) => (
              <li key={item.href}>
                <Link
                  prefetch={false}
                  href={item.href}
                  onClick={aoFechar}
                  aria-current={ativo(item.href) ? 'page' : undefined}
                  className={`flex gap-3 rounded-xl px-3.5 py-3 transition ${
                    ativo(item.href) ? 'bg-areia-200/55' : 'hover:bg-areia-200/35'
                  }`}
                >
                  <span className={ativo(item.href) ? 'mt-0.5 text-brasa-500' : 'mt-0.5 text-noite-600'}>
                    <Icone nome={item.icone} tamanho={20} />
                  </span>
                  <span>
                    <span className={`block text-[0.98rem] ${ativo(item.href) ? 'text-brasa-500' : 'text-noite-800'}`}>
                      {item.rotulo}
                    </span>
                    {item.descricao && (
                      <span className="mt-0.5 block text-[0.8rem] leading-snug text-tinta-500">{item.descricao}</span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 px-4">
          <h2 className="px-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-tinta-500">
            As oito terapias
          </h2>
          <ul className="mt-2 grid grid-cols-2 gap-1">
            {terapias.map((t) => (
              <li key={t.slug}>
                <Link
                  prefetch={false}
                  href={`/terapias/${t.slug}`}
                  onClick={aoFechar}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-2.5 text-[0.85rem] transition ${
                    caminho === `/terapias/${t.slug}` ? 'bg-areia-200/55 text-brasa-500' : 'text-tinta-700 hover:bg-areia-200/35'
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
            className="flex items-center justify-center gap-2 rounded-xl bg-noite-600 px-4 py-3.5 text-[0.95rem] font-semibold text-areia-50 transition hover:bg-noite-400"
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
                className="flex h-11 w-11 items-center justify-center rounded-full border border-noite-200 text-noite-600 transition hover:border-brasa-500 hover:text-brasa-500"
              >
                <Icone nome={rede.icone} tamanho={20} />
              </a>
            ))}
          </div>

          <ul className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[0.75rem] text-tinta-500">
            {navLegal.map((item) => (
              <li key={item.href}>
                <Link prefetch={false} href={item.href} onClick={aoFechar} className="hover:text-noite-600">
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
