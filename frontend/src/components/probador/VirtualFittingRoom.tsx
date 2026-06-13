'use client'
import { useState } from 'react'
import { AVATAR_TYPES, BRAND_COLORS } from '@constants/index'

export function VirtualFittingRoom() {
  const [avatarId, setAvatarId]   = useState('f2')
  const [gender, setGender]       = useState<'F'|'M'>('F')
  const [garmentColor, setColor]  = useState('#C8860A')
  const [size, setSize]           = useState('M')

  const avatars = AVATAR_TYPES.filter((a) => a.gender === gender)

  return (
    <div className="min-h-screen bg-andean-black">
      <div className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-start">

        {/* Panel izquierdo — controles */}
        <div className="space-y-6">
          <div>
            <p className="section-eyebrow">Probador Virtual</p>
            <h1 className="font-display text-4xl text-wool-cream">Encuentra tu talla perfecta</h1>
          </div>

          {/* Género */}
          <div>
            <p className="text-wool-cream/40 text-[10px] tracking-widest uppercase mb-2">Tipo de modelo</p>
            <div className="flex gap-2">
              {(['F','M'] as const).map((g) => (
                <button key={g} onClick={() => setGender(g)}
                  className={`px-5 py-2 border rounded-sm text-sm transition-all ${gender === g ? 'bg-inca-gold/15 border-inca-gold text-inca-gold' : 'border-wool-cream/15 text-wool-cream/50 hover:border-wool-cream/30'}`}>
                  {g === 'F' ? 'Femenino' : 'Masculino'}
                </button>
              ))}
            </div>
          </div>

          {/* Avatares */}
          <div>
            <p className="text-wool-cream/40 text-[10px] tracking-widest uppercase mb-2">Selecciona complexión</p>
            <div className="grid grid-cols-2 gap-2">
              {avatars.map((av) => (
                <button key={av.id} onClick={() => setAvatarId(av.id)}
                  className={`p-3 border rounded-sm text-left transition-all ${avatarId === av.id ? 'border-inca-gold bg-inca-gold/10' : 'border-wool-cream/10 hover:border-wool-cream/25'}`}>
                  <p className="text-wool-cream/80 text-xs font-medium">{av.label.split('—')[1]?.trim()}</p>
                  <p className="text-wool-cream/35 text-[10px]">{av.height} cm · {av.weight} kg</p>
                </button>
              ))}
            </div>
          </div>

          {/* Color de prenda */}
          <div>
            <p className="text-wool-cream/40 text-[10px] tracking-widest uppercase mb-2">Color de prenda</p>
            <div className="flex gap-3">
              {Object.values(BRAND_COLORS).map((hex) => (
                <div key={hex} onClick={() => setColor(hex)}
                  className={`w-7 h-7 rounded-full cursor-pointer border-2 transition-all ${garmentColor === hex ? 'border-inca-gold scale-125' : 'border-transparent hover:border-wool-cream/30'}`}
                  style={{ background: hex }} />
              ))}
            </div>
          </div>

          {/* Talla */}
          <div>
            <p className="text-wool-cream/40 text-[10px] tracking-widest uppercase mb-2">Talla de prenda</p>
            <div className="flex gap-2">
              {['XS','S','M','L','XL','XXL'].map((s) => (
                <button key={s} onClick={() => setSize(s)}
                  className={`w-10 h-10 border rounded-sm text-sm transition-all ${size === s ? 'bg-inca-gold text-andean-black border-inca-gold font-bold' : 'border-wool-cream/15 text-wool-cream/50 hover:border-inca-gold'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-coca-green/15 border border-coca-green/30 rounded-sm p-4">
            <p className="text-[10px] tracking-widest uppercase text-coca-green mb-1">Recomendación</p>
            <p className="text-wool-cream/80 text-sm">La talla <strong className="text-inca-gold">{size}</strong> quedará <strong className="text-wool-cream">ajustada correctamente</strong> según las medidas del avatar seleccionado.</p>
          </div>
        </div>

        {/* Panel derecho — avatar */}
        <div className="bg-wool-cream/4 border border-inca-gold/15 rounded-md p-8 flex flex-col items-center gap-6 sticky top-8">
          <p className="text-wool-cream/30 text-[10px] tracking-widest uppercase">Vista previa</p>
          <svg width="180" height="260" viewBox="0 0 180 260" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="90" cy="46" r="32" fill="rgba(245,240,232,0.15)" stroke="rgba(245,240,232,0.3)" strokeWidth="1.5"/>
            <path d="M30 90 Q30 70 90 70 Q150 70 150 90 L144 182 Q144 200 90 200 Q36 200 36 182Z"
              fill={garmentColor + '40'} stroke={garmentColor} strokeWidth="1.5"/>
            <path d="M36 182 L25 250 M144 182 L155 250" stroke="rgba(245,240,232,0.2)" strokeWidth="12" strokeLinecap="round"/>
            <path d="M30 98 L8 162 M150 98 L172 162" stroke="rgba(245,240,232,0.15)" strokeWidth="10" strokeLinecap="round"/>
            {/* Líneas del tejido */}
            <path d="M44 124 Q90 112 136 124" stroke="rgba(245,240,232,0.4)" strokeWidth="1"/>
            <path d="M42 142 Q90 132 138 142" stroke="rgba(245,240,232,0.3)" strokeWidth="1"/>
            <path d="M42 160 Q90 152 138 160" stroke="rgba(245,240,232,0.25)" strokeWidth="1"/>
          </svg>
          <div className="text-center">
            <p className="text-wool-cream/50 text-xs">{AVATAR_TYPES.find(a => a.id === avatarId)?.label}</p>
            <p className="text-inca-gold text-sm font-medium mt-1">Talla seleccionada: {size}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
