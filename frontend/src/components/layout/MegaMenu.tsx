'use client'
import { useState } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'

import { MAIN_CATEGORIES, SECONDARY_LINKS, PANELS } from '@constants/megamenu'

// ─── Componente ──────────────────────────────────────────────────────────────
interface MegaMenuProps {
  onClose: () => void
}

export function MegaMenu({ onClose }: MegaMenuProps) {
  const [activePanelId, setActivePanelId] = useState<string>('ropa')

  const activePanel = PANELS.find((p) => p.id === activePanelId)

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Contenedor del menú */}
      <nav className="relative z-10 flex h-full max-h-[540px] w-full max-w-5xl shadow-2xl bg-white">

        {/* Columna 1 — Categorías principales */}
        <div className="w-52 flex-shrink-0 border-r border-gray-100 py-5 flex flex-col">
          <button onClick={onClose} className="flex items-center justify-center w-7 h-7 mx-4 mb-4 border border-gray-200 rounded hover:border-inca-gold transition-colors">
            <X className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {MAIN_CATEGORIES.map(({ label, panelId }) => (
            <button
              key={label}
              onMouseEnter={() => setActivePanelId(panelId)}
              onClick={() => setActivePanelId(panelId)}
              className={`text-left px-5 py-2.5 text-sm transition-all border-l-2 ${
                activePanelId === panelId
                  ? 'font-semibold text-andean-black border-inca-gold bg-stone-50'
                  : 'text-gray-500 border-transparent hover:text-andean-black hover:border-inca-gold/50'
              }`}
            >
              {label}
            </button>
          ))}

          <div className="mt-auto px-5 pb-2 flex flex-col gap-1.5">
            {SECONDARY_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className="text-xs text-gray-400 hover:text-inca-gold transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Columna 2 — Subcategorías */}
        {activePanel && (
          <div className="w-52 flex-shrink-0 border-r border-gray-100 py-5 overflow-y-auto">
            <p className="text-[10px] tracking-widest uppercase text-gray-400 font-semibold px-5 mb-3">
              {activePanel.subHeading}
            </p>

            <div className="flex flex-col">
              {activePanel.subcategories.map(({ label, href, highlight }) => (
                <a
                  key={label}
                  href={href}
                  className={`px-5 py-2 text-sm transition-colors ${
                    highlight
                      ? 'font-semibold text-andean-black'
                      : 'text-gray-500 hover:text-inca-gold'
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Lookbook opcional */}
            {activePanel.lookbook && (
              <div className="mx-4 mt-5 rounded overflow-hidden cursor-pointer group">
                <div className="relative w-full h-28">
                  <Image
                    src={activePanel.lookbook.image}
                    alt={activePanel.lookbook.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                    <p className="text-[10px] text-white/90 tracking-wider uppercase">
                      {activePanel.lookbook.label}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Columna 3 — Fotos + colecciones */}
        {activePanel && (
          <div className="flex-1 py-5 px-6 overflow-y-auto">
            <p className="text-sm font-semibold text-andean-black mb-4">
              {activePanel.sectionTitle}
            </p>

            {/* Grid de fotos */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {activePanel.photos.map(({ label, image, href }) => (
                <a key={label} href={href} className="group">
                  <div className="relative w-full aspect-[3/4] rounded overflow-hidden bg-stone-100">
                    <Image
                      src={image}
                      alt={label}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500 group-hover:text-inca-gold transition-colors">
                    {label}
                  </p>
                </a>
              ))}
            </div>

            {/* Colecciones */}
            {activePanel.collectionsTitle && activePanel.collections && (
              <>
                <div className="h-px bg-gray-100 mb-4" />
                <p className="text-sm font-semibold text-andean-black mb-3">
                  {activePanel.collectionsTitle}
                </p>
                <div className="flex flex-col gap-2">
                  {activePanel.collections.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="text-sm text-gray-500 hover:text-inca-gold transition-colors"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  )
}