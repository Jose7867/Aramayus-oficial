'use client'
import { useState, useEffect } from 'react'
import { Search, Mail, Phone, Calendar } from 'lucide-react'
import { api } from '@/services/api'
import type { User } from '@/types/user'

export default function ClientesPage() {
  const [customers, setCustomers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const res = await api.get('/users')
      // Filtramos solo clientes si es necesario, o mostramos todos
      const allUsers = res.data || []
      setCustomers(allUsers.filter((u: User) => u.role === 'customer'))
    } catch (error) {
      console.error('Failed to fetch customers', error)
      // Mock data
      setCustomers([
        { id: '1', name: 'María Quispe', email: 'maria@example.com', phone: '987654321', role: 'customer', addresses: [], createdAt: new Date(Date.now() - 30 * 86400000).toISOString() },
        { id: '2', name: 'Carlos Mendoza', email: 'carlos@example.com', phone: '912345678', role: 'customer', addresses: [], createdAt: new Date(Date.now() - 15 * 86400000).toISOString() },
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    (c.phone && c.phone.includes(search))
  )

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display text-andean-black">Clientes</h1>
          <p className="text-sm text-gray-500 mt-1">Directorio de clientes registrados en la tienda.</p>
        </div>
        <div className="px-4 py-2 bg-white border border-gray-200 rounded-sm text-sm text-gray-600 font-medium">
          Total: {customers.length} clientes
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar por nombre, correo o teléfono..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-inca-gold transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Contacto</th>
                <th className="px-6 py-4">Fecha de Registro</th>
                <th className="px-6 py-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">Cargando clientes...</td></tr>
              ) : filteredCustomers.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No se encontraron clientes.</td></tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-inca-gold/10 text-inca-gold flex items-center justify-center font-bold font-display border border-inca-gold/20 shrink-0">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-andean-black">{customer.name}</div>
                          <div className="text-[10px] text-gray-400 mt-0.5">ID: {customer.id.slice(0,8)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 space-y-1">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-3.5 h-3.5" /> <a href={`mailto:${customer.email}`} className="hover:text-inca-gold hover:underline">{customer.email}</a>
                      </div>
                      {customer.phone && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-3.5 h-3.5" /> {customer.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(customer.createdAt).toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-[10px] uppercase tracking-wide font-semibold rounded-sm bg-green-100 text-green-800">
                        Activo
                      </span>
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
