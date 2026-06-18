'use client'
import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { MAIN_CATEGORIES, PANELS } from '@constants/megamenu'
import { ChevronRight, SlidersHorizontal } from 'lucide-react'

// Quitamos "Destacados" para evitar el duplicado con "Ropa"
const SIDEBAR_CATEGORIES = MAIN_CATEGORIES.filter((c) => c.label !== 'Destacados')

export function SidebarMegaMenu() {
  const [activePanelId, setActivePanelId] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const activePanel = PANELS.find((p) => p.id === activePanelId)

  // Cancela cualquier cierre pendiente cuando el cursor vuelve al contenedor
  const handleMouseEnterContainer = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  // Cierra el fly-out con un pequeño delay para que el cursor tenga tiempo de llegar
  const handleMouseLeaveContainer = useCallback(() => {
    closeTimer.current = setTimeout(() => setActivePanelId(null), 120)
  }, [])

  return (
    <aside
      className="w-64 flex-shrink-0 relative"
      onMouseEnter={handleMouseEnterContainer}
      onMouseLeave={handleMouseLeaveContainer}
    >
      {/* Panel principal */}
      <div className="bg-white border border-gray-200 rounded-sm py-4 sticky top-24">
        <div className="flex items-center gap-2 px-5 pb-4 border-b border-gray-100 mb-2">
          <SlidersHorizontal className="w-4 h-4 text-andean-black" />
          <h3 className="text-sm font-display uppercase tracking-widest text-andean-black">
            Filtros
          </h3>
        </div>

        <div className="flex flex-col">
          {SIDEBAR_CATEGORIES.map(({ label, panelId }) => (
            <button
              key={label}
              onMouseEnter={() => {
                if (closeTimer.current) clearTimeout(closeTimer.current)
                setActivePanelId(panelId)
              }}
              className={`flex items-center justify-between px-5 py-3 text-sm transition-all border-l-2 ${
                activePanelId === panelId
                  ? 'font-semibold text-andean-black border-inca-gold bg-stone-50'
                  : 'text-gray-600 border-transparent hover:text-andean-black hover:border-inca-gold/50 hover:bg-stone-50/50'
              }`}
            >
              {label}
              <ChevronRight
                className={`w-4 h-4 transition-transform ${
                  activePanelId === panelId ? 'text-inca-gold' : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Fly-out Panel — permanece abierto mientras el cursor esté dentro del aside */}
      {activePanel && (
        <div
          className="absolute left-[102%] top-0 z-40 flex max-h-[90vh] shadow-2xl bg-white border border-gray-100 rounded-sm overflow-hidden"
          style={{ minWidth: '560px' }}
        >
          {/* Columna 1 — Subcategorías */}
          <div className="w-52 flex-shrink-0 border-r border-gray-100 py-5 overflow-y-auto bg-white">
            <p className="text-[10px] tracking-widest uppercase text-gray-400 font-semibold px-5 mb-3">
              {activePanel.subHeading}
            </p>
            <div className="flex flex-col">
              {activePanel.subcategories.map(({ label, href, highlight }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setActivePanelId(null)}
                  className={`px-5 py-2.5 text-sm transition-colors ${
                    highlight
                      ? 'font-semibold text-andean-black hover:text-inca-gold'
                      : 'text-gray-500 hover:text-inca-gold'
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>

            {activePanel.lookbook && (
              <div className="mx-4 mt-6 rounded overflow-hidden cursor-pointer group">
                <div className="relative w-full h-32">
                  <Image
                    src={activePanel.lookbook.image}
                    alt={activePanel.lookbook.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-3">
                    <p className="text-[10px] text-white/90 tracking-wider uppercase">
                      {activePanel.lookbook.label}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Columna 2 — Fotos + Colecciones */}
          <div className="flex-1 py-5 px-5 overflow-y-auto bg-stone-50/40">
            <p className="text-sm font-semibold text-andean-black mb-4">
              {activePanel.sectionTitle}
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {activePanel.photos.map(({ label, image, href }) => (
                <a key={label} href={href} className="group" onClick={() => setActivePanelId(null)}>
                  <div className="relative w-full aspect-[3/4] rounded-sm overflow-hidden bg-stone-100 shadow-sm">
                    <Image
                      src={image}
                      alt={label}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="mt-2 text-xs font-medium text-gray-600 group-hover:text-inca-gold transition-colors">
                    {label}
                  </p>
                </a>
              ))}
            </div>

            {activePanel.collectionsTitle && activePanel.collections && (
              <>
                <div className="h-px bg-gray-200 mb-4" />
                <p className="text-sm font-semibold text-andean-black mb-3">
                  {activePanel.collectionsTitle}
                </p>
                <div className="flex flex-col gap-2">
                  {activePanel.collections.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      onClick={() => setActivePanelId(null)}
                      className="text-sm text-gray-500 hover:text-inca-gold transition-colors flex items-center gap-2"
                    >
                      <div className="w-1 h-1 rounded-full bg-inca-gold/50" />
                      {label}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </aside>
  )
}
