import Link from 'next/link'

type Props = { variante?: 'clara' | 'escura'; compacta?: boolean; className?: string }

/** Assinatura da marca: o símbolo, o nome do espaço e, abaixo, o nome do terapeuta. */
export function Logo({ variante = 'clara', compacta = false, className = '' }: Props) {
  const corNome = variante === 'clara' ? 'text-areia-50' : 'text-noite-800'
  const corSub = variante === 'clara' ? 'text-ouro-400' : 'text-ouro-600'

  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label="Caio Gracco — Espaço da Completude, página inicial"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo-mark.svg"
        alt=""
        aria-hidden="true"
        width={48}
        height={48}
        className={`${compacta ? 'h-11 w-11' : 'h-14 w-14'} shrink-0 transition-transform duration-500 group-hover:scale-105`}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display ${compacta ? 'text-[1.15rem]' : 'text-[1.3rem]'} tracking-[0.24em] uppercase ${corNome}`}
        >
          Caio Gracco
        </span>
        <span className={`mt-1.5 text-[0.62rem] tracking-[0.26em] uppercase ${corSub}`}>
          Espaço da Completude
        </span>
      </span>
    </Link>
  )
}
