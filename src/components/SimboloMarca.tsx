type Props = {
  /** Lado do quadro, em pixels de layout. Mínimo 40, conforme o manual. */
  tamanho?: number
  className?: string
  /** Some para leitores de tela quando o nome da marca já está ao lado. */
  decorativo?: boolean
}

/**
 * Símbolo da marca: duas mãos abertas sustentando a luz.
 *
 * Substitui o sol animado da identidade anterior. Três regras do manual
 * (páginas 03, 04 e 07) governam este componente:
 *
 * 1. Nunca dentro de círculo, quadrado ou moldura. O círculo é exclusividade
 *    do avatar de perfil, e o próprio desenho já se inscreve num círculo.
 * 2. Sem sombra, contorno, brilho ou rotação acrescentados. Foi por isso que
 *    a animação dos raios saiu junto com o sol: o símbolo novo tem volume e
 *    degradê próprios, e qualquer efeito por cima o descaracteriza.
 * 3. Nunca abaixo de 40px. Menor que isso, as mãos viram um borrão dourado.
 *
 * O arquivo é imagem, não vetor: o manual registra essa pendência e pede o
 * redesenho em vetor para impressão grande e reduções pequenas. Enquanto
 * isso, servimos WebP em três tamanhos e deixamos o navegador escolher.
 */
export function SimboloMarca({ tamanho = 64, className = '', decorativo = true }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/marca/simbolo-256.webp"
      srcSet="/marca/simbolo-96.webp 96w, /marca/simbolo-128.webp 128w, /marca/simbolo-256.webp 256w, /marca/simbolo-512.webp 512w"
      sizes={`${tamanho}px`}
      width={tamanho}
      height={tamanho}
      alt={decorativo ? '' : 'Símbolo de Caio Gracco, Terapias da Completude'}
      aria-hidden={decorativo || undefined}
      className={className}
      draggable={false}
    />
  )
}
