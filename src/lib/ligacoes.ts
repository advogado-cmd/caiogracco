import { todosArtigos } from './blog'
import { terapias } from '@/content/terapias'

/**
 * Ligação automática entre páginas.
 *
 * Em vez de depender de alguém lembrar de escrever cada link à mão em cada
 * texto, o site monta sozinho um dicionário de expressões e seus destinos, a
 * partir das palavras-chave dos artigos, dos títulos e dos nomes das terapias.
 * Ao renderizar um artigo, a primeira ocorrência de cada expressão vira link
 * para a página correspondente.
 *
 * Regras que evitam que isso fique feio ou abusivo:
 *   · nunca liga o artigo a ele mesmo;
 *   · uma ocorrência por expressão, e no máximo um punhado por texto;
 *   · não entra em título, em citação, em tabela nem dentro de outro link;
 *   · expressões longas têm prioridade sobre curtas, para "carma familiar"
 *     não ser engolido por "carma".
 */

export type Ligacao = { termo: string; href: string; normalizado: string }

const PARADAS = new Set([
  'osatoshi', 'terapia', 'terapias', 'caio', 'gracco', 'blog', 'sessao', 'sessão',
])

function normalizar(t: string) {
  return t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Expressões que valem uma ligação, escolhidas à mão.
 *
 * São as palavras que de fato aparecem no meio dos textos, ao contrário de
 * várias palavras-chave de busca, que são frases longas que ninguém escreve
 * no corpo de um artigo. Destinos que ainda não existem são descartados na
 * montagem, então dá para deixar aqui um artigo planejado sem quebrar nada.
 */
const CURADAS: Record<string, string> = {
  'carma familiar': '/blog/carma-familiar',
  'carma': '/blog/o-que-e-carma',
  'corte de laços': '/blog/corte-de-lacos',
  'vínculo energético': '/blog/corte-de-lacos',
  'divórcio energético': '/blog/divorcio-energetico',
  'limpeza espiritual': '/blog/limpeza-espiritual',
  'espírito obsessor': '/blog/espirito-obsessor',
  'obsessão espiritual': '/blog/espirito-obsessor',
  'salvação de espíritos': '/blog/salvacao-de-espiritos',
  'egrégora': '/blog/o-que-e-egregora',
  'egrégoras': '/blog/o-que-e-egregora',
  'omamori': '/blog/omamori-protecao-japonesa',
  'proteção espiritual': '/blog/protecao-espiritual-rotina',
  'energia pesada': '/blog/energia-pesada-em-casa',
  'trauma ancestral': '/blog/trauma-ancestral',
  'trauma guardado no corpo': '/blog/onde-o-trauma-fica-no-corpo',
  'bloqueio financeiro': '/blog/bloqueio-financeiro',
  'crenças limitantes': '/blog/bloqueio-financeiro',
  'relacionamento kármico': '/blog/relacionamento-karmico-ou-dependencia-emocional',
  'vínculo kármico': '/blog/relacionamento-karmico-ou-dependencia-emocional',
  'dependência emocional': '/blog/relacionamento-karmico-ou-dependencia-emocional',
  'chama gêmea': '/blog/chama-gemea-sinais',
  'sinastria': '/blog/sinastria-e-vinculo-karmico',
  'padrão de repetição': '/blog/sempre-atraio-o-mesmo-tipo-de-pessoa',
  'exames deram normais': '/blog/exames-normais-corpo-doi',
  'somatização': '/blog/exames-normais-corpo-doi',
  'cansaço que dormir não resolve': '/blog/cansaco-que-dormir-nao-resolve',
  'insônia': '/blog/insonia-o-que-fazer',
  'ansiedade no corpo': '/blog/ansiedade-no-corpo',
  'tensão no pescoço': '/blog/tensao-no-pescoco-e-ombros',
  'tipos de Osatoshi': '/blog/tipos-de-osatoshi',
  'Osatoshi Individual': '/blog/osatoshi-individual',
  'Osatoshi de Ancestrais': '/blog/osatoshi-de-ancestrais',
  'ancestrais': '/blog/osatoshi-de-ancestrais',
  'vingativos': '/blog/osatoshi-vingativos-da-familia',
  'harmonização': '/blog/harmonizacao-de-duas-pessoas',
  'PNPIC': '/blog/reiki-no-sus',
  'Política Nacional de Práticas Integrativas': '/blog/reiki-no-sus',
  'práticas integrativas': '/blog/terapia-integrativa-com-tratamento-medico',
  'tratamento médico': '/blog/terapia-integrativa-com-tratamento-medico',
  'Reiki à distância': '/blog/reiki-a-distancia-funciona',
  'auriculoterapia': '/terapias/auriculoterapia',
  'acupuntura': '/terapias/acupuntura-sistemica',
  'Shiatsu': '/terapias/shiatsu',
  'Seitai': '/terapias/seitai',
  'Reiki': '/terapias/reiki',
  'EMF Balancing Technique': '/terapias/emf-balancing-technique',
  'Elementoterapia Magnética': '/terapias/elementoterapia-magnetica',
  'glossário': '/glossario',
  'aviso de cuidado': '/aviso-de-cuidado',
}

let cache: Ligacao[] | null = null

export function dicionarioDeLigacoes(): Ligacao[] {
  if (cache) return cache

  const mapa = new Map<string, Ligacao>()
  const registrar = (termo: string, href: string) => {
    const n = normalizar(termo)
    // Expressões de uma palavra só e muito genéricas viram ruído.
    if (n.length < 7 || PARADAS.has(n)) return
    if (!mapa.has(n)) mapa.set(n, { termo, href, normalizado: n })
  }

  const artigos = todosArtigos()
  const existentes = new Set(artigos.map((a) => `/blog/${a.slug}`))
  const fixas = new Set(['/glossario', '/aviso-de-cuidado', ...terapias.map((t) => `/terapias/${t.slug}`)])

  // As curadas entram primeiro, e só valem se a página de destino existir.
  for (const [termo, href] of Object.entries(CURADAS)) {
    if (existentes.has(href) || fixas.has(href)) registrar(termo, href)
  }

  for (const t of terapias) {
    registrar(t.nome, `/terapias/${t.slug}`)
    registrar(t.nomeCurto, `/terapias/${t.slug}`)
  }

  for (const a of artigos) {
    const destino = `/blog/${a.slug}`
    for (const p of a.palavrasChave) registrar(p, destino)
    if (a.tituloCurto) registrar(a.tituloCurto, destino)
  }

  // As mais longas primeiro: "carma familiar" antes de "carma".
  cache = [...mapa.values()].sort((a, b) => b.normalizado.length - a.normalizado.length)
  return cache
}
