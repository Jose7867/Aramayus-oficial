'use client'
import Link from 'next/link'
import { useCartStore } from '@store/cartStore'
import { ShoppingBag, User, Search, Menu } from 'lucide-react'

export function Navbar() {
  const itemCount = useCartStore((s) => s.itemCount)
  return (
    <nav className="bg-andean-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-xl text-inca-gold italic">
          Aramayus
          <span className="block text-wool-cream not-italic text-[10px] tracking-[3px] font-sans font-light">
            Art Textil Andino
          </span>
        </Link>
        <div className="hidden md:flex gap-8">
          {['Inicio','Catálogo','Nosotros','Probador','Contacto'].map((item) => (
            <Link key={item} href={item === 'Inicio' ? '/' : `/${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}`}
              className="text-wool-cream/70 text-xs tracking-widest uppercase hover:text-inca-gold transition-colors">
              {item}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Search className="text-wool-cream/70 w-5 h-5 cursor-pointer hover:text-inca-gold transition-colors" />
          <Link href="/cuenta/perfil">
            <User className="text-wool-cream/70 w-5 h-5 hover:text-inca-gold transition-colors" />
          </Link>
          <Link href="/carrito" className="relative">
            <ShoppingBag className="text-wool-cream w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-wiphala-red text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}
