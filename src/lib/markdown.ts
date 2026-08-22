import type { ReactNode } from 'react'
import { createElement as h, Fragment } from 'react'

/**
 * Renderizador de um subconjunto pequeno e fechado de Markdown.
 *
 * Existe para o blog não depender de biblioteca externa nem de MDX: o conteúdo
 * é escrito por nós, o subconjunto é conhecido, e o resultado sai como elementos
 * React já com as classes visuais do site.
 *
 * Reconhece:
 *   ##, ###           títulos (o de nível 2 ganha âncora, para o sumário)
 *   parágrafo          linhas soltas
 *   - item             lista simples
 *   1. item            lista numerada
 *   > citação          bloco destacado
 *   :::destaque        caixa clara, para o ponto central de uma seção
 *   :::cuidado         caixa de ressalva — limites, contraindicações, quando procurar médico
 *   | tabela |         tabela simples com cabeçalho
 *   **negrito**  *itálico*  [texto](link)  `código`
 */

/** Âncora estável para um título — usada no sumário e nos links diretos. */
export function idDeTitulo(texto: string) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60)
}

type Bloco =
  | { tipo: 'h2' | 'h3'; texto: string }
  | { tipo: 'p'; texto: string }
  | { tipo: 'ul' | 'ol'; itens: string[] }
  | { tipo: 'citacao'; linhas: string[] }
  | { tipo: 'caixa'; variante: 'destaque' | 'cuidado'; linhas: string[] }
  | { tipo: 'tabela'; cabecalho: string[]; linhas: string[][] }

function dividirEmBlocos(md: string): Bloco[] {
  const linhas = md.replace(/\r\n/g, '\n').split('\n')
  const blocos: Bloco[] = []
  let i = 0

  const ehTabela = (l: string) => l.trim().startsWith('|') && l.trim().endsWith('|')
  const celulas = (l: string) =>
    l.trim().slice(1, -1).split('|').map((c) => c.trim())

  while (i < linhas.length) {
    const linha = linhas[i]

    if (!linha.trim()) { i++; continue }

    if (linha.startsWith('### ')) { blocos.push({ tipo: 'h3', texto: linha.slice(4).trim() }); i++; continue }
    if (linha.startsWith('## ')) { blocos.push({ tipo: 'h2', texto: linha.slice(3).trim() }); i++; continue }

    if (linha.startsWith(':::')) {
      const variante = linha.slice(3).trim() === 'cuidado' ? 'cuidado' : 'destaque'
      const corpo: string[] = []
      i++
      while (i < linhas.length && !linhas[i].startsWith(':::')) {
        if (linhas[i].trim()) corpo.push(linhas[i].trim())
        i++
      }
      i++
      blocos.push({ tipo: 'caixa', variante, linhas: corpo })
      continue
    }

    if (linha.startsWith('> ')) {
      const corpo: string[] = []
      while (i < linhas.length && linhas[i].startsWith('> ')) { corpo.push(linhas[i].slice(2).trim()); i++ }
      blocos.push({ tipo: 'citacao', linhas: corpo })
      continue
    }

    if (ehTabela(linha) && ehTabela(linhas[i + 1] ?? '') && /^[\s|:-]+$/.test(linhas[i + 1])) {
      const cabecalho = celulas(linha)
      i += 2
      const corpo: string[][] = []
      while (i < linhas.length && ehTabela(linhas[i])) { corpo.push(celulas(linhas[i])); i++ }
      blocos.push({ tipo: 'tabela', cabecalho, linhas: corpo })
      continue
    }

    if (/^[-*]\s+/.test(linha)) {
      const itens: string[] = []
      while (i < linhas.length && /^[-*]\s+/.test(linhas[i])) { itens.push(linhas[i].replace(/^[-*]\s+/, '').trim()); i++ }
      blocos.push({ tipo: 'ul', itens })
      continue
    }

    if (/^\d+\.\s+/.test(linha)) {
      const itens: string[] = []
      while (i < linhas.length && /^\d+\.\s+/.test(linhas[i])) { itens.push(linhas[i].replace(/^\d+\.\s+/, '').trim()); i++ }
      blocos.push({ tipo: 'ol', itens })
      continue
    }

    const paragrafo: string[] = []
    while (
      i < linhas.length &&
      linhas[i].trim() &&
      !linhas[i].startsWith('#') &&
      !linhas[i].startsWith('>') &&
      !linhas[i].startsWith(':::') &&
      !/^[-*]\s+/.test(linhas[i]) &&
      !/^\d+\.\s+/.test(linhas[i]) &&
      !ehTabela(linhas[i])
    ) { paragrafo.push(linhas[i].trim()); i++ }
    if (paragrafo.length) blocos.push({ tipo: 'p', texto: paragrafo.join(' ') })
  }

  return blocos
}

