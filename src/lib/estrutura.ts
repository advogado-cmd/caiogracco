import { site } from '@/content/site'
import type { FAQ, Terapia } from '@/content/tipos'

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
    alternateName: `${site.nome} — ${site.terapeuta}`,
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
      { '@type': 'City', name: 'Santa Rosa de Viterbo' },
      { '@type': 'State', name: 'São Paulo' },
      { '@type': 'Country', name: 'Brasil' },
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

/** Entidade pessoa: quem atende. Essencial para GEO — dá à IA um sujeito identificável. */
export function schemaPessoa() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site.url}/#caio`,
    name: site.terapeuta,
    alternateName: site.nomeCompleto,
    jobTitle: 'Terapeuta integrativo',
    description:
      'Caio Gracco é terapeuta integrativo em Santa Rosa de Viterbo (SP). Iniciou sua trajetória aos 14 anos e hoje se dedica sobretudo ao Osatoshi, técnica japonesa da Shinri, além de EMF Balancing Technique®, Elementoterapia Magnética, Reiki, Shiatsu, Acupuntura sistêmica, Auriculoterapia e Seitai.',
    url: `${site.url}/sobre`,
    email: site.email,
    telephone: site.telefone,
    worksFor: { '@id': `${site.url}/#espaco` },
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

/** Identifica o site como entidade e declara a busca interna — ajuda Google e motores de resposta. */
export function schemaSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#site`,
    name: site.nome,
    alternateName: `${site.nome} — ${site.terapeuta}`,
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
