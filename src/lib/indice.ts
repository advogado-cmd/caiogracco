import { terapias } from '@/content/terapias'
import { videos } from '@/content/videos'
import { todosArtigos, CATEGORIAS } from './blog'
import { textoPuro } from './markdown'
import { normalizar, slugificar, type Documento } from './busca'

/**
 * Índice da busca interna. Fica separado de `busca.ts` de propósito: aqui se lê
 * o disco (os artigos do blog), e isso só pode acontecer no servidor, em tempo
 * de build. O `busca.ts` continua puro e pode ir para o navegador.
 */
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

  for (const a of todosArtigos()) {
    docs.push({
      id: `artigo-${a.slug}`,
      titulo: a.titulo,
      trecho: a.resumo,
      href: `/blog/${a.slug}`,
      tipo: 'Artigo',
      contexto: CATEGORIAS[a.categoria].nome,
      corpo: [a.titulo, a.resumo, a.descricao, ...a.palavrasChave, textoPuro(a.corpo).slice(0, 2600)].join(' '),
    })
    for (const f of a.faq ?? []) {
      docs.push({
        id: `artigo-faq-${a.slug}-${normalizar(f.pergunta).slice(0, 24)}`,
        titulo: f.pergunta,
        trecho: f.resposta,
        href: `/blog/${a.slug}#perguntas`,
        tipo: 'Pergunta',
        contexto: a.tituloCurto ?? a.titulo,
        corpo: `${f.pergunta} ${f.resposta}`,
      })
    }
  }

  const paginas: Documento[] = [
    { id: 'pag-sobre', titulo: 'Sobre Caio Gracco', trecho: 'A trajetória do terapeuta, iniciada aos 14 anos, e o que sustenta o trabalho de hoje.', href: '/sobre', tipo: 'Página', corpo: 'sobre caio gracco terapeuta trajetoria historia missao formacao credenciamento shinri santa rosa de viterbo quem é' },
    { id: 'pag-terapias', titulo: 'Todas as terapias', trecho: 'As oito abordagens atendidas por Caio Gracco, com o que cada uma é e para quem faz sentido.', href: '/terapias', tipo: 'Página', corpo: 'terapias abordagens tratamentos praticas integrativas lista todas' },
    { id: 'pag-contato', titulo: 'Contato e agendamento', trecho: 'Como marcar um atendimento presencial ou online, endereço, WhatsApp e e-mail.', href: '/contato', tipo: 'Página', corpo: 'contato agendar marcar horario whatsapp telefone email endereco onde fica como chegar preco valor quanto custa' },
    { id: 'pag-videos', titulo: 'Vídeos', trecho: 'Os vídeos publicados por Caio Gracco no YouTube, reunidos por tema.', href: '/videos', tipo: 'Página', corpo: 'videos youtube canal aulas explicacoes depoimentos' },
    { id: 'pag-blog', titulo: 'Blog', trecho: 'Textos sobre carma, trauma guardado no corpo, bloqueio financeiro, limpeza espiritual e as oito práticas.', href: '/blog', tipo: 'Página', corpo: 'blog artigos textos leituras materia post conteudo carma trauma prosperidade limpeza espiritual' },
    { id: 'pag-glossario', titulo: 'Glossário', trecho: 'Os termos das tradições atendidas aqui, explicados em linguagem simples.', href: '/glossario', tipo: 'Página', corpo: 'glossario termos dicionario significado o que quer dizer vocabulario' },
    { id: 'pag-aviso', titulo: 'Aviso de cuidado', trecho: 'O que estas práticas são, o que não são, e por que nenhuma delas substitui acompanhamento de saúde.', href: '/aviso-de-cuidado', tipo: 'Página', corpo: 'aviso limites etica saude medico psicologo nao substitui responsabilidade seguranca' },
  ]

  return [...docs, ...paginas]
}
