'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Icone } from './Icone'
import { galeriaFormacao, mini } from '@/content/galeria'

/**
 * Carrossel das imagens de formação e trajetória.
 *
 * Rola por scroll nativo com `scroll-snap`, o que mantém o gesto de arrastar
 * funcionando no celular sem biblioteca. O avanço automático pausa ao passar o
 * mouse, ao focar pelo teclado e quando a aba está oculta — e não roda para
 * quem pediu menos movimento no sistema.
 */
export function Carrossel({ intervalo = 4200 }: { intervalo?: number }) {
  const trilhoRef = useRef<HTMLUListElement>(null)
  const [pausado, setPausado] = useState(false)
  const [indice, setIndice] = useState(0)

  const irPara = useCallback((i: number) => {
    const trilho = trilhoRef.current
    if (!trilho) return
    const item = trilho.children[i] as HTMLElement | undefined
    if (!item) return
    trilho.scrollTo({ left: item.offsetLeft - trilho.offsetLeft, behavior: 'smooth' })
  }, [])

  const avancar = useCallback((passo: number) => {
    setIndice((i) => {
      const proximo = (i + passo + galeriaFormacao.length) % galeriaFormacao.length
      irPara(proximo)
      return proximo
    })
  }, [irPara])

  // Mantém o indicador em dia quando a pessoa arrasta com o dedo ou o trackpad.
  useEffect(() => {
    const trilho = trilhoRef.current
    if (!trilho) return
    let quadro = 0
    const aoRolar = () => {
      cancelAnimationFrame(quadro)
      quadro = requestAnimationFrame(() => {
        const filhos = [...trilho.children] as HTMLElement[]
        const centro = trilho.scrollLeft + trilho.clientWidth / 2
        let maisPerto = 0, menor = Infinity
        filhos.forEach((f, i) => {
          const d = Math.abs(f.offsetLeft - trilho.offsetLeft + f.clientWidth / 2 - centro)
          if (d < menor) { menor = d; maisPerto = i }
        })
        setIndice(maisPerto)
      })
    }
    trilho.addEventListener('scroll', aoRolar, { passive: true })
    return () => { cancelAnimationFrame(quadro); trilho.removeEventListener('scroll', aoRolar) }
  }, [])

  useEffect(() => {
    const menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (menosMovimento || pausado) return
    const t = setInterval(() => {
      if (document.hidden) return
      avancar(1)
    }, intervalo)
    return () => clearInterval(t)
  }, [pausado, intervalo, avancar])

  return (
    <div
      className="relative"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={() => setPausado(false)}
    >
      <ul
        ref={trilhoRef}
        aria-label="Cursos, formaturas e exames de Caio Gracco"
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {galeriaFormacao.map((g, i) => (
          <li
            key={g.id}
            aria-current={i === indice ? 'true' : undefined}
            className="w-[70%] shrink-0 snap-start sm:w-[42%] lg:w-[28%]"
          >
            <figure className="overflow-hidden rounded-2xl border border-noite-400/25 bg-noite-900/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mini(g.id)}
                alt={`${g.legenda} — ${g.contexto}`}
                loading="lazy"
                width={640}
                height={640}
                className="aspect-square w-full object-cover"
              />
              <figcaption className="px-4 py-3.5">
                <span className="block text-[0.92rem] font-medium leading-snug text-areia-50">{g.legenda}</span>
                <span className="mt-1 block text-[0.8rem] leading-snug text-noite-200">
                  {g.contexto}{g.ano ? ` · ${g.ano}` : ''}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button" onClick={() => avancar(-1)} aria-label="Imagem anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-noite-400/40 text-areia-100 transition hover:border-magenta-400 hover:text-magenta-400"
          >
            <span className="rotate-180"><Icone nome="seta" tamanho={19} /></span>
          </button>
          <button
            type="button" onClick={() => avancar(1)} aria-label="Próxima imagem"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-noite-400/40 text-areia-100 transition hover:border-magenta-400 hover:text-magenta-400"
          >
            <Icone nome="seta" tamanho={19} />
          </button>
          <span aria-live="polite" className="ml-2 text-[0.85rem] tabular-nums text-noite-200">
            {indice + 1} de {galeriaFormacao.length}
          </span>
        </div>

        <Link
          href="/sobre#galeria"
          className="inline-flex items-center gap-2 rounded-full border border-noite-300/50 px-5 py-2.5 text-[0.92rem] font-medium text-areia-100 transition hover:border-magenta-400 hover:text-magenta-400"
        >
          Ver a galeria completa
          <Icone nome="seta" tamanho={16} />
        </Link>
      </div>
    </div>
  )
}
