export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: 'admin' | 'customer'
  addresses: Address[]
  createdAt: string
}

export interface Address {
  id: string
  label: string
  street: string
  city: string
  region: string
  country: string
  zip?: string
  isDefault: boolean
}
