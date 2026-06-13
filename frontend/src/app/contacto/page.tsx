import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export const metadata = { title: 'Contacto — Aramayus Art' }

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-warm-mid">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <p className="section-eyebrow">Estamos para ti</p>
          <h1 className="font-display text-4xl text-andean-black">Contacto</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulario */}
          <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
            <h2 className="text-2xl font-display mb-6">Envíanos un mensaje</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Nombre</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold" placeholder="Tu nombre" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Apellido</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold" placeholder="Tu apellido" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold" placeholder="tu@email.com" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Asunto</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold" placeholder="¿En qué podemos ayudarte?" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Mensaje</label>
                <textarea rows={5} className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold" placeholder="Escribe tu mensaje aquí..."></textarea>
              </div>
              <button type="button" className="btn-primary w-full">Enviar Mensaje</button>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-display mb-6">Información</h2>
              <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                ¿Tienes alguna duda sobre nuestras colecciones, envíos o quieres prendas a medida? Contáctanos y nuestro equipo te responderá lo antes posible.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-inca-gold/10 rounded-full flex items-center justify-center flex-shrink-0 text-inca-gold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Nuestra Tienda Principal</h3>
                  <p className="text-sm text-gray-600 mt-1">Av. El Sol 123, Centro Histórico<br/>Cusco, Perú</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-inca-gold/10 rounded-full flex items-center justify-center flex-shrink-0 text-inca-gold">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Teléfono</h3>
                  <p className="text-sm text-gray-600 mt-1">+51 984 000 000</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-inca-gold/10 rounded-full flex items-center justify-center flex-shrink-0 text-inca-gold">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Email</h3>
                  <p className="text-sm text-gray-600 mt-1">hola@aramayusart.com</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-inca-gold/10 rounded-full flex items-center justify-center flex-shrink-0 text-inca-gold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Horario de Atención</h3>
                  <p className="text-sm text-gray-600 mt-1">Lunes a Sábado: 9:00 am - 7:00 pm<br/>Domingos: Cerrado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
