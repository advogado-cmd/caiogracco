'use client'

import { useEffect, useState } from 'react'

/** Fina barra dourada que acompanha o quanto da página já foi lido. */
export function BarraLeitura() {
  const [progresso, setProgresso] = useState(0)

  useEffect(() => {
    let quadro = 0
    const calcular = () => {
      const altura = document.documentElement.scrollHeight - window.innerHeight
      setProgresso(altura > 0 ? Math.min(100, (window.scrollY / altura) * 100) : 0)
    }
    const aoRolar = () => {
      cancelAnimationFrame(quadro)
      quadro = requestAnimationFrame(calcular)
    }
    calcular()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRolar)
    return () => {
      cancelAnimationFrame(quadro)
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRolar)
    }
  }, [])

  return (
    <div
      className="sem-impressao absolute inset-x-0 bottom-0 h-[3px] bg-noite-900/40"
      role="progressbar"
      aria-label="Progresso de leitura da página"
      aria-valuenow={Math.round(progresso)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-ouro-300 via-ouro-400 to-brasa-400 transition-[width] duration-150 ease-out"
        style={{ width: `${progresso}%` }}
      />
    </div>
  )
}
