/**
 * ESPAÇOS DE FOTO NUMERADOS
 * =========================
 * Cada espaço abaixo é um lugar reservado no site para uma imagem.
 * Enquanto o arquivo não existir, o site mostra uma moldura discreta com o
 * número e a orientação do que entra ali — nada quebra.
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

export const espacosFoto: EspacoFoto[] = [
  { numero: 1, local: 'Home — abertura', proporcao: '3/4', arquivo: '/fotos/01.webp',
    descricao: 'Retrato oficial do Caio — a imagem de abertura do site.',
    alt: 'Caio Gracco, terapeuta, sorrindo ao ar livre em meio a um jardim' },
  { numero: 2, local: 'Home — seção "Quando procurar"', proporcao: '4/3', arquivo: '/fotos/02.webp',
    descricao: 'Detalhe de mãos em atendimento, ou das mãos do Caio em gesto de acolhimento. Sem rosto.',
    alt: 'Mãos unidas em confraternização de turma de formação em Medicina Chinesa' },
  { numero: 3, local: 'Home — antes da chamada final', proporcao: '16/9', arquivo: '/fotos/03.webp',
    descricao: 'O jardim em plano aberto, onde ele medita.',
    alt: 'Jardim onde Caio Gracco pratica meditação, com muro de pedra e vegetação' },
  { numero: 4, local: 'Sobre — retrato principal', proporcao: '3/4', arquivo: '/fotos/04.webp',
    descricao: 'Retrato oficial em enquadramento fechado, no cartão da página Sobre.',
    alt: 'Retrato de Caio Gracco, terapeuta integrativo' },
  { numero: 5, local: 'Sobre — trajetória', proporcao: '4/3', arquivo: '/fotos/05.webp',
    descricao: 'Foto do Caio atendendo, em ação, ou uma imagem antiga da trajetória dele.',
    alt: 'Turma de formatura do curso de Acupuntura do CEMETRAC, em 2011' },
  { numero: 6, local: 'Contato — o espaço', proporcao: '4/3', arquivo: null,
    descricao: 'Fachada ou entrada do espaço, para quem vai chegar de primeira viagem reconhecer.',
    alt: 'Entrada do espaço de atendimento, em Santa Rosa de Viterbo' },
  { numero: 7, local: 'Terapia — Osatoshi', proporcao: '4/3', arquivo: '/fotos/07.webp',
    descricao: 'Momento de recolhimento no jardim, evocando o trabalho espiritual.',
    alt: 'Momento de recolhimento e silêncio, no jardim' },
  { numero: 8, local: 'Terapia — EMF Balancing Technique®', proporcao: '4/3', arquivo: null,
    descricao: 'Atendimento em maca, com a pessoa vestida e o terapeuta em movimento ao redor.',
    alt: 'Sessão de EMF Balancing Technique' },
  { numero: 9, local: 'Terapia — Elementoterapia Magnética', proporcao: '4/3', arquivo: null,
    descricao: 'Ímãs, cristais e florais dispostos sobre uma superfície clara.',
    alt: 'Elementos usados na Elementoterapia Magnética' },
  { numero: 10, local: 'Terapia — Reiki', proporcao: '4/3', arquivo: '/fotos/10.webp',
    descricao: 'Meditação no jardim — a atitude de receber.',
    alt: 'Postura de meditação no jardim, mãos abertas sobre os joelhos' },
  { numero: 11, local: 'Terapia — Shiatsu', proporcao: '4/3', arquivo: '/fotos/11.webp',
    descricao: 'Pressão com os polegares sobre as costas, pessoa vestida, sobre futon ou maca.',
    alt: 'Prática de terapia manual japonesa sobre futon, durante treinamento' },
  { numero: 12, local: 'Terapia — Acupuntura Sistêmica', proporcao: '4/3', arquivo: '/fotos/12.webp',
    descricao: 'Agulhas aplicadas, enquadramento respeitoso e limpo.',
    alt: 'Turma brasileira no exame internacional da Federação Mundial das Sociedades de Medicina Chinesa' },
  { numero: 13, local: 'Terapia — Auriculoterapia', proporcao: '4/3', arquivo: null,
    descricao: 'Detalhe da orelha com sementes ou esferas aplicadas.',
    alt: 'Aplicação de auriculoterapia' },
  { numero: 14, local: 'Terapia — Seitai', proporcao: '4/3', arquivo: null,
    descricao: 'Manobra manual em maca, mostrando o toque e o alinhamento.',
    alt: 'Sessão de Seitai' },
]

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
