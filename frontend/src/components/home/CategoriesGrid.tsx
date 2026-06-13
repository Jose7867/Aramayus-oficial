import Link from 'next/link'
import { CATEGORIES } from '@constants/index'

const BG_MAP: Record<string, string> = {
  Chompas:    'from-wiphala-red to-inca-gold',
  Ponchos:    'from-coca-green to-textile-purple',
  Camisas:    'from-inca-gold to-wiphala-red',
  Faldas:     'from-textile-purple to-coca-green',
  Vestidos:   'from-wiphala-red to-textile-purple',
  Accesorios: 'from-andean-black to-inca-gold',
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
              className={`relative aspect-square rounded-sm overflow-hidden bg-gradient-to-br ${BG_MAP[cat]} group`}>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-t from-andean-black/70 to-transparent flex items-end p-4">
                <span className="font-display text-lg text-wool-cream">{cat}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
