import React from 'react';

export const metadata = {
  title: 'Términos y Condiciones | Aramayus Art',
  description: 'Términos y Condiciones de uso de Aramayus Art.',
};

export default function TermsAndConditions() {
  return (
    <div className="bg-[#0D0500] min-h-screen text-wool-cream pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-display text-4xl text-inca-gold mb-8 text-center">Términos y Condiciones</h1>
        
        <div className="space-y-8 text-wool-cream/80 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl text-inca-gold mb-4 font-display">1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar el sitio web de Aramayus Art, usted acepta estar sujeto a estos 
              Términos y Condiciones y a todas las leyes y regulaciones aplicables. Si no está de acuerdo 
              con alguno de estos términos, le rogamos no utilice nuestro sitio.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-inca-gold mb-4 font-display">2. Propiedad Intelectual</h2>
            <p>
              Todo el contenido presente en este sitio, incluyendo pero no limitado a diseños textiles, 
              imágenes, textos, logotipos y gráficos, es propiedad de Aramayus Art y está protegido por 
              las leyes de propiedad intelectual internacionales y de Perú.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-inca-gold mb-4 font-display">3. Productos y Precios</h2>
            <p>
              Nos esforzamos por mostrar con precisión los colores y detalles de nuestros productos 
              artesanales. Sin embargo, al ser productos hechos a mano, pueden existir ligeras 
              variaciones. Todos los precios están sujetos a cambios sin previo aviso.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-inca-gold mb-4 font-display">4. Envíos y Devoluciones</h2>
            <p>
              Consulte nuestra sección específica de Envíos y Devoluciones para conocer los detalles 
              sobre tiempos de entrega, costos y políticas de cambio. Nos reservamos el derecho de 
              rechazar cualquier pedido por cualquier motivo.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-inca-gold mb-4 font-display">5. Limitación de Responsabilidad</h2>
            <p>
              Aramayus Art no será responsable de ningún daño directo, indirecto, incidental o 
              consecuente que resulte del uso o la imposibilidad de usar nuestros productos o 
              servicios.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
