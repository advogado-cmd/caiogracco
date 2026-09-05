import { NextResponse } from 'next/server'

/**
 * Porta de entrada do login do painel.
 *
 * O Decap, que roda em /admin, abre esta rota numa janela nova. Aqui só
 * mandamos a pessoa para o GitHub com um `state` aleatório, que guardamos num
 * cookie para conferir na volta. Sem esse par state/cookie, um site qualquer
 * poderia forjar o retorno e conseguir um token em nome do Caio: é o ataque
 * de CSRF em fluxo OAuth, e a defesa é exatamente esta.
 *
 * Nada de segredo aparece aqui. O segredo do aplicativo só é usado na troca
 * do código pelo token, do outro lado, em /api/callback, que roda no servidor.
 */
export const dynamic = 'force-dynamic'

export function GET(requisicao: Request) {
  const id = process.env.GITHUB_OAUTH_ID
  if (!id) {
    return new NextResponse(
      'Falta configurar GITHUB_OAUTH_ID nas variáveis de ambiente da Vercel.',
      { status: 500 },
    )
  }

  const origem = new URL(requisicao.url).origin
  const state = crypto.randomUUID()

  const destino = new URL('https://github.com/login/oauth/authorize')
  destino.searchParams.set('client_id', id)
  destino.searchParams.set('redirect_uri', `${origem}/api/callback`)
  // `repo` é o mínimo que o Decap precisa para ler e gravar no repositório.
  destino.searchParams.set('scope', 'repo,user')
  destino.searchParams.set('state', state)

  const resposta = NextResponse.redirect(destino.toString())
  resposta.cookies.set('painel_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  })
  return resposta
}
