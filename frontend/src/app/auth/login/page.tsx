'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react'
import { useAuthStore } from '@store/authStore'

export default function LoginPage() {
  const router = useRouter()
  const { login, user } = useAuthStore()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  // Si ya está autenticado, redirigir
  useEffect(() => {
    if (user) {
      router.replace(user.role === 'admin' ? '/admin/dashboard' : '/cuenta/perfil')
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const ok = await login(email.trim(), password)
    setLoading(false)
    if (!ok) {
      setError('Email o contraseña incorrectos. Por favor, intenta nuevamente.')
    } else {
      // La redirección la maneja el useEffect de arriba vía store
      const fresh = useAuthStore.getState().user
      if (fresh?.role === 'admin') router.replace('/admin/dashboard')
      else router.replace('/cuenta/perfil')
    }
  }

  return (
    <div className="min-h-screen bg-wool-cream flex items-center justify-center px-4 py-16">
      {/* Fondo decorativo */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8860A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <div className="font-display text-3xl text-andean-black italic">Aramayus</div>
            <div className="text-xs tracking-[4px] text-inca-gold uppercase font-sans mt-0.5">Art Textil Andino</div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-xl font-display text-andean-black">Iniciar Sesión</h1>
            <p className="text-sm text-gray-500 mt-1">Accede a tu cuenta para continuar</p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-6 flex items-start gap-3 p-3 bg-red-50 border border-red-100 rounded-sm text-red-800">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-700 uppercase tracking-widest mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="input-base w-full pl-10"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-medium text-gray-700 uppercase tracking-widest">
                  Contraseña
                </label>
                <Link href="/auth/recuperar" className="text-xs text-inca-gold hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-base w-full pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPw ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Botón submit */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Ingresando...
                </>
              ) : (
                'Ingresar'
              )}
            </button>
          </form>

          {/* Divisor */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">¿Eres nuevo?</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Link a registro */}
          <Link
            href="/auth/registro"
            className="block w-full text-center border border-andean-black text-andean-black text-xs tracking-widest uppercase font-semibold py-3 rounded-sm hover:bg-andean-black hover:text-wool-cream transition-colors"
          >
            Crear una cuenta
          </Link>
        </div>

        {/* Footer link */}
        <p className="text-center text-xs text-gray-400 mt-6">
          <Link href="/" className="hover:text-inca-gold transition-colors">← Volver a la tienda</Link>
        </p>
      </div>
    </div>
  )
}
