'use client'

import { useState } from 'react'
import { site, whatsappLink } from '@/content/site'

/** Botão flutuante de WhatsApp. Aparece após a primeira dobra e some ao imprimir. */
export function BotaoWhatsapp() {
  const [aberto, setAberto] = useState(false)

  return (
    <div
      className="sem-impressao fixed bottom-5 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-7 sm:right-6"
    >
      {aberto && (
        <div
          role="dialog"
          aria-label="Falar pelo WhatsApp"
          className="w-[17.5rem] rounded-2xl border border-noite-200 bg-cartao p-4 shadow-2xl shadow-noite-900/20"
        >
          <p className="font-display text-base text-noite-800">Vamos conversar?</p>
          <p className="mt-1.5 text-sm leading-relaxed text-tinta-700">
            Escreva contando o que está buscando. O Caio responde pessoalmente, sem compromisso de agendamento.
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0E7267] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B5C53]"
          >
            Abrir o WhatsApp
          </a>
          <p className="mt-2 text-center text-xs text-tinta-500">{site.telefoneFormatado}</p>
        </div>
      )}

      <div className="flex items-center gap-2">
        {!aberto && (
          <span className="hidden rounded-full bg-noite-800/95 px-3.5 py-2 text-xs font-medium text-areia-100 shadow-lg sm:block">
            Fale comigo
          </span>
        )}
        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-label={aberto ? 'Fechar contato por WhatsApp' : 'Abrir contato por WhatsApp'}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#128C7E] text-white shadow-xl shadow-[#128C7E]/35 transition hover:scale-105 hover:bg-[#0E7267] active:scale-95"
        >
          {aberto ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
              <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
              <path d="M12.04 2.5c-5.24 0-9.5 4.26-9.5 9.5 0 1.68.44 3.32 1.28 4.77L2.5 21.5l4.86-1.27a9.46 9.46 0 004.68 1.22h.01c5.23 0 9.49-4.26 9.49-9.5s-4.26-9.45-9.5-9.45zm0 17.36h-.01a7.86 7.86 0 01-4-1.1l-.29-.17-2.98.78.8-2.9-.19-.3a7.85 7.85 0 01-1.2-4.19c0-4.35 3.54-7.89 7.9-7.89a7.85 7.85 0 017.88 7.9c0 4.35-3.54 7.87-7.9 7.87z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
