/**
 * Vídeos publicados por Caio Gracco no YouTube.
 *
 * Como atualizar:
 *  1. Abra o vídeo no YouTube e copie o ID da URL (a parte depois de `v=`).
 *  2. Acrescente um objeto abaixo. A miniatura é montada automaticamente.
 *  3. Rode `npm run search:index` para o vídeo entrar na busca do site.
 *
 * Se preferir automatizar, veja `scripts/importar-videos.mjs`.
 */
export type Video = {
  id: string
  titulo: string
  descricao: string
  terapia?: string
  publicadoEm?: string
}

export const canalUrl = 'https://www.youtube.com/@terapeutacaiogracco'
export const canalHandle = '@terapeutacaiogracco'

export const videos: Video[] = []

export function thumbnail(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}
export function watchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`
}
