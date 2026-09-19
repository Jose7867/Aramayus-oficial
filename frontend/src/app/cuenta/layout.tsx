'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { User, ShoppingBag, Heart, LogOut } from 'lucide-react'
import { useAuthStore } from '@store/authStore'
import { useRouter } from 'next/navigation'

export default function CuentaLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { logout, user } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  const links = [
    { href: '/cuenta/perfil', label: 'Mi Perfil', icon: User },
    { href: '/cuenta/pedidos', label: 'Mis Pedidos', icon: ShoppingBag },
    { href: '/cuenta/favoritos', label: 'Favoritos', icon: Heart },
  ]

  return (
    <div className="min-h-screen bg-wool-cream pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-display text-andean-black">Mi Cuenta</h1>
          {user && <p className="text-gray-500 mt-2">¡Hola, {user.name}!</p>}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <nav className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
              <ul className="flex flex-col">
                {links.map((link) => {
                  const isActive = pathname === link.href
                  const Icon = link.icon
                  return (
                    <li key={link.href} className="border-b border-gray-100 last:border-b-0">
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-andean-black text-white'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-inca-gold'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-6 py-4 text-sm font-medium text-wiphala-red hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Contenido Principal */}
          <main className="flex-1 bg-white border border-gray-200 rounded-sm shadow-sm p-6 lg:p-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
