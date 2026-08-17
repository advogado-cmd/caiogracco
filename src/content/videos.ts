import { site } from './site'

/**
 * Vídeos publicados por Caio Gracco no YouTube.
 *
 * A galeria funciona de duas formas:
 *
 *  1. **Sem configuração nenhuma** — a página exibe o player da playlist de uploads
 *     do canal, que sempre mostra os vídeos mais recentes. Não exige chave de API.
 *
 *  2. **Com vídeos cadastrados aqui** — cada vídeo ganha card próprio, entra na busca
 *     do site e recebe dados estruturados (VideoObject) para o Google.
 *     Para cadastrar: copie o ID da URL do vídeo (a parte depois de `v=`) e
 *     acrescente um objeto ao array `videos`. Ou rode o importador:
 *
 *        YOUTUBE_API_KEY=... YOUTUBE_CHANNEL_ID=UCqSwKBMOCEGFCJch2e_jD9w \
 *          node scripts/importar-videos.mjs
 */
export type Video = {
  id: string
  titulo: string
  descricao: string
  terapia?: string
  publicadoEm?: string
}

export const canalUrl = site.redes.youtube
export const canalHandle = site.redes.youtubeHandle
export const canalId = site.redes.youtubeChannelId

/** A playlist de uploads de um canal é sempre o ID do canal com "UC" trocado por "UU". */
export const playlistUploads = `UU${canalId.slice(2)}`

export const videos: Video[] = []

export function thumbnail(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}
export function watchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`
}
