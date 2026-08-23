const URL_PADRAO = 'https://caiogracco.com.br'

/**
 * Normaliza a URL vinda de variável de ambiente.
 *
 * Sem isto, um valor digitado sem o esquema (ex.: "beta.droliveira.adv.br")
 * faz `new URL()` lançar e derruba o build inteiro com exit 1, um erro caro,
 * porque só aparece no deploy e a mensagem não aponta para a causa.
 * Aqui: apara espaços e barras finais, acrescenta https:// quando falta e,
 * se ainda assim o valor for inválido, cai no padrão em vez de quebrar.
 */
function normalizarUrl(valor: string | undefined): string {
  const bruto = (valor ?? '').trim().replace(/\/+$/, '')
  if (!bruto) return URL_PADRAO
  const comEsquema = /^https?:\/\//i.test(bruto) ? bruto : `https://${bruto}`
  try {
    return new URL(comEsquema).origin
  } catch {
    return URL_PADRAO
  }
}

export const site = {
  /** Nome de exibição do site: o terapeuta vem primeiro, o espaço em seguida. */
  nomeSite: 'Caio Gracco',
  /** Nome do espaço terapêutico, a entidade de negócio. */
  nome: 'Terapias da Completude',
  terapeuta: 'Caio Gracco',
  nomeCompleto: 'Caio Gracco de Freitas Araújo',
  titulo: 'Caio Gracco - Terapias da Completude',
  descricao:
    'Caio Gracco, das Terapias da Completude: Osatoshi, EMF Balancing Technique®, Elementoterapia Magnética, Reiki, Shiatsu, Acupuntura, Auriculoterapia e Seitai. Atendimento online para todo o Brasil e presencial, com hora marcada.',
  url: normalizarUrl(process.env.NEXT_PUBLIC_SITE_URL),
  locale: 'pt_BR',
  telefone: '+5516992292629',
  telefoneFormatado: '(16) 99229-2629',
  whatsapp: '5516992292629',
  whatsappMensagem:
    'Olá, Caio! Cheguei pelo seu site e gostaria de saber mais sobre os atendimentos.',
  email: 'caiograccoterapeuta@gmail.com',
  endereco: {
    rua: 'Rua Juvenal Ferreira de Farias, 60',
    bairro: 'Jardim Nova Roma',
    cidade: 'Santa Rosa de Viterbo',
    estado: 'SP',
    cep: '14273-162',
    pais: 'BR',
  },
  geo: { lat: -21.4739, lng: -47.3639 },
  redes: {
    instagram: 'https://www.instagram.com/terapeutacaiogracco/',
    instagramHandle: '@terapeutacaiogracco',
    facebook: 'https://www.facebook.com/caio.gracco.519235',
    youtube: 'https://www.youtube.com/@CaioGracco369',
    youtubeHandle: '@CaioGracco369',
    youtubeChannelId: 'UCqSwKBMOCEGFCJch2e_jD9w',
    threads: 'https://www.threads.net/@terapeutacaiogracco',
  },
  atendimento: {
    online: true,
    presencial: true,
    horario: 'Segunda a sábado, mediante agendamento',
  },
  credenciais: [
    'Terapeuta credenciado pela Shinri do Brasil para a prática do Osatoshi',
    'Praticante de EMF Balancing Technique®',
    'Formação em Elementoterapia Magnética',
    'Formação em Shiatsu, Seitai, Acupuntura sistêmica, Auriculoterapia e Reiki',
  ],
  cnpj: '17.156.760/0001-95',
  desde: 2012,
  /** 'producao' libera indexação; qualquer outro valor marca o site como noindex. */
  ambiente: (process.env.NEXT_PUBLIC_AMBIENTE || 'producao').trim().toLowerCase(),
} as const

export const ehProducao =
  (process.env.NEXT_PUBLIC_AMBIENTE || 'producao').trim().toLowerCase() === 'producao'

export function whatsappLink(mensagem?: string) {
  const texto = encodeURIComponent(mensagem || site.whatsappMensagem)
  return `https://wa.me/${site.whatsapp}?text=${texto}`
}

/**
 * Imagem de compartilhamento, em formato pronto para o campo `images` do
 * Open Graph e do Twitter.
 *
 * Precisa ser repetida em toda página que declara `openGraph`. O Next.js não
 * herda o `openGraph` do layout quando a rota define o seu: ele substitui o
 * objeto inteiro. Sem isto, cada página compartilhada no WhatsApp aparece como
 * um link pelado, sem imagem, e ninguém clica.
 */
export const imagemCompartilhamento = [
  {
    url: '/og.jpg',
    width: 1200,
    height: 630,
    alt: `${site.terapeuta}, ${site.nome}`,
  },
]
