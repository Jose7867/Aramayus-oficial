import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import '../styles/globals.css'
import { ConditionalShell } from '@components/layout/ConditionalShell'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

// ─── Fuentes auto-hospedadas via next/font (sin render-blocking) ──────────────
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aramayus Art — Textil Artesanal Andino',
  description: 'Prendas artesanales únicas elaboradas por manos peruanas con técnicas ancestrales. Chompas, ponchos, camisas y más.',
  keywords: 'ropa artesanal peruana, textil andino, chompa alpaca, poncho, artesanía cusco',
  openGraph: {
    title: 'Aramayus Art',
    description: 'Arte que viste, alma que perdura',
    url: 'https://aramayusart.com',
    siteName: 'Aramayus Art',
    locale: 'es_PE',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1A0A00',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Providers>
          <ConditionalShell>{children}</ConditionalShell>
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  )
}
