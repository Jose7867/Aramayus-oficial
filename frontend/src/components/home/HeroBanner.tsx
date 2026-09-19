import Image from 'next/image'
import Link from 'next/link'

export function HeroBanner() {
  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden bg-andean-black">
      {/* Premium Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/imagenart.jpg"
          alt="Aramayus Art - Textil Artesanal Andino"
          fill
          priority
          className="object-cover opacity-40 mix-blend-overlay"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-andean-black/60 via-andean-black/80 to-andean-black" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <p className="text-inca-gold text-[11px] tracking-[4px] uppercase mb-6 animate-fade-in">
          Colección 2025 · Tejido a mano en los Andes
        </p>

        <h1 className="font-display text-5xl md:text-7xl text-wool-cream leading-[1.05] mb-6 max-w-3xl animate-slide-up" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
          Arte que viste,<br /><em className="text-inca-gold">alma que perdura</em>
        </h1>

        <p className="text-wool-cream/70 text-base md:text-lg max-w-lg mb-10 leading-relaxed font-light animate-slide-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
          Prendas artesanales únicas, elaboradas por manos peruanas con técnicas ancestrales transmitidas de generación en generación.
        </p>

        <div className="flex flex-wrap gap-4 justify-center animate-slide-up" style={{ animationDelay: '450ms', animationFillMode: 'both' }}>
          <Link href="/catalogo" className="btn-primary shadow-lg shadow-inca-gold/20">Explorar colección</Link>
          <Link href="#historia" className="btn-secondary backdrop-blur-sm bg-white/5">Nuestra historia</Link>
        </div>

        {/* Stats */}
        <div className="flex gap-10 mt-14 pt-8 border-t border-white/10 animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
          {[['12+','Años de oficio'],['340+','Diseños únicos'],['4 800+','Clientes felices']].map(([n,l]) => (
            <div key={l} className="text-center">
              <div className="font-display text-3xl text-inca-gold">{n}</div>
              <div className="text-wool-cream/50 text-[10px] tracking-[2px] uppercase mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
