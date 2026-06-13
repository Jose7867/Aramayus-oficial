import Link from 'next/link'
import { Instagram, Facebook, Mail, Phone, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#0D0500]">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="font-display text-2xl text-inca-gold italic mb-2">Aramayus Art</div>
          <p className="text-wool-cream/40 text-xs leading-relaxed mb-4">
            Textil artesanal peruana con identidad andina y calidad de exportación.
          </p>
          <div className="flex gap-3">
            {[Instagram, Facebook, Mail, Phone, MessageCircle].map((Icon, i) => (
              <div key={i} className="w-8 h-8 border border-wool-cream/15 flex items-center justify-center text-wool-cream/40 hover:border-inca-gold hover:text-inca-gold transition-all cursor-pointer rounded-sm">
                <Icon className="w-4 h-4" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-wool-cream/30 text-[10px] tracking-[2px] uppercase mb-4">Navegación</h4>
          <ul className="space-y-2">
            {['Inicio','Catálogo','Nosotros','Probador Virtual','Contacto'].map((item) => (
              <li key={item}><Link href="#" className="text-wool-cream/60 text-sm hover:text-inca-gold transition-colors">{item}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-wool-cream/30 text-[10px] tracking-[2px] uppercase mb-4">Información</h4>
          <ul className="space-y-2">
            {['Nuestra Historia','Política de Privacidad','Términos y Condiciones','Devoluciones','Envíos'].map((item) => (
              <li key={item}><Link href="#" className="text-wool-cream/60 text-sm hover:text-inca-gold transition-colors">{item}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-wool-cream/30 text-[10px] tracking-[2px] uppercase mb-4">Contacto</h4>
          <ul className="space-y-2 text-wool-cream/50 text-sm">
            <li>Cusco, Perú</li>
            <li>+51 984 000 000</li>
            <li>hola@aramayusart.com</li>
            <li className="text-wool-cream/30 text-xs mt-2">Lun–Sab: 9am – 7pm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-wool-cream/5 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="text-wool-cream/20 text-xs">© 2025 Aramayus Art · Todos los derechos reservados</span>
          <span className="text-wool-cream/15 text-xs">Hecho con orgullo en Perú</span>
        </div>
      </div>
    </footer>
  )
}
