'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package, ArrowRight } from 'lucide-react'

function ConfirmacionContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order_number')

  useEffect(() => {
    if (!orderNumber) {
      router.push('/')
    }
  }, [orderNumber, router])

  if (!orderNumber) return null

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-xl p-8 md:p-12 text-center max-w-2xl w-full">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-display text-andean-black mb-4">
        ¡Gracias por tu compra!
      </h1>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Tu pedido ha sido procesado exitosamente. Te enviaremos un correo electrónico con los detalles del envío en breve.
      </p>

      <div className="bg-wool-cream rounded-sm p-6 mb-8 inline-block mx-auto border border-gray-200">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Número de Pedido</p>
        <p className="text-2xl font-bold text-inca-gold font-mono">#{orderNumber}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Link
          href="/cuenta/pedidos"
          className="flex items-center justify-center gap-2 bg-andean-black text-white hover:bg-inca-gold transition-colors py-4 px-8 rounded-sm text-sm font-semibold uppercase tracking-widest"
        >
          <Package className="w-4 h-4" />
          Ver mis Pedidos
        </Link>
        <Link
          href="/catalogo"
          className="flex items-center justify-center gap-2 border border-andean-black text-andean-black hover:bg-gray-50 transition-colors py-4 px-8 rounded-sm text-sm font-semibold uppercase tracking-widest"
        >
          Seguir Comprando
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

export default function ConfirmacionPage() {
  return (
    <div className="min-h-screen bg-wool-cream flex items-center justify-center p-4 relative overflow-hidden pt-24 pb-16">
      {/* Patrón decorativo de fondo */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8860A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative z-10 w-full flex justify-center">
        <Suspense fallback={<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inca-gold"></div>}>
          <ConfirmacionContent />
        </Suspense>
      </div>
    </div>
  )
}
