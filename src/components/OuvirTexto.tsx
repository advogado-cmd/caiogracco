'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Icone } from './Icone'

/**
 * Leitura em voz alta do artigo, feita pelo próprio navegador.
 *
 * Usa a Web Speech API, que já existe no Chrome, Safari, Edge e Firefox recentes.
 * Não há serviço externo, não há custo por caracter e nada do texto sai do
 * aparelho de quem lê. Se o navegador não tiver o recurso, o botão simplesmente
 * não aparece.
 *
 * O texto é quebrado em frases e enfileirado uma a uma. Isso resolve dois
 * problemas conhecidos: o limite de tamanho por chamada e o bug do Chrome que
 * interrompe falas longas depois de alguns segundos. Também permite mostrar o
 * progresso e retomar de onde parou.
 */

type Props = { texto: string; titulo: string }

const VELOCIDADES = [0.85, 1, 1.15, 1.35] as const

function emFrases(texto: string): string[] {
  const limpo = texto.replace(/\s+/g, ' ').trim()
  if (!limpo) return []
  // Quebra depois de pontuação final, preservando siglas e números com ponto.
  const bruto = limpo.match(/[^.!?…]+[.!?…]+(?:\s|$)|[^.!?…]+$/g) ?? [limpo]
  const frases: string[] = []
  for (const f of bruto) {
    const t = f.trim()
    if (!t) continue
    // Frases muito longas viram pedaços menores, para a fala não travar.
    if (t.length <= 240) { frases.push(t); continue }
    let resto = t
    while (resto.length > 240) {
      const corte = resto.lastIndexOf(', ', 240)
      const i = corte > 80 ? corte + 1 : 240
      frases.push(resto.slice(0, i).trim())
      resto = resto.slice(i).trim()
    }
    if (resto) frases.push(resto)
  }
  return frases
}

export function OuvirTexto({ texto, titulo }: Props) {
  const [suportado, setSuportado] = useState(false)
  const [tocando, setTocando] = useState(false)
  const [pausado, setPausado] = useState(false)
  const [indice, setIndice] = useState(0)
  const [velocidade, setVelocidade] = useState<number>(1)
  const vozRef = useRef<SpeechSynthesisVoice | null>(null)
  const indiceRef = useRef(0)
  const pararRef = useRef(false)

  const frases = useMemo(() => emFrases(`${titulo}. ${texto}`), [texto, titulo])

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    setSuportado(true)

    const escolherVoz = () => {
      const vozes = window.speechSynthesis.getVoices()
      if (!vozes.length) return
      vozRef.current =
        vozes.find((v) => v.lang === 'pt-BR' && /natural|google|luciana|francisca/i.test(v.name)) ??
        vozes.find((v) => v.lang === 'pt-BR') ??
        vozes.find((v) => v.lang.startsWith('pt')) ??
        null
    }

    escolherVoz()
    window.speechSynthesis.addEventListener('voiceschanged', escolherVoz)
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', escolherVoz)
      window.speechSynthesis.cancel()
    }
  }, [])

  // Se a pessoa sair da página no meio, a voz precisa parar junto.
  useEffect(() => {
    const aoSair = () => window.speechSynthesis?.cancel()
    window.addEventListener('pagehide', aoSair)
    return () => window.removeEventListener('pagehide', aoSair)
  }, [])

  const falarDe = useCallback(
    (inicio: number, taxa: number) => {
      if (!frases.length) return
      pararRef.current = false
      window.speechSynthesis.cancel()

      const proxima = (i: number) => {
        if (pararRef.current || i >= frases.length) {
          if (!pararRef.current) {
            setTocando(false)
            setPausado(false)
            setIndice(0)
            indiceRef.current = 0
          }
          return
        }
        indiceRef.current = i
        setIndice(i)

        const fala = new SpeechSynthesisUtterance(frases[i])
        fala.lang = 'pt-BR'
        fala.rate = taxa
        fala.pitch = 1
        if (vozRef.current) fala.voice = vozRef.current
        fala.onend = () => proxima(i + 1)
        fala.onerror = () => proxima(i + 1)
        window.speechSynthesis.speak(fala)
      }

      proxima(inicio)
      setTocando(true)
      setPausado(false)
    },
    [frases],
  )

  const alternar = () => {
    if (!tocando) { falarDe(indiceRef.current, velocidade); return }
    if (pausado) { window.speechSynthesis.resume(); setPausado(false); return }
    window.speechSynthesis.pause()
    setPausado(true)
  }

  const parar = () => {
    pararRef.current = true
    window.speechSynthesis.cancel()
    setTocando(false)
    setPausado(false)
    setIndice(0)
    indiceRef.current = 0
  }

  const trocarVelocidade = () => {
    const proxima = VELOCIDADES[(VELOCIDADES.indexOf(velocidade as (typeof VELOCIDADES)[number]) + 1) % VELOCIDADES.length]
    setVelocidade(proxima)
    if (tocando) falarDe(indiceRef.current, proxima)
  }

  if (!suportado || !frases.length) return null

  const progresso = Math.round((indice / frases.length) * 100)

  return (
    <div className="sem-impressao mt-8 rounded-2xl border border-areia-200 bg-cartao px-5 py-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={alternar}
          aria-label={tocando && !pausado ? 'Pausar a leitura em voz alta' : 'Ouvir este texto em voz alta'}
          className="flex h-11 items-center gap-2.5 rounded-full bg-noite-600 px-5 text-[0.9rem] font-semibold text-areia-50 transition hover:bg-noite-400"
        >
          <Icone nome={tocando && !pausado ? 'pausa' : 'som'} tamanho={18} />
          {tocando ? (pausado ? 'Continuar' : 'Pausar') : 'Ouvir este texto'}
        </button>

        {tocando && (
          <button
            type="button"
            onClick={parar}
            aria-label="Parar a leitura em voz alta"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-noite-200 text-tinta-700 transition hover:border-brasa-500 hover:text-brasa-500"
          >
            <Icone nome="parar" tamanho={16} />
          </button>
        )}

        <button
          type="button"
          onClick={trocarVelocidade}
          aria-label={`Velocidade da leitura: ${velocidade.toString().replace('.', ',')} vez. Tocar para mudar.`}
          className="flex h-11 items-center rounded-full border border-noite-200 px-4 text-[0.85rem] font-medium text-tinta-700 transition hover:border-ouro-400"
        >
          {velocidade.toString().replace('.', ',')}×
        </button>

        {!tocando && (
          <p className="text-[0.85rem] text-tinta-500">
            Leitura pela voz do seu aparelho, sem sair da página.
          </p>
        )}
      </div>

      {tocando && (
        <div className="mt-4">
          <div className="h-1 w-full overflow-hidden rounded-full bg-areia-200">
            <div
              className="h-full rounded-full bg-ouro-500 transition-[width] duration-500"
              style={{ width: `${progresso}%` }}
            />
          </div>
          <p aria-live="polite" className="mt-2 text-[0.78rem] text-tinta-500">
            {pausado ? 'Pausado' : 'Lendo'} · {progresso}%
          </p>
        </div>
      )}
    </div>
  )
}
