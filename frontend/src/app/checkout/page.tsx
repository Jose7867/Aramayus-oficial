'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCartStore } from '@store/cartStore'
import { useAuthStore } from '@store/authStore'
import { CreditCard, MapPin, Truck, ChevronRight, Loader2 } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clearCart, discount, coupon } = useCartStore()
  const { token, user, logout } = useAuthStore()

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postal_code: '',
  })
  const [payment, setPayment] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) {
      router.push('/auth/login?redirect=/checkout')
    }
  }, [token, router])

  const shippingCost = subtotal >= 200 ? 0 : 15
  const total = Math.max(0, subtotal + shippingCost - discount)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!shippingAddress.address || !shippingAddress.city) {
      setError('Por favor completa los campos obligatorios de envío.')
      return
    }

    // Validación de tarjeta simulada
    if (!/^\d{16}$/.test(payment.number.replace(/\s+/g, ''))) {
      setError('El número de tarjeta debe tener 16 dígitos.')
      return
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(payment.expiry)) {
      setError('La fecha de expiración debe tener el formato MM/YY.')
      return
    }
    if (!/^\d{3,4}$/.test(payment.cvc)) {
      setError('El CVC debe tener 3 o 4 dígitos.')
      return
    }
    if (payment.name.trim().length < 3) {
      setError('El nombre del titular es obligatorio.')
      return
    }

    setLoading(true)
    setError('')

    const orderPayload = {
      items: items.map(item => ({
        product_id: item.product.id,
        product_name: item.product.name,
        product_image: item.product.images[0] || '',
        selected_color: item.selectedColor,
        selected_size: item.selectedSize,
        quantity: item.quantity,
        unit_price: item.product.price
      })),
      shipping_address: shippingAddress,
      payment_method: 'tarjeta_simulada',
      coupon: coupon || undefined
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderPayload)
      })

      if (res.ok) {
        const data = await res.json()
        clearCart()
        router.push(`/confirmacion?order_id=${data.id}&order_number=${data.order_number}`)
      } else {
        const errData = await res.json()
        setError(errData.message || 'Error al procesar el pago')
        if (res.status === 401) {
          logout()
          router.push('/auth/login?redirect=/checkout')
        }
      }
    } catch (err) {
      console.error(err)
      setError('No se pudo conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-wool-cream">
        <div className="text-center">
          <p className="text-lg text-gray-500 mb-4">Tu carrito está vacío.</p>
          <button onClick={() => router.push('/catalogo')} className="text-inca-gold underline">Volver a la tienda</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-wool-cream pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-display text-andean-black mb-8">Finalizar Compra</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-sm">
            {error}
          </div>
        )}

        {/* BUG-005: form con onSubmit para que Enter en campos dispare validación */}
        <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="flex-1 space-y-8">
            {/* 1. Envío */}
            <section className="bg-white p-6 md:p-8 rounded-sm shadow-sm border border-gray-200">
              <h2 className="text-lg font-display text-andean-black mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-inca-gold" />
                Dirección de Envío
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-widest mb-1.5">
                    Dirección (Calle, Número, Depto) *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold transition-colors"
                    placeholder="Av. Sol 123, Depto 4"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-widest mb-1.5">
                      Ciudad *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold transition-colors"
                      placeholder="Cusco"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 uppercase tracking-widest mb-1.5">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      name="postal_code"
                      value={shippingAddress.postal_code}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold transition-colors"
                      placeholder="08000"
                    />
                  </div>
                </div>
              </form>
            </section>

            {/* 2. Pago (Simulado) */}
            <section className="bg-white p-6 md:p-8 rounded-sm shadow-sm border border-gray-200">
              <h2 className="text-lg font-display text-andean-black mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-inca-gold" />
                Método de Pago
              </h2>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-sm space-y-4">
                <p className="text-sm text-gray-600">Ingresa los datos de tu tarjeta (simulación)</p>
                <input
                  type="text"
                  maxLength={19}
                  value={payment.number}
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, '')
                    if (val.length > 0) val = val.match(/.{1,4}/g)?.join(' ') || ''
                    setPayment({ ...payment, number: val })
                  }}
                  placeholder="Número de Tarjeta"
                  className="w-full bg-white border border-gray-200 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-inca-gold"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    maxLength={5}
                    value={payment.expiry}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, '')
                      if (val.length >= 3) val = `${val.slice(0,2)}/${val.slice(2,4)}`
                      setPayment({ ...payment, expiry: val })
                    }}
                    placeholder="MM/YY"
                    className="w-full bg-white border border-gray-200 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-inca-gold"
                  />
                  <input
                    type="text"
                    maxLength={4}
                    value={payment.cvc}
                    onChange={(e) => setPayment({ ...payment, cvc: e.target.value.replace(/\D/g, '') })}
                    placeholder="CVC"
                    className="w-full bg-white border border-gray-200 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-inca-gold"
                  />
                </div>
                <input
                  type="text"
                  value={payment.name}
                  onChange={(e) => setPayment({ ...payment, name: e.target.value })}
                  placeholder="Titular de la Tarjeta"
                  className="w-full bg-white border border-gray-200 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-inca-gold uppercase"
                />
              </div>
            </section>
          </div>

          <aside className="w-full lg:w-96 shrink-0">
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-display text-andean-black mb-4">Resumen del Pedido</h3>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="relative w-16 h-20 bg-gray-100 shrink-0 rounded-sm overflow-hidden border border-gray-200">
                      {item.product.images[0] && (
                        <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                      )}
                      <div className="absolute top-0 right-0 bg-andean-black text-white text-[10px] w-4 h-4 flex items-center justify-center font-bold">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-semibold text-andean-black line-clamp-2">{item.product.name}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        Color: {item.selectedColor} | Talla: {item.selectedSize}
                      </p>
                      <p className="font-medium text-inca-gold mt-1">S/ {(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>S/ {subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Descuento ({coupon})</span>
                    <span>- S/ {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> Envío</span>
                  <span>{shippingCost === 0 ? 'Gratis' : `S/ ${shippingCost.toFixed(2)}`}</span>
                </div>
                
                <div className="border-t border-gray-100 pt-3 flex justify-between items-center text-lg font-bold text-andean-black">
                  <span>Total</span>
                  <span>S/ {total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !shippingAddress.address || !shippingAddress.city}
                className="w-full mt-6 bg-andean-black text-white hover:bg-inca-gold py-4 rounded-sm font-semibold uppercase tracking-widest text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Pagar Ahora'}
                {!loading && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </aside>
          
        </div>
        </form>
      </div>
    </div>
  )
}
