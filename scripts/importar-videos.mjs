#!/usr/bin/env node
/**
 * Importa os vídeos do canal do YouTube e regrava src/content/videos.ts.
 *
 * Uso:
 *   YOUTUBE_API_KEY=xxxx YOUTUBE_CHANNEL_ID=UCxxxx node scripts/importar-videos.mjs
 *
 * Como obter:
 *   - API key: console.cloud.google.com → APIs e serviços → credenciais → chave de API,
 *     com a "YouTube Data API v3" ativada.
 *   - Channel ID: abra o canal, veja o código-fonte e procure por "channelId", ou use
 *     https://www.youtube.com/@terapeutacaiogracco → Compartilhar canal → Copiar ID.
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const chave = process.env.YOUTUBE_API_KEY
const canal = process.env.YOUTUBE_CHANNEL_ID

if (!chave || !canal) {
  console.error('Defina YOUTUBE_API_KEY e YOUTUBE_CHANNEL_ID antes de rodar.')
  process.exit(1)
}

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')

async function json(url) {
  const r = await fetch(url)
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`)
  return r.json()
}

const canalInfo = await json(
  `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${canal}&key=${chave}`,
)
const playlist = canalInfo.items?.[0]?.contentDetails?.relatedPlaylists?.uploads
if (!playlist) throw new Error('Não encontrei a playlist de uploads deste canal.')

const videos = []
let pagina = ''
do {
  const dados = await json(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlist}&key=${chave}${pagina ? `&pageToken=${pagina}` : ''}`,
  )
  for (const item of dados.items ?? []) {
    const s = item.snippet
    if (!s?.resourceId?.videoId) continue
    videos.push({
      id: s.resourceId.videoId,
      titulo: s.title,
      descricao: (s.description ?? '').split('\n')[0].slice(0, 220),
      publicadoEm: s.publishedAt?.slice(0, 10),
    })
  }
  pagina = dados.nextPageToken ?? ''
} while (pagina)

const arquivo = `import type { Video } from './videos'

// Gerado por scripts/importar-videos.mjs — ${videos.length} vídeos.
export const videosImportados: Video[] = ${JSON.stringify(videos, null, 2)}
`
writeFileSync(join(raiz, 'src/content/videos-importados.ts'), arquivo)
console.log(`${videos.length} vídeos gravados em src/content/videos-importados.ts`)
console.log('Agora importe esse array em src/content/videos.ts.')
