import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types/user'

// ─── Usuarios de prueba (activos cuando el backend no está disponible) ─────────
const MOCK_USERS: Array<{ email: string; password: string; user: User }> = [
  {
    email:    'admin@aramayus.com',
    password: 'Admin123!',
    user: {
      id:        'mock-admin-001',
      name:      'Administrador',
      email:     'admin@aramayus.com',
      role:      'admin',
      addresses: [],
      createdAt: new Date().toISOString(),
    },
  },
  {
    email:    'cliente@ejemplo.com',
    password: 'Cliente123!',
    user: {
      id:        'mock-cliente-001',
      name:      'Cliente Ejemplo',
      email:     'cliente@ejemplo.com',
      role:      'customer',
      addresses: [],
      createdAt: new Date().toISOString(),
    },
  },
]

interface AuthStore {
  user: User | null
  token: string | null
  isAdmin: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAdmin: false,

      login: async (email, password) => {
        // 1. Intentar con el backend real
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            signal: AbortSignal.timeout(5000), // timeout de 5s
          })
          if (res.ok) {
            const { user, token } = await res.json()
            set({ user, token, isAdmin: user.role === 'admin' })
            return true
          }
          if (res.status === 401) return false // credenciales incorrectas en el backend real
        } catch {
          // Backend no disponible → usar mock
          console.warn('[authStore] Backend no disponible, usando credenciales de prueba.')
        }

        // 2. Fallback: usuarios mockeados (para desarrollo sin BD)
        const mock = MOCK_USERS.find(
          (m) => m.email === email.trim() && m.password === password
        )
        if (mock) {
          set({ user: mock.user, token: 'mock-token-dev', isAdmin: mock.user.role === 'admin' })
          return true
        }

        return false
      },

      logout: () => set({ user: null, token: null, isAdmin: false }),
    }),
    { name: 'aramayus-auth' }
  )
)

