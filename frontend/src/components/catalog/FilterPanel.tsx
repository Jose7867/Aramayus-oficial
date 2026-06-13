'use client'
import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { CATEGORIES, SIZES, BRAND_COLORS } from '@constants/index'

export function FilterPanel() {
  const [cats, setCats]         = useState<string[]>([])
  const [colors, setColors]     = useState<string[]>([])
  const [sizes, setSizes]       = useState<string[]>([])
  const [priceMax, setPriceMax] = useState(500)
  const [onPromo, setOnPromo]   = useState(false)
  const [featured, setFeatured] = useState(false)

  const toggle = <T,>(arr: T[], val: T, set: (a: T[]) => void) =>
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val])

  const clearAll = () => { setCats([]); setColors([]); setSizes([]); setPriceMax(500); setOnPromo(false); setFeatured(false) }

  return (
    <aside className="w-56 flex-shrink-0 space-y-5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium"><SlidersHorizontal className="w-4 h-4" />Filtros</span>
        <button onClick={clearAll} className="text-xs text-gray-400 hover:text-wiphala-red transition-colors flex items-center gap-1"><X className="w-3 h-3"/>Limpiar</button>
      </div>

      {/* Categoría */}
      <div>
        <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-2">Categoría</p>
        {CATEGORIES.map((c) => (
          <label key={c} className="flex items-center gap-2 mb-1.5 cursor-pointer">
            <input type="checkbox" checked={cats.includes(c)} onChange={() => toggle(cats, c, setCats)}
              className="accent-inca-gold w-3.5 h-3.5" />
            <span className="text-sm">{c}</span>
          </label>
        ))}
      </div>

      {/* Precio */}
      <div>
        <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-2">Precio máximo: S/ {priceMax}</p>
        <input type="range" min={0} max={500} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-inca-gold" />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>S/ 0</span><span>S/ 500</span></div>
      </div>

      {/* Color */}
      <div>
        <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-2">Color</p>
        <div className="flex flex-wrap gap-2">
          {Object.values(BRAND_COLORS).map((hex) => (
            <div key={hex} onClick={() => toggle(colors, hex, setColors)}
              className={`w-5 h-5 rounded-full cursor-pointer border-2 transition-all ${colors.includes(hex) ? 'border-inca-gold scale-110' : 'border-transparent'}`}
              style={{ background: hex }} />
          ))}
        </div>
      </div>

      {/* Talla */}
      <div>
        <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-2">Talla</p>
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map((s) => (
            <button key={s} onClick={() => toggle(sizes, s, setSizes)}
              className={`text-[10px] px-2.5 py-1 border rounded-sm transition-all ${sizes.includes(s) ? 'bg-inca-gold text-andean-black border-inca-gold font-semibold' : 'border-gray-200 text-gray-500 hover:border-inca-gold'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Estado */}
      <div>
        <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-2">Estado</p>
        {[['En promoción', onPromo, setOnPromo],['Destacados', featured, setFeatured]].map(([label, val, set]) => (
          <label key={label as string} className="flex items-center gap-2 mb-1.5 cursor-pointer">
            <input type="checkbox" checked={val as boolean} onChange={() => (set as (v: boolean) => void)(!val as boolean)}
              className="accent-inca-gold w-3.5 h-3.5" />
            <span className="text-sm">{label as string}</span>
          </label>
        ))}
      </div>

      <button className="btn-dark w-full text-center">Aplicar filtros</button>
    </aside>
  )
}
