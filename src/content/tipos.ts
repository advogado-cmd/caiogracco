export type FAQ = { pergunta: string; resposta: string }
export type Termo = { termo: string; definicao: string; terapia?: string; origem?: string }
export type Fonte = { titulo: string; url: string }

export type Terapia = {
  slug: string
  nome: string
  nomeCurto: string
  tagline: string
  resumo: string
  destaque: boolean
  ordem: number
  acento: 'ouro' | 'coral' | 'magenta' | 'violeta' | 'agua'
  origem: string
  oQueE: string[]
  comoFunciona: string[]
  evidencia: string
  sessao: {
    duracao: string
    formato: string
    sensacao: string
    frequencia: string
    distancia: 'sim' | 'nao' | 'parcial'
  }
  indicacoes: string[]
  limites: string
  faq: FAQ[]
  termos: Termo[]
  keywords: string[]
  fontes: Fonte[]
}
