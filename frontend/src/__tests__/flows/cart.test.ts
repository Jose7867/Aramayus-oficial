import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from '@/store/cartStore'
import { Product } from '@/types/product'

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  description: 'Desc',
  category: 'Chompas',
  price: 100,
  images: ['img.jpg'],
  colors: ['#000000', '#ffffff'],
  sizes: ['S', 'M'],
  stock: {},
  material: 'Alpaca',
  weight: 200,
  featured: false,
  active: true,
  createdAt: new Date().toISOString()
}

describe('Cart Store', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart()
  })

  it('should add item to cart', () => {
    const store = useCartStore.getState()
    store.addItem(mockProduct, '#000000', 'S')

    const state = useCartStore.getState()
    expect(state.items.length).toBe(1)
    expect(state.itemCount).toBe(1)
    expect(state.subtotal).toBe(100)
    expect(state.items[0].product.id).toBe('1')
  })

  it('should increase quantity if same item added', () => {
    const store = useCartStore.getState()
    store.addItem(mockProduct, '#000000', 'S')
    store.addItem(mockProduct, '#000000', 'S')

    const state = useCartStore.getState()
    expect(state.items.length).toBe(1)
    expect(state.itemCount).toBe(2)
    expect(state.subtotal).toBe(200)
    expect(state.items[0].quantity).toBe(2)
  })

  it('should remove item', () => {
    const store = useCartStore.getState()
    store.addItem(mockProduct, '#000000', 'S')
    store.removeItem('1', '#000000', 'S')

    const state = useCartStore.getState()
    expect(state.items.length).toBe(0)
    expect(state.itemCount).toBe(0)
    expect(state.subtotal).toBe(0)
  })

  it('should update quantity', () => {
    const store = useCartStore.getState()
    store.addItem(mockProduct, '#000000', 'S')
    store.updateQuantity('1', '#000000', 'S', 5)

    const state = useCartStore.getState()
    expect(state.items[0].quantity).toBe(5)
    expect(state.itemCount).toBe(5)
    expect(state.subtotal).toBe(500)
  })

  it('should apply valid coupon', async () => {
    const store = useCartStore.getState()
    store.addItem(mockProduct, '#000000', 'S') // 100
    const applied = await store.applyCoupon('INTI20')

    const state = useCartStore.getState()
    expect(applied).toBe(true)
    expect(state.coupon).toBe('INTI20')
    expect(state.discount).toBe(10) // 10%
  })

  it('should not apply invalid coupon', async () => {
    const store = useCartStore.getState()
    store.addItem(mockProduct, '#000000', 'S')
    const applied = await store.applyCoupon('INVALID')

    const state = useCartStore.getState()
    expect(applied).toBe(false)
    expect(state.coupon).toBe(null)
    expect(state.discount).toBe(0)
  })
})
