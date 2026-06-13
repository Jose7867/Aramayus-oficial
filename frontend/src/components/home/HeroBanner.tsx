'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function HeroBanner() {
  return (
    <section className="bg-andean-black min-h-[85vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Fondo geométrico andino */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30Z' fill='none' stroke='%23C8860A' stroke-width='0.5'/%3E%3C/svg%3E\")", backgroundSize: '60px' }} />

      <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
        className="text-inca-gold text-[11px] tracking-[4px] uppercase mb-6">
        Colección 2025 · Tejido a mano en los Andes
      </motion.p>

      <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}
        className="font-display text-5xl md:text-7xl text-wool-cream leading-[1.05] mb-6 max-w-3xl">
        Arte que viste,<br /><em className="text-inca-gold">alma que perdura</em>
      </motion.h1>

      <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
        className="text-wool-cream/55 text-base max-w-lg mb-10 leading-relaxed font-light">
        Prendas artesanales únicas, elaboradas por manos peruanas con técnicas ancestrales transmitidas de generación en generación.
      </motion.p>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
        className="flex flex-wrap gap-4 justify-center">
        <Link href="/catalogo" className="btn-primary">Explorar colección</Link>
        <Link href="#historia" className="btn-secondary">Nuestra historia</Link>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1 }}
        className="flex gap-10 mt-14 pt-8 border-t border-wool-cream/10">
        {[['12+','Años de oficio'],['340+','Diseños únicos'],['4 800+','Clientes felices']].map(([n,l]) => (
          <div key={l} className="text-center">
            <div className="font-display text-3xl text-inca-gold">{n}</div>
            <div className="text-wool-cream/35 text-[10px] tracking-[2px] uppercase mt-1">{l}</div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
