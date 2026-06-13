import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const auth = localStorage.getItem('aramayus-auth')
    if (auth) {
      const { state } = JSON.parse(auth)
      if (state?.token) config.headers.Authorization = `Bearer ${state.token}`
    }
  }
  return config
})

// Products
export const productsApi = {
  getAll:    (params?: object)  => api.get('/products', { params }),
  getById:   (id: string)       => api.get(`/products/${id}`),
  create:    (data: FormData)   => api.post('/products', data),
  update:    (id: string, data: FormData) => api.put(`/products/${id}`, data),
  delete:    (id: string)       => api.delete(`/products/${id}`),
  getFeatured: ()               => api.get('/products/featured'),
}

// Orders
export const ordersApi = {
  create:    (data: object)     => api.post('/orders', data),
  getMyOrders: ()               => api.get('/orders/my'),
  getById:   (id: string)       => api.get(`/orders/${id}`),
  getAll:    (params?: object)  => api.get('/orders', { params }),
  updateStatus: (id: string, status: string) => api.patch(`/orders/${id}/status`, { status }),
}

// Auth
export const authApi = {
  login:    (email: string, password: string) => api.post('/auth/login', { email, password }),
  register: (data: object)                    => api.post('/auth/register', data),
  me:       ()                                => api.get('/auth/me'),
}
