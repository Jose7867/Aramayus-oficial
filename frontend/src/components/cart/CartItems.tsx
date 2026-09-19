'use client'
import Image from 'next/image'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useCartStore } from '@store/cartStore'

// ─── Mapa de nombres de colores (BUG-009) ────────────────────────────────────
const COLOR_NAMES: Record<string, string> = {
  '#8B1A1A': 'Rojo Andino',
  '#2D5A3D': 'Verde Coca',
  '#C8860A': 'Dorado Inca',
  '#7B5EA7': 'Morado Wiphala',
  '#F5F0E8': 'Crema Natural',
  '#1A0A00': 'Negro Obsidiana',
}

export function CartItems() {
  const { items, updateQuantity, removeItem } = useCartStore()

  if (!items.length) return (
    <div className="card p-10 text-center text-gray-400">
      <p className="font-display text-xl mb-2">Tu carrito está vacío</p>
      <p className="text-sm">Agrega productos para continuar</p>
    </div>
  )

  return (
    <div className="card">
      <div className="p-4 border-b border-gray-100 flex justify-between">
        <span className="font-medium">Productos en el carrito</span>
        <span className="text-sm text-gray-400">{items.length} {items.length === 1 ? 'artículo' : 'artículos'}</span>
      </div>
      {items.map((item) => (
        <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
          className="p-4 border-b border-gray-50 grid grid-cols-[72px_1fr_auto] gap-4 items-center last:border-0">
          <div className="w-18 h-18 rounded-sm overflow-hidden bg-gray-100">
            <Image src={item.product.images[0]} alt={item.product.name} width={72} height={72} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-display text-base mb-1">{item.product.name}</h3>
            <div className="flex gap-2 flex-wrap mb-2">
              <span className="text-[10px] px-2 py-0.5 border border-gray-200 rounded-sm text-gray-500">
                <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: item.selectedColor }}></span>
                {COLOR_NAMES[item.selectedColor] || item.selectedColor}
              </span>
              <span className="text-[10px] px-2 py-0.5 border border-gray-200 rounded-sm text-gray-500">Talla {item.selectedSize}</span>
              <span className="text-[10px] px-2 py-0.5 border border-gray-200 rounded-sm text-gray-500">{item.product.material}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                className="w-6 h-6 border border-gray-200 rounded-sm flex items-center justify-center hover:border-inca-gold transition-colors">
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                className="w-6 h-6 border border-gray-200 rounded-sm flex items-center justify-center hover:border-inca-gold transition-colors">
                <Plus className="w-3 h-3" />
              </button>
              <button onClick={() => removeItem(item.product.id, item.selectedColor, item.selectedSize)}
                className="ml-3 text-gray-300 hover:text-wiphala-red transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="text-right">
            {/* BUG-002: .toFixed(2) en precios */}
            <p className="text-xs text-gray-400">S/ {item.product.price.toFixed(2)} c/u</p>
            <p className="text-lg font-semibold">S/ {(item.product.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
