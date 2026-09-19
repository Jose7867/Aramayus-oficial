import Link from 'next/link'
import Image from 'next/image'
import { Shirt, Sparkles, Ruler, RefreshCw } from 'lucide-react'

const FEATURES = [
  { icon: Shirt,     text: '8 avatares con distintas complexiones' },
  { icon: Sparkles,  text: 'Cambio de color y talla en tiempo real' },
  { icon: Ruler,     text: 'Recomendación automática de talla' },
  { icon: RefreshCw, text: 'Combiná distintas prendas entre sí' },
]

export function VirtualTryOnBanner() {
  return (
    <section className="bg-andean-black py-16">
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block bg-inca-gold/10 border border-inca-gold/25 text-inca-gold text-[10px] tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
            Tecnología exclusiva
          </span>
          <h2 className="font-display text-4xl text-wool-cream leading-tight mb-4">
            Pruébatelo antes de comprarlo
          </h2>
          <p className="text-wool-cream/55 text-sm leading-relaxed mb-6">
            Nuestro probador virtual con avatar inteligente te permite ver cómo quedará cada prenda según tus medidas exactas, en tiempo real.
          </p>
          <ul className="space-y-3 mb-8">
            {FEATURES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-wool-cream/70 text-sm">
                <Icon className="w-4 h-4 text-inca-gold flex-shrink-0" />
                {text}
              </li>
            ))}
          </ul>
          <Link href="/probador" className="btn-primary inline-block">Abrir probador virtual</Link>
        </div>
        {/* Ilustración avatar */}
        {/* Ilustración avatar */}
        <div className="relative rounded-xl overflow-hidden aspect-square border border-inca-gold/20 shadow-2xl shadow-inca-gold/5 group">
          <Image
            src="/images/avatars/virtual_tryon_mockup.png"
            alt="Probador Virtual Aramayus Art"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Overlay interactivo sutil */}
          <div className="absolute inset-0 bg-gradient-to-t from-andean-black/90 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-6 left-0 w-full flex flex-col items-center gap-4 z-10">
            <p className="text-wool-cream text-xs font-medium tracking-widest uppercase bg-andean-black/80 px-4 py-1.5 rounded-full border border-inca-gold/30 backdrop-blur-md">
              Vista previa en tiempo real
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
