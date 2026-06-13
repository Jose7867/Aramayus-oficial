export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled'

export interface Order {
  id: string
  orderNumber: string
  userId: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  status: OrderStatus
  paymentMethod: string
  paymentStatus: 'pending' | 'paid' | 'failed'
  shippingAddress: import('./user').Address
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  selectedColor: string
  selectedSize: string
  quantity: number
  unitPrice: number
  subtotal: number
}
