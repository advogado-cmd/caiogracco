
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

/**
 * Jeitos de dizer que só fazem sentido inteiros.
 *
 * Ninguém digita "vínculo afetivo residual". Digita "não sai da minha cabeça".
 * Quando a frase aparece na consulta, os termos do lado direito entram com o
 * mesmo peso do que a pessoa escreveu, porque é isso que ela quis dizer.
 */
export const expressoes: Record<string, string[]> = {
  'nao sai da minha cabeca': ['esquecer', 'vinculo', 'termino', 'relacionamento'],
  'nao consigo esquecer': ['esquecer', 'vinculo', 'termino', 'relacionamento'],
  'nao consigo dormir': ['insonia', 'sono'],
  'nao durmo': ['insonia', 'sono'],
  'acordo cansad': ['cansaco', 'sono', 'exaustao'],
  'exames deram normal': ['exame', 'dor', 'somatizacao'],
  'exames normais': ['exame', 'dor', 'somatizacao'],
  'nada foi encontrado nos exames': ['exame', 'dor'],
  'dinheiro nao para': ['financeiro', 'prosperidade', 'bloqueio'],
  'nao sobra dinheiro': ['financeiro', 'prosperidade', 'bloqueio'],
  'tudo da errado': ['bloqueio', 'carma', 'prosperidade'],
  'minha vida nao anda': ['bloqueio', 'carma', 'prosperidade'],
  'energia ruim': ['limpeza', 'protecao', 'energia'],
  'peso na casa': ['casa', 'limpeza', 'lugar'],
  'sempre atraio': ['padrao', 'repeticao', 'relacionamento', 'carma'],
  'me sinto invisivel': ['solidao', 'invisivel'],
  'estou exaust': ['cansaco', 'exaustao'],
  'quanto custa': ['preco', 'agendar', 'contato'],
  'vale a pena': ['agendar', 'contato'],
  'primeira vez': ['primeira sessao', 'agendar'],
  'meu filho': ['filho', 'crianca', 'familia'],
  'minha mae': ['mae', 'familia'],
  'meu pai': ['pai', 'familia'],
  'meu ex': ['ex', 'esquecer', 'termino', 'relacionamento'],
  'minha ex': ['ex', 'esquecer', 'termino', 'relacionamento'],
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

/**
 * Expande a consulta com sinônimos, para aproximar linguagem popular do vocabulário
 * do site. Devolve os termos separados em dois grupos: o que a pessoa realmente
 * digitou e o que veio por sinônimo. Os dois pesam diferente na hora de pontuar,
 * senão uma busca por "carma" vira uma busca por tudo que é espiritual.
 */
export function expandirConsulta(consulta: string) {
  const base = normalizar(consulta)
  const proprios = new Set(tokens(consulta).map(radical))
  for (const [frase, termos] of Object.entries(expressoes)) {
    if (base.includes(frase)) termos.forEach((t) => tokens(t).forEach((x) => proprios.add(radical(x))))
  }
  const derivados = new Set<string>()
  for (const [chave, variantes] of Object.entries(sinonimos)) {
    const alvo = [chave, ...variantes]
    if (alvo.some((v) => base.includes(normalizar(v)))) {
      derivados.add(radical(chave))
      variantes.forEach((v) => tokens(v).forEach((t) => derivados.add(radical(t))))
    }
  }
  for (const t of proprios) derivados.delete(t)
  return { proprios: [...proprios], derivados: [...derivados] }
}

export function slugificar(texto: string) {
  return normalizar(texto).replace(/\s+/g, '-')
}

/** Pontuação: título pesa mais que corpo; casamento exato pesa mais que radical. */
/**
 * Termo curto só conta se for palavra inteira. Sem isso, buscar "ex" casa com
 * "exausta", "explicação" e "experiência", e o resultado vira ruído.
 * Termo longo continua casando por dentro da palavra, que é o que permite
 * ao radical "insoni" encontrar "insônia" e "insones".
 */
function contem(texto: string, termo: string) {
  if (termo.length >= 4) return texto.includes(termo)
  let i = texto.indexOf(termo)
  while (i !== -1) {
    const antes = i === 0 ? ' ' : texto[i - 1]
    const depois = texto[i + termo.length] ?? ' '
    if (!/[a-z0-9]/.test(antes) && !/[a-z0-9]/.test(depois)) return true
    i = texto.indexOf(termo, i + 1)
  }
  return false
}

function contarOcorrencias(texto: string, termo: string) {
  if (termo.length >= 4) return texto.split(termo).length - 1
  let n = 0
  let i = texto.indexOf(termo)
  while (i !== -1) {
    const antes = i === 0 ? ' ' : texto[i - 1]
    const depois = texto[i + termo.length] ?? ' '
    if (!/[a-z0-9]/.test(antes) && !/[a-z0-9]/.test(depois)) n += 1
    i = texto.indexOf(termo, i + 1)
  }
  return n
}

export function buscar(indice: Documento[], consulta: string, limite = 8) {
  const { proprios, derivados } = expandirConsulta(consulta)
  if (!proprios.length && !derivados.length) return []
  const consultaNorm = normalizar(consulta)

  const resultados = indice.map((doc) => {
    const tituloNorm = normalizar(doc.titulo)
    const resumoNorm = normalizar(doc.trecho)
    const corpoNorm = normalizar(`${doc.titulo} ${doc.trecho} ${doc.corpo}`)
    let pontos = 0

    if (consultaNorm.length > 2 && tituloNorm.includes(consultaNorm)) pontos += 80
    if (consultaNorm.length > 3 && corpoNorm.includes(consultaNorm)) pontos += 22

    // O que a pessoa digitou vale muito mais do que o que veio por sinônimo.
    let noTitulo = 0
    for (const termo of proprios) {
      if (termo.length < 2) continue
      if (contem(tituloNorm, termo)) { pontos += 26; noTitulo += 1 }
      if (contem(resumoNorm, termo)) pontos += 8
      const ocorrencias = contarOcorrencias(corpoNorm, termo)
      if (ocorrencias > 0) pontos += Math.min(ocorrencias, 6) * 4
    }
    // Casar mais de um termo digitado no mesmo título é sinal forte.
    if (noTitulo > 1) pontos += noTitulo * 22

    for (const termo of derivados) {
      if (termo.length < 2) continue
      if (contem(tituloNorm, termo)) pontos += 6
      const ocorrencias = contarOcorrencias(corpoNorm, termo)
      if (ocorrencias > 0) pontos += Math.min(ocorrencias, 3)
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
