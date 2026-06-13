import type { Metadata } from 'next'
import '../styles/globals.css'
import { Navbar } from '@components/layout/Navbar'
import { Footer } from '@components/layout/Footer'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  )
}
