import { getFoto } from '@/content/fotos'

const PROPORCOES: Record<string, string> = {
  '3/4': 'aspect-[3/4]',
  '4/3': 'aspect-[4/3]',
  '16/9': 'aspect-[16/9]',
  '1/1': 'aspect-square',
}

type Props = {
  numero: number
  className?: string
  prioridade?: boolean
  /** Largura que a foto ocupa na tela, para o navegador escolher o arquivo certo. */
  larguras?: string
}

/**
 * Espaço de foto numerado. Se a imagem já foi entregue, renderiza a foto.
 * Se ainda não, não renderiza nada, porque o espaço reservado é só um controle
 * interno (ver `src/content/fotos.ts`) e nunca chega ao visitante.
 */
export function Foto({ numero, className = '', prioridade = false, larguras = '(min-width: 1024px) 700px, 100vw' }: Props) {
  const foto = getFoto(numero)
  if (!foto) return null

  const proporcao = PROPORCOES[foto.proporcao]

  if (foto.arquivo) {
    // Cada foto tem duas versões no disco: a de 700px e a original.
    // O navegador baixa a menor quando a menor já basta, o que faz diferença
    // grande na abertura da home, onde a foto é o maior elemento da tela.
    const pequena = foto.arquivo.replace(/\.webp$/, '-sm.webp')
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={pequena}
        srcSet={`${pequena} 700w, ${foto.arquivo} 1200w`}
        sizes={larguras}
        alt={foto.alt}
        loading={prioridade ? 'eager' : 'lazy'}
        fetchPriority={prioridade ? 'high' : undefined}
        decoding={prioridade ? 'sync' : 'async'}
        className={`${proporcao} w-full rounded-2xl object-cover ${className}`}
      />
    )
  }

  // Enquanto a imagem não existir, o espaço simplesmente não aparece para quem
  // visita. Nenhuma moldura de rascunho, nenhum número, nenhum texto interno:
  // o site fica íntegro com as fotos que já foram entregues.
  return null
}
