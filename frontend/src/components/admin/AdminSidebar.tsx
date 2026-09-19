'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Shirt, ShoppingBag, Users, Tag, Package, Settings, BarChart3, Grid3x3, Info, LogOut } from 'lucide-react'
import { useAuthStore } from '@store/authStore'

const NAV = [
  { label:'Dashboard',   href:'/admin/dashboard',      icon:LayoutDashboard },
  { label:'Productos',   href:'/admin/productos',       icon:Shirt },
  { label:'Pedidos',     href:'/admin/pedidos',         icon:ShoppingBag,  badge:8 },
  { label:'Clientes',    href:'/admin/clientes',        icon:Users },
  { label:'Categorías',  href:'/admin/categorias',      icon:Grid3x3 },
  { label:'Nosotros',    href:'/admin/nosotros',        icon:Info },
  { label:'Inventario',  href:'/admin/configuracion',   icon:Package },
  { label:'Reportes',    href:'/admin/configuracion',   icon:BarChart3 },
  { label:'Config.',     href:'/admin/configuracion',   icon:Settings },
]

export function AdminSidebar() {
  const path    = usePathname()
  const router  = useRouter()
  const { user, logout } = useAuthStore()

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'AA'

  const handleLogout = () => {
    logout()
    router.replace('/auth/login')
  }

  return (
    <aside className="w-52 bg-andean-black flex flex-col flex-shrink-0">
      <div className="p-4 border-b border-wool-cream/8">
        <div className="font-display text-lg text-inca-gold italic">Aramayus Art</div>
        <div className="text-wool-cream/30 text-[9px] tracking-widest uppercase font-sans">Panel Admin</div>
        <span className="inline-block mt-1 bg-wiphala-red/25 border border-wiphala-red/35 text-red-100 text-[9px] px-2 py-0.5 rounded-sm tracking-wide">ADMIN</span>
      </div>
      <nav className="flex-1 py-3 overflow-y-auto">
        {NAV.map(({ label, href, icon:Icon, badge }) => (
          <Link key={label} href={href}
            className={`flex items-center gap-2.5 px-4 py-2 text-xs transition-all border-l-2 ${path.startsWith(href) ? 'text-inca-gold bg-inca-gold/8 border-inca-gold' : 'text-wool-cream/55 hover:text-wool-cream hover:bg-wool-cream/5 border-transparent'}`}>
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span>{label}</span>
            {badge && <span className="ml-auto bg-wiphala-red/60 text-white text-[9px] px-1.5 py-0.5 rounded-full">{badge}</span>}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-wool-cream/8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-inca-gold/20 flex items-center justify-center text-inca-gold text-xs font-semibold">{initials}</div>
          <div className="flex-1 min-w-0">
            <div className="text-wool-cream/80 text-xs truncate">{user?.name || 'Administrador'}</div>
            <div className="text-wool-cream/30 text-[10px] truncate">{user?.email || ''}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 text-wool-cream/40 hover:text-wiphala-red transition-colors text-[10px] uppercase tracking-widest py-1"
        >
          <LogOut className="w-3 h-3" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}

