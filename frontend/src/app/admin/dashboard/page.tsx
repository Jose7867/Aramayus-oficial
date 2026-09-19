import { DollarSign, ShoppingBag, Users, AlertCircle, ArrowUpRight, ArrowDownRight, Package } from 'lucide-react'
import Link from 'next/link'

export const metadata = { title: 'Admin — Dashboard' }

const STATS = [
  { label: 'Ventas Totales', value: 'S/ 24,500', trend: '+12.5%', isPositive: true, icon: DollarSign },
  { label: 'Pedidos Activos', value: '45', trend: '+5.2%', isPositive: true, icon: ShoppingBag },
  { label: 'Clientes Registrados', value: '1,204', trend: '+2.1%', isPositive: true, icon: Users },
  { label: 'Productos Bajos en Stock', value: '8', trend: '-1.5%', isPositive: false, icon: AlertCircle },
]

const RECENT_ORDERS = [
  { id: 'AA-17182912', customer: 'María Quispe', date: 'Hoy, 10:45 AM', total: 'S/ 450', status: 'pending' },
  { id: 'AA-17182911', customer: 'Carlos Mendoza', date: 'Hoy, 09:15 AM', total: 'S/ 280', status: 'confirmed' },
  { id: 'AA-17182910', customer: 'Lucía Condori', date: 'Ayer, 16:30 PM', total: 'S/ 1,200', status: 'shipped' },
  { id: 'AA-17182909', customer: 'Jorge Vargas', date: 'Ayer, 14:20 PM', total: 'S/ 350', status: 'delivered' },
]

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  preparing: 'bg-purple-100 text-purple-800',
  shipped: 'bg-orange-100 text-orange-800',
  delivered: 'bg-green-100 text-green-800',
}
const STATUS_LABELS: Record<string, string> = {
  pending: 'Pendiente', confirmed: 'Confirmado', preparing: 'Preparando', shipped: 'Enviado', delivered: 'Entregado'
}

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-display text-andean-black flex items-center gap-2">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">Bienvenido de vuelta, aquí tienes el resumen de tu tienda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-inca-gold" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <div className="text-2xl font-semibold text-andean-black">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-sm shadow-sm">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-andean-black uppercase tracking-widest">Últimos Pedidos</h2>
            <Link href="/admin/pedidos" className="text-xs text-inca-gold hover:underline font-medium">Ver todos</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-6 py-3 font-medium">Pedido</th>
                  <th className="px-6 py-3 font-medium">Cliente</th>
                  <th className="px-6 py-3 font-medium">Fecha</th>
                  <th className="px-6 py-3 font-medium">Total</th>
                  <th className="px-6 py-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {RECENT_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-andean-black">{order.id}</td>
                    <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{order.date}</td>
                    <td className="px-6 py-4 font-medium">{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-[10px] uppercase tracking-wide font-semibold rounded-sm ${STATUS_COLORS[order.status]}`}>
                        {STATUS_LABELS[order.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6">
           <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-andean-black uppercase tracking-widest">Avisos</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-red-50 text-red-900 border border-red-100 rounded-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
              <div>
                <p className="text-sm font-medium">Stock Crítico</p>
                <p className="text-xs mt-1 text-red-700">Chompa Alpaca Inti (Talla M) tiene menos de 3 unidades.</p>
                <Link href="/admin/productos" className="text-xs font-semibold underline mt-2 inline-block text-red-800">Ir a inventario</Link>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 text-blue-900 border border-blue-100 rounded-sm">
              <Package className="w-5 h-5 shrink-0 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Nuevos Pedidos</p>
                <p className="text-xs mt-1 text-blue-700">Tienes 5 pedidos pendientes de confirmación.</p>
                <Link href="/admin/pedidos" className="text-xs font-semibold underline mt-2 inline-block text-blue-800">Ver pedidos</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
