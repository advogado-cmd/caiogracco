import { terapias } from '@/content/terapias'
import { videos } from '@/content/videos'

export type Documento = {
  id: string
  titulo: string
  trecho: string
  href: string
  tipo: 'Terapia' | 'Pergunta' | 'Glossário' | 'Página' | 'Vídeo'
  contexto?: string
  corpo: string
}

/** Sinônimos e linguagem popular → vocabulário do site.
 *  É o que permite alguém digitar "não durmo" e chegar em insônia. */
export const sinonimos: Record<string, string[]> = {
  ansiedade: ['ansioso', 'ansiosa', 'nervoso', 'nervosismo', 'aflicao', 'angustia', 'panico', 'preocupacao'],
  insonia: ['dormir', 'sono', 'nao durmo', 'acordo', 'noites', 'descansar', 'madrugada'],
  estresse: ['stress', 'sobrecarga', 'esgotado', 'esgotamento', 'burnout', 'cansaco', 'exausto', 'exaustao'],
  dor: ['dores', 'doi', 'doendo', 'dolorido', 'incomodo', 'lombar', 'coluna', 'cervical', 'costas', 'ombro', 'pescoco'],
  espiritual: ['espirito', 'espiritos', 'obsessao', 'encosto', 'carma', 'karma', 'limpeza', 'protecao', 'energia ruim', 'mau olhado'],
  osatoshi: ['limpeza espiritual', 'shinri', 'tecnica japonesa', 'desobsessao', 'omamori'],
  emf: ['campo', 'calibracao', 'malha', 'eletromagnetico', 'balancing', 'aura'],
  reiki: ['imposicao de maos', 'energia vital', 'usui'],
  shiatsu: ['massagem', 'pressao', 'massagem japonesa', 'meridianos'],
  acupuntura: ['agulha', 'agulhas', 'mtc', 'medicina chinesa'],
  auriculoterapia: ['orelha', 'sementinha', 'sementes', 'auricular'],
  seitai: ['postura', 'postural', 'coluna', 'quiropraxia japonesa'],
  elementoterapia: ['ima', 'imas', 'magnetico', 'biomagnetismo', 'florais'],
  relacionamento: ['casamento', 'namoro', 'familia', 'brigas', 'conflito', 'separacao'],
  financeiro: ['dinheiro', 'dividas', 'trabalho', 'emprego', 'negocio', 'empresa', 'prosperidade'],
  distancia: ['online', 'remoto', 'videochamada', 'longe', 'outra cidade', 'a distancia'],
  preco: ['valor', 'quanto custa', 'custa', 'investimento', 'pagamento', 'honorario'],
  agendar: ['marcar', 'horario', 'agenda', 'consulta', 'atendimento', 'sessao'],
  gestante: ['gravida', 'gravidez', 'gestacao'],
}

const PARADAS = new Set([
  'a','o','as','os','de','da','do','das','dos','e','em','no','na','nos','nas','um','uma','uns','umas',
  'para','por','com','sem','que','se','ao','aos','à','às','é','ser','sou','estou','esta','este','isso',
  'meu','minha','me','eu','você','voce','mais','muito','tem','ter','como','qual','quais','onde','quando',
  'sobre','the','of','and','pra','pro','ja','já','nao','não','sim','tudo','todo','toda',
])

export function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Radical simples para português — reduz plurais e sufixos comuns. */
export function radical(palavra: string) {
  let p = palavra
  if (p.length > 5) {
    p = p.replace(/(mente|coes|ções|ções|ando|endo|indo|adas|idas|ados|idos|agem)$/,'')
  }
  if (p.length > 4) p = p.replace(/(es|is|ns|as|os|s|a|o|e)$/, '')
  return p
}

export function tokens(texto: string) {
  return normalizar(texto)
    .split(' ')
    .filter((t) => t.length > 1 && !PARADAS.has(t))
}

/** Expande a consulta com sinônimos, para aproximar linguagem popular do vocabulário do site. */
export function expandirConsulta(consulta: string) {
  const base = normalizar(consulta)
  const termos = new Set(tokens(consulta).map(radical))
  for (const [chave, variantes] of Object.entries(sinonimos)) {
    const alvo = [chave, ...variantes]
    if (alvo.some((v) => base.includes(normalizar(v)))) {
      termos.add(radical(chave))
      variantes.forEach((v) => tokens(v).forEach((t) => termos.add(radical(t))))
    }
  }
  return [...termos]
}

