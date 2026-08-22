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

export const depoimentos: Depoimento[] = [
  {
    id: 'daiane',
    texto: [
      'Meu nome é Daiane. Conheci o Osatoshi numa propaganda do Caio no Instagram.',
      'Ele é um terapeuta que me acolheu pra ouvir e ajudar, isso até hoje.',
      'E foi muito boa a experiência e a evolução. Tive melhora no ambiente de trabalho, na saúde, eu fiz numa questão de caroços na cabeça e não sinto mais eles.',
      'Foi muito fantástico e maravilhoso.',
      'Foi o melhor atendimento espiritual que já fiz. Muito agradecida sempre.',
      'Vale a pena.',
    ],
    autor: 'Daiane',
    contexto: 'atendida à distância',
    hora: '22:29',
    terapia: 'osatoshi',
  },
  {
    id: 'serie-osatoshi',
    texto: [
      'Bom dia meu amigo!! Quero novamente dar o meu testemunho: a minha saúde tem melhorado bastante e do último Osatoshi pra cá tenho me sentido mais alegre, animado, mais positivo.',
      'Sei que tudo é um processo e que a nossa libertação é gradativa e que a cada Osatoshi vamos deixando o passado para trás para podermos desfrutar de um presente e futuro bem melhores.',
      'Gratidão 🙏',
    ],
    autor: 'R.',
    contexto: 'em série de atendimentos',
    hora: '09:36',
    terapia: 'osatoshi',
  },
]

export function depoimentosDaTerapia(slug: string) {
  return depoimentos.filter((d) => d.terapia === slug)
}
