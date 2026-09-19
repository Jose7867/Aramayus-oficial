'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Lock, Mail, User, Phone, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react'
import { useAuthStore } from '@store/authStore'

export default function RegistroPage() {
  const router = useRouter()
  const { login } = useAuthStore()

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [showPw, setShowPw]         = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')
  const [success, setSuccess]       = useState(false)

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password, phone: form.phone || undefined }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || 'Error al crear la cuenta.')
        setLoading(false)
        return
      }
      setSuccess(true)
      // Hacer login automático
      await login(form.email, form.password)
      setTimeout(() => router.replace('/cuenta/perfil'), 1500)
    } catch {
      setError('No se pudo conectar con el servidor. Intenta más tarde.')
      setLoading(false)
    }
  }

  const strength = (() => {
    const p = form.password
    if (!p) return 0
    let s = 0
    if (p.length >= 8) s++
    if (/[A-Z]/.test(p)) s++
    if (/[0-9]/.test(p)) s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  })()

  const strengthLabel = ['', 'Débil', 'Regular', 'Buena', 'Fuerte'][strength]
  const strengthColor = ['', 'bg-red-500', 'bg-yellow-400', 'bg-blue-500', 'bg-green-500'][strength]

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

        <div className="bg-white border border-gray-200 rounded-sm shadow-lg p-8">
          {success ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
              <h2 className="text-lg font-display text-andean-black">¡Cuenta creada!</h2>
              <p className="text-sm text-gray-500 mt-2">Redirigiendo a tu perfil...</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-xl font-display text-andean-black">Crear una cuenta</h1>
                <p className="text-sm text-gray-500 mt-1">Únete a la familia Aramayus Art</p>
              </div>

              {error && (
                <div className="mb-6 flex items-start gap-3 p-3 bg-red-50 border border-red-100 rounded-sm text-red-800">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Nombre */}
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-gray-700 uppercase tracking-widest mb-1.5">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Tu nombre completo"
                      className="input-base w-full pl-10"
                    />
                  </div>
                </div>

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
                      value={form.email}
                      onChange={update('email')}
                      placeholder="tu@email.com"
                      className="input-base w-full pl-10"
                    />
                  </div>
                </div>

                {/* Teléfono (opcional) */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-gray-700 uppercase tracking-widest mb-1.5">
                    Teléfono <span className="normal-case font-normal text-gray-400">(opcional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={update('phone')}
                      placeholder="+51 999 999 999"
                      className="input-base w-full pl-10"
                    />
                  </div>
                </div>

                {/* Contraseña */}
                <div>
                  <label htmlFor="password" className="block text-xs font-medium text-gray-700 uppercase tracking-widest mb-1.5">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      id="password"
                      type={showPw ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={form.password}
                      onChange={update('password')}
                      placeholder="Mín. 8 caracteres"
                      className="input-base w-full pl-10 pr-10"
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Indicador de fortaleza */}
                  {form.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? strengthColor : 'bg-gray-200'}`} />
                        ))}
                      </div>
                      <p className={`text-[10px] ${strength < 2 ? 'text-red-500' : strength < 3 ? 'text-yellow-600' : 'text-green-600'}`}>
                        Contraseña {strengthLabel}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirmar contraseña */}
                <div>
                  <label htmlFor="confirm" className="block text-xs font-medium text-gray-700 uppercase tracking-widest mb-1.5">
                    Confirmar contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      id="confirm"
                      type={showConfirm ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={form.confirm}
                      onChange={update('confirm')}
                      placeholder="Repite tu contraseña"
                      className={`input-base w-full pl-10 pr-10 ${form.confirm && form.confirm !== form.password ? 'border-red-400 focus:border-red-500' : ''}`}
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {form.confirm && form.confirm !== form.password && (
                    <p className="text-[10px] text-red-500 mt-1">Las contraseñas no coinciden</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || !form.name || !form.email || !form.password || !form.confirm}
                  className="btn-primary w-full flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" />Creando cuenta...</>
                  ) : 'Crear cuenta'}
                </button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">¿Ya tienes cuenta?</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <Link
                href="/auth/login"
                className="block w-full text-center border border-andean-black text-andean-black text-xs tracking-widest uppercase font-semibold py-3 rounded-sm hover:bg-andean-black hover:text-wool-cream transition-colors"
              >
                Iniciar Sesión
              </Link>
            </>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          <Link href="/" className="hover:text-inca-gold transition-colors">← Volver a la tienda</Link>
        </p>
      </div>
    </div>
  )
}
