import { site } from '@/content/site'
import type { FAQ, Terapia } from '@/content/tipos'
import { certificados } from '@/content/certificados'

const enderecoSchema = {
  '@type': 'PostalAddress',
  streetAddress: site.endereco.rua,
  addressLocality: site.endereco.cidade,
  addressRegion: site.endereco.estado,
  postalCode: site.endereco.cep,
  addressCountry: site.endereco.pais,
}

/** Entidade principal: o espaço terapêutico. Base para SEO local e para respostas de IA. */
export function schemaNegocio() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    '@id': `${site.url}/#espaco`,
    name: site.nome,
    alternateName: `${site.terapeuta}, ${site.nome}`,
    description: site.descricao,
    url: site.url,
    telephone: site.telefone,
    email: site.email,
    image: `${site.url}/og.png`,
    logo: `${site.url}/brand/logo-vertical.svg`,
    priceRange: 'Sob consulta',
    address: enderecoSchema,
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: [
      { '@type': 'Country', name: 'Brasil' },
      { '@type': 'State', name: 'São Paulo' },
      { '@type': 'City', name: 'Santa Rosa de Viterbo' },
    ],
    availableService: [
      { '@type': 'Service', name: 'Atendimento presencial' },
      { '@type': 'Service', name: 'Atendimento online, por videochamada' },
    ],
    sameAs: [site.redes.instagram, site.redes.facebook, site.redes.youtube],
    founder: { '@id': `${site.url}/#caio` },
    openingHours: 'Mo-Sa 08:00-20:00',
    currenciesAccepted: 'BRL',
    knowsLanguage: 'pt-BR',
    slogan: 'Um lugar para você voltar a ser inteiro',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Terapias integrativas',
      itemListElement: [
        'Osatoshi', 'EMF Balancing Technique®', 'Elementoterapia Magnética', 'Reiki',
        'Massagem Shiatsu', 'Acupuntura Sistêmica', 'Auriculoterapia', 'Seitai',
      ].map((nome) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: nome } })),
    },
    isAccessibleForFree: false,
    publicAccess: true,
  }
}

/** Entidade pessoa: quem atende. Essencial para GEO: dá à IA um sujeito identificável. */
export function schemaPessoa() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site.url}/#caio`,
    name: site.terapeuta,
    alternateName: site.nomeCompleto,
    jobTitle: 'Terapeuta integrativo',
    description:
      'Caio Gracco é terapeuta integrativo, com atendimento à distância para todo o Brasil e presencial no interior de São Paulo. Iniciou sua trajetória aos 14 anos e hoje se dedica sobretudo ao Osatoshi, técnica japonesa da Shinri, além de EMF Balancing Technique®, Elementoterapia Magnética, Reiki, Shiatsu, Acupuntura sistêmica, Auriculoterapia e Seitai.',
    url: `${site.url}/sobre`,
    image: {
      '@type': 'ImageObject',
      url: `${site.url}/retrato-caio-gracco.jpg`,
      width: 1200,
      height: 1200,
      caption: 'Caio Gracco, terapeuta integrativo',
    },
    email: site.email,
    telephone: site.telefone,
    worksFor: { '@id': `${site.url}/#espaco` },
    // Formações declaradas uma a uma. É o que permite ao Google e aos motores de
    // resposta atribuírem experiência a uma pessoa real, em tema de saúde e
    // bem-estar, onde a autoria pesa mais do que em qualquer outro assunto.
    hasCredential: certificados.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.titulo,
      credentialCategory: 'Certificado de curso',
      dateCreated: String(c.ano),
      recognizedBy: { '@type': 'Organization', name: c.instituicao },
      ...(c.horas ? { educationalLevel: `${c.horas} horas` } : {}),
    })),
    address: enderecoSchema,
    knowsAbout: [
      'Osatoshi', 'Shinri', 'EMF Balancing Technique', 'Elementoterapia Magnética',
      'Reiki', 'Shiatsu', 'Acupuntura sistêmica', 'Auriculoterapia', 'Seitai',
      'Terapias integrativas', 'Práticas integrativas e complementares',
    ],
    sameAs: [site.redes.instagram, site.redes.facebook, site.redes.youtube],
  }
}

