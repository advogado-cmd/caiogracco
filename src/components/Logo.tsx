import Link from 'next/link'

type Props = { variante?: 'clara' | 'escura'; compacta?: boolean; className?: string }

/**
 * Assinatura da marca, montada a partir do símbolo oficial.
 * `variante`: 'escura' = sobre fundo champagne (padrão da marca);
 *             'clara'  = sobre fundo azul, com o símbolo sem o disco de fundo.
 */
export function Logo({ variante = 'escura', compacta = false, className = '' }: Props) {
  const sobreAzul = variante === 'clara'
  const corNome = sobreAzul ? 'text-areia-50' : 'text-noite-800'
  const corSub = sobreAzul ? 'text-magenta-400' : 'text-brasa-500'
  const simbolo = sobreAzul
    ? '/brand/simbolo-oficial-transparente.svg'
    : '/brand/simbolo-oficial.svg'

  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label="Caio Gracco — Terapias da Completude, página inicial"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={simbolo}
        alt=""
        aria-hidden="true"
        width={56}
        height={56}
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
