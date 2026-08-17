import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'
import { Cabecalho } from '@/components/Cabecalho'
import { Rodape } from '@/components/Rodape'
import { BotaoWhatsapp } from '@/components/BotaoWhatsapp'
import { JsonLd } from '@/components/JsonLd'
import { schemaNegocio, schemaPessoa } from '@/lib/estrutura'
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
    template: '%s | Espaço da Completude',
  },
  description: site.descricao,
  applicationName: site.nome,
  authors: [{ name: site.terapeuta, url: `${site.url}/sobre` }],
  creator: site.terapeuta,
  publisher: site.nome,
  keywords: [
    'Osatoshi', 'EMF Balancing Technique', 'Elementoterapia Magnética', 'Reiki', 'Shiatsu',
    'Acupuntura sistêmica', 'Auriculoterapia', 'Seitai', 'terapia integrativa',
    'terapeuta holístico', 'Santa Rosa de Viterbo', 'terapia online', 'Caio Gracco',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.nome,
    title: site.titulo,
    description: site.descricao,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Espaço da Completude — Caio Gracco' }],
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
      <body className="min-h-screen antialiased">
        <JsonLd dados={[schemaNegocio(), schemaPessoa()]} />
        <Cabecalho />
        <main id="conteudo">{children}</main>
        <Rodape />
        <BotaoWhatsapp />
      </body>
    </html>
  )
}
