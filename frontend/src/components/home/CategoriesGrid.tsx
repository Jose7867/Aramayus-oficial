import Link from 'next/link'
import Image from 'next/image'
import { CATEGORIES } from '@constants/index'

const IMG_MAP: Record<string, string> = {
  Chompas:    '/images/products/chompa-wari.jpeg',
  Ponchos:    '/images/products/poncho.jpeg',
  Camisas:    '/images/products/camisa-chakana.jpeg',
  Bolsos:     '/images/products/bolso1.jpeg',
  Guantes:   '/images/products/guante-tejido.jpeg',
  Accesorios: '/images/products/bolso1.jpeg',
}

export function CategoriesGrid() {
  return (
    <section className="py-16 bg-warm-mid">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="section-eyebrow">Explora por</p>
          <h2 className="font-display text-4xl">Categorías</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat} href={`/catalogo?category=${cat}`}
              className="relative aspect-square rounded-sm overflow-hidden group">
              <Image 
                src={IMG_MAP[cat] || '/images/products/chompa-wari.jpeg'} 
                alt={cat} 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-t from-andean-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="font-display text-lg text-wool-cream relative z-10">{cat}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
