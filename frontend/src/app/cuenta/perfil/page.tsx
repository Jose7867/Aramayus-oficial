'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@store/authStore'
import { User, Mail, Phone, Loader2, CheckCircle2 } from 'lucide-react'

export default function PerfilPage() {
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setSuccess(false)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${useAuthStore.getState().token}`
        },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
        // Idealmente aquí se debería actualizar el authStore con los nuevos datos
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return <p>Cargando perfil...</p>

  return (
    <div>
      <h2 className="text-2xl font-display text-andean-black mb-6">Mi Perfil</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <div>
          <label className="block text-xs font-medium text-gray-700 uppercase tracking-widest mb-1.5">
            Nombre Completo
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 rounded-sm py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 uppercase tracking-widest mb-1.5">
            Correo Electrónico
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="email"
              name="email"
              value={form.email}
              disabled
              className="w-full bg-gray-100 border border-gray-200 rounded-sm py-3 pl-10 pr-4 text-sm text-gray-500 cursor-not-allowed"
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-1">El correo electrónico no puede ser modificado.</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 uppercase tracking-widest mb-1.5">
            Teléfono
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+51 ..."
              className="w-full bg-gray-50 border border-gray-200 rounded-sm py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-andean-black text-white hover:bg-inca-gold text-sm uppercase tracking-widest font-semibold py-3 px-6 rounded-sm transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Guardando...</>
          ) : (
            'Guardar Cambios'
          )}
        </button>

        {success && (
          <div className="flex items-center gap-2 text-green-600 text-sm mt-4">
            <CheckCircle2 className="w-4 h-4" />
            Perfil actualizado correctamente
          </div>
        )}
      </form>
    </div>
  )
}
