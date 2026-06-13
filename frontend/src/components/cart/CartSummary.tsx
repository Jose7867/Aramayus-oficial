'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { useCartStore } from '@store/cartStore'
import { SHIPPING_FREE_THRESHOLD } from '@constants/index'
import toast from 'react-hot-toast'

export function CartSummary() {
  const { subtotal, discount, applyCoupon, coupon } = useCartStore()
  const [couponInput, setCouponInput] = useState('')
  const shipping = subtotal >= SHIPPING_FREE_THRESHOLD ? 0 : 15
  const total = subtotal + shipping - discount

  const handleCoupon = async () => {
    const ok = await applyCoupon(couponInput)
    ok ? toast.success('¡Cupón aplicado!') : toast.error('Cupón no válido')
  }

  return (
    <div className="card h-fit">
      <div className="p-4 border-b border-gray-100">
        <h2 className="font-medium text-sm">Resumen del pedido</h2>
      </div>
      <div className="p-4 space-y-3 text-sm">
        <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>S/ {subtotal}</span></div>
        <div className="flex justify-between">
          <span className="text-gray-500">Envío</span>
          <span className={shipping === 0 ? 'text-coca-green font-medium' : ''}>{shipping === 0 ? 'Gratis' : `S/ ${shipping}`}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-coca-green">
            <span>Descuento ({coupon})</span><span>−S/ {discount}</span>
          </div>
        )}
        <div className="border-t pt-3 flex justify-between">
          <span className="font-medium">Total</span>
          <span className="font-display text-xl">S/ {total}</span>
        </div>

        {/* Cupón */}
        {!coupon && (
          <div className="flex gap-2 pt-2">
            <input value={couponInput} onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
              placeholder="Código de cupón" className="input-base flex-1 text-xs" />
            <button onClick={handleCoupon} className="btn-dark px-3 py-2 text-xs">Aplicar</button>
          </div>
        )}

        <Link href="/checkout" className="btn-primary w-full text-center block mt-2">
          🔒 Pagar ahora
        </Link>
        <Link href="/catalogo" className="w-full text-center block text-xs text-gray-400 hover:text-andean-black transition-colors py-1">
          Seguir comprando
        </Link>

        <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 pt-2">
          <ShieldCheck className="w-3.5 h-3.5 text-coca-green" />
          Compra segura y protegida
        </div>
        <div className="flex gap-1 justify-center flex-wrap">
          {['VISA','MC','Yape','Plin','Transferencia'].map((m) => (
            <span key={m} className="text-[10px] px-2 py-0.5 bg-gray-50 border border-gray-100 rounded text-gray-400">{m}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
