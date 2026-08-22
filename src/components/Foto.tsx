import { getFoto } from '@/content/fotos'

const PROPORCOES: Record<string, string> = {
  '3/4': 'aspect-[3/4]',
  '4/3': 'aspect-[4/3]',
  '16/9': 'aspect-[16/9]',
  '1/1': 'aspect-square',
}

type Props = { numero: number; className?: string; prioridade?: boolean }

/**
 * Espaço de foto numerado. Se a imagem já foi entregue, renderiza a foto.
 * Se ainda não, não renderiza nada, porque o espaço reservado é só um controle
 * interno (ver `src/content/fotos.ts`) e nunca chega ao visitante.
 */
export function Foto({ numero, className = '', prioridade = false }: Props) {
  const foto = getFoto(numero)
  if (!foto) return null

  const proporcao = PROPORCOES[foto.proporcao]

  if (foto.arquivo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={foto.arquivo}
        alt={foto.alt}
        loading={prioridade ? 'eager' : 'lazy'}
        className={`${proporcao} w-full rounded-2xl object-cover ${className}`}
      />
    )
  }

  // Enquanto a imagem não existir, o espaço simplesmente não aparece para quem
  // visita. Nenhuma moldura de rascunho, nenhum número, nenhum texto interno:
  // o site fica íntegro com as fotos que já foram entregues.
  return null
}
