'use client'

import { useCallback, useEffect, useState } from 'react'
import { Icone } from './Icone'
import { certificadosPorAno } from '@/content/certificados'

const mini = (a: string) => `/certificados/${a}-mini.webp`
const grande = (a: string) => `/certificados/${a}.webp`

/**
 * Formação em dois registros ao mesmo tempo: a lista, que é o que se lê, e os
 * certificados, que são o que se confere. Clicar em um deles abre o documento
 * inteiro, navegável pelo teclado.
 */
export function Certificados() {
  const [aberto, setAberto] = useState<number | null>(null)

  const fechar = useCallback(() => setAberto(null), [])
  const anterior = useCallback(
    () => setAberto((i) => (i === null ? null : (i - 1 + certificadosPorAno.length) % certificadosPorAno.length)),
    [],
  )
  const proximo = useCallback(
    () => setAberto((i) => (i === null ? null : (i + 1) % certificadosPorAno.length)),
    [],
  )

  useEffect(() => {
    if (aberto === null) return
    document.body.style.overflow = 'hidden'
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fechar()
      if (e.key === 'ArrowLeft') anterior()
      if (e.key === 'ArrowRight') proximo()
    }
    document.addEventListener('keydown', aoTeclar)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', aoTeclar)
    }
  }, [aberto, fechar, anterior, proximo])

  const item = aberto === null ? null : certificadosPorAno[aberto]

  return (
    <>
      <ol className="flex flex-col gap-3">
        {certificadosPorAno.map((c, i) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => setAberto(i)}
              className={`group flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition sm:gap-5 sm:p-5 ${
                c.destaque
                  ? 'border-ouro-500/45 bg-areia-200/30 hover:border-ouro-500'
                  : 'border-areia-200 bg-cartao hover:border-ouro-400'
              }`}
              aria-label={`Ver o certificado: ${c.titulo}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mini(c.arquivo)}
                alt=""
                aria-hidden="true"
                loading="lazy"
                width={560}
                height={560}
                className="h-16 w-16 shrink-0 rounded-lg border border-areia-200 object-cover transition duration-500 group-hover:scale-[1.04] sm:h-20 sm:w-20"
              />

              <span className="min-w-0 flex-1">
                <span className="flex items-baseline gap-2.5">
                  <span className="font-display text-[1.5rem] leading-none text-ouro-600">{c.ano}</span>
                  {c.horas ? (
                    <span className="text-[0.72rem] font-semibold uppercase tracking-wide text-tinta-500">
                      {c.horas.toLocaleString('pt-BR')} horas
                    </span>
                  ) : null}
                </span>
                <span className="mt-1.5 block font-display text-[1.1rem] leading-snug text-noite-800">
                  {c.titulo}
                </span>
                <span className="mt-1 block text-[0.88rem] leading-snug text-tinta-500">
                  {c.instituicao}
                  {c.local ? `, ${c.local}` : ''}
                </span>
                {c.nota ? (
                  <span className="mt-2 block text-[0.9rem] leading-relaxed text-tinta-700">{c.nota}</span>
                ) : null}
              </span>

              <span
                aria-hidden="true"
                className="mt-1 hidden shrink-0 text-tinta-500 transition group-hover:text-ouro-600 sm:block"
              >
                <Icone nome="foto" tamanho={18} />
              </span>
            </button>
          </li>
        ))}
      </ol>

      {item && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={item.titulo}
          className="fixed inset-0 z-[70] flex flex-col bg-noite-900/95 backdrop-blur-sm"
          onClick={fechar}
        >
          <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="text-[0.85rem] text-noite-200">
              {aberto! + 1} de {certificadosPorAno.length}
            </p>
            <button
              type="button"
              onClick={fechar}
              aria-label="Fechar"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-noite-400/50 text-areia-100 transition hover:border-ouro-400 hover:text-ouro-300"
            >
              <Icone nome="fechar" tamanho={20} />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center gap-2 px-2 sm:px-6" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={anterior}
              aria-label="Certificado anterior"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-noite-400/50 text-areia-100 transition hover:border-ouro-400 hover:text-ouro-300"
            >
              <span className="rotate-180"><Icone nome="seta" tamanho={20} /></span>
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={grande(item.arquivo)}
              alt={`Certificado: ${item.titulo}, ${item.instituicao}`}
              className="mx-auto max-h-full min-h-0 w-auto max-w-full rounded-xl object-contain"
            />

            <button
              type="button"
              onClick={proximo}
              aria-label="Próximo certificado"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-noite-400/50 text-areia-100 transition hover:border-ouro-400 hover:text-ouro-300"
            >
              <Icone nome="seta" tamanho={20} />
            </button>
          </div>

          <div className="shrink-0 px-6 py-5 text-center" onClick={(e) => e.stopPropagation()}>
            <p className="font-display text-[1.15rem] text-areia-50">{item.titulo}</p>
            <p className="mt-1 text-[0.9rem] text-noite-200">
              {item.instituicao}
              {item.data ? `, ${item.data}` : `, ${item.ano}`}
              {item.horas ? `, ${item.horas.toLocaleString('pt-BR')} horas` : ''}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
