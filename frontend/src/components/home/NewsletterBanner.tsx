'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'

export function NewsletterBanner() {
  const [email, setEmail] = useState('')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    toast.success('¡Suscripción exitosa! Bienvenido/a a la familia Aramayus.')
    setEmail('')
  }
  return (
    <section className="bg-coca-green py-16 text-center px-4">
      <h2 className="font-display text-3xl text-wool-cream mb-2">Sé el primero en conocer<br />las nuevas colecciones</h2>
      <p className="text-wool-cream/60 text-sm mb-8">Recibe noticias sobre nuevos diseños, promociones exclusivas y la historia detrás de cada prenda.</p>
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="tucorreo@email.com"
          className="flex-1 px-4 py-2.5 rounded-sm bg-white/10 border border-white/20 text-wool-cream placeholder:text-wool-cream/40 text-sm focus:outline-none focus:border-inca-gold" />
        <button type="submit" className="btn-primary whitespace-nowrap">Suscribir</button>
      </form>
    </section>
  )
}
