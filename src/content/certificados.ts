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

export const certificados: Certificado[] = [
  {
    id: 'reiki-1',
    titulo: 'Reiki, Primeiro Grau (Usui Shiki Ryoho)',
    instituicao: 'Associação Brasileira de Reiki',
    ano: 1997,
    data: '17 e 18 de maio de 1997',
    nota: 'A primeira formação, aos 16 anos.',
    terapia: 'reiki',
    arquivo: '1997-reiki-1',
  },
  {
    id: 'reiki-2',
    titulo: 'Reiki, Segundo Grau (Usui Shiki Ryoho)',
    instituicao: 'Associação Brasileira de Reiki',
    ano: 1998,
    data: '18 de maio de 1998',
    terapia: 'reiki',
    arquivo: '1998-reiki-2',
  },
  {
    id: 'shiatsu',
    titulo: 'Curso de Shiatsu, nove módulos',
    instituicao: 'Instituto de Shiatsu e Arte Oriental',
    ano: 2002,
    data: '7 de dezembro de 2002',
    horas: 72,
    local: 'Ribeirão Preto',
    terapia: 'shiatsu',
    arquivo: '2002-shiatsu',
  },
  {
    id: 'bonsai',
    titulo: 'Bonsai 2007',
    instituicao: 'Atelier do Bonsai',
    ano: 2007,
    data: '26 e 27 de maio de 2007',
    local: 'Ribeirão Preto',
    nota: 'A cultura japonesa fora do consultório, que também ensina sobre tempo e paciência.',
    arquivo: '2007-bonsai',
  },
  {
    id: 'acupuntura-cemetrac',
    titulo: 'Curso de Acupuntura Tradicional Chinesa',
    instituicao: 'CEMETRAC, Centro de Estudos de Medicina Tradicional e Cultura Chinesa',
    ano: 2011,
    data: 'de 21 de março de 2009 a 27 de fevereiro de 2011',
    horas: 1206,
    local: 'São Paulo',
    nota: 'Dois anos de curso, sob direção do Mestre Liu Chih Ming. É a formação mais longa da lista.',
    terapia: 'acupuntura-sistemica',
    arquivo: '2011-acupuntura-cemetrac',
    destaque: true,
  },
  {
    id: 'preparatorio-wfcms',
    titulo: 'Curso preparatório para o exame internacional de aptidão em acupuntura',
    instituicao: 'CEMETRAC, Centro de Estudos de Medicina Tradicional e Cultura Chinesa',
    ano: 2011,
    data: 'de 12 de março a 7 de agosto de 2011',
    horas: 72,
    local: 'São Paulo',
    terapia: 'acupuntura-sistemica',
    arquivo: '2011-preparatorio-wfcms',
  },
  {
    id: 'exame-wfcms',
    titulo: 'Aprovação no Exame Internacional de Qualificação em Acupuntura',
    instituicao: 'Federação Mundial das Sociedades de Medicina Chinesa (WFCMS)',
    ano: 2011,
    data: 'exame em 18 de agosto de 2011, certificado emitido em 7 de setembro de 2011',
    nota: 'Exame internacional aplicado pela federação sediada em Pequim, prestado em português e aprovado. Certificado nº 002073.',
    terapia: 'acupuntura-sistemica',
    arquivo: '2011-exame-wfcms',
    destaque: true,
  },
  {
    id: 'analgesia',
    titulo: 'Analgesia e Anestesia pela Acupuntura',
    instituicao: 'Instituto Brasileiro de Acupuntura',
    ano: 2012,
    data: '27 de maio de 2012',
    horas: 24,
    local: 'Ribeirão Preto',
    terapia: 'acupuntura-sistemica',
    arquivo: '2012-analgesia',
  },
  {
    id: 'quick-massage',
    titulo: 'Curso de Quick Massage',
    instituicao: 'Instituto de Shiatsu e Terapias Orientais',
    ano: 2014,
    data: '29 de março de 2014',
    horas: 12,
    local: 'Ribeirão Preto',
    terapia: 'shiatsu',
    arquivo: '2014-quick-massage',
  },
  {
    id: 'shezhen',
    titulo: 'Terapia Shézhen Liao Fá, acupuntura da língua',
    instituicao: 'Curso livre com o professor Jóji Enómoto',
    ano: 2014,
    data: '2 e 3 de agosto de 2014',
    horas: 16,
    local: 'São Paulo',
    nota: 'Técnica de diagnóstico e tratamento pela língua, dentro da medicina chinesa.',
    terapia: 'acupuntura-sistemica',
    arquivo: '2014-shezhen',
  },
  {
    id: 'seitai',
    titulo: 'Seitai Hakushin, quiropraxia manual japonesa',
    instituicao: 'Curso livre com o professor Jóji Enómoto',
    ano: 2014,
    data: 'de 20 de julho a 21 de setembro de 2014',
    horas: 32,
    local: 'São Paulo',
    terapia: 'seitai',
    arquivo: '2014-seitai',
    destaque: true,
  },
  {
    id: 'reiki-kenkou',
    titulo: 'Reiki, Nível I (Usui Shiki Ryoho)',
    instituicao: 'Kenkou Terapia Oriental',
    ano: 2016,
    data: '23 e 24 de julho de 2016',
    horas: 16,
    local: 'Jaboticabal',
    nota: 'Retomada da formação em Reiki, quase vinte anos depois da primeira.',
    terapia: 'reiki',
    arquivo: '2016-reiki-kenkou',
  },
  {
    id: 'mesmerismo-1',
    titulo: 'Formação em Fascinação e Mesmerismo, Módulo I',
    instituicao: 'Formação com Fernando Liberal',
    ano: 2016,
    data: '30 de abril e 1º de maio de 2016',
    horas: 24,
    nota: 'O mesmerismo é o passe magnético do século XVIII, anterior à hipnose moderna.',
    arquivo: '2016-mesmerismo-1',
  },
  {
    id: 'mesmerismo-2',
    titulo: 'Formação em Fascinação e Mesmerismo, Módulo II',
    instituicao: 'Formação com Fernando Liberal',
    ano: 2016,
    data: '3 e 4 de setembro de 2016',
    horas: 24,
    arquivo: '2016-mesmerismo-2',
  },
  {
    id: 'craniopuntura',
    titulo: 'Craniopuntura de Yamamoto',
    instituicao: 'Instituto Saúde e Equilíbrio',
    ano: 2017,
    data: '27 e 28 de maio de 2017',
    horas: 18,
    local: 'Ribeirão Preto',
    nota: 'Sistema japonês de acupuntura aplicada no couro cabeludo, criado por Toshikatsu Yamamoto.',
    terapia: 'acupuntura-sistemica',
    arquivo: '2017-craniopuntura',
  },
  {
    id: 'hipnose',
    titulo: 'Hipnose Prática e Clínica',
    instituicao: 'ABECE da Hipnose, Academia Brasileira de Ensino Clínico e Experimental da Hipnose',
    ano: 2017,
    horas: 36,
    nota: 'O documento não traz data.',
    arquivo: 'hipnose',
  },
  {
    id: 'emf-balancing',
    titulo: 'EMF Balancing Technique®, Fases I a IV, praticante credenciado',
    instituicao: 'The Energy Extension, Inc.',
    ano: 2026,
    data: '19 de fevereiro de 2026',
    nota: 'Formação e estágio nas quatro primeiras fases, com credenciamento pela organização que detém o método.',
    terapia: 'emf-balancing-technique',
    arquivo: '2026-emf-balancing',
    destaque: true,
  },
]

/** Do mais recente para o mais antigo, que é como se lê um currículo. */
export const certificadosPorAno = [...certificados].sort((a, b) => b.ano - a.ano)

export const horasFormacao = certificados.reduce((soma, c) => soma + (c.horas ?? 0), 0)

export function certificadosDaTerapia(slug: string) {
  return certificados.filter((c) => c.terapia === slug)
}
