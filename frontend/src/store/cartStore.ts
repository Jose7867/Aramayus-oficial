import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '@/types/product'

interface CartStore {
  items: CartItem[]
  itemCount: number
  subtotal: number
  coupon: string | null
  discount: number
  addItem: (product: Product, color?: string, size?: string) => void
  removeItem: (productId: string, color: string, size: string) => void
  updateQuantity: (productId: string, color: string, size: string, qty: number) => void
  applyCoupon: (code: string) => Promise<boolean>
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      subtotal: 0,
      coupon: null,
      discount: 0,

      addItem: (product, color = product.colors[0], size = product.sizes[0]) => {
        const items = get().items
        const existing = items.find(
          (i) => i.product.id === product.id && i.selectedColor === color && i.selectedSize === size
        )
        const next = existing
          ? items.map((i) =>
              i.product.id === product.id && i.selectedColor === color && i.selectedSize === size
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          : [...items, { product, selectedColor: color, selectedSize: size, quantity: 1 }]
        set({ items: next, itemCount: next.reduce((s, i) => s + i.quantity, 0),
              subtotal: next.reduce((s, i) => s + i.product.price * i.quantity, 0) })
      },

      removeItem: (productId, color, size) => {
        const next = get().items.filter(
          (i) => !(i.product.id === productId && i.selectedColor === color && i.selectedSize === size)
        )
        set({ items: next, itemCount: next.reduce((s, i) => s + i.quantity, 0),
              subtotal: next.reduce((s, i) => s + i.product.price * i.quantity, 0) })
      },

      updateQuantity: (productId, color, size, qty) => {
        if (qty < 1) { get().removeItem(productId, color, size); return }
        const next = get().items.map((i) =>
          i.product.id === productId && i.selectedColor === color && i.selectedSize === size
            ? { ...i, quantity: qty } : i
        )
        set({ items: next, itemCount: next.reduce((s, i) => s + i.quantity, 0),
              subtotal: next.reduce((s, i) => s + i.product.price * i.quantity, 0) })
      },

      applyCoupon: async (code) => {
        const coupons: Record<string, number> = { INTI20: 0.1, ANDINO15: 0.08, CUSCO10: 0.1 }
        if (coupons[code.toUpperCase()]) {
          const disc = Math.round(get().subtotal * coupons[code.toUpperCase()])
          set({ coupon: code.toUpperCase(), discount: disc })
          return true
        }
        return false
      },

      clearCart: () => set({ items: [], itemCount: 0, subtotal: 0, coupon: null, discount: 0 }),
    }),
    { name: 'aramayus-cart' }
  )
)
