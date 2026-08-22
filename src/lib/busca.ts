
export type Documento = {
  id: string
  titulo: string
  trecho: string
  href: string
  tipo: 'Terapia' | 'Pergunta' | 'Glossário' | 'Página' | 'Vídeo' | 'Artigo'
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

/** Radical simples para português: reduz plurais e sufixos comuns. */
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
