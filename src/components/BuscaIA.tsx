'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { buscar, type Documento } from '@/lib/busca'

const SUGESTOES = [
  'não consigo dormir',
  'o que é Osatoshi',
  'atende online?',
  'ansiedade',
  'dor nas costas',
  'como agendar',
]

const CORES: Record<Documento['tipo'], string> = {
  Terapia: 'bg-ouro-200 text-ouro-600',
  Pergunta: 'bg-noite-100 text-noite-600',
  'Glossário': 'bg-violeta-400/20 text-violeta-500',
  'Página': 'bg-agua-400/20 text-agua-500',
  'Vídeo': 'bg-brasa-400/20 text-brasa-500',
  Artigo: 'bg-magenta-400/20 text-magenta-500',
}

type Compacto = { i: string; t: string; r: string; h: string; p: Documento['tipo']; c?: string; b: string }

/** Cache no módulo: o índice é baixado uma vez por sessão, não uma vez por campo. */
let indiceEmMemoria: Documento[] | null = null
let baixando: Promise<Documento[]> | null = null

async function carregarIndice(): Promise<Documento[]> {
  if (indiceEmMemoria) return indiceEmMemoria
  if (baixando) return baixando
  baixando = fetch('/busca-indice.json')
    .then((r) => r.json())
    .then((dados: Compacto[]) => {
      indiceEmMemoria = dados.map((d) => ({
        id: d.i, titulo: d.t, trecho: d.r, href: d.h, tipo: d.p, contexto: d.c, corpo: d.b,
      }))
      return indiceEmMemoria
    })
    .catch(() => {
      baixando = null
      return []
    })
  return baixando
}

export function BuscaIA({ variante = 'clara' }: { variante?: 'clara' | 'escura' }) {
  const [consulta, setConsulta] = useState('')
  const [aberto, setAberto] = useState(false)
  const [destaque, setDestaque] = useState(-1)
  const [indice, setIndice] = useState<Documento[] | null>(indiceEmMemoria)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // O índice desce na primeira vez que alguém encosta na busca, e não antes.
  const puxarIndice = () => {
    if (indice) return
    carregarIndice().then(setIndice)
  }

  const resultados = useMemo(
    () => (indice && consulta.trim().length > 1 ? buscar(indice, consulta, 7) : []),
    [consulta, indice],
  )

  const carregando = !indice && consulta.trim().length > 1

  useEffect(() => {
    const aoClicarFora = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setAberto(false)
    }
    document.addEventListener('mousedown', aoClicarFora)
    return () => document.removeEventListener('mousedown', aoClicarFora)
  }, [])

  useEffect(() => setDestaque(-1), [consulta])

  const aoTeclar = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') { setAberto(false); inputRef.current?.blur(); return }
    if (!resultados.length) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setDestaque((d) => (d + 1) % resultados.length) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setDestaque((d) => (d - 1 + resultados.length) % resultados.length) }
    if (e.key === 'Enter' && destaque >= 0) {
      e.preventDefault()
      window.location.href = resultados[destaque].href
    }
  }

  const escura = variante === 'escura'

  return (
    <div ref={containerRef} className="relative z-[45] w-full">
      <div
        className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition sm:px-5 sm:py-3.5 ${
          escura
            ? 'border-noite-400/45 bg-noite-900/45 backdrop-blur focus-within:border-ouro-400/70'
            : 'border-noite-200 bg-cartao shadow-sm focus-within:border-ouro-400'
        }`}
      >
        <svg viewBox="0 0 24 24" className={`h-5 w-5 shrink-0 ${escura ? 'text-ouro-400' : 'text-noite-400'}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={consulta}
          onChange={(e) => { puxarIndice(); setConsulta(e.target.value); setAberto(true) }}
          onFocus={() => { puxarIndice(); setAberto(true) }}
          onPointerEnter={puxarIndice}
          onKeyDown={aoTeclar}
          placeholder="Descreva o que você procura, com suas palavras"
          aria-label="Buscar no site"
          aria-expanded={aberto && resultados.length > 0}
          aria-controls="resultados-busca"
          role="combobox"
          autoComplete="off"
          className={`w-full bg-transparent text-[1rem] outline-none placeholder:text-[0.95rem] ${
            escura ? 'text-areia-50 placeholder:text-noite-300' : 'text-tinta-900 placeholder:text-tinta-500'
          }`}
        />
        {consulta && (
          <button type="button" onClick={() => { setConsulta(''); inputRef.current?.focus() }} aria-label="Limpar busca"
            className={`shrink-0 text-xs ${escura ? 'text-noite-300 hover:text-areia-100' : 'text-tinta-500 hover:text-tinta-900'}`}>
            limpar
          </button>
        )}
      </div>

      {aberto && (
        <div
          id="resultados-busca"
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+0.6rem)] z-[45] max-h-[26rem] overflow-y-auto rounded-2xl border border-noite-200 bg-cartao p-2 shadow-2xl shadow-noite-900/15"
        >
          {consulta.trim().length <= 1 ? (
            <div className="p-3">
              <p className="px-1 pb-2 text-xs font-medium uppercase tracking-wider text-tinta-500">
                Experimente perguntar
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGESTOES.map((s) => (
                  <button key={s} type="button" onClick={() => setConsulta(s)}
                    className="rounded-full border border-noite-200 px-3 py-1.5 text-[0.8rem] text-tinta-700 transition hover:border-ouro-400 hover:bg-ouro-200/40">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : carregando ? (
            <div className="flex items-center gap-3 p-4 text-sm text-tinta-500">
              <span aria-hidden="true" className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-noite-200 border-t-ouro-500" />
              Procurando
            </div>
          ) : resultados.length === 0 ? (
            <div className="p-4">
              <p className="text-sm text-tinta-700">
                Não encontrei nada com essas palavras. Tente descrever a sensação ou a situação. Por
                exemplo, <em>&ldquo;acordo cansado&rdquo;</em> ou <em>&ldquo;brigas em casa&rdquo;</em>.
              </p>
              <Link href="/contato" className="mt-3 inline-block text-sm font-medium text-noite-600 underline underline-offset-4">
                Ou pergunte direto para mim
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col">
              {resultados.map((doc, i) => (
                <li key={doc.id}>
                  <Link
                    href={doc.href}
                    onClick={() => setAberto(false)}
                    role="option"
                    aria-selected={i === destaque}
                    className={`flex flex-col gap-1 rounded-xl px-3 py-2.5 transition ${
                      i === destaque ? 'bg-noite-100' : 'hover:bg-areia-200/40'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide ${CORES[doc.tipo]}`}>
                        {doc.tipo}
                      </span>
                      <span className="text-[0.95rem] font-medium text-tinta-900">{doc.titulo}</span>
                    </span>
                    <span className="line-clamp-2 text-[0.88rem] leading-snug text-tinta-500">{doc.trecho}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
