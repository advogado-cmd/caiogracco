type Props = {
  /** 'clara' = sobre fundo azul; 'escura' = sobre o champagne padrão. */
  variante?: 'clara' | 'escura'
  className?: string
  /** Desliga a animação (para impressão, e-mail, favicons). */
  animado?: boolean
}

/**
 * Símbolo oficial — o sol da Completude — desenhado inline para poder animar.
 *
 * Só os raios se movem: os longos e os curtos irradiam em tempos opostos,
 * um estendendo enquanto o outro recolhe. O anel, o núcleo e a divisão
 * dourado/rosa ficam exatamente onde o manual os colocou.
 *
 * Quem pediu `prefers-reduced-motion: reduce` vê o símbolo parado.
 */
export function SimboloSol({ variante = 'escura', className = '', animado = true }: Props) {
  const p = variante === 'clara' ? 'solc' : 'sole'
  const raio = (n: string) => `url(#${p}-${n})`
  const cls = animado ? 'sol' : 'sol sol--parado'

  return (
    <svg
      viewBox="-24 -24 248 248"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className={`${cls} ${className}`}
    >
      <defs>
        <linearGradient id={`${p}-fgL`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F8DC9C" />
          <stop offset="1" stopColor="#D89B2A" />
        </linearGradient>
        <linearGradient id={`${p}-fgD`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C1841D" />
          <stop offset="1" stopColor="#8C5B0F" />
        </linearGradient>
        <linearGradient id={`${p}-frL`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2B4CC" />
          <stop offset="1" stopColor="#C55388" />
        </linearGradient>
        <linearGradient id={`${p}-frD`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A93C6F" />
          <stop offset="1" stopColor="#77234B" />
        </linearGradient>
        <linearGradient id={`${p}-ring`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#E289AE" />
          <stop offset="0.6" stopColor="#C55388" />
          <stop offset="1" stopColor="#9E3467" />
        </linearGradient>
        <linearGradient id={`${p}-core`} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#F4D07A" />
          <stop offset="0.5" stopColor="#DDA436" />
          <stop offset="1" stopColor="#BC821E" />
        </linearGradient>
        <filter id={`${p}-soft`} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="1.2" dy="2.2" stdDeviation="2.4" floodColor="#6D5119" floodOpacity="0.32" />
        </filter>

        <g id={`${p}-ribLongG`}>
          <rect x="110.1" y="20" width="1.9" height="50" fill={raio('fgL')} />
          <rect x="112" y="21.4" width="1.9" height="48.6" fill={raio('fgD')} />
        </g>
        <g id={`${p}-ribShortG`}>
          <rect x="110.1" y="38" width="1.9" height="32" fill={raio('fgL')} />
          <rect x="112" y="39.2" width="1.9" height="30.8" fill={raio('fgD')} />
        </g>
        <g id={`${p}-ribLongR`}>
          <rect x="110.1" y="20" width="1.9" height="50" fill={raio('frL')} />
          <rect x="112" y="21.4" width="1.9" height="48.6" fill={raio('frD')} />
        </g>
        <g id={`${p}-ribShortR`}>
          <rect x="110.1" y="38" width="1.9" height="32" fill={raio('frL')} />
          <rect x="112" y="39.2" width="1.9" height="30.8" fill={raio('frD')} />
        </g>
      </defs>

      {/* anel externo */}
      <circle cx="100" cy="100" r="96" fill="none" stroke={raio('ring')} strokeWidth="1.4" />

      {/* coroa de raios — os longos e os curtos irradiam em tempos opostos */}
      <g filter={`url(#${p}-soft)`}>
        <g className="sol-raios-longos">
          <use href={`#${p}-ribLongG`} />
          <use href={`#${p}-ribLongG`} transform="rotate(40 100 100)" />
          <use href={`#${p}-ribLongG`} transform="rotate(80 100 100)" />
          <use href={`#${p}-ribLongG`} transform="rotate(120 100 100)" />
          <use href={`#${p}-ribLongG`} transform="rotate(160 100 100)" />
          <use href={`#${p}-ribLongR`} transform="rotate(200 100 100)" />
          <use href={`#${p}-ribLongR`} transform="rotate(240 100 100)" />
          <use href={`#${p}-ribLongR`} transform="rotate(280 100 100)" />
          <use href={`#${p}-ribLongR`} transform="rotate(320 100 100)" />
        </g>
        <g className="sol-raios-curtos">
          <use href={`#${p}-ribShortG`} transform="rotate(20 100 100)" />
          <use href={`#${p}-ribShortG`} transform="rotate(60 100 100)" />
          <use href={`#${p}-ribShortG`} transform="rotate(100 100 100)" />
          <use href={`#${p}-ribShortG`} transform="rotate(140 100 100)" />
          <use href={`#${p}-ribShortR`} transform="rotate(180 100 100)" />
          <use href={`#${p}-ribShortR`} transform="rotate(220 100 100)" />
          <use href={`#${p}-ribShortR`} transform="rotate(260 100 100)" />
          <use href={`#${p}-ribShortR`} transform="rotate(300 100 100)" />
          <use href={`#${p}-ribShortR`} transform="rotate(340 100 100)" />
        </g>
      </g>

      {/* núcleo */}
      <circle
        cx="100"
        cy="100"
        r="26"
        fill={raio('core')}
        filter={`url(#${p}-soft)`}
      />
    </svg>
  )
}
