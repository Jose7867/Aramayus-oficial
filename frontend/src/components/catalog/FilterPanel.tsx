'use client'
import { useState } from 'react'
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react'
import { CATEGORIES, SIZES, BRAND_COLORS } from '@constants/index'

const TEJIDOS = ['Algodón Pima', 'Alpaca', 'Lana', 'Mezcla', 'Lino']
const ESTAMPADOS = ['Liso', 'Geométrico', 'Andino', 'Rayas', 'Cuadros']
const PESOS = ['Ligero', 'Medio', 'Pesado']

function Accordion({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-gray-100 py-3">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center text-left">
        <span className="text-[11px] tracking-widest uppercase font-semibold text-gray-700">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  )
}

export function FilterPanel() {
  const [cats, setCats]         = useState<string[]>([])
  const [colors, setColors]     = useState<string[]>([])
  const [sizes, setSizes]       = useState<string[]>([])
  const [tejidos, setTejidos]   = useState<string[]>([])
  const [estampados, setEstampados] = useState<string[]>([])
  const [pesos, setPesos]       = useState<string[]>([])
  const [priceMax, setPriceMax] = useState(500)

  const toggle = <T,>(arr: T[], val: T, set: (a: T[]) => void) =>
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val])

  const clearAll = () => { 
    setCats([]); setColors([]); setSizes([]); setTejidos([]); setEstampados([]); setPesos([]); setPriceMax(500); 
  }

  const CheckboxList = ({ items, selected, setter }: { items: string[], selected: string[], setter: (a: string[]) => void }) => (
    <div className="space-y-2">
      {items.map((item) => (
        <label key={item} className="flex items-center gap-2 cursor-pointer group">
          <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selected.includes(item) ? 'bg-inca-gold border-inca-gold' : 'border-gray-300 group-hover:border-inca-gold'}`}>
            {selected.includes(item) && <X className="w-3 h-3 text-andean-black" />}
          </div>
          <span className="text-sm text-gray-600">{item}</span>
        </label>
      ))}
    </div>
  )

  return (
    <aside className="w-64 flex-shrink-0 bg-white">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <span className="flex items-center gap-2 text-sm font-display uppercase tracking-widest text-andean-black"><SlidersHorizontal className="w-4 h-4" /> Filtros</span>
        <button onClick={clearAll} className="text-xs text-gray-400 hover:text-inca-gold transition-colors">Limpiar</button>
      </div>

      <div className="mt-2">
        <Accordion title="Compra por producto" defaultOpen>
          <div className="space-y-2">
            {CATEGORIES.map((c) => (
              <a key={c} href={`/catalogo?category=${c}`} 
                className={`block text-sm transition-colors ${cats.includes(c) ? 'font-semibold text-inca-gold' : 'text-gray-600 hover:text-inca-gold'}`}>
                {c}
              </a>
            ))}
          </div>
        </Accordion>

        <Accordion title="Tejido" defaultOpen>
          <CheckboxList items={TEJIDOS} selected={tejidos} setter={(val) => toggle(tejidos, val as any, setTejidos as any)} />
        </Accordion>

        <Accordion title="Color">
          <div className="flex flex-wrap gap-2">
            {Object.values(BRAND_COLORS).map((hex) => (
              <button key={hex} onClick={() => toggle(colors, hex, setColors)}
                className={`w-6 h-6 rounded-full border-2 transition-all ${colors.includes(hex) ? 'border-inca-gold scale-110 shadow-sm' : 'border-transparent hover:scale-110'}`}
                style={{ background: hex, boxShadow: colors.includes(hex) ? '0 0 0 1px white inset' : 'none' }} 
                title="Color" />
            ))}
          </div>
        </Accordion>

        <Accordion title="Estampado">
          <CheckboxList items={ESTAMPADOS} selected={estampados} setter={(val) => toggle(estampados, val as any, setEstampados as any)} />
        </Accordion>
        
        <Accordion title="Talla">
          <div className="flex flex-wrap gap-2">
            {SIZES.map((s) => (
              <button key={s} onClick={() => toggle(sizes, s, setSizes)}
                className={`text-[11px] px-3 py-1.5 border transition-all ${sizes.includes(s) ? 'bg-inca-gold text-andean-black border-inca-gold font-semibold' : 'border-gray-200 text-gray-500 hover:border-inca-gold'}`}>
                {s}
              </button>
            ))}
          </div>
        </Accordion>

        <Accordion title="Peso / Gramaje">
          <CheckboxList items={PESOS} selected={pesos} setter={(val) => toggle(pesos, val as any, setPesos as any)} />
        </Accordion>

        <Accordion title="Precio">
          <p className="text-sm text-gray-600 mb-3">Hasta: S/ {priceMax}</p>
          <input type="range" min={0} max={500} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))}
            className="w-full accent-inca-gold h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
        </Accordion>
      </div>

      <button className="btn-dark w-full text-center mt-6 py-3 font-semibold uppercase tracking-widest text-xs">
        Ver Resultados
      </button>
    </aside>
  )
}
