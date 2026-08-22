import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'
import { Cabecalho } from '@/components/Cabecalho'
import { Rodape } from '@/components/Rodape'
import Script from 'next/script'
import { BotaoWhatsapp } from '@/components/BotaoWhatsapp'
import { ConsentimentoCookies } from '@/components/ConsentimentoCookies'
import { JsonLd } from '@/components/JsonLd'
import { schemaNegocio, schemaPessoa, schemaSite } from '@/lib/estrutura'
import { site, ehProducao } from '@/content/site'

const display = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--fonte-display',
  display: 'swap',
})

const sans = Jost({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--fonte-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.titulo,
    template: '%s | Caio Gracco',
  },
  description: site.descricao,
  applicationName: `${site.nomeSite} — ${site.nome}`,
  authors: [{ name: site.terapeuta, url: `${site.url}/sobre` }],
  creator: site.terapeuta,
  publisher: site.nome,
  keywords: [
    'Osatoshi', 'EMF Balancing Technique', 'Elementoterapia Magnética', 'Reiki', 'Shiatsu',
    'Acupuntura sistêmica', 'Auriculoterapia', 'Seitai', 'terapia integrativa',
    'terapeuta holístico', 'terapia online', 'terapia à distância Brasil', 'Caio Gracco',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: `${site.nomeSite} — ${site.nome}`,
    title: site.titulo,
    description: site.descricao,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Caio Gracco — Terapias da Completude' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.titulo,
    description: site.descricao,
    images: ['/og.png'],
  },
  robots: ehProducao
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
      }
    : { index: false, follow: false, nocache: true },
  category: 'Saúde e bem-estar',
}

export const viewport: Viewport = {
  themeColor: '#0b1a5c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <head>
        {/*
          Consent Mode v2: os sinais entram NEGADOS antes de qualquer tag.
          Sem isto, o gtag assumiria consentimento — que é exatamente o que a
          LGPD e a Política de Consentimento do Usuário do Google proíbem.
        */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:2000});
gtag('set','ads_data_redaction',true);`}
        </Script>
      </head>
      <body className="min-h-screen antialiased">
        <JsonLd dados={[schemaSite(), schemaNegocio(), schemaPessoa()]} />
        <Cabecalho />
        <main id="conteudo">{children}</main>
        <Rodape />
        <BotaoWhatsapp />
        <ConsentimentoCookies />
      </body>
    </html>
  )
}
