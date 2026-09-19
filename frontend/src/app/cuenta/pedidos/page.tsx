'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@store/authStore'
import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react'

interface Order {
  id: string
  order_number: string
  created_at: string
  status: string
  total: string
}

export default function PedidosPage() {
  const { token } = useAuthStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/my`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (res.ok) {
          const data = await res.json()
          setOrders(data)
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchOrders()
    } else {
      setLoading(false)
    }
  }, [token])

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending': return { label: 'Pendiente', color: 'text-yellow-600 bg-yellow-50 border-yellow-200', icon: Clock }
      case 'confirmed': return { label: 'Confirmado', color: 'text-blue-600 bg-blue-50 border-blue-200', icon: CheckCircle }
      case 'preparing': return { label: 'En Preparación', color: 'text-purple-600 bg-purple-50 border-purple-200', icon: Package }
      case 'shipped': return { label: 'Enviado', color: 'text-indigo-600 bg-indigo-50 border-indigo-200', icon: Truck }
      case 'delivered': return { label: 'Entregado', color: 'text-green-600 bg-green-50 border-green-200', icon: CheckCircle }
      case 'cancelled': return { label: 'Cancelado', color: 'text-red-600 bg-red-50 border-red-200', icon: XCircle }
      default: return { label: status, color: 'text-gray-600 bg-gray-50 border-gray-200', icon: Package }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-inca-gold"></div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-display text-andean-black mb-6">Mis Pedidos</h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 border border-gray-100 rounded-sm">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Aún no tienes pedidos.</p>
          <a href="/catalogo" className="text-inca-gold hover:underline font-medium text-sm">
            Explorar Catálogo
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const { label, color, icon: StatusIcon } = getStatusDisplay(order.status)
            return (
              <div key={order.id} className="border border-gray-200 rounded-sm p-5 hover:border-inca-gold transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-semibold text-andean-black">#{order.order_number}</span>
                      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold border ${color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Realizado el {new Date(order.created_at).toLocaleDateString('es-PE', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </p>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
                    <span className="text-lg font-bold text-andean-black">
                      S/ {Number(order.total).toFixed(2)}
                    </span>
                    <button className="text-xs font-medium text-inca-gold hover:text-andean-black transition-colors uppercase tracking-widest">
                      Ver Detalles
                    </button>
                  </div>
                  
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
