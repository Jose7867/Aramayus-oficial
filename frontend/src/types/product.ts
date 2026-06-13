export interface Product {
  id: string
  name: string
  description: string
  category: string
  price: number
  originalPrice?: number
  images: string[]
  colors: string[]       // hex values
  sizes: string[]        // ['XS','S','M','L','XL','XXL']
  stock: Record<string, Record<string, number>>  // { 'M': { '#8B1A1A': 5 } }
  material: string
  weight: number         // grams
  tag?: 'Nuevo' | 'Promo' | 'Destacado'
  featured: boolean
  active: boolean
  createdAt: string
}

export interface CartItem {
  product: Product
  selectedColor: string
  selectedSize: string
  quantity: number
}

export interface FilterState {
  categories: string[]
  colors: string[]
  sizes: string[]
  priceMin: number
  priceMax: number
  onPromo: boolean
  featured: boolean
  inStock: boolean
  search: string
  sortBy: 'relevance' | 'price_asc' | 'price_desc' | 'newest' | 'bestseller'
}
