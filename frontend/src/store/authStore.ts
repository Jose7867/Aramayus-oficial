import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@types/user'

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
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })
          if (!res.ok) return false
          const { user, token } = await res.json()
          set({ user, token, isAdmin: user.role === 'admin' })
          return true
        } catch {
          return false
        }
      },

      logout: () => set({ user: null, token: null, isAdmin: false }),
    }),
    { name: 'aramayus-auth' }
  )
)
