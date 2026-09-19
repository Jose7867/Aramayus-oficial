import React from 'react';

export const metadata = {
  title: 'Política de Privacidad | Aramayus Art',
  description: 'Política de Privacidad de Aramayus Art.',
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#0D0500] min-h-screen text-wool-cream pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-display text-4xl text-inca-gold mb-8 text-center">Política de Privacidad</h1>
        
        <div className="space-y-8 text-wool-cream/80 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl text-inca-gold mb-4 font-display">1. Información que Recopilamos</h2>
            <p>
              En Aramayus Art, nos comprometemos a proteger su privacidad. Recopilamos información 
              personal que usted nos proporciona voluntariamente, como su nombre, dirección de correo 
              electrónico, dirección de envío y detalles de pago cuando realiza una compra o se suscribe 
              a nuestro boletín informativo.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-inca-gold mb-4 font-display">2. Uso de la Información</h2>
            <p>
              Utilizamos la información recopilada para procesar y enviar sus pedidos, comunicarnos con 
              usted sobre su compra, mejorar nuestros servicios y, si ha dado su consentimiento, enviarle 
              actualizaciones promocionales sobre nuestros productos artesanales.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-inca-gold mb-4 font-display">3. Protección de Datos</h2>
            <p>
              Implementamos medidas de seguridad estándar de la industria para proteger su información 
              personal contra acceso no autorizado, alteración, divulgación o destrucción. Sus datos de 
              pago se procesan a través de pasarelas seguras y no almacenamos información de tarjetas 
              de crédito en nuestros servidores.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-inca-gold mb-4 font-display">4. Compartir Información</h2>
            <p>
              No vendemos, intercambiamos ni transferimos a terceros su información personal identificable. 
              Esto no incluye a terceros de confianza que nos asisten en la operación de nuestro sitio web, 
              la realización de nuestro negocio o el servicio a usted, siempre y cuando dichas partes 
              acuerden mantener esta información confidencial.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-inca-gold mb-4 font-display">5. Sus Derechos</h2>
            <p>
              Usted tiene derecho a acceder, corregir o eliminar su información personal en cualquier 
              momento. Si desea ejercer estos derechos o tiene preguntas sobre nuestra Política de 
              Privacidad, contáctenos a hola@aramayusart.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
