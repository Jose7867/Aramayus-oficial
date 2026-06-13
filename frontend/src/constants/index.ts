export const CATEGORIES = ['Chompas','Ponchos','Camisas','Faldas','Vestidos','Accesorios'] as const
export const SIZES      = ['XS','S','M','L','XL','XXL'] as const
export const SHIPPING_FREE_THRESHOLD = 200  // S/ 200

export const BRAND_COLORS = {
  incaGold:       '#C8860A',
  andeanBlack:    '#1A0A00',
  wiphalaRed:     '#8B1A1A',
  cocaGreen:      '#2D5A3D',
  textilePurple:  '#7B5EA7',
  woolCream:      '#F5F0E8',
} as const

export const AVATAR_TYPES = [
  { id: 'f1', gender: 'F', label: 'Femenino — Menuda',    height: 155, weight: 52 },
  { id: 'f2', gender: 'F', label: 'Femenino — Promedio',  height: 162, weight: 60 },
  { id: 'f3', gender: 'F', label: 'Femenino — Curvilínea',height: 165, weight: 72 },
  { id: 'f4', gender: 'F', label: 'Femenino — Alta',      height: 172, weight: 65 },
  { id: 'm1', gender: 'M', label: 'Masculino — Delgado',  height: 170, weight: 65 },
  { id: 'm2', gender: 'M', label: 'Masculino — Promedio', height: 175, weight: 75 },
  { id: 'm3', gender: 'M', label: 'Masculino — Corpulento',height: 178, weight: 88 },
  { id: 'm4', gender: 'M', label: 'Masculino — Alto',     height: 185, weight: 80 },
] as const
