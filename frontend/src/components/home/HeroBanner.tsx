'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { heroApi } from '@services/api'

export function HeroBanner() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [videoEnabled, setVideoEnabled] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)

  useEffect(() => {
    let active = true

    heroApi.get()
      .then(({ data }) => {
        if (!active) return

        setVideoUrl(data.videoUrl ?? null)
        setVideoEnabled(Boolean(data.enabled))
      })
      .catch(() => {
        // Si falla la API, se conserva la imagen de fondo habitual.
      })

    return () => {
      active = false
    }
  }, [])

  const showVideo = Boolean(videoEnabled && videoUrl && !videoFailed)

  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-andean-black px-4 text-center">
      <div className="absolute inset-0 z-0">
        {showVideo ? (
          <video
            key={videoUrl}
            src={videoUrl!}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/imagenart.jpg"
            onError={() => setVideoFailed(true)}
            className="h-full w-full object-cover opacity-40 mix-blend-overlay"
            aria-hidden="true"
          />
        ) : (
          <Image
            src="/images/imagenart.jpg"
            alt="Aramayus Art - Textil Artesanal Andino"
            fill
            priority
            className="object-cover opacity-40 mix-blend-overlay"
            sizes="100vw"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-andean-black/60 via-andean-black/80 to-andean-black" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <p className="mb-6 animate-fade-in text-[11px] uppercase tracking-[4px] text-inca-gold">
          Colección 2025 · Tejido a mano en los Andes
        </p>

        <h1
          className="mb-6 max-w-3xl animate-slide-up font-display text-5xl leading-[1.05] text-wool-cream md:text-7xl"
          style={{ animationDelay: '150ms', animationFillMode: 'both' }}
        >
          Arte que viste,<br />
          <em className="text-inca-gold">alma que perdura</em>
        </h1>

        <p
          className="mb-10 max-w-lg animate-slide-up text-base font-light leading-relaxed text-wool-cream/70 md:text-lg"
          style={{ animationDelay: '300ms', animationFillMode: 'both' }}
        >
          Prendas artesanales únicas, elaboradas por manos peruanas con técnicas
          ancestrales transmitidas de generación en generación.
        </p>

        <div
          className="flex animate-slide-up flex-wrap justify-center gap-4"
          style={{ animationDelay: '450ms', animationFillMode: 'both' }}
        >
          <Link href="/catalogo" className="btn-primary shadow-lg shadow-inca-gold/20">
            Explorar colección
          </Link>
          <Link href="#historia" className="btn-secondary bg-white/5 backdrop-blur-sm">
            Nuestra historia
          </Link>
        </div>

        <div
          className="mt-14 flex gap-10 border-t border-white/10 pt-8 animate-fade-in"
          style={{ animationDelay: '600ms', animationFillMode: 'both' }}
        >
          {[
            ['12+', 'Años de oficio'],
            ['340+', 'Diseños únicos'],
            ['4 800+', 'Clientes felices'],
          ].map(([number, label]) => (
            <div key={label} className="text-center">
              <div className="font-display text-3xl text-inca-gold">{number}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[2px] text-wool-cream/50">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
