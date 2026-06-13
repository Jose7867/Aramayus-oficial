'use client'
import { useState } from 'react'
import { LayoutGrid, List } from 'lucide-react'
import { ProductCard } from '@components/shared/ProductCard'
import type { Product } from '@types/product'

// Mock data (reemplazar con fetch a la API)
const PRODUCTS: Product[] = [
  { id:'1', name:'Chompa Andina Wari',   category:'Chompas',    price:185, images:['/images/products/chompa-wari.jpeg'],   colors:['#8B1A1A','#2D5A3D','#C8860A'], sizes:['S','M','L','XL'], stock:{}, material:'Alpaca', weight:420, tag:'Destacado', featured:true,  active:true, createdAt:'' },
  { id:'2', name:'Camisa Chakana Roja', category:'Camisas',    price:120, images:['/images/products/camisa-chakana.jpeg'],        colors:['#8B1A1A','#7B5EA7','#F5F0E8'], sizes:['XS','S','M','L'],  stock:{}, material:'Algodón Pima', weight:280, tag:'Nuevo',    featured:true,  active:true, createdAt:'' },
  { id:'3', name:'Poncho Tawantinsuyu',  category:'Ponchos',    price:220, originalPrice:280, images:['/images/products/poncho.jpeg'],  colors:['#7B5EA7','#8B1A1A'],           sizes:['S','M','L','XL'], stock:{}, material:'Alpaca y Oveja', weight:850, tag:'Promo', featured:true,  active:true, createdAt:'' },
  { id:'4', name:'Guantes',   category:'Faldas',     price:155, images:['/images/products/Guante-tejido.jpeg'],        colors:['#C8860A','#2D5A3D','#8B1A1A'],  sizes:['XS','S','M','L'],  stock:{}, material:'Lana y Algodón', weight:600, tag:'Destacado', featured:true, active:true, createdAt:'' },
  { id:'5', name:'Bolso Tejido Qero',    category:'Accesorios', price:75,  images:['/images/products/bolso1.jpeg'],        colors:['#1A0A00','#C8860A'],             sizes:['Único'],           stock:{}, material:'Alpaca', weight:180, tag:'Nuevo',    featured:false, active:true, createdAt:'' },
  { id:'6', name:'Accesorios',    category:'Vestidos',   price:195, originalPrice:240, images:['/images/products/Accesorios.jpeg'], colors:['#8B1A1A','#7B5EA7','#2D5A3D'], sizes:['S','M','L','XL'], stock:{}, material:'Algodón y Seda', weight:350, tag:'Promo', featured:true, active:true, createdAt:'' },
]

export function ProductGrid() {
  const [view, setView]   = useState<'grid'|'list'>('grid')
  const [sort, setSort]   = useState('relevance')

  return (
    <div className="flex-1">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500"><strong className="text-andean-black">{PRODUCTS.length}</strong> productos encontrados</p>
        <div className="flex items-center gap-3">
          <select value={sort} onChange={(e) => setSort(e.target.value)}
            className="input-base text-xs py-1.5">
            <option value="relevance">Más relevantes</option>
            <option value="price_asc">Precio: menor a mayor</option>
            <option value="price_desc">Precio: mayor a menor</option>
            <option value="newest">Más nuevos</option>
          </select>
          <div className="flex gap-1">
            {[['grid',LayoutGrid],['list',List]].map(([v, Icon]) => (
              <button key={v as string} onClick={() => setView(v as 'grid'|'list')}
                className={`p-1.5 border rounded-sm transition-all ${view === v ? 'bg-inca-gold text-andean-black border-inca-gold' : 'border-gray-200 text-gray-400'}`}>
                <Icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className={view === 'grid' ? 'grid grid-cols-2 xl:grid-cols-3 gap-5' : 'flex flex-col gap-4'}>
        {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      {/* Paginación */}
      <div className="flex justify-center gap-1 mt-10">
        {[1,2,3,4].map((n) => (
          <button key={n} className={`w-8 h-8 text-sm rounded-sm border transition-all ${n === 1 ? 'bg-inca-gold text-andean-black border-inca-gold font-semibold' : 'border-gray-200 text-gray-500 hover:border-inca-gold'}`}>{n}</button>
        ))}
      </div>
    </div>
  )
}
