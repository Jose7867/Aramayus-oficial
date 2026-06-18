import { Info, Save, Image as ImageIcon, LayoutTemplate } from 'lucide-react'

export const metadata = { title: 'Admin — Nosotros' }

export default function NosotrosAdminPage() {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-display text-andean-black flex items-center gap-2">
          <LayoutTemplate className="w-6 h-6 text-inca-gold" />
          Página Nosotros
        </h1>
        <p className="text-sm text-gray-500 mt-1">Gestiona la información, misión, visión y valores de la marca.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Contenido Principal */}
          <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-andean-black mb-4 uppercase tracking-widest border-b border-gray-100 pb-2">Contenido Principal</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Título de la sección</label>
                <input type="text" defaultValue="Nuestra historia" className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Subtítulo (Opcional)</label>
                <input type="text" defaultValue="Tejiendo cultura desde 1990" className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Historia / Descripción</label>
                <textarea rows={6} defaultValue="Prendas artesanales únicas, elaboradas por manos peruanas con técnicas ancestrales transmitidas de generación en generación." className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold transition-all resize-none"></textarea>
              </div>
            </div>
          </div>

          {/* Misión y Visión */}
          <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-andean-black mb-4 uppercase tracking-widest border-b border-gray-100 pb-2">Misión y Visión</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Misión</label>
                <textarea rows={5} defaultValue="Preservar y revalorar el arte textil andino creando prendas de alta calidad que conecten nuestra herencia cultural con el mundo moderno." className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold transition-all resize-none"></textarea>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Visión</label>
                <textarea rows={5} defaultValue="Ser la marca referente a nivel global en moda ética y sostenible inspirada en la cosmovisión andina." className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold transition-all resize-none"></textarea>
              </div>
            </div>
          </div>
          
          {/* Valores */}
          <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-andean-black mb-4 uppercase tracking-widest border-b border-gray-100 pb-2">Valores de la Marca</h2>
            <div className="space-y-4">
              {['Autenticidad', 'Sostenibilidad', 'Comercio Justo'].map((valor, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <input type="text" defaultValue={valor} className="w-full sm:w-1/3 px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold" />
                  <input type="text" defaultValue="Nuestras prendas respetan a la comunidad y al medio ambiente..." className="w-full sm:w-2/3 px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold text-gray-600" />
                  <button className="text-xs text-wiphala-red hover:underline font-medium shrink-0">Eliminar</button>
                </div>
              ))}
              <button className="text-xs text-inca-gold font-medium hover:underline flex items-center gap-1">+ Añadir Valor</button>
            </div>
          </div>
        </div>

        {/* Sidebar Derecha */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm sticky top-24">
            <h2 className="text-sm font-semibold text-andean-black mb-4 uppercase tracking-widest border-b border-gray-100 pb-2">Imagen Principal</h2>
            <div className="border-2 border-dashed border-gray-200 rounded-sm p-8 text-center hover:border-inca-gold transition-colors cursor-pointer group bg-stone-50">
              <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-inca-gold transition-colors" />
              <p className="text-xs text-gray-500 font-medium">Haz clic para subir una imagen</p>
              <p className="text-[10px] text-gray-400 mt-1">JPG, PNG o WEBP (Max. 2MB)</p>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-medium text-gray-700 mb-1">O usar URL de imagen</label>
              <input type="text" placeholder="https://..." className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold transition-colors" />
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-3">
              <button type="button" className="w-full bg-andean-black text-white py-3 rounded-sm text-xs tracking-widest uppercase hover:bg-inca-gold transition-colors flex items-center justify-center gap-2 font-semibold shadow-sm">
                <Save className="w-4 h-4" />
                Guardar Cambios
              </button>
              <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1">
                <Info className="w-3 h-3" /> Los cambios se reflejarán en la web.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