/** Monta o índice a partir do conteúdo do site. Roda no servidor, em tempo de build. */
export function construirIndice(): Documento[] {
  const docs: Documento[] = []

  for (const t of terapias) {
    docs.push({
      id: `terapia-${t.slug}`,
      titulo: t.nome,
      trecho: t.resumo,
      href: `/terapias/${t.slug}`,
      tipo: 'Terapia',
      corpo: [
        t.nome, t.nomeCurto, t.tagline, t.resumo, t.origem,
        ...t.oQueE, ...t.comoFunciona, t.evidencia,
        ...t.indicacoes, t.limites,
        t.sessao.duracao, t.sessao.formato, t.sessao.sensacao, t.sessao.frequencia,
        ...t.keywords,
      ].join(' '),
    })

    for (const f of t.faq) {
      docs.push({
        id: `faq-${t.slug}-${normalizar(f.pergunta).slice(0, 28)}`,
        titulo: f.pergunta,
        trecho: f.resposta,
        href: `/terapias/${t.slug}#perguntas`,
        tipo: 'Pergunta',
        contexto: t.nome,
        corpo: `${f.pergunta} ${f.resposta} ${t.nome}`,
      })
    }

    for (const termo of t.termos) {
      docs.push({
        id: `termo-${normalizar(termo.termo)}`,
        titulo: termo.termo,
        trecho: termo.definicao,
        href: `/glossario#${slugificar(termo.termo)}`,
        tipo: 'Glossário',
        contexto: t.nome,
        corpo: `${termo.termo} ${termo.definicao} ${t.nome}`,
      })
    }
  }

  for (const v of videos) {
    docs.push({
      id: `video-${v.id}`,
      titulo: v.titulo,
      trecho: v.descricao,
      href: `/videos#${v.id}`,
      tipo: 'Vídeo',
      corpo: `${v.titulo} ${v.descricao} ${v.terapia ?? ''}`,
    })
  }

  const paginas: Documento[] = [
    { id: 'pag-sobre', titulo: 'Sobre Caio Gracco', trecho: 'A trajetória do terapeuta, iniciada aos 14 anos, e o que sustenta o trabalho de hoje.', href: '/sobre', tipo: 'Página', corpo: 'sobre caio gracco terapeuta trajetoria historia missao formacao credenciamento shinri santa rosa de viterbo quem é' },
    { id: 'pag-terapias', titulo: 'Todas as terapias', trecho: 'As oito abordagens atendidas por Caio Gracco, com o que cada uma é e para quem faz sentido.', href: '/terapias', tipo: 'Página', corpo: 'terapias abordagens tratamentos praticas integrativas lista todas' },
    { id: 'pag-contato', titulo: 'Contato e agendamento', trecho: 'Como marcar um atendimento presencial ou online, endereço, WhatsApp e e-mail.', href: '/contato', tipo: 'Página', corpo: 'contato agendar marcar horario whatsapp telefone email endereco onde fica como chegar preco valor quanto custa' },
    { id: 'pag-videos', titulo: 'Vídeos', trecho: 'Os vídeos publicados por Caio Gracco no YouTube, reunidos por tema.', href: '/videos', tipo: 'Página', corpo: 'videos youtube canal aulas explicacoes depoimentos' },
    { id: 'pag-glossario', titulo: 'Glossário', trecho: 'Os termos das tradições atendidas aqui, explicados em linguagem simples.', href: '/glossario', tipo: 'Página', corpo: 'glossario termos dicionario significado o que quer dizer vocabulario' },
    { id: 'pag-aviso', titulo: 'Aviso de cuidado', trecho: 'O que estas práticas são, o que não são, e por que nenhuma delas substitui acompanhamento de saúde.', href: '/aviso-de-cuidado', tipo: 'Página', corpo: 'aviso limites etica saude medico psicologo nao substitui responsabilidade seguranca' },
  ]

  return [...docs, ...paginas]
}

export function slugificar(texto: string) {
  return normalizar(texto).replace(/\s+/g, '-')
}

/** Pontuação: título pesa mais que corpo; casamento exato pesa mais que radical. */
export function buscar(indice: Documento[], consulta: string, limite = 8) {
  const termos = expandirConsulta(consulta)
  if (!termos.length) return []
  const consultaNorm = normalizar(consulta)

  const resultados = indice.map((doc) => {
    const tituloNorm = normalizar(doc.titulo)
    const corpoNorm = normalizar(`${doc.titulo} ${doc.trecho} ${doc.corpo}`)
    let pontos = 0

    if (consultaNorm.length > 2 && tituloNorm.includes(consultaNorm)) pontos += 60
    if (consultaNorm.length > 3 && corpoNorm.includes(consultaNorm)) pontos += 22

    for (const termo of termos) {
      if (termo.length < 2) continue
      if (tituloNorm.includes(termo)) pontos += 14
      const ocorrencias = corpoNorm.split(termo).length - 1
      if (ocorrencias > 0) pontos += Math.min(ocorrencias, 5) * 3
    }

    if (doc.tipo === 'Terapia') pontos *= 1.18
    if (doc.tipo === 'Página') pontos *= 1.05

    return { doc, pontos }
  })

  return resultados
    .filter((r) => r.pontos > 8)
    .sort((a, b) => b.pontos - a.pontos)
    .slice(0, limite)
    .map((r) => r.doc)
}
