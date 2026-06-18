import Image from 'next/image'
import Link from 'next/link'
import {
  Heart, Users, Leaf, Award, MapPin, Sparkles, ArrowRight, Quote
} from 'lucide-react'

export const metadata = { title: 'Nosotros — Aramayus Art | Textil Artesanal Andino' }

const VALUES = [
  {
    icon: Heart,
    title: 'Hecho con amor',
    description:
      'Cada prenda lleva consigo horas de dedicación de artesanas peruanas que han heredado el arte del tejido de sus abuelas. No producimos en masa: creamos con intención.',
  },
  {
    icon: Leaf,
    title: 'Sostenible por naturaleza',
    description:
      'Usamos fibras naturales como Alpaca Baby, Algodón Pima y lana de oveja. Nuestros tintes son vegetales y nuestros procesos respetan el agua y la tierra andina.',
  },
  {
    icon: Users,
    title: 'Comunidad primero',
    description:
      'El 40% de nuestros ingresos regresa directamente a las comunidades artesanas de Cusco, Puno y Ayacucho, financiando talleres, materiales y educación.',
  },
  {
    icon: Award,
    title: 'Calidad ancestral',
    description:
      'Técnicas de tejido con más de 500 años de historia, combinadas con estándares de calidad modernos. Cada pieza es inspeccionada a mano antes de llegar a ti.',
  },
]

const TEAM = [
  {
    name: 'Lucía Aramayo',
    role: 'Fundadora & Directora Creativa',
    image: '/images/team/lucia.jpeg',
    quote: 'Quería que el mundo viera lo que yo veía en las manos de mi abuela: magia.',
  },
  {
    name: 'Rosa Quispe',
    role: 'Maestra Tejedora, Cusco',
    image: '/images/team/rosa.jpeg',
    quote: 'Tejo desde los 8 años. Cada punto tiene un significado en nuestra cultura.',
  },
  {
    name: 'Marco Flores',
    role: 'Director de Operaciones',
    image: '/images/team/marco.jpeg',
    quote: 'Construimos puentes entre el arte ancestral y el mundo contemporáneo.',
  },
]

