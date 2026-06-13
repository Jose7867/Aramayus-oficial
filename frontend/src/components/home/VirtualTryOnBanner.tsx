import Link from 'next/link'
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
        <div className="bg-white/4 border border-inca-gold/15 rounded-md p-8 flex flex-col items-center gap-4">
          <svg width="140" height="200" viewBox="0 0 140 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="70" cy="38" r="26" fill="rgba(245,240,232,0.12)" stroke="rgba(245,240,232,0.3)" strokeWidth="1.5"/>
            <path d="M25 72 Q25 58 70 58 Q115 58 115 72 L110 148 Q110 162 70 162 Q30 162 30 148Z" fill="rgba(200,134,10,0.25)" stroke="#C8860A" strokeWidth="1.5"/>
            <path d="M30 148 L22 195 M110 148 L118 195" stroke="rgba(245,240,232,0.2)" strokeWidth="9" strokeLinecap="round"/>
            <path d="M25 78 L8 130 M115 78 L132 130" stroke="rgba(245,240,232,0.18)" strokeWidth="8" strokeLinecap="round"/>
            <path d="M35 102 Q70 90 105 102" stroke="rgba(245,240,232,0.4)" strokeWidth="1"/>
            <path d="M33 118 Q70 108 107 118" stroke="rgba(245,240,232,0.3)" strokeWidth="1"/>
          </svg>
          <div className="flex gap-2">
            {['#8B1A1A','#C8860A','#2D5A3D','#7B5EA7','#1A0A00'].map((c) => (
              <div key={c} className="w-5 h-5 rounded-full border-2 border-transparent hover:border-inca-gold cursor-pointer transition-colors" style={{ background: c }} />
            ))}
          </div>
          <p className="text-wool-cream/35 text-[11px] tracking-widest uppercase">Vista previa en tiempo real</p>
        </div>
      </div>
    </section>
  )
}