export type Ligacao = { termo: string; href: string; normalizado: string }

/** Estado da ligação automática durante a renderização de um artigo. */
type Contexto = { ligacoes: Ligacao[]; usados: Set<string>; restantes: number }

function normalizarTexto(t: string) {
  return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/**
 * Liga a primeira ocorrência de uma expressão do dicionário à sua página.
 * Recebe apenas o texto puro entre marcações, então nunca cria link dentro de
 * link, dentro de negrito ou dentro de código.
 */
function ligarAutomatico(trecho: string, ctx: Contexto | undefined, chave: string): ReactNode[] {
  if (!ctx || ctx.restantes <= 0 || !trecho.trim()) return [trecho]
  const alvo = normalizarTexto(trecho)

  for (const lig of ctx.ligacoes) {
    if (ctx.usados.has(lig.normalizado)) continue
    const i = alvo.indexOf(lig.normalizado)
    if (i < 0) continue
    // Só liga palavra inteira.
    const antes = i === 0 ? ' ' : alvo[i - 1]
    const depois = alvo[i + lig.normalizado.length] ?? ' '
    if (/[a-z0-9]/.test(antes) || /[a-z0-9]/.test(depois)) continue

    ctx.usados.add(lig.normalizado)
    ctx.restantes -= 1
    const original = trecho.slice(i, i + lig.normalizado.length)
    return [
      ...ligarAutomatico(trecho.slice(0, i), ctx, `${chave}a`),
      h('a', {
        key: `${chave}-lig`,
        href: lig.href,
        className: 'text-noite-600 underline decoration-noite-600/35 underline-offset-[3px] transition hover:decoration-noite-600',
      }, original),
      ...ligarAutomatico(trecho.slice(i + lig.normalizado.length), ctx, `${chave}b`),
    ]
  }
  return [trecho]
}

/** Formatação dentro da linha: negrito, itálico, link e código. */
function inline(texto: string, chaveBase: string, ctx?: Contexto): ReactNode[] {
  const partes: ReactNode[] = []
  const padrao = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g
  let ultimo = 0
  let m: RegExpExecArray | null
  let n = 0

  while ((m = padrao.exec(texto)) !== null) {
    if (m.index > ultimo) partes.push(...ligarAutomatico(texto.slice(ultimo, m.index), ctx, `${chaveBase}-${n}`))
    const t = m[0]
    const chave = `${chaveBase}-${n++}`

    if (t.startsWith('**')) {
      partes.push(h('strong', { key: chave }, t.slice(2, -2)))
    } else if (t.startsWith('`')) {
      partes.push(h('code', { key: chave, className: 'rounded bg-areia-200/50 px-1.5 py-0.5 text-[0.9em]' }, t.slice(1, -1)))
    } else if (t.startsWith('[')) {
      const link = t.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (link) {
        const externo = /^https?:\/\//.test(link[2])
        partes.push(
          h('a', {
            key: chave,
            href: link[2],
            ...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
            className: 'text-noite-600 underline underline-offset-[3px] transition hover:text-noite-400',
          }, link[1]),
        )
      } else partes.push(t)
    } else {
      partes.push(h('em', { key: chave }, t.slice(1, -1)))
    }
    ultimo = m.index + t.length
  }

  if (ultimo < texto.length) partes.push(...ligarAutomatico(texto.slice(ultimo), ctx, `${chaveBase}-f`))
  return partes
}

export function renderizarMarkdown(
  md: string,
  ligacoes: Ligacao[] = [],
  maximo = 7,
): ReactNode {
  const blocos = dividirEmBlocos(md)
  // A ligação automática entra só no corpo do texto: parágrafo, lista e caixa.
  // Título, citação e tabela ficam de fora, para o texto não virar um mural de links.
  const ctx: Contexto = { ligacoes, usados: new Set(), restantes: maximo }

  return h(
    Fragment,
    null,
    ...blocos.map((b, i) => {
      const k = `b${i}`
      switch (b.tipo) {
        case 'h2':
          return h('h2', {
            key: k,
            id: idDeTitulo(b.texto),
            className: 'mt-14 scroll-mt-28 font-display text-2xl leading-snug text-noite-800 sm:text-[1.75rem]',
          }, ...inline(b.texto, k))
        case 'h3':
          return h('h3', {
            key: k,
            className: 'mt-9 font-display text-xl leading-snug text-noite-700',
          }, ...inline(b.texto, k))
        case 'p':
          return h('p', { key: k, className: 'mt-5 leading-[1.85] text-tinta-700' }, ...inline(b.texto, k, ctx))
        case 'ul':
          return h('ul', { key: k, className: 'mt-5 flex flex-col gap-2.5' },
            ...b.itens.map((item, j) =>
              h('li', { key: `${k}-${j}`, className: 'flex gap-3 leading-[1.8] text-tinta-700' },
                h('span', { className: 'mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-ouro-500' }),
                h('span', null, ...inline(item, `${k}-${j}`, ctx)),
              ),
            ),
          )
        case 'ol':
          return h('ol', { key: k, className: 'mt-5 flex flex-col gap-3' },
            ...b.itens.map((item, j) =>
              h('li', { key: `${k}-${j}`, className: 'flex gap-3.5 leading-[1.8] text-tinta-700' },
                h('span', {
                  className: 'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-areia-200/70 text-[0.78rem] font-semibold text-noite-700',
                }, String(j + 1)),
                h('span', null, ...inline(item, `${k}-${j}`)),
              ),
            ),
          )
        case 'citacao':
          return h('blockquote', {
            key: k,
            className: 'mt-8 border-l-2 border-ouro-500 pl-5 font-display text-[1.15rem] italic leading-relaxed text-noite-700',
          }, ...b.linhas.map((l, j) => h('p', { key: `${k}-${j}`, className: j ? 'mt-3' : '' }, ...inline(l, `${k}-${j}`))))
        case 'caixa':
          return h('aside', {
            key: k,
            className:
              b.variante === 'cuidado'
                ? 'mt-9 rounded-2xl border border-brasa-500/35 bg-brasa-500/[0.06] p-6'
                : 'mt-9 rounded-2xl border border-ouro-500/40 bg-areia-200/35 p-6',
          },
            h('p', { className: 'text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-' + (b.variante === 'cuidado' ? 'brasa-500' : 'ouro-600') },
              b.variante === 'cuidado' ? 'Vale dizer com clareza' : 'Em resumo'),
            ...b.linhas.map((l, j) =>
              h('p', { key: `${k}-${j}`, className: 'mt-3 text-[0.98rem] leading-relaxed text-tinta-700' }, ...inline(l, `${k}-${j}`, ctx)),
            ),
          )
        case 'tabela':
          return h('div', { key: k, className: 'mt-8 overflow-x-auto rounded-2xl border border-areia-200' },
            h('table', { className: 'w-full min-w-[34rem] border-collapse text-left text-[0.92rem]' },
              h('thead', null,
                h('tr', { className: 'bg-areia-200/45' },
                  ...b.cabecalho.map((c, j) =>
                    h('th', { key: `${k}-h${j}`, scope: 'col', className: 'px-4 py-3 font-semibold text-noite-800' }, ...inline(c, `${k}-h${j}`)),
                  ),
                ),
              ),
              h('tbody', null,
                ...b.linhas.map((linha, j) =>
                  h('tr', { key: `${k}-r${j}`, className: 'border-t border-areia-200' },
                    ...linha.map((c, l) =>
                      h('td', { key: `${k}-r${j}c${l}`, className: 'px-4 py-3 align-top leading-relaxed text-tinta-700' }, ...inline(c, `${k}-r${j}c${l}`)),
                    ),
                  ),
                ),
              ),
            ),
          )
      }
    }),
  )
}

/** Texto puro do artigo — alimenta a busca interna e o resumo do RSS. */
export function textoPuro(md: string) {
  return md
    .replace(/^---json[\s\S]*?---/m, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^:::.*$/gm, '')
    .replace(/^[>\-*]\s+/gm, '')
    .replace(/^\|.*$/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}