export function schemaServico(t: Terapia) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${site.url}/terapias/${t.slug}/#servico`,
    name: t.nome,
    alternateName: t.nomeCurto,
    serviceType: t.nome,
    description: t.resumo,
    url: `${site.url}/terapias/${t.slug}`,
    provider: { '@id': `${site.url}/#espaco` },
    areaServed: t.sessao.distancia === 'sim'
      ? [{ '@type': 'Country', name: 'Brasil' }]
      : [{ '@type': 'City', name: 'Santa Rosa de Viterbo' }],
    audience: { '@type': 'Audience', audienceType: 'Pessoas adultas em busca de cuidado complementar' },
    termsOfService: `${site.url}/aviso-de-cuidado`,
  }
}

/** Identifica o site como entidade e declara a busca interna, o que ajuda Google e motores de resposta. */
export function schemaSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#site`,
    name: `${site.terapeuta}, ${site.nome}`,
    alternateName: site.nome,
    url: site.url,
    inLanguage: 'pt-BR',
    description: site.descricao,
    publisher: { '@id': `${site.url}/#espaco` },
    about: { '@id': `${site.url}/#caio` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${site.url}/glossario?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function schemaFAQ(perguntas: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: perguntas.map((f) => ({
      '@type': 'Question',
      name: f.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: f.resposta },
    })),
  }
}

export function schemaBreadcrumb(itens: { nome: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itens.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.nome,
      item: `${site.url}${item.href}`,
    })),
  }
}

export function schemaDefinicao(termo: string, definicao: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: termo,
    description: definicao,
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Glossário de Terapias Integrativas', url: `${site.url}/glossario` },
  }
}

/**
 * Artigo do blog. Reúne autoria, datas e o vínculo com a entidade do espaço.
 * É o que permite ao Google e aos motores de resposta atribuírem o texto a
 * uma pessoa real, com formação declarada, e não a um site anônimo.
 */
export function schemaArtigo(artigo: {
  titulo: string
  descricao: string
  slug: string
  publicadoEm: string
  atualizadoEm?: string
  palavrasChave: string[]
  minutos: number
  categoria: string
}) {
  const url = `${site.url}/blog/${artigo.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#artigo`,
    headline: artigo.titulo.slice(0, 110),
    description: artigo.descricao,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: artigo.publicadoEm,
    dateModified: artigo.atualizadoEm ?? artigo.publicadoEm,
    inLanguage: 'pt-BR',
    articleSection: artigo.categoria,
    keywords: artigo.palavrasChave.join(', '),
    timeRequired: `PT${artigo.minutos}M`,
    author: { '@id': `${site.url}/#caio` },
    publisher: { '@id': `${site.url}/#espaco` },
    image: `${site.url}/og.png`,
    isAccessibleForFree: true,
  }
}

/** O blog como coleção: ajuda o rastreamento a entender a hierarquia das páginas. */
export function schemaBlog(artigos: { titulo: string; slug: string; publicadoEm: string; resumo: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${site.url}/blog#blog`,
    name: `Blog, ${site.nome}`,
    description:
      'Textos de Caio Gracco sobre carma, trauma, prosperidade, limpeza espiritual e as oito práticas que ele atende.',
    url: `${site.url}/blog`,
    inLanguage: 'pt-BR',
    publisher: { '@id': `${site.url}/#espaco` },
    author: { '@id': `${site.url}/#caio` },
    blogPost: artigos.map((a) => ({
      '@type': 'BlogPosting',
      '@id': `${site.url}/blog/${a.slug}#artigo`,
      headline: a.titulo.slice(0, 110),
      description: a.resumo,
      url: `${site.url}/blog/${a.slug}`,
      datePublished: a.publicadoEm,
      author: { '@id': `${site.url}/#caio` },
    })),
  }
}
