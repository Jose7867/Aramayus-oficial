'use client'
import { useState } from 'react'
import { AVATAR_TYPES, BRAND_COLORS } from '@constants/index'

type Cuello = 'V' | 'Redondo' | 'Tortuga'
type Mangas = 'Larga' | 'Corta' | 'Sin Mangas'
type Tejido = 'Alpaca' | 'Algodón Pima' | 'Lana' | 'Lino'

export function VirtualFittingRoom() {
  const [tab, setTab] = useState(1)
  const [gender, setGender]       = useState<'F'|'M'>('F')
  const [cuello, setCuello]       = useState<Cuello>('V')
  const [mangas, setMangas]       = useState<Mangas>('Larga')
  const [tejido, setTejido]       = useState<Tejido>('Alpaca')
  const [color, setColor]         = useState('#C8860A')
  const [avatarId, setAvatarId]   = useState('f2')
  const [size, setSize]           = useState('M')

  const avatars = AVATAR_TYPES.filter((a) => a.gender === gender)

  // SVG paths for Cuello
  const cuelloPath = cuello === 'V' 
    ? "M 75 70 L 90 95 L 105 70" 
    : cuello === 'Redondo'
    ? "M 75 70 Q 90 85 105 70"
    : "M 75 70 L 75 55 L 105 55 L 105 70"

  return (
    <div className="min-h-screen bg-andean-black text-wool-cream">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-10 items-start">
        
        {/* Panel Izquierdo — Controles */}
        <div className="w-full md:w-1/2 space-y-6">
          <div>
            <p className="text-inca-gold text-[10px] tracking-widest uppercase mb-1">Diseñador 3D</p>
            <h1 className="font-display text-4xl">Crea tu prenda a medida</h1>
          </div>

          {/* TABS */}
          <div className="flex border-b border-wool-cream/10">
            {['1. Estilo', '2. Tejido', '3. Medidas'].map((t, i) => (
              <button key={t} onClick={() => setTab(i+1)}
                className={`px-6 py-3 text-sm font-medium transition-all border-b-2 ${tab === i+1 ? 'border-inca-gold text-inca-gold' : 'border-transparent text-wool-cream/50 hover:text-wool-cream'}`}>
                {t}
              </button>
            ))}
          </div>

          {/* TAB 1: ESTILO */}
          {tab === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
              <div>
                <p className="text-wool-cream/40 text-[10px] tracking-widest uppercase mb-3">Tipo de Cuello</p>
                <div className="grid grid-cols-3 gap-3">
                  {(['V', 'Redondo', 'Tortuga'] as Cuello[]).map(c => (
                    <button key={c} onClick={() => setCuello(c)}
                      className={`p-3 border rounded-sm text-sm transition-all ${cuello === c ? 'bg-inca-gold/15 border-inca-gold text-inca-gold font-medium' : 'border-wool-cream/15 text-wool-cream/70 hover:border-wool-cream/40'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-wool-cream/40 text-[10px] tracking-widest uppercase mb-3">Longitud de Mangas</p>
                <div className="grid grid-cols-3 gap-3">
                  {(['Larga', 'Corta', 'Sin Mangas'] as Mangas[]).map(m => (
                    <button key={m} onClick={() => setMangas(m)}
                      className={`p-3 border rounded-sm text-sm transition-all ${mangas === m ? 'bg-inca-gold/15 border-inca-gold text-inca-gold font-medium' : 'border-wool-cream/15 text-wool-cream/70 hover:border-wool-cream/40'}`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TEJIDO */}
          {tab === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
              <div>
                <p className="text-wool-cream/40 text-[10px] tracking-widest uppercase mb-3">Material</p>
                <div className="grid grid-cols-2 gap-3">
                  {(['Alpaca', 'Algodón Pima', 'Lana', 'Lino'] as Tejido[]).map(t => (
                    <button key={t} onClick={() => setTejido(t)}
                      className={`p-3 border rounded-sm text-left transition-all ${tejido === t ? 'border-inca-gold bg-inca-gold/10' : 'border-wool-cream/10 hover:border-wool-cream/25'}`}>
                      <p className={`text-sm font-medium ${tejido === t ? 'text-inca-gold' : 'text-wool-cream'}`}>{t}</p>
                      <p className="text-wool-cream/40 text-[10px] mt-1">Calidad Premium</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-wool-cream/40 text-[10px] tracking-widest uppercase mb-3">Color de prenda</p>
                <div className="flex flex-wrap gap-4">
                  {Object.values(BRAND_COLORS).map((hex) => (
                    <button key={hex} onClick={() => setColor(hex)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${color === hex ? 'border-inca-gold scale-125' : 'border-transparent hover:scale-110'}`}
                      style={{ background: hex, boxShadow: color === hex ? '0 0 0 2px rgba(245,240,232,0.1) inset' : 'none' }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MEDIDAS */}
          {tab === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
              <div>
                <p className="text-wool-cream/40 text-[10px] tracking-widest uppercase mb-3">Tipo de modelo</p>
                <div className="flex gap-2">
                  {(['F','M'] as const).map((g) => (
                    <button key={g} onClick={() => setGender(g)}
                      className={`px-5 py-2 border rounded-sm text-sm transition-all ${gender === g ? 'bg-inca-gold/15 border-inca-gold text-inca-gold' : 'border-wool-cream/15 text-wool-cream/50 hover:border-wool-cream/30'}`}>
                      {g === 'F' ? 'Femenino' : 'Masculino'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-wool-cream/40 text-[10px] tracking-widest uppercase mb-3">Complexión (Avatar)</p>
                <div className="grid grid-cols-2 gap-3">
                  {avatars.map((av) => (
                    <button key={av.id} onClick={() => setAvatarId(av.id)}
                      className={`p-3 border rounded-sm text-left transition-all ${avatarId === av.id ? 'border-inca-gold bg-inca-gold/10' : 'border-wool-cream/10 hover:border-wool-cream/25'}`}>
                      <p className="text-wool-cream/90 text-xs font-medium">{av.label.split('—')[1]?.trim()}</p>
                      <p className="text-wool-cream/40 text-[10px] mt-0.5">{av.height} cm · {av.weight} kg</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-wool-cream/40 text-[10px] tracking-widest uppercase mb-3">Talla de prenda</p>
                <div className="flex gap-2">
                  {['XS','S','M','L','XL','XXL'].map((s) => (
                    <button key={s} onClick={() => setSize(s)}
                      className={`w-10 h-10 border rounded-sm text-sm transition-all ${size === s ? 'bg-inca-gold text-andean-black border-inca-gold font-bold' : 'border-wool-cream/15 text-wool-cream/50 hover:border-inca-gold'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
        </div>

        {/* Panel Derecho — Vista Previa Interactiva */}
        <div className="w-full md:w-1/2 flex justify-center sticky top-8">
          <div className="bg-[#1C1C1C] border border-wool-cream/5 rounded-lg p-10 w-full max-w-md flex flex-col items-center relative overflow-hidden">
            
            <div className="absolute top-4 left-4 text-[10px] text-wool-cream/30 uppercase tracking-[2px]">Previsualización en tiempo real</div>
            
            <svg width="240" height="340" viewBox="0 0 180 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-8 transition-all duration-500">
              {/* Cabeza / Avatar (transparente) */}
              <circle cx="90" cy="46" r="32" fill="rgba(245,240,232,0.05)" stroke="rgba(245,240,232,0.15)" strokeWidth="1"/>
              
              {/* Torso Prenda */}
              <path d="M40 90 Q40 70 90 70 Q140 70 140 90 L134 182 Q134 200 90 200 Q46 200 46 182Z"
                fill={color} stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" className="transition-all duration-300"/>
                
              {/* Mangas */}
              {mangas === 'Larga' && (
                <>
                  <path d="M40 98 L18 162" stroke={color} strokeWidth="18" strokeLinecap="round" className="transition-all duration-300"/>
                  <path d="M140 98 L162 162" stroke={color} strokeWidth="18" strokeLinecap="round" className="transition-all duration-300"/>
                </>
              )}
              {mangas === 'Corta' && (
                <>
                  <path d="M40 98 L30 120" stroke={color} strokeWidth="18" strokeLinecap="round" className="transition-all duration-300"/>
                  <path d="M140 98 L150 120" stroke={color} strokeWidth="18" strokeLinecap="round" className="transition-all duration-300"/>
                </>
              )}

              {/* Piernas Avatar */}
              <path d="M46 182 L35 250 M134 182 L145 250" stroke="rgba(245,240,232,0.1)" strokeWidth="12" strokeLinecap="round"/>
              
              {/* Detalles Tejido (textura simulada ligera) */}
              <path d="M50 124 Q90 115 130 124" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
              <path d="M48 142 Q90 135 132 142" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
              
              {/* Cuello Corte (mask/overlay) */}
              <path d={cuelloPath} fill="#1C1C1C" stroke="rgba(245,240,232,0.1)" strokeWidth="1.5" className="transition-all duration-300"/>
            </svg>

            {/* Resumen */}
            <div className="mt-8 pt-6 border-t border-wool-cream/10 w-full text-center space-y-1">
              <p className="text-inca-gold font-display text-xl">{tejido} · {color}</p>
              <p className="text-wool-cream/60 text-sm">Cuello {cuello} — Manga {mangas}</p>
              <p className="text-wool-cream/40 text-xs">Talla ajustada a {size} ({gender})</p>
            </div>
            
            <button className="btn-primary w-full mt-6">Añadir al Carrito — S/ 250</button>
          </div>
        </div>
      </div>
    </div>
  )
}
