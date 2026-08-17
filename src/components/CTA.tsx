import { Icone } from './Icone'
import { whatsappLink, site } from '@/content/site'

type Props = {
  titulo?: string
  texto?: string
  rotulo?: string
  mensagem?: string
  variante?: 'faixa' | 'discreto'
  className?: string
}

/**
 * Chamada para ação. A "faixa" fecha seções longas; o "discreto" entra no meio
 * do texto, para quem já decidiu antes de terminar a leitura.
 */
export function CTA({
  titulo = 'Quero iniciar minha terapia agora',
  texto = 'Escreva contando o que está acontecendo. O Caio responde pessoalmente, sem compromisso de agendamento.',
  rotulo = 'Quero iniciar minha terapia agora',
  mensagem,
  variante = 'faixa',
  className = '',
}: Props) {
  if (variante === 'discreto') {
    return (
      <div className={`flex flex-col gap-3 rounded-2xl border border-ouro-300/70 bg-ouro-200/25 px-5 py-5 sm:flex-row sm:items-center sm:justify-between ${className}`}>
        <p className="text-[1rem] font-medium text-noite-800">{titulo}</p>
        <a
          href={whatsappLink(mensagem)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-noite-800 px-5 py-3 text-[0.92rem] font-semibold text-areia-50 transition hover:bg-noite-700"
        >
          <Icone nome="whatsapp" tamanho={18} />
          {rotulo}
        </a>
      </div>
    )
  }

  return (
    <div className={`rounded-3xl border border-ouro-300/70 bg-gradient-to-br from-ouro-200/50 to-areia-100 px-6 py-12 text-center sm:px-12 ${className}`}>
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-ouro-600 shadow-sm">
        <Icone nome="semente" tamanho={26} />
      </span>
      <h2 className="mt-5 font-display text-3xl text-noite-800 sm:text-4xl">{titulo}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-[1.08rem] leading-relaxed text-tinta-700">{texto}</p>
      <a
        href={whatsappLink(mensagem)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-noite-800 px-8 py-4 text-[1rem] font-semibold text-areia-50 transition hover:bg-noite-700"
      >
        <Icone nome="whatsapp" tamanho={20} />
        {rotulo}
      </a>
      <p className="mt-4 text-[0.9rem] text-tinta-500">
        {site.telefoneFormatado} · {site.atendimento.horario}
      </p>
    </div>
  )
}
