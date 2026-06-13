'use client'
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from '@components/shared/ProductCard'
import type { Product } from '@types/product'

const MOCK_PRODUCTS: Product[] = [
  { id:'1', name:'Chompa Andina Wari',    category:'Chompas',    price:185, images:['/images/products/chompa-wari.jpeg'],    colors:['#8B1A1A','#2D5A3D','#C8860A','#1A0A00'], sizes:['S','M','L','XL'], stock:{}, material:'Alpaca', weight:420, tag:'Destacado', featured:true, active:true, createdAt:'' },
  { id:'2', name:'Camisa Chakana ',  category:'Camisas',    price:120, images:['/images/products/camisa-chakana.jpeg'], colors:['#2D5A3D','#7B5EA7','#F5F0E8'],           sizes:['XS','S','M','L'], stock:{}, material:'Algodón Pima', weight:280, tag:'Nuevo', featured:true, active:true, createdAt:'' },
  { id:'3', name:'Poncho',   category:'Ponchos',    price:220, originalPrice:280, images:['/images/products/poncho.jpeg'], colors:['#7B5EA7','#8B1A1A'], sizes:['S','M','L','XL'], stock:{}, material:'Alpaca y Oveja', weight:850, tag:'Promo', featured:true, active:true, createdAt:'' },
  { id:'4', name:'Guante Tejido',    category:'Faldas',     price:155, images:['/images/products/guante-tejido.jpeg'],  colors:['#C8860A','#2D5A3D','#8B1A1A','#7B5EA7'],  sizes:['XS','S','M','L'],  stock:{}, material:'Lana y Algodón', weight:600, tag:'Destacado', featured:true, active:true, createdAt:'' },
  { id:'5', name:'Bolso Tejido Qero',     category:'Accesorios', price:75,  images:['/images/products/bolso1.jpeg'],     colors:['#1A0A00','#C8860A'],                      sizes:['Único'],           stock:{}, material:'Alpaca', weight:180, tag:'Nuevo', featured:false, active:true, createdAt:'' },
]

export function FeaturedProducts() {
  const [idx, setIdx] = useState(0)
  const timerRef = useRef<NodeJS.Timeout>()
  const visible = 3

  const next = () => setIdx((i) => (i + 1) % (MOCK_PRODUCTS.length - visible + 1))
  const prev = () => setIdx((i) => Math.max(0, i - 1))

  useEffect(() => {
    timerRef.current = setInterval(next, 4000)
    return () => clearInterval(timerRef.current)
  }, [])

  return (
    <section className="py-16 bg-wool-cream">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="section-eyebrow">Lo más querido</p>
          <h2 className="font-display text-4xl">Productos Destacados</h2>
        </div>
        <div className="relative">
          <button onClick={prev} aria-label="Anterior"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white border border-gray-100 rounded-full flex items-center justify-center hover:border-inca-gold transition-colors shadow-sm">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="overflow-hidden px-10">
            <div className="flex gap-6 transition-transform duration-500"
              style={{ transform: `translateX(-${idx * (100 / visible)}%)` }}>
              {MOCK_PRODUCTS.map((p) => (
                <div key={p.id} className="min-w-[calc(33.33%-1rem)] flex-shrink-0">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
          <button onClick={next} aria-label="Siguiente"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white border border-gray-100 rounded-full flex items-center justify-center hover:border-inca-gold transition-colors shadow-sm">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: MOCK_PRODUCTS.length - visible + 1 }).map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Ir a slide ${i+1}`}
              className={`w-2 h-2 rounded-full transition-colors ${i === idx ? 'bg-inca-gold' : 'bg-inca-gold/25'}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
