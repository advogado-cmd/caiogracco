'use client'

import { useEffect, useState } from 'react'
import { Icone } from './Icone'

type Props = { titulo: string; className?: string }

/** Compartilhamento fixo: coluna à esquerda no desktop, faixa discreta no mobile. */
export function BarraCompartilhar({ titulo, className = '' }: Props) {
  const [url, setUrl] = useState('')
  const [copiado, setCopiado] = useState(false)

  useEffect(() => setUrl(window.location.href), [])

  const texto = encodeURIComponent(titulo)
  const enc = encodeURIComponent(url)

  const opcoes = [
    { rotulo: 'Compartilhar no WhatsApp', icone: 'whatsapp' as const, href: `https://wa.me/?text=${texto}%20${enc}` },
    { rotulo: 'Compartilhar no Facebook', icone: 'facebook' as const, href: `https://www.facebook.com/sharer/sharer.php?u=${enc}` },
  ]

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2200)
    } catch {
      setCopiado(false)
    }
  }

  const nativo = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try { await navigator.share({ title: titulo, url }) } catch { /* usuário cancelou */ }
    } else {
      copiar()
    }
  }

  return (
    <>
      {/* Desktop — coluna fixa */}
      <aside
        aria-label="Compartilhar esta página"
        className={`sem-impressao fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-2 xl:flex ${className}`}
      >
        {/* O rótulo escrito transbordava a coluna e cobria o texto da página.
            Os botões já se identificam por title e aria-label. */}
        <span className="sr-only">Compartilhar</span>
        <span aria-hidden="true" className="mb-1 flex h-9 w-9 items-center justify-center rounded-full border border-noite-200 bg-cartao text-tinta-500 shadow-sm">
          <Icone nome="compartilhar" tamanho={16} />
        </span>
        {opcoes.map((o) => (
          <a
            key={o.rotulo}
            href={o.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={o.rotulo}
            title={o.rotulo}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-noite-200 bg-cartao text-tinta-700 shadow-sm transition hover:border-ouro-400 hover:text-noite-800"
          >
            <Icone nome={o.icone} tamanho={19} />
          </a>
        ))}
        <button
          type="button"
          onClick={copiar}
          aria-label="Copiar o endereço desta página"
          title={copiado ? 'Endereço copiado' : 'Copiar endereço'}
          className={`flex h-11 w-11 items-center justify-center rounded-full border bg-cartao shadow-sm transition ${
            copiado ? 'border-ouro-400 text-ouro-600' : 'border-noite-200 text-tinta-700 hover:border-ouro-400 hover:text-noite-800'
          }`}
        >
          <Icone nome="link" tamanho={19} />
        </button>
        <span aria-live="polite" className="sr-only">{copiado ? 'Endereço copiado' : ''}</span>
      </aside>

      {/* Mobile e tablet — faixa em linha */}
      <div className="sem-impressao mt-10 flex items-center gap-3 rounded-2xl border border-noite-100 bg-cartao px-5 py-4 xl:hidden">
        <span className="flex items-center gap-2 text-[0.85rem] font-medium text-tinta-700">
          <Icone nome="compartilhar" tamanho={18} />
          Compartilhar
        </span>
        <div className="ml-auto flex items-center gap-2">
          {opcoes.map((o) => (
            <a
              key={o.rotulo}
              href={o.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={o.rotulo}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-noite-200 text-tinta-700 transition hover:border-ouro-400"
            >
              <Icone nome={o.icone} tamanho={18} />
            </a>
          ))}
          <button
            type="button"
            onClick={nativo}
            aria-label="Mais opções de compartilhamento"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-noite-200 text-tinta-700 transition hover:border-ouro-400"
          >
            <Icone nome={copiado ? 'link' : 'compartilhar'} tamanho={18} />
          </button>
        </div>
      </div>
    </>
  )
}
