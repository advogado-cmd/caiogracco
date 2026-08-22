'use client'

import { useCallback, useEffect, useState } from 'react'
import { Icone } from './Icone'
import { galeria, mini, grande } from '@/content/galeria'

/** Grade de miniaturas com visualizador em tela cheia, navegável pelo teclado. */
export function Galeria() {
  const [aberta, setAberta] = useState<number | null>(null)

  const fechar = useCallback(() => setAberta(null), [])
  const anterior = useCallback(() => setAberta((i) => (i === null ? null : (i - 1 + galeria.length) % galeria.length)), [])
  const proxima = useCallback(() => setAberta((i) => (i === null ? null : (i + 1) % galeria.length)), [])

  useEffect(() => {
    if (aberta === null) return
    document.body.style.overflow = 'hidden'
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fechar()
      if (e.key === 'ArrowLeft') anterior()
      if (e.key === 'ArrowRight') proxima()
    }
    document.addEventListener('keydown', aoTeclar)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', aoTeclar)
    }
  }, [aberta, fechar, anterior, proxima])

  const item = aberta === null ? null : galeria[aberta]

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {galeria.map((g, i) => (
          <li key={g.id}>
            <button
              type="button"
              onClick={() => setAberta(i)}
              className="group relative block w-full overflow-hidden rounded-xl border border-noite-100 bg-cartao"
              aria-label={`Ampliar: ${g.legenda}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mini(g.id)}
                alt={g.legenda}
                loading="lazy"
                width={640}
                height={640}
                className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-noite-900/85 to-transparent p-3 pt-8 text-left">
                <span className="block text-[0.82rem] font-medium leading-snug text-areia-50">{g.legenda}</span>
                {g.ano && <span className="mt-0.5 block text-[0.72rem] text-ouro-300">{g.ano}</span>}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {item && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={item.legenda}
          className="sem-impressao fixed inset-0 z-[90] flex flex-col bg-noite-900/95 backdrop-blur-sm"
          onClick={fechar}
        >
          <div className="flex items-center justify-between px-5 py-4 text-areia-100">
            <span className="text-[0.85rem] tabular-nums text-noite-300">
              {(aberta ?? 0) + 1} de {galeria.length}
            </span>
            <button
              type="button"
              onClick={fechar}
              aria-label="Fechar"
              className="flex h-11 w-11 items-center justify-center rounded-lg transition hover:bg-noite-700/50"
            >
              <Icone nome="fechar" tamanho={22} />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center px-4 pb-4" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={anterior}
              aria-label="Foto anterior"
              className="mr-2 hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-noite-400/40 text-areia-100 transition hover:border-ouro-400 sm:flex"
            >
              <span className="rotate-180"><Icone nome="seta" tamanho={20} /></span>
            </button>

            <figure className="flex max-h-full min-w-0 flex-col items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={grande(item.id)}
                alt={`${item.legenda}, ${item.contexto}`}
                className="max-h-[70vh] w-auto max-w-full rounded-xl object-contain"
              />
              <figcaption className="mt-4 max-w-xl text-center">
                <span className="block font-display text-xl text-areia-50">{item.legenda}</span>
                <span className="mt-1 block text-[0.9rem] leading-relaxed text-noite-200">
                  {item.contexto}
                  {item.ano ? ` · ${item.ano}` : ''}
                </span>
              </figcaption>
            </figure>

            <button
              type="button"
              onClick={proxima}
              aria-label="Próxima foto"
              className="ml-2 hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-noite-400/40 text-areia-100 transition hover:border-ouro-400 sm:flex"
            >
              <Icone nome="seta" tamanho={20} />
            </button>
          </div>

          <div className="flex justify-center gap-3 pb-6 sm:hidden" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={anterior} aria-label="Foto anterior"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-noite-400/40 text-areia-100">
              <span className="rotate-180"><Icone nome="seta" tamanho={20} /></span>
            </button>
            <button type="button" onClick={proxima} aria-label="Próxima foto"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-noite-400/40 text-areia-100">
              <Icone nome="seta" tamanho={20} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
