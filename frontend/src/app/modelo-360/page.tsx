import dynamic from "next/dynamic";

const Viewer360 = dynamic(
  () => import("@components/product/Viewer360").then((mod) => mod.Viewer360),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center animate-pulse">
        Cargando visor 360...
      </div>
    ),
  },
);

export const metadata = {
  title: "Vista 360° — Milano | Aramayus Art",
  description:
    "Explora el modelo Milano en 360°. Arrastra para girar y observar cada ángulo.",
};

export default function Modelo360Page() {
  return (
    <main className="min-h-screen bg-wool-cream pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-xs text-inca-gold tracking-[0.25em] uppercase mb-2 font-medium">
            Visor interactivo
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-andean-black mb-3">
            Milano — Vista 360°
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Mantén presionado y arrastra horizontalmente para girar la modelo y
            observar la prenda desde todos los ángulos.
          </p>
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Viewer — takes 60% on desktop */}
          <div className="w-full lg:w-[60%]">
            <Viewer360
              videoSrc="/images/products/Milano/rotacion-360.mp4"
              fullRotationPx={500}
              aspectRatio="aspect-[3/4]"
            />
          </div>

          {/* Info panel */}
          <div className="w-full lg:w-[40%] space-y-6 lg:pt-4">
            {/* Product name */}
            <div>
              <h2 className="font-display text-2xl text-andean-black mb-1">
                Milano
              </h2>
              <p className="text-sm text-gray-500">
                Colección Andina · Temporada 2026
              </p>
            </div>

            {/* Instructions card */}
            <div className="bg-white border border-gray-100 rounded-sm p-5 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-andean-black mb-3">
                Cómo usar el visor
              </h3>
              {[
                {
                  icon: "🖱️",
                  label: "Haz clic y arrastra →",
                  desc: "Gira la modelo",
                },
                {
                  icon: "📱",
                  label: "Desliza con el dedo",
                  desc: "Compatible con táctil",
                },
                {
                  icon: "🔄",
                  label: "Rota 360°",
                  desc: "Sin límites de vuelta",
                },
                {
                  icon: "🔁",
                  label: "Botón ↺",
                  desc: "Restablece la vista inicial",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 text-sm"
                >
                  <span className="text-lg leading-none">{item.icon}</span>
                  <div>
                    <span className="font-medium text-andean-black">
                      {item.label}
                    </span>
                    <span className="text-gray-500 ml-1">— {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="/catalogo"
              className="btn-primary w-full text-center block"
            >
              Ver catálogo completo
            </a>
            <a
              href="/probador"
              className="w-full text-center block text-sm text-gray-500 hover:text-andean-black transition-colors py-2 underline underline-offset-2"
            >
              Ir al probador virtual
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
