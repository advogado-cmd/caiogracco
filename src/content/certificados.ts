/**
 * Formação de Caio Gracco, transcrita dos certificados originais.
 *
 * Cada item corresponde a um documento físico, fotografado e conferido um a um.
 * Onde a data ou a carga horária estavam manuscritas e não deram para ler com
 * segurança, o campo ficou de fora em vez de receber um palpite.
 *
 * Uma coisa que o site nunca deve fazer: o certificado da Federação Mundial das
 * Sociedades de Medicina Chinesa usa a palavra "Doctor" no original em inglês, e
 * o texto em chinês fala em qualificação de médico habilitado. Isso é a
 * nomenclatura de uma federação estrangeira e não confere título de médico no
 * Brasil. Aqui ele aparece pelo que é: aprovação em exame internacional de
 * qualificação em acupuntura. Apresentar de outro jeito seria exercício ilegal
 * da medicina.
 */
export type Certificado = {
  id: string
  /** Nome do curso ou da qualificação, como consta no documento. */
  titulo: string
  instituicao: string
  /** Ano, para ordenar e agrupar. */
  ano: number
  /** Data por extenso, quando o documento traz. */
  data?: string
  horas?: number
  local?: string
  /** Uma linha sobre o que é aquilo, para quem não conhece o nome. */
  nota?: string
  /** Terapia do site à qual a formação se liga. */
  terapia?: string
  /** Arquivo em public/certificados, sem extensão. */
  arquivo: string
  /** Marca o que sustenta o trabalho principal, para destacar na página. */
  destaque?: boolean
}

/**
 * A lista mora em `dados/certificados.json`. Saiu do TypeScript quando o site
 * ganhou painel: certificado novo aparece de tempos em tempos, e o Caio não
 * precisa de mim para acrescentar um.
 */
import arquivo from './dados/certificados.json'

export const certificados: Certificado[] = arquivo.itens as Certificado[]

/** Do mais recente para o mais antigo, que é como se lê um currículo. */
export const certificadosPorAno = [...certificados].sort((a, b) => b.ano - a.ano)

export const horasFormacao = certificados.reduce((soma, c) => soma + (c.horas ?? 0), 0)

export function certificadosDaTerapia(slug: string) {
  return certificados.filter((c) => c.terapia === slug)
}
