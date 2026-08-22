import fs from 'node:fs'
import path from 'node:path'
import { idDeTitulo } from './markdown'
import type { NomeIcone } from '@/components/Icone'

/**
 * O blog vive em arquivos Markdown, em `src/content/blog/`.
 *
 * Cada arquivo começa com um bloco de metadados em JSON, entre `---json` e `---`,
 * e segue com o texto em Markdown. Nada disso exige dependência externa: o
 * subconjunto de Markdown usado aqui é pequeno e está inteiramente sob controle
 * (ver `analisarMarkdown`, em `src/lib/markdown.ts`).
 *
 * Para publicar um artigo novo basta acrescentar um arquivo `.md` nessa pasta.
 * A listagem, as categorias, o mapa do site, a busca interna, o RSS e os dados
 * estruturados se atualizam sozinhos na próxima build.
 */

export type CategoriaBlog =
  | 'osatoshi' | 'relacionamentos' | 'familia' | 'convivencia' | 'prosperidade'
  | 'corpo' | 'espiritual' | 'praticas' | 'orientacao'

export type MetaArtigo = {
  titulo: string
  /** Título curto para cartões e navegação; cai no `titulo` se ausente. */
  tituloCurto?: string
  slug: string
  resumo: string
  /** Descrição para o Google, até 158 caracteres. */
  descricao: string
  categoria: CategoriaBlog
  publicadoEm: string
  atualizadoEm?: string
  /** Terapias relacionadas, por slug. Gera os links para as páginas de terapia. */
  terapias?: string[]
  palavrasChave: string[]
  /** Peso editorial: ordena a vitrine da home enquanto não há dados de audiência. */
  peso?: number
  /** Perguntas frequentes do artigo: viram FAQPage nos dados estruturados. */
  faq?: { pergunta: string; resposta: string }[]
}

export type Artigo = MetaArtigo & {
  corpo: string
  minutos: number
  /** Subtítulos de nível 2, para o sumário lateral. */
  secoes: { id: string; titulo: string }[]
}

export const CATEGORIAS: Record<CategoriaBlog, { nome: string; slug: string; descricao: string; icone: NomeIcone }> = {
  osatoshi: {
    nome: 'Osatoshi',
    slug: 'osatoshi',
    descricao:
      'A prática espiritual japonesa da Shinri, tipo por tipo: o que cada modalidade trata, para quem é e o que esperar.',
    icone: 'osatoshi',
  },
  relacionamentos: {
    nome: 'Relacionamentos',
    slug: 'relacionamentos',
    descricao:
      'O que se repete no amor, o vínculo que não se desfaz, o casamento que esfriou e o ciúme que não passa.',
    icone: 'coracao',
  },
  familia: {
    nome: 'Família e filhos',
    slug: 'familia-e-filhos',
    descricao:
      'A relação com a mãe e com o pai, os filhos, os irmãos, a casa em conflito e o que atravessa gerações sem ninguém falar.',
    icone: 'familia',
  },
  convivencia: {
    nome: 'Amizades e convivência',
    slug: 'amizades-e-convivencia',
    descricao:
      'Amizades que acabam, gente que drena, inveja, ambiente de trabalho pesado e a solidão que aparece mesmo cercado de gente.',
    icone: 'amizade',
  },
  prosperidade: {
    nome: 'Dinheiro e prosperidade',
    slug: 'dinheiro-e-prosperidade',
    descricao:
      'O dinheiro que não para na mão, o trabalho que não deslancha, a herança de escassez que veio de casa e o que fazer em cada camada disso.',
    icone: 'moeda',
  },
  corpo: {
    nome: 'Corpo e sintomas',
    slug: 'corpo-e-sintomas',
    descricao: 'O que o corpo diz quando dói, não dorme ou não descansa, e o que fazer quando o exame não aponta nada.',
    icone: 'coracao',
  },
  espiritual: {
    nome: 'Espiritualidade e emoções',
    slug: 'espiritualidade-e-emocoes',
    descricao: 'Carma, limpeza espiritual, vínculos, heranças de família e as dores que não cabem só na conversa.',
    icone: 'sol',
  },
  praticas: {
    nome: 'As práticas',
    slug: 'as-praticas',
    descricao: 'Como funciona cada uma das oito abordagens, o que se sente na sessão e o que a evidência mostra.',
    icone: 'folha',
  },
  orientacao: {
    nome: 'Antes de começar',
    slug: 'antes-de-comecar',
    descricao: 'Como escolher, como as terapias convivem com o tratamento médico e o que esperar de verdade.',
    icone: 'mente',
  },
}

const PASTA = path.join(process.cwd(), 'src', 'content', 'blog')

