const TESTIMONIALS = [
  { name:'María Ríos',   location:'Lima, Perú',    initials:'MR', color:'bg-red-50 text-wiphala-red',   text:'La chompa andina que compré es de una calidad excepcional. Se nota el amor y la técnica detrás de cada puntada.' },
  { name:'Jorge Castro', location:'Cusco, Perú',   initials:'JC', color:'bg-green-50 text-coca-green',  text:'El probador virtual es una maravilla. Pude elegir la talla perfecta sin necesidad de ir a la tienda.' },
  { name:'Sofía López',  location:'Madrid, España',initials:'SL', color:'bg-purple-50 text-textile-purple', text:'Recibí mi pedido perfectamente empacado. Los colores son exactamente como en las fotos. ¡Volveré a comprar!' },
  { name:'André Petit',  location:'París, Francia',initials:'AP', color:'bg-yellow-50 text-inca-gold',  text:'Compré una pieza para un regalo y el destinatario quedó emocionado. Arte peruano auténtico y de primera calidad.' },
]

export function Testimonials() {
  return (
    <section className="py-16 bg-wool-cream">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="section-eyebrow">Lo que dicen</p>
          <h2 className="font-display text-4xl">Clientes satisfechos</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="card p-6">
              <div className="text-inca-gold tracking-widest mb-3">★★★★★</div>
              <p className="font-display italic text-sm leading-relaxed text-gray-600 mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${t.color}`}>{t.initials}</div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
