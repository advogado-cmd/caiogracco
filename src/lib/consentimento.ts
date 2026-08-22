/**
 * Consentimento de cookies e Consent Mode v2 do Google.
 *
 * Regra de ouro deste arquivo: **nada do Google carrega antes do consentimento**.
 * O Consent Mode entra com todos os sinais negados por padrão; só depois que a
 * pessoa aceita é que os sinais são atualizados e as tags são injetadas.
 *
 * Isso atende, ao mesmo tempo:
 *  - a LGPD (art. 7º, I: consentimento prévio para cookies não essenciais);
 *  - a Política de Consentimento do Usuário do Google, que exige consentimento
 *    válido, registro da escolha e instrução clara para revogá-la.
 */

export const CHAVE_CONSENTIMENTO = 'cg-consentimento-v1'

export type Consentimento = {
  /** Medição de audiência com o Google Analytics. */
  analise: boolean
  /** Publicidade e remarketing com o Google Ads. */
  publicidade: boolean
  /** Momento da escolha, guardado como prova do consentimento. */
  registradoEm: string
  /** Versão da política aceita, para saber quando pedir de novo. */
  versao: number
}

export const VERSAO_POLITICA = 1

export const CONSENTIMENTO_RECUSADO: Consentimento = {
  analise: false,
  publicidade: false,
  registradoEm: '',
  versao: VERSAO_POLITICA,
}

export function lerConsentimento(): Consentimento | null {
  if (typeof window === 'undefined') return null
  try {
    const bruto = window.localStorage.getItem(CHAVE_CONSENTIMENTO)
    if (!bruto) return null
    const dado = JSON.parse(bruto) as Consentimento
    // Política nova invalida o consentimento antigo: é preciso perguntar outra vez.
    if (dado.versao !== VERSAO_POLITICA) return null
    return dado
  } catch {
    return null
  }
}

export function gravarConsentimento(escolha: Omit<Consentimento, 'registradoEm' | 'versao'>) {
  const registro: Consentimento = {
    ...escolha,
    registradoEm: new Date().toISOString(),
    versao: VERSAO_POLITICA,
  }
  try {
    window.localStorage.setItem(CHAVE_CONSENTIMENTO, JSON.stringify(registro))
  } catch {
    /* navegação privada ou armazenamento bloqueado: segue sem registrar */
  }
  aplicarConsentimento(registro)
  return registro
}

export function apagarConsentimento() {
  try {
    window.localStorage.removeItem(CHAVE_CONSENTIMENTO)
  } catch {
    /* ignora */
  }
}

type Gtag = (...args: unknown[]) => void
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
  }
}

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(args)
}

/** Traduz a escolha da pessoa para os sinais do Consent Mode v2. */
export function aplicarConsentimento(c: Consentimento) {
  if (typeof window === 'undefined') return
  gtag('consent', 'update', {
    analytics_storage: c.analise ? 'granted' : 'denied',
    ad_storage: c.publicidade ? 'granted' : 'denied',
    ad_user_data: c.publicidade ? 'granted' : 'denied',
    ad_personalization: c.publicidade ? 'granted' : 'denied',
  })
  if (c.analise || c.publicidade) carregarTags()
}

let tagsCarregadas = false

/** Injeta o gtag.js uma única vez, e só depois do "sim". */
function carregarTags() {
  if (tagsCarregadas || typeof document === 'undefined') return
  const ids = [
    process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
    process.env.NEXT_PUBLIC_GA_ID,
  ].filter(Boolean) as string[]
  if (!ids.length) return

  tagsCarregadas = true
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ids[0]}`
  document.head.appendChild(script)

  gtag('js', new Date())
  for (const id of ids) {
    // anonimização de IP: reduz o dado coletado ao mínimo necessário
    gtag('config', id, { anonymize_ip: true })
  }
}

/** Há alguma tag do Google configurada neste ambiente? */
export function temTagsConfiguradas() {
  return Boolean(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || process.env.NEXT_PUBLIC_GA_ID)
}
