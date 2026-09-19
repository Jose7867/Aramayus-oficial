export interface SubCategory {
  label: string
  href: string
  highlight?: boolean
}

export interface PhotoCard {
  label: string
  image: string
  href: string
}

export interface Collection {
  label: string
  href: string
}

export interface CategoryPanel {
  id: string
  subHeading: string
  subcategories: SubCategory[]
  lookbook?: { image: string; label: string }
  sectionTitle: string
  photos: PhotoCard[]
  collectionsTitle?: string
  collections?: Collection[]
}

export const MAIN_CATEGORIES = [
  { label: 'Destacados', panelId: 'ropa' },
  { label: 'Ropa', panelId: 'ropa' },
  { label: 'Accesorios', panelId: 'accesorios' },
  { label: 'Tejidos artesanales', panelId: 'tejidos' },
  { label: 'Ocasión', panelId: 'ocasion' },
  { label: 'Colecciones', panelId: 'colecciones' },
]

export const SECONDARY_LINKS = [
  { label: 'Pedir muestras', href: '/muestras' },
  { label: 'Blog', href: '/blog' },
  { label: 'Sobre nosotros', href: '/nosotros' },
]

export const PANELS: CategoryPanel[] = [
  {
    id: 'ropa',
    subHeading: 'Compra por producto',
    subcategories: [
      { label: 'Camisas',           href: '/catalogo?category=Camisas',  highlight: true },
      { label: 'Chompas',           href: '/catalogo?category=Chompas' },
      { label: 'Ponchos',           href: '/catalogo?category=Ponchos' },
      { label: 'Pantalones',        href: '/catalogo?category=Pantalones' },
      { label: 'Vestidos',          href: '/catalogo?category=Vestidos' },
      { label: 'Faldas',            href: '/catalogo?category=Faldas' },
      { label: 'Abrigos y chaquetas', href: '/catalogo?category=Abrigos' },
    ],
    lookbook: {
      image: '/images/lookbook-verano.jpeg',
      label: 'Lookbook primavera verano 2025',
    },
    sectionTitle: 'Diseñalo tú misma',
    photos: [
      { label: 'Camisas',      image: '/images/products/chompa-wari.jpeg', href: '/catalogo?category=Camisas' },
      { label: 'Blusas',       image: '/images/products/blusa.jpeg',          href: '/catalogo?category=Blusas' },
      { label: 'Camisas Mao',  image: '/images/products/camisa-mao.jpeg',     href: '/catalogo?category=CamisasMao' },
      { label: 'Camisas Lino', image: '/images/products/camisa-lino.jpeg',    href: '/catalogo?category=CamisasLino' },
    ],
    collectionsTitle: 'Colecciones',
    collections: [
      { label: 'Todas las camisas',     href: '/catalogo?collection=todas-camisas' },
      { label: 'Camisas Business',      href: '/catalogo?collection=business' },
      { label: 'Camisas Casual',        href: '/catalogo?collection=casual' },
      { label: 'Blusas imprescindibles',href: '/catalogo?collection=blusas' },
    ],
  },
  {
    id: 'accesorios',
    subHeading: 'Compra por tipo',
    subcategories: [
      { label: 'Bolsos y carteras', href: '/catalogo?category=Bolsos', highlight: true },
      { label: 'Gorros y chullos', href: '/catalogo?category=Gorros' },
      { label: 'Bufandas',         href: '/catalogo?category=Bufandas' },
      { label: 'Guantes',          href: '/catalogo?category=Guantes' },
      { label: 'Cinturones',       href: '/catalogo?category=Cinturones' },
      { label: 'Pulseras',         href: '/catalogo?category=Pulseras' },
      { label: 'Collares',         href: '/catalogo?category=Collares' },
    ],
    sectionTitle: 'Destacados',
    photos: [
      { label: 'Bolsos tejidos', image: '/images/products/bolso1.jpeg',      href: '/catalogo?category=Bolsos' },
      { label: 'Gorros alpaca',  image: '/images/products/gorro.jpeg',       href: '/catalogo?category=Gorros' },
      { label: 'Bufandas',       image: '/images/products/Accesorios.jpeg',  href: '/catalogo?category=Bufandas' },
    ],
    collectionsTitle: 'Colecciones',
    collections: [
      { label: 'Todos los accesorios', href: '/catalogo?category=Accesorios' },
      { label: 'Colección Inca',       href: '/catalogo?collection=inca' },
      { label: 'Tejidos Qero',         href: '/catalogo?collection=qero' },
    ],
  },
  {
    id: 'tejidos',
    subHeading: 'Por material',
    subcategories: [
      { label: 'Alpaca Baby',   href: '/catalogo?material=AlpacaBaby',  highlight: true },
      { label: 'Alpaca Royal',  href: '/catalogo?material=AlpacaRoyal' },
      { label: 'Algodón Pima',  href: '/catalogo?material=AlgodonPima' },
      { label: 'Lana de oveja', href: '/catalogo?material=LanaOveja' },
      { label: 'Mezcla premium',href: '/catalogo?material=Mezcla' },
      { label: 'Lino andino',   href: '/catalogo?material=Lino' },
    ],
    sectionTitle: 'Fibras naturales',
    photos: [
      { label: 'Alpaca Baby',  image: '/images/tejidos/alpaca.jpeg',  href: '/catalogo?material=AlpacaBaby' },
      { label: 'Algodón Pima', image: '/images/tejidos/algodon.jpeg', href: '/catalogo?material=AlgodonPima' },
      { label: 'Lana oveja',   image: '/images/tejidos/lana.jpeg',    href: '/catalogo?material=LanaOveja' },
    ],
    collectionsTitle: 'Por peso',
    collections: [
      { label: 'Ligero — verano',    href: '/catalogo?peso=Ligero' },
      { label: 'Medio — todo el año', href: '/catalogo?peso=Medio' },
      { label: 'Pesado — invierno',  href: '/catalogo?peso=Pesado' },
    ],
  },
  {
    id: 'ocasion',
    subHeading: 'Por ocasión',
    subcategories: [
      { label: 'Ceremonias',   href: '/catalogo?ocasion=Ceremonias', highlight: true },
      { label: 'Uso diario',   href: '/catalogo?ocasion=Diario' },
      { label: 'Viaje',        href: '/catalogo?ocasion=Viaje' },
      { label: 'Trabajo',      href: '/catalogo?ocasion=Trabajo' },
      { label: 'Festividades', href: '/catalogo?ocasion=Festividades' },
    ],
    sectionTitle: 'Elige tu ocasión',
    photos: [
      { label: 'Ceremonias', image: '/images/ocasion/ceremonias.jpeg', href: '/catalogo?ocasion=Ceremonias' },
      { label: 'Diario',     image: '/images/ocasion/diario.jpeg',     href: '/catalogo?ocasion=Diario' },
      { label: 'Viaje',      image: '/images/ocasion/viaje.jpeg',      href: '/catalogo?ocasion=Viaje' },
    ],
  },
  {
    id: 'colecciones',
    subHeading: 'Temporadas',
    subcategories: [
      { label: 'Verano 2025',        href: '/catalogo?coleccion=Verano2025', highlight: true },
      { label: 'Otoño–Invierno 2025',href: '/catalogo?coleccion=OI2025' },
      { label: 'Colección Inca Gold',href: '/catalogo?coleccion=IncaGold' },
      { label: 'Tawantinsuyu',       href: '/catalogo?coleccion=Tawantinsuyu' },
      { label: 'Chakana',            href: '/catalogo?coleccion=Chakana' },
    ],
    sectionTitle: 'Colecciones destacadas',
    photos: [
      { label: 'Inca Gold',    image: '/images/colecciones/inca-gold.jpeg',    href: '/catalogo?coleccion=IncaGold' },
      { label: 'Tawantinsuyu',image: '/images/colecciones/tawantinsuyu.jpeg', href: '/catalogo?coleccion=Tawantinsuyu' },
      { label: 'Chakana',      image: '/images/colecciones/chakana.jpeg',      href: '/catalogo?coleccion=Chakana' },
    ],
  },
]
