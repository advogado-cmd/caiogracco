import Link from 'next/link'

type Props = {
  /** 'escura' = sobre fundo claro (padrão). 'clara' = sobre fundo azul. */
  variante?: 'clara' | 'escura'
  compacta?: boolean
  className?: string
}

/**
 * Assinatura horizontal da marca.
 *
 * Antes o site montava a assinatura à mão: símbolo + "CAIO GRACCO" em Jost
 * espaçado + slogan em itálico. O manual proíbe isso na página 04, "não
 * recompor a assinatura nem trocar a tipografia". Agora entra o arquivo
 * oficial inteiro, como uma peça só.
 *
 * O manual pede a horizontal justamente em cabeçalho de site (página 02) e
 * fixa o mínimo em 160px de largura (página 03). Por isso a versão compacta
 * para em 200px, com folga sobre o mínimo.
 */
/** Proporção do arquivo oficial aparado, para a altura sair sem achatar nada. */
const LARGURA = 2536
const ALTURA = 793

export function Logo({ variante = 'escura', compacta = false, className = '' }: Props) {
  const sobreAzul = variante === 'clara'
  const arquivo = sobreAzul ? 'escura' : 'clara'
  const largura = compacta ? 200 : 244

  return (
    <Link
      href="/"
      className={`grupo-marca group flex items-center ${className}`}
      aria-label="Caio Gracco: Terapias da Completude, página inicial"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/marca/horizontal-fundo-${arquivo}-600.webp`}
        srcSet={`/marca/horizontal-fundo-${arquivo}-600.webp 600w, /marca/horizontal-fundo-${arquivo}-900.webp 900w`}
        sizes={`${largura}px`}
        width={largura}
        height={Math.round((largura * ALTURA) / LARGURA)}
        alt="Caio Gracco, Terapias da Completude"
        className="h-auto w-full max-w-full transition-transform duration-500 group-hover:scale-[1.03]"
        style={{ width: largura }}
        draggable={false}
      />
    </Link>
  )
}
