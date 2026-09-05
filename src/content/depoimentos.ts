/**
 * Relatos de quem foi atendido.
 *
 * Os textos ficam como a pessoa escreveu. Não se reescreve, não se poliza e não
 * se corta a experiência de ninguém para deixá-la mais palatável: quem viveu
 * conta do jeito que viveu. A única correção aceitável é de grafia evidente,
 * como o nome da prática.
 *
 * O que continua valendo, porque não é questão de estilo:
 *
 * 1. Autorização por escrito de quem escreveu, guardada fora do site. A LGPD
 *    trata informação sobre atendimento como dado sensível.
 * 2. Sem nome completo e sem foto. Primeiro nome, ou inicial, conforme a pessoa
 *    preferir.
 * 3. A ressalva fica ao lado da seção, não dentro do relato. É o site que se
 *    responsabiliza pelo enquadramento, não a pessoa que escreveu.
 *
 * Também não entra marcação de avaliação nos dados estruturados: o Google
 * descarta nota e resenha que o próprio negócio publica sobre si. A resenha que
 * pesa na busca é a do Perfil da Empresa no Google.
 */
export type Depoimento = {
  id: string
  /** Parágrafos da mensagem, como ela foi escrita. Cada item vira uma linha na bolha. */
  texto: string[]
  autor: string
  /** Contexto curto, sem identificar a pessoa. */
  contexto?: string
  /** Hora que aparece na bolha, só para dar a textura de conversa. */
  hora: string
  terapia?: string
}

/**
 * Os relatos moram em `dados/depoimentos.json`, para o Caio poder acrescentar
 * um novo pelo painel sem abrir o código. As regras acima continuam valendo:
 * o painel não as aplica sozinho, quem aplica é quem publica.
 */
import arquivo from './dados/depoimentos.json'

export const depoimentos: Depoimento[] = arquivo.itens as Depoimento[]

export function depoimentosDaTerapia(slug: string) {
  return depoimentos.filter((d) => d.terapia === slug)
}
