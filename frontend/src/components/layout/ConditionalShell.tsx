'use client'
import { usePathname } from 'next/navigation'
import { Navbar } from '@components/layout/Navbar'
import { Footer } from '@components/layout/Footer'

/**
 * Muestra el Navbar y Footer del sitio solo en rutas públicas.
 * Las rutas de /auth/* y /admin/* tienen su propio layout/chrome.
 */
export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const isAuthRoute  = path.startsWith('/auth')
  const isAdminRoute = path.startsWith('/admin')
  const showShell = !isAuthRoute && !isAdminRoute

  return (
    <>
      {showShell && <Navbar />}
      <main>{children}</main>
      {showShell && <Footer />}
    </>
  )
}
