'use client'
import { useState, useEffect } from 'react'
import { Eye, Search, Filter } from 'lucide-react'
import { ordersApi } from '@/services/api'

// Extended Order type for admin view
interface AdminOrder {
  id: string
  order_number: string // from db
  customer_name: string
  customer_email: string
  total: number
  status: string
  created_at: string
}

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'confirmed', label: 'Confirmado', color: 'bg-blue-100 text-blue-800' },
  { value: 'preparing', label: 'Preparando', color: 'bg-purple-100 text-purple-800' },
  { value: 'shipped', label: 'Enviado', color: 'bg-orange-100 text-orange-800' },
  { value: 'delivered', label: 'Entregado', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'Cancelado', color: 'bg-red-100 text-red-800' },
]

export default function PedidosPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const res = await ordersApi.getAll()
      setOrders(res.data || [])
    } catch (error) {
      console.error('Failed to fetch orders', error)
      // Mock data
      setOrders([
        { id: '1', order_number: 'AA-17182912', customer_name: 'María Quispe', customer_email: 'maria@example.com', total: 450, status: 'pending', created_at: new Date().toISOString() },
        { id: '2', order_number: 'AA-17182911', customer_name: 'Carlos Mendoza', customer_email: 'carlos@example.com', total: 280, status: 'confirmed', created_at: new Date(Date.now() - 86400000).toISOString() },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await ordersApi.updateStatus(orderId, newStatus)
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
    } catch (error) {
      console.error('Error updating status', error)
      alert('Hubo un error al actualizar el estado del pedido')
    }
  }

  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      (o.order_number?.toLowerCase() || '').includes(search.toLowerCase()) || 
      (o.customer_name?.toLowerCase() || '').includes(search.toLowerCase())
    const matchesStatus = statusFilter ? o.status === statusFilter : true
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-display text-andean-black">Pedidos</h1>
        <p className="text-sm text-gray-500 mt-1">Gestiona los pedidos de tus clientes y actualiza su estado de envío.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
          <div className="relative w-full max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar por N° pedido o cliente..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-inca-gold transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-inca-gold bg-white"
            >
              <option value="">Todos los estados</option>
              {STATUS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-medium">
              <tr>
                <th className="px-6 py-4">N° Pedido</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Cargando pedidos...</td></tr>
              ) : filteredOrders.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No se encontraron pedidos.</td></tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-andean-black">{order.order_number}</td>
                    <td className="px-6 py-4">
                      <div className="text-gray-800 font-medium">{order.customer_name}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">{order.customer_email}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-xs">
                      {new Date(order.created_at).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 font-medium text-inca-gold">S/ {Number(order.total).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`px-2 py-1.5 text-xs font-semibold rounded-sm border-0 focus:ring-2 focus:ring-inca-gold/50 cursor-pointer ${STATUS_OPTIONS.find(o => o.value === order.status)?.color || 'bg-gray-100'}`}
                      >
                        {STATUS_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value} className="bg-white text-gray-800">{opt.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-inca-gold transition-colors flex items-center gap-1 text-xs font-medium border border-gray-200 rounded-sm hover:border-inca-gold bg-white">
                          <Eye className="w-4 h-4" /> Ver Detalles
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
