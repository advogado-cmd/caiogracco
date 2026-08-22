/**
 * Regera `src/content/populares.json` — a ordem dos artigos na vitrine da home.
 *
 * COMO USAR
 *
 *   1) Sem dados de audiência (o padrão): não é preciso rodar nada. A home usa
 *      o campo "peso" de cada artigo, definido no bloco de metadados do .md.
 *
 *   2) Com Google Analytics 4: crie uma conta de serviço no Google Cloud, dê a
 *      ela acesso de leitura à propriedade do GA4, baixe a chave JSON e rode:
 *
 *        GA_PROPERTY_ID=123456789 \
 *        GOOGLE_APPLICATION_CREDENTIALS=./chave.json \
 *        node scripts/atualizar-populares.mjs
 *
 *      O script grava os slugs mais lidos dos últimos 90 dias. Faça commit do
 *      arquivo gerado: ele é lido em tempo de build.
 *
 *   3) Manualmente: edite src/content/populares.json à mão. É só uma lista de
 *      slugs, na ordem em que devem aparecer.
 */
import fs from 'node:fs'
import path from 'node:path'

const DESTINO = path.join(process.cwd(), 'src', 'content', 'populares.json')
const propriedade = process.env.GA_PROPERTY_ID

async function daAudiencia() {
  const { BetaAnalyticsDataClient } = await import('@google-analytics/data')
  const cliente = new BetaAnalyticsDataClient()
  const [resposta] = await cliente.runReport({
    property: `properties/${propriedade}`,
    dateRanges: [{ startDate: '90daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }],
    dimensionFilter: {
      filter: { fieldName: 'pagePath', stringFilter: { matchType: 'BEGINS_WITH', value: '/blog/' } },
    },
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 40,
  })

  return (resposta.rows ?? [])
    .map((r) => r.dimensionValues?.[0]?.value ?? '')
    .map((caminho) => caminho.replace(/^\/blog\//, '').replace(/\/$/, ''))
    .filter((slug) => slug && !slug.includes('/'))
}

const artigosExistentes = new Set(
  fs
    .readdirSync(path.join(process.cwd(), 'src', 'content', 'blog'))
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const bruto = fs.readFileSync(path.join(process.cwd(), 'src', 'content', 'blog', f), 'utf8')
      const meta = bruto.match(/^---json\s*\n([\s\S]*?)\n---/)
      return meta ? JSON.parse(meta[1]).slug : null
    })
    .filter(Boolean),
)

if (!propriedade) {
  console.error(
    'GA_PROPERTY_ID não definido.\n' +
      'Sem ele o site usa o peso editorial de cada artigo, o que já funciona.\n' +
      'Leia o cabeçalho deste arquivo para conectar o Google Analytics.',
  )
  process.exit(1)
}

const slugs = (await daAudiencia()).filter((s) => artigosExistentes.has(s))

if (!slugs.length) {
  console.error('Nenhum artigo com audiência registrada. Arquivo não alterado.')
  process.exit(1)
}

fs.writeFileSync(
  DESTINO,
  `${JSON.stringify({ geradoEm: new Date().toISOString().slice(0, 10), fonte: 'ga4', slugs }, null, 2)}\n`,
)
console.log(`populares.json atualizado com ${slugs.length} artigos.`)
