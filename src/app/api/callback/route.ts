import { NextResponse } from 'next/server'

/**
 * Volta do GitHub: troca o código pelo token e devolve o token ao painel.
 *
 * O Decap espera receber o resultado por `postMessage`, da janela que ele
 * abriu para a janela que a abriu, no formato
 * `authorization:github:success:{json}`. Não é invenção nossa, é o protocolo
 * que ele implementa desde a época do Netlify CMS.
 *
 * Duas cautelas que o protocolo não impõe e que valem:
 *
 * 1. Conferimos o `state` contra o cookie antes de trocar qualquer coisa.
 * 2. O `postMessage` vai com a origem exata do site, e não com "*", para o
 *    token não vazar caso a página seja aberta dentro de outra.
 */
export const dynamic = 'force-dynamic'

function pagina(corpo: string) {
  return new NextResponse(`<!doctype html><meta charset="utf-8">${corpo}`, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}

export async function GET(requisicao: Request) {
  const url = new URL(requisicao.url)
  const codigo = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const salvo = requisicao.headers.get('cookie')?.match(/painel_state=([^;]+)/)?.[1]

  if (!codigo) return pagina('<p>O GitHub não devolveu o código de autorização.</p>')
  if (!state || !salvo || state !== salvo) {
    return pagina('<p>Pedido de login inválido ou expirado. Feche esta janela e tente de novo.</p>')
  }

  const id = process.env.GITHUB_OAUTH_ID
  const segredo = process.env.GITHUB_OAUTH_SECRET
  if (!id || !segredo) {
    return pagina('<p>Faltam GITHUB_OAUTH_ID e GITHUB_OAUTH_SECRET nas variáveis de ambiente.</p>')
  }

  let token: string | undefined
  let erro: string | undefined
  try {
    const r = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: id,
        client_secret: segredo,
        code: codigo,
        redirect_uri: `${url.origin}/api/callback`,
      }),
    })
    const dados = await r.json()
    token = dados.access_token
    erro = dados.error_description || dados.error
  } catch {
    erro = 'Não foi possível falar com o GitHub.'
  }

  const conteudo = token
    ? `authorization:github:success:${JSON.stringify({ token, provider: 'github' })}`
    : `authorization:github:error:${JSON.stringify({ message: erro || 'Falha ao obter o token.' })}`

  const resposta = pagina(`
<title>Entrando no painel</title>
<body style="font-family:system-ui;padding:2rem;color:#16324B;background:#FAF5EC">
<p>${token ? 'Pronto. Pode fechar esta janela.' : 'Não deu certo: ' + (erro || 'erro desconhecido')}</p>
<script>
(function () {
  var recado = ${JSON.stringify(conteudo)}
  var destino = ${JSON.stringify(url.origin)}
  function enviar () { window.opener && window.opener.postMessage(recado, destino) }
  // O Decap manda "authorizing:github" quando está pronto para ouvir.
  window.addEventListener('message', function (e) {
    if (e.data === 'authorizing:github') enviar()
  }, false)
  enviar()
  ${token ? 'setTimeout(function(){ window.close() }, 1200)' : ''}
})()
</script>
</body>`)
  // O state já serviu: some com ele.
  resposta.cookies.set('painel_state', '', { path: '/', maxAge: 0 })
  return resposta
}
