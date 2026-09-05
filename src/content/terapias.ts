import type { Terapia } from './tipos'

/**
 * As oito terapias, uma por arquivo em `src/content/dados/terapias/`.
 *
 * Antes viviam escritas aqui, em TypeScript. Saíram para JSON quando o site
 * ganhou o painel de administração: o Caio precisa editar esses textos sem
 * abrir editor de código, e JSON é o que o painel sabe ler e escrever.
 *
 * O tipo `Terapia` continua sendo a fonte da verdade sobre o formato. Se um
 * arquivo vier faltando campo, o TypeScript acusa na build, antes do site ir
 * ao ar. O painel também valida, mas confiar só nele seria confiar demais.
 */
import osatoshi from './dados/terapias/osatoshi.json'
import emfBalancing from './dados/terapias/emf-balancing-technique.json'
import elementoterapia from './dados/terapias/elementoterapia-magnetica.json'
import reiki from './dados/terapias/reiki.json'
import shiatsu from './dados/terapias/shiatsu.json'
import acupuntura from './dados/terapias/acupuntura-sistemica.json'
import auriculoterapia from './dados/terapias/auriculoterapia.json'
import seitai from './dados/terapias/seitai.json'

const arquivos = [
  osatoshi, emfBalancing, elementoterapia, reiki,
  shiatsu, acupuntura, auriculoterapia, seitai,
] as unknown as Terapia[]

/** Ordenadas pelo campo `ordem`, que o painel também edita. */
export const terapias: Terapia[] = [...arquivos].sort((a, b) => a.ordem - b.ordem)

export const terapiasDestaque = terapias.filter((t) => t.destaque)

export function getTerapia(slug: string): Terapia | undefined {
  return terapias.find((t) => t.slug === slug)
}
