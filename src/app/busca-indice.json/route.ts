import { construirIndice } from '@/lib/indice'

export const dynamic = 'force-static'

/**
 * Índice da busca interna, servido como arquivo estático.
 *
 * Antes o índice viajava dentro do HTML de toda página que tem campo de busca.
 * Com o blog, isso passou de 1,5 MB por página, carregado por todo visitante,
 * inclusive quem nunca vai buscar nada. Agora o índice é um arquivo à parte,
 * baixado só quando alguém encosta no campo de busca.
 */
export function GET() {
  const enxuto = construirIndice().map((d) => ({
    i: d.id,
    t: d.titulo,
    r: d.trecho,
    h: d.href,
    p: d.tipo,
    c: d.contexto,
    // O corpo entra recortado: é o que alimenta a busca por palavra solta,
    // e além de certo ponto não melhora o resultado, só pesa.
    b: d.corpo.slice(0, 900),
  }))

  return new Response(JSON.stringify(enxuto), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}
