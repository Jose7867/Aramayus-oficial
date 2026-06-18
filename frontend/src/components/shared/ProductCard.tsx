'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@store/cartStore'
import type { Product } from '@types/product'

interface Props { product: Product }

export function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem)
  return (
    <div className="card group cursor-pointer">
      <div className="relative overflow-hidden">
        <Link href={`/producto/${product.id}`}>
          <Image src={product.images[0]} alt={product.name} width={400} height={500}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
        </Link>
        {product.tag && (
          <span className={`absolute top-3 left-3 text-[9px] px-2 py-1 font-semibold tracking-wide rounded-sm
            ${product.tag === 'Nuevo' ? 'bg-coca-green text-green-100' :
              product.tag === 'Promo' ? 'bg-wiphala-red text-red-100' : 'bg-inca-gold text-andean-black'}`}>
            {product.tag}
          </span>
        )}
        <button className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-3.5 h-3.5 text-wiphala-red" />
        </button>
      </div>
      <div className="p-4">
        <Link href={`/producto/${product.id}`}>
          <p className="text-[10px] tracking-widest uppercase text-wiphala-red mb-1">{product.category}</p>
          <h3 className="font-display text-base leading-tight mb-2 hover:text-inca-gold transition-colors">{product.name}</h3>
        </Link>
        <div className="flex gap-1.5 mb-3">
          {product.colors.slice(0,4).map((c) => (
            <div key={c} className="w-3 h-3 rounded-full border border-black/10" style={{ background: c }} />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold">S/ {product.price}</span>
            {product.originalPrice && <span className="text-xs line-through text-gray-400 ml-2">S/ {product.originalPrice}</span>}
          </div>
          <button onClick={() => addItem(product)}
            className="bg-andean-black text-wool-cream px-3 py-1.5 text-[10px] tracking-widest uppercase rounded-sm hover:bg-inca-gold hover:text-andean-black transition-colors flex items-center gap-1">
            <ShoppingBag className="w-3 h-3" /> Agregar
          </button>
        </div>
      </div>
    </div>
  )
}

