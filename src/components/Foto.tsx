import { getFoto } from '@/content/fotos'
import { Icone } from './Icone'

const PROPORCOES: Record<string, string> = {
  '3/4': 'aspect-[3/4]',
  '4/3': 'aspect-[4/3]',
  '16/9': 'aspect-[16/9]',
  '1/1': 'aspect-square',
}

type Props = { numero: number; className?: string; prioridade?: boolean }

/**
 * Espaço de foto numerado. Se a imagem já foi entregue, renderiza a foto.
 * Se ainda não, mostra uma moldura discreta com o número e o que entra ali —
 * assim o layout final já é visível antes das imagens existirem.
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

  return (
    <figure
      className={`${proporcao} flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-noite-200 bg-areia-100/70 p-6 text-center ${className}`}
      aria-label={`Espaço reservado para a foto ${String(numero).padStart(2, '0')}`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ouro-600 shadow-sm">
        <Icone nome="foto" tamanho={22} />
      </span>
      <figcaption className="max-w-xs">
        <span className="block font-display text-2xl text-noite-800">
          Foto {String(numero).padStart(2, '0')}
        </span>
        <span className="mt-1.5 block text-[0.85rem] leading-snug text-tinta-500">{foto.descricao}</span>
      </figcaption>
    </figure>
  )
}