const MILESTONES = [
  { year: '2017', text: 'Fundación de Aramayus Art en Cusco con 3 artesanas locales.' },
  { year: '2019', text: 'Primera colección internacional presentada en la Feria Artesanal de Lima.' },
  { year: '2021', text: 'Alianza con 12 comunidades andinas. Más de 80 artesanas colaboradoras.' },
  { year: '2023', text: 'Lanzamiento del Probador Virtual: moda ancestral con tecnología moderna.' },
  { year: '2025', text: 'Más de 10,000 prendas enviadas a 35 países. El tejido andino al mundo.' },
]

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-andean-black">
          <Image
            src="/images/nosotros-hero.jpeg"
            alt="Artesanas tejiendo en los Andes"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-andean-black via-andean-black/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="text-inca-gold text-[11px] tracking-[4px] uppercase font-semibold mb-3">
            Nuestra historia
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-wool-cream leading-tight max-w-3xl">
            Arte que viste,<br />
            <span className="text-inca-gold italic">alma que perdura</span>
          </h1>
          <p className="text-wool-cream/70 text-base mt-4 max-w-xl leading-relaxed">
            Somos un puente entre el pasado milenario de los Andes y el presente.
            Cada prenda es una historia, cada hilo es una voz.
          </p>
        </div>
      </section>

      {/* ── Historia ──────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-inca-gold text-[10px] tracking-[4px] uppercase font-semibold mb-4">
            Quiénes somos
          </p>
          <h2 className="font-display text-3xl text-andean-black mb-6 leading-tight">
            Nacimos de una historia de manos y memoria
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-[15px]">
            <p>
              Aramayus Art nació en 2017 en las faldas del Cusco, cuando Lucía Aramayo
              decidió que los tejidos que su abuela le enseñaba merecían llegar a todo el mundo.
              Lo que comenzó como un pequeño taller con tres artesanas se convirtió en un
              movimiento cultural.
            </p>
            <p>
              Hoy trabajamos con más de 80 maestras tejedoras de las comunidades de Cusco,
              Puno y Ayacucho. Cada una preserva técnicas de más de 500 años: el telar de
              cintura, el tejido Wari, los bordados Chakana y los tintes naturales con plantas
              medicinales andinas.
            </p>
            <p>
              No somos una marca de fast fashion. Somos un archivo vivo de la cultura textil
              andina, traducida en prendas que puedes usar hoy.
            </p>
          </div>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-andean-black border-b-2 border-inca-gold pb-0.5 hover:text-inca-gold transition-colors group"
          >
            Explorar colección
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
            <Image
              src="/images/nosotros-taller.jpeg"
              alt="Taller de tejido Aramayus Art"
              fill
              className="object-cover"
            />
          </div>
          {/* Badge flotante */}
          <div className="absolute -bottom-6 -left-6 bg-inca-gold text-andean-black px-6 py-4 rounded-sm shadow-xl">
            <p className="text-3xl font-display font-bold">80+</p>
            <p className="text-[10px] uppercase tracking-widest font-semibold">Artesanas</p>
          </div>
        </div>
      </section>

      {/* ── Valores ───────────────────────────────────────────────────────────── */}
      <section className="bg-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-inca-gold text-[10px] tracking-[4px] uppercase font-semibold mb-3">
              Lo que nos mueve
            </p>
            <h2 className="font-display text-3xl text-andean-black">Nuestros valores</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white p-8 rounded-sm border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-10 h-10 bg-inca-gold/10 rounded-sm flex items-center justify-center mb-5 group-hover:bg-inca-gold/20 transition-colors">
                  <Icon className="w-5 h-5 text-inca-gold" />
                </div>
                <h3 className="font-display text-lg text-andean-black mb-3">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Origen / Mapa ─────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-xl order-2 md:order-1">
          <Image
            src="/images/nosotros-mapa.jpeg"
            alt="Comunidades andinas de Aramayus Art"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-andean-black/60 to-transparent flex items-end p-8">
            <div className="flex items-center gap-2 text-wool-cream">
              <MapPin className="w-5 h-5 text-inca-gold" />
              <span className="text-sm font-semibold tracking-wide">Cusco, Puno & Ayacucho — Perú</span>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <p className="text-inca-gold text-[10px] tracking-[4px] uppercase font-semibold mb-4">
            Raíces profundas
          </p>
          <h2 className="font-display text-3xl text-andean-black mb-6 leading-tight">
            De los Andes al mundo
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-[15px]">
            <p>
              Nuestros talleres se ubican a más de 3,400 metros sobre el nivel del mar. En esas
              alturas, donde el aire es más puro y el tiempo transcurre diferente, las artesanas
              dan vida a cada pieza.
            </p>
            <p>
              Las comunidades con las que trabajamos tienen acceso a mercados internacionales
              gracias a Aramayus Art, lo que les permite mantener vivas sus tradiciones sin
              depender de intermediarios que suelen quedarse con la mayor parte del valor.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[['35', 'Países'], ['10K+', 'Prendas'], ['12', 'Comunidades']].map(([num, label]) => (
              <div key={label} className="text-center p-4 border border-gray-100 rounded-sm">
                <p className="font-display text-2xl text-andean-black font-bold">{num}</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Línea de tiempo ───────────────────────────────────────────────────── */}
      <section className="bg-andean-black py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-inca-gold text-[10px] tracking-[4px] uppercase font-semibold mb-3">
              Nuestra trayectoria
            </p>
            <h2 className="font-display text-3xl text-wool-cream">El camino recorrido</h2>
          </div>
          <div className="relative">
            {/* Línea vertical */}
            <div className="absolute left-[72px] top-0 bottom-0 w-px bg-inca-gold/20" />
            <div className="space-y-10">
              {MILESTONES.map(({ year, text }) => (
                <div key={year} className="flex gap-8 items-start">
                  <div className="flex-shrink-0 w-16 text-right">
                    <span className="text-inca-gold font-display text-lg font-bold">{year}</span>
                  </div>
                  {/* Punto */}
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-inca-gold mt-1.5 ring-4 ring-inca-gold/20" />
                  <p className="text-wool-cream/70 text-sm leading-relaxed pt-0.5">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Equipo ────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-inca-gold text-[10px] tracking-[4px] uppercase font-semibold mb-3">
            Las personas detrás
          </p>
          <h2 className="font-display text-3xl text-andean-black">Nuestro equipo</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM.map(({ name, role, image, quote }) => (
            <div key={name} className="group">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-stone-100 mb-5 shadow-md">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-andean-black/70 via-transparent to-transparent flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-wool-cream/90 text-xs leading-relaxed italic flex gap-2">
                    <Quote className="w-3 h-3 text-inca-gold flex-shrink-0 mt-0.5" />
                    {quote}
                  </p>
                </div>
              </div>
              <h3 className="font-display text-lg text-andean-black">{name}</h3>
              <p className="text-xs text-inca-gold uppercase tracking-widest font-semibold">{role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA final ─────────────────────────────────────────────────────────── */}
      <section className="bg-stone-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <Sparkles className="w-8 h-8 text-inca-gold mx-auto mb-6" />
          <h2 className="font-display text-3xl text-andean-black mb-4">
            Lleva un pedazo de los Andes contigo
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Cada prenda que eliges apoya a una artesana, preserva una técnica ancestral
            y te conecta con una cultura de más de 500 años de historia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalogo"
              className="btn-dark px-8 py-3.5 text-xs tracking-widest uppercase font-semibold inline-flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-4 h-4" /> Ver colección
            </Link>
            <Link
              href="/contacto"
              className="px-8 py-3.5 text-xs tracking-widest uppercase font-semibold border-2 border-andean-black text-andean-black hover:bg-andean-black hover:text-wool-cream transition-colors rounded-sm inline-flex items-center justify-center"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