function lerArquivo(arquivo: string): Artigo {
  const bruto = fs.readFileSync(path.join(PASTA, arquivo), 'utf8')
  const casamento = bruto.match(/^---json\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/)
  if (!casamento) {
    throw new Error(`Artigo sem bloco de metadados válido: ${arquivo}`)
  }

  let meta: MetaArtigo
  try {
    meta = JSON.parse(casamento[1])
  } catch (e) {
    throw new Error(`Metadados inválidos em ${arquivo}: ${(e as Error).message}`)
  }

  const obrigatorios: (keyof MetaArtigo)[] = ['titulo', 'slug', 'resumo', 'descricao', 'categoria', 'publicadoEm']
  for (const campo of obrigatorios) {
    if (!meta[campo]) throw new Error(`Artigo ${arquivo} sem "${campo}"`)
  }
  if (!CATEGORIAS[meta.categoria]) {
    throw new Error(`Artigo ${arquivo} com categoria desconhecida: ${meta.categoria}`)
  }

  const corpo = casamento[2].trim()
  const palavras = corpo.split(/\s+/).length
  const secoes = [...corpo.matchAll(/^##\s+(.+)$/gm)].map((m) => ({
    titulo: m[1].trim(),
    id: idDeTitulo(m[1].trim()),
  }))

  return {
    ...meta,
    palavrasChave: meta.palavrasChave ?? [],
    peso: meta.peso ?? 0,
    corpo,
    // 200 palavras por minuto é a média confortável de leitura em português.
    minutos: Math.max(2, Math.round(palavras / 200)),
    secoes,
  }
}

let cache: Artigo[] | null = null

/** Todos os artigos, do mais recente para o mais antigo. */
export function todosArtigos(): Artigo[] {
  if (cache) return cache
  if (!fs.existsSync(PASTA)) return []
  const artigos = fs
    .readdirSync(PASTA)
    .filter((f) => f.endsWith('.md'))
    .map(lerArquivo)
    .sort((a, b) => b.publicadoEm.localeCompare(a.publicadoEm))

  const slugs = new Set<string>()
  for (const a of artigos) {
    if (slugs.has(a.slug)) throw new Error(`Dois artigos com o mesmo slug: ${a.slug}`)
    slugs.add(a.slug)
  }

  cache = artigos
  return artigos
}

export function getArtigo(slug: string) {
  return todosArtigos().find((a) => a.slug === slug)
}

export function artigosDaCategoria(categoria: CategoriaBlog) {
  return todosArtigos().filter((a) => a.categoria === categoria)
}

/**
 * Os artigos que aparecem na vitrine da home.
 *
 * A ordem sai de `src/content/populares.json`, que pode ser regerado a partir
 * do Google Analytics (ver `scripts/atualizar-populares.mjs`). Enquanto não
 * houver dados de audiência, vale o peso editorial de cada artigo.
 */
export function artigosPopulares(limite = 3): Artigo[] {
  const artigos = todosArtigos()
  let ordem: string[] = []
  try {
    const arquivo = path.join(process.cwd(), 'src', 'content', 'populares.json')
    if (fs.existsSync(arquivo)) {
      const dados = JSON.parse(fs.readFileSync(arquivo, 'utf8'))
      ordem = Array.isArray(dados?.slugs) ? dados.slugs : []
    }
  } catch {
    ordem = []
  }

  if (ordem.length) {
    const porSlug = new Map(artigos.map((a) => [a.slug, a]))
    const escolhidos = ordem.map((s) => porSlug.get(s)).filter((a): a is Artigo => Boolean(a))
    if (escolhidos.length >= limite) return escolhidos.slice(0, limite)
    const resto = artigos.filter((a) => !escolhidos.includes(a))
    return [...escolhidos, ...resto].slice(0, limite)
  }

  return [...artigos].sort((a, b) => (b.peso ?? 0) - (a.peso ?? 0)).slice(0, limite)
}

/**
 * Artigos relacionados: primeiro os que tratam das mesmas terapias, depois os
 * da mesma categoria. Serve tanto ao leitor quanto ao rastreamento do Google.
 */
export function artigosRelacionados(artigo: Artigo, limite = 3): Artigo[] {
  const outros = todosArtigos().filter((a) => a.slug !== artigo.slug)
  const pontuado = outros.map((a) => {
    let pontos = 0
    const terapiasA = new Set(artigo.terapias ?? [])
    for (const t of a.terapias ?? []) if (terapiasA.has(t)) pontos += 4
    if (a.categoria === artigo.categoria) pontos += 2
    const chaves = new Set(artigo.palavrasChave.map((p) => p.toLowerCase()))
    for (const p of a.palavrasChave) if (chaves.has(p.toLowerCase())) pontos += 1
    return { a, pontos }
  })
  return pontuado
    .sort((x, y) => y.pontos - x.pontos || y.a.publicadoEm.localeCompare(x.a.publicadoEm))
    .slice(0, limite)
    .map((r) => r.a)
}

/** Artigos que tratam de uma terapia específica: alimenta a seção de leitura das páginas de terapia. */
export function artigosDaTerapia(slugTerapia: string, limite = 6): Artigo[] {
  return todosArtigos()
    .filter((a) => (a.terapias ?? []).includes(slugTerapia))
    .sort((a, b) => (b.peso ?? 0) - (a.peso ?? 0))
    .slice(0, limite)
}
