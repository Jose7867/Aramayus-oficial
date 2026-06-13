import { CartItems }   from '@components/cart/CartItems'
import { CartSummary } from '@components/cart/CartSummary'

export const metadata = { title: 'Carrito — Aramayus Art' }

export default function CarritoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <CartItems />
      </div>
      <CartSummary />
    </div>
  )
}
