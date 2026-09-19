'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@store/authStore'

/**
 * Guard que protege las rutas /admin/*.
 * Si el usuario no está autenticado o no es admin, lo redirige al login.
 */
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, token } = useAuthStore()

  useEffect(() => {
    if (!token || !user) {
      router.replace('/auth/login')
    } else if (user.role !== 'admin') {
      router.replace('/cuenta/perfil')
    }
  }, [user, token, router])

  if (!token || !user || user.role !== 'admin') {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-inca-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Verificando acceso...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
