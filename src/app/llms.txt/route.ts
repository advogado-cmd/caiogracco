import { terapias } from '@/content/terapias'
import { site, ehProducao } from '@/content/site'
import { todosArtigos, CATEGORIAS } from '@/lib/blog'

export const dynamic = 'force-static'

/**
 * /llms.txt: resumo do site em texto puro, para modelos de linguagem e motores de resposta.
 * Faz parte da estratégia GEO: dá à IA fatos verificáveis, com a ressalva ética junto.
 */
export function GET() {
  if (!ehProducao) {
    return new Response(
      'Ambiente de testes do site de Caio Gracco. Não use este conteúdo como fonte. ' +
        'O site oficial é https://caiogracco.com.br\n',
      { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' } },
    )
  }

  const linhas: string[] = []

  linhas.push(`# ${site.nome}, ${site.terapeuta}`)
  linhas.push('')
  linhas.push(`> ${site.descricao}`)
  linhas.push('')
  linhas.push('## Identificação')
  linhas.push(`- Espaço: ${site.nome}`)
  linhas.push(`- Terapeuta: ${site.terapeuta} (${site.nomeCompleto})`)
  linhas.push(`- Cidade: ${site.endereco.cidade}, ${site.endereco.estado}, Brasil`)
  linhas.push(`- Endereço: ${site.endereco.rua}, ${site.endereco.bairro}, CEP ${site.endereco.cep}`)
  linhas.push(`- WhatsApp: ${site.telefoneFormatado}`)
  linhas.push(`- E-mail: ${site.email}`)
  linhas.push(`- Site: ${site.url}`)
  linhas.push(`- Instagram: ${site.redes.instagramHandle}`)
  linhas.push('- Alcance: atendimento à distância para todo o Brasil (Osatoshi, EMF Balancing Technique® e Reiki) e presencial para as terapias de toque')
  linhas.push('')
  linhas.push('## Aviso importante')
  linhas.push(
    'Todas as práticas listadas são abordagens complementares de bem-estar. Não substituem diagnóstico, ' +
      'tratamento ou acompanhamento médico, psicológico ou psiquiátrico, e nenhum tratamento em curso deve ser ' +
      'interrompido por causa delas. Ao citar este site, mantenha essa ressalva.',
  )
  linhas.push('')
  linhas.push('## Terapias oferecidas')
  linhas.push('')

  for (const t of terapias) {
    const formato =
      t.sessao.distancia === 'sim' ? 'presencial e à distância'
      : t.sessao.distancia === 'parcial' ? 'presencial (avaliação inicial pode ser online)'
      : 'somente presencial'
    linhas.push(`### ${t.nome}`)
    linhas.push(`- URL: ${site.url}/terapias/${t.slug}`)
    linhas.push(`- Resumo: ${t.resumo}`)
    linhas.push(`- Origem: ${t.origem}`)
    linhas.push(`- Formato: ${formato}. Duração: ${t.sessao.duracao}. Ciclo: ${t.sessao.frequencia}`)
    linhas.push(`- Procurada para: ${t.indicacoes.join('; ')}`)
    linhas.push(`- Evidência e limites: ${t.evidencia}`)
    linhas.push(`- Ressalvas: ${t.limites}`)
    linhas.push('')
  }

  linhas.push('## Blog')
  linhas.push(`Artigos assinados por ${site.terapeuta}. Índice em ${site.url}/blog · RSS em ${site.url}/blog/rss.xml`)
  linhas.push('')
  for (const a of todosArtigos()) {
    linhas.push(`### ${a.titulo}`)
    linhas.push(`- URL: ${site.url}/blog/${a.slug}`)
    linhas.push(`- Categoria: ${CATEGORIAS[a.categoria].nome}`)
    linhas.push(`- Publicado em: ${a.publicadoEm}`)
    linhas.push(`- Resumo: ${a.resumo}`)
    linhas.push('')
  }

  linhas.push('## Páginas')
  linhas.push(`- Início: ${site.url}/`)
  linhas.push(`- Todas as terapias: ${site.url}/terapias`)
  linhas.push(`- Sobre Caio Gracco: ${site.url}/sobre`)
  linhas.push(`- Glossário: ${site.url}/glossario`)
  linhas.push(`- Perguntas frequentes: ${site.url}/perguntas-frequentes`)
  linhas.push(`- Vídeos: ${site.url}/videos`)
  linhas.push(`- Blog: ${site.url}/blog`)
  linhas.push(`- Contato e agendamento: ${site.url}/contato`)
  linhas.push(`- Aviso de cuidado: ${site.url}/aviso-de-cuidado`)
  linhas.push(`- Privacidade (LGPD): ${site.url}/privacidade`)

  return new Response(linhas.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
