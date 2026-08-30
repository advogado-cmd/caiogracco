'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { Icone } from './Icone'
import {
  lerConsentimento, gravarConsentimento, aplicarConsentimento,
  temTagsConfiguradas, type Consentimento,
} from '@/lib/consentimento'

/** Evento global para reabrir o painel a partir de qualquer link do site. */
export const EVENTO_ABRIR_PREFERENCIAS = 'cg:abrir-preferencias-cookies'

export function ConsentimentoCookies() {
  const [estado, setEstado] = useState<'oculto' | 'aviso' | 'preferencias'>('oculto')
  const [analise, setAnalise] = useState(false)
  const [publicidade, setPublicidade] = useState(false)

  useEffect(() => {
    const salvo = lerConsentimento()
    if (salvo) {
      setAnalise(salvo.analise)
      setPublicidade(salvo.publicidade)
      aplicarConsentimento(salvo)
      return
    }
    // Sem tag configurada não há o que consentir, e não incomodamos ninguém à toa.
    if (!temTagsConfiguradas()) return
    const t = setTimeout(() => setEstado('aviso'), 900)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const abrir = () => {
      const salvo = lerConsentimento()
      setAnalise(salvo?.analise ?? false)
      setPublicidade(salvo?.publicidade ?? false)
      setEstado('preferencias')
    }
    window.addEventListener(EVENTO_ABRIR_PREFERENCIAS, abrir)
    return () => window.removeEventListener(EVENTO_ABRIR_PREFERENCIAS, abrir)
  }, [])

  const decidir = useCallback((escolha: Pick<Consentimento, 'analise' | 'publicidade'>) => {
    gravarConsentimento(escolha)
    setAnalise(escolha.analise)
    setPublicidade(escolha.publicidade)
    setEstado('oculto')
  }, [])

  if (estado === 'oculto') return null

  const Chave = ({ id, ligado, aoMudar, titulo, texto, fixo = false }: {
    id: string; ligado: boolean; aoMudar?: (v: boolean) => void
    titulo: string; texto: string; fixo?: boolean
  }) => (
    <div className="flex items-start gap-4 rounded-xl border border-noite-100 bg-cartao p-4">
      <input
        id={id}
        type="checkbox"
        checked={ligado}
        disabled={fixo}
        onChange={(e) => aoMudar?.(e.target.checked)}
        className="mt-1 h-5 w-5 shrink-0 rounded border-noite-300 accent-[#764D17] disabled:opacity-60"
      />
      <label htmlFor={id} className="min-w-0">
        <span className="block text-[0.98rem] font-medium text-noite-800">
          {titulo}
          {fixo && <span className="ml-2 text-[0.75rem] font-normal text-tinta-500">sempre ativo</span>}
        </span>
        <span className="mt-1 block text-[0.9rem] leading-relaxed text-tinta-700">{texto}</span>
      </label>
    </div>
  )

  return (
    <div
      role="dialog"
      aria-modal={estado === 'preferencias'}
      aria-labelledby="consent-titulo"
      className={`sem-impressao fixed inset-x-0 bottom-0 z-[85] ${
        estado === 'preferencias' ? 'top-0 flex items-center justify-center bg-noite-900/60 p-4 backdrop-blur-sm' : 'p-4'
      }`}
    >
      <div
        className={`mx-auto w-full rounded-2xl border border-noite-200 bg-areia-50 shadow-2xl shadow-noite-900/25 ${
          estado === 'preferencias' ? 'max-h-[90vh] max-w-2xl overflow-y-auto p-6 sm:p-8' : 'max-w-4xl p-5 sm:p-6'
        }`}
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ouro-200/60 text-ouro-600">
            <Icone nome="escudo" tamanho={20} />
          </span>
          <div className="min-w-0">
            <h2 id="consent-titulo" className="font-display text-xl text-noite-800">
              {estado === 'aviso' ? 'Sobre os cookies deste site' : 'Preferências de cookies'}
            </h2>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-tinta-700">
              O conteúdo aqui funciona sem nenhum cookie. Usamos cookies apenas para medir a audiência
              e para mostrar anúncios a quem já visitou o site, e só se você permitir. Você pode mudar
              de ideia a qualquer momento.{' '}
              <Link href="/privacidade" className="underline underline-offset-2 hover:text-noite-600">
                Leia a Política de Privacidade
              </Link>
              .
            </p>
          </div>
        </div>

        {estado === 'preferencias' && (
          <div className="mt-6 flex flex-col gap-3">
            <Chave
              id="c-essencial" ligado fixo
              titulo="Essenciais"
              texto="Guardam apenas a sua escolha sobre cookies, para não perguntarmos de novo. Não identificam você nem saem do seu navegador."
            />
            <Chave
              id="c-analise" ligado={analise} aoMudar={setAnalise}
              titulo="Medição de audiência"
              texto="Google Analytics, com IP anonimizado. Mostram quantas pessoas visitam o site e quais páginas ajudam mais, sem identificar quem é você."
            />
            <Chave
              id="c-publicidade" ligado={publicidade} aoMudar={setPublicidade}
              titulo="Publicidade e remarketing"
              texto="Google Ads. Permitem medir se um anúncio trouxe alguém até aqui e reapresentar o site a quem já visitou. Nenhum dado de saúde é usado para segmentar anúncios."
            />
          </div>
        )}

        <div className={`mt-5 flex flex-col gap-2.5 ${estado === 'aviso' ? 'sm:flex-row sm:justify-end' : ''}`}>
          {estado === 'aviso' ? (
            <>
              <button type="button" onClick={() => setEstado('preferencias')}
                className="rounded-xl border border-noite-200 px-5 py-3 text-[0.95rem] font-medium text-noite-700 transition hover:border-ouro-400">
                Escolher o que permitir
              </button>
              <button type="button" onClick={() => decidir({ analise: false, publicidade: false })}
                className="rounded-xl border border-noite-200 px-5 py-3 text-[0.95rem] font-medium text-noite-700 transition hover:border-ouro-400">
                Recusar todos
              </button>
              <button type="button" onClick={() => decidir({ analise: true, publicidade: true })}
                className="rounded-xl bg-noite-600 px-5 py-3 text-[0.95rem] font-semibold text-areia-50 transition hover:bg-noite-400">
                Aceitar todos
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => decidir({ analise: false, publicidade: false })}
                className="rounded-xl border border-noite-200 px-5 py-3 text-[0.95rem] font-medium text-noite-700 transition hover:border-ouro-400">
                Recusar todos
              </button>
              <button type="button" onClick={() => decidir({ analise, publicidade })}
                className="rounded-xl bg-noite-600 px-5 py-3 text-[0.95rem] font-semibold text-areia-50 transition hover:bg-noite-400">
                Salvar minhas escolhas
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/** Link que reabre o painel, usado no rodapé e na política. */
export function BotaoPreferenciasCookies({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(EVENTO_ABRIR_PREFERENCIAS))}
      className={className}
    >
      Preferências de cookies
    </button>
  )
}
