/**
 * ESPAÇOS DE FOTO NUMERADOS
 * =========================
 * Cada espaço abaixo é um lugar reservado no site para uma imagem.
 * Enquanto o arquivo não existir, o site mostra uma moldura discreta com o
 * número e a orientação do que entra ali, nada quebra.
 *
 * COMO ENTREGAR AS IMAGENS
 * 1. Nomeie cada arquivo com o número do espaço: `01.jpg`, `02.jpg`, `03.jpg`…
 * 2. Coloque todos numa pasta e me envie.
 * 3. Eu otimizo, converto para WebP e ativo cada espaço.
 *
 * Se quiser fazer você mesmo: salve em `public/fotos/` com o nome `01.webp`,
 * `02.webp` etc. e troque `arquivo: null` pelo caminho, ex.: `'/fotos/01.webp'`.
 */
export type EspacoFoto = {
  numero: number
  local: string
  descricao: string
  proporcao: '3/4' | '4/3' | '16/9' | '1/1'
  arquivo: string | null
  alt: string
}

/**
 * Os espaços moram em `dados/fotos.json`, e é por lá que o painel troca as
 * imagens do site. O campo `arquivo` aceita null: espaço sem foto simplesmente
 * não é renderizado, e nada quebra.
 */
import arquivo from './dados/fotos.json'

export const espacosFoto: EspacoFoto[] = arquivo.itens as EspacoFoto[]

export function getFoto(numero: number) {
  return espacosFoto.find((f) => f.numero === numero)
}

/** Cada terapia aponta para o número do seu espaço de foto. */
export const fotoPorTerapia: Record<string, number> = {
  osatoshi: 7,
  'emf-balancing-technique': 8,
  'elementoterapia-magnetica': 9,
  reiki: 10,
  shiatsu: 11,
  'acupuntura-sistemica': 12,
  auriculoterapia: 13,
  seitai: 14,
}
