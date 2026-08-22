import Link from 'next/link'
import { SimboloSol } from './SimboloSol'

type Props = {
  variante?: 'clara' | 'escura'
  compacta?: boolean
  className?: string
  /** Símbolo animado (padrão). Desligue em contextos estáticos. */
  animado?: boolean
}

/**
 * Assinatura da marca, montada a partir do símbolo oficial.
 * `variante`: 'escura' = sobre fundo champagne (padrão da marca);
 *             'clara'  = sobre fundo azul.
 */
export function Logo({ variante = 'escura', compacta = false, className = '', animado = true }: Props) {
  const sobreAzul = variante === 'clara'
  const corNome = sobreAzul ? 'text-areia-50' : 'text-noite-800'
  const corSub = sobreAzul ? 'text-magenta-400' : 'text-brasa-500'

  return (
    <Link
      href="/"
      className={`grupo-marca group flex items-center gap-3 ${className}`}
      aria-label="Caio Gracco: Terapias da Completude, página inicial"
    >
      <SimboloSol
        variante={variante}
        animado={animado}
        className={`${compacta ? 'h-12 w-12' : 'h-16 w-16'} shrink-0 transition-transform duration-500 group-hover:scale-105`}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-sans font-light ${compacta ? 'text-[1.1rem]' : 'text-[1.3rem]'} tracking-[0.26em] uppercase ${corNome}`}
        >
          Caio Gracco
        </span>
        <span
          className={`mt-1.5 font-display italic ${compacta ? 'text-[0.86rem]' : 'text-[1rem]'} tracking-[0.04em] ${corSub}`}
        >
          Terapias da Completude
        </span>
      </span>
    </Link>
  )
}
