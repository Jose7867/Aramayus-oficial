import { Info } from 'lucide-react'

export const metadata = { title: 'Admin — Nosotros' }

export default function NosotrosAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display text-andean-black">Página Nosotros</h1>
        <p className="text-sm text-gray-500">Gestiona la información de la sección Nuestra Historia</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <form className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Título de la sección</label>
            <input type="text" defaultValue="Nuestra historia" className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Contenido principal</label>
            <textarea rows={6} defaultValue="Prendas artesanales únicas, elaboradas por manos peruanas con técnicas ancestrales transmitidas de generación en generación." className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold"></textarea>
          </div>
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button type="button" className="btn-primary flex items-center gap-2">
              <Info className="w-4 h-4" />
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
