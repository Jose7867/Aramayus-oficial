'use client'
import { usePathname } from 'next/navigation'
import { Bell, Plus } from 'lucide-react'
import Link from 'next/link'

const TITLES: Record<string, string> = {
  '/admin/dashboard':    'Dashboard',
  '/admin/productos':    'Productos',
  '/admin/pedidos':      'Pedidos',
  '/admin/clientes':     'Clientes',
  '/admin/categorias':   'Categorías',
  '/admin/promociones':  'Promociones',
  '/admin/configuracion':'Configuración',
}

export function AdminTopBar() {
  const path = usePathname()
  const title = TITLES[path] || 'Admin'
  return (
    <header className="bg-white border-b border-gray-100 h-13 flex items-center justify-between px-6 h-12 flex-shrink-0">
      <span className="font-medium text-base">{title}</span>
      <div className="flex items-center gap-3">
        <input placeholder="Buscar producto..." className="input-base text-xs py-1.5 w-44" />
        <button className="relative text-gray-400 hover:text-andean-black transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-wiphala-red rounded-full"></span>
        </button>
        <Link href="/admin/productos/nuevo" className="btn-primary flex items-center gap-1.5 py-2 px-3">
          <Plus className="w-3.5 h-3.5" />Nuevo producto
        </Link>
      </div>
    </header>
  )
}
