'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { RotateCcw } from 'lucide-react'

interface Viewer360Props {
  /** Path to the 360° rotation video (relative to /public). */
  videoSrc: string
  /** Pixels the user must drag to complete a full 360° rotation. Default: 600. */
  fullRotationPx?: number
  /** Aspect ratio class (Tailwind). Default: aspect-[3/4] */
  aspectRatio?: string
  className?: string
}

export function Viewer360({
  videoSrc,
  fullRotationPx = 600,
  aspectRatio = 'aspect-[3/4]',
  className = '',
}: Viewer360Props) {
  const videoRef  = useRef<HTMLVideoElement>(null)
  const dragState = useRef<{ active: boolean; startX: number; startTime: number }>({
    active: false, startX: 0, startTime: 0,
  })

  const [ready,   setReady]   = useState(false)
  const [hinting, setHinting] = useState(true)   // "Arrastra para girar" hint

  // ─── helpers ──────────────────────────────────────────────────────────────
  const clampTime = useCallback((t: number, duration: number) => {
    // Circular wrap
    const wrapped = t % duration
    return wrapped < 0 ? wrapped + duration : wrapped
  }, [])

  const applyDelta = useCallback((deltaX: number) => {
    const video = videoRef.current
    if (!video || !video.duration) return
    const sensitivity = video.duration / fullRotationPx   // seconds per pixel
    const raw = dragState.current.startTime + deltaX * sensitivity
    video.currentTime = clampTime(raw, video.duration)
  }, [fullRotationPx, clampTime])

  // ─── mouse ────────────────────────────────────────────────────────────────
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const video = videoRef.current
    if (!video) return
    e.preventDefault()
    dragState.current = { active: true, startX: e.clientX, startTime: video.currentTime }
    setHinting(false)
  }, [])

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState.current.active) return
    applyDelta(e.clientX - dragState.current.startX)
  }, [applyDelta])

  const onMouseUp = useCallback(() => {
    dragState.current.active = false
  }, [])

  // ─── touch ────────────────────────────────────────────────────────────────
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const video = videoRef.current
    if (!video) return
    dragState.current = {
      active: true,
      startX: e.touches[0].clientX,
      startTime: video.currentTime,
    }
    setHinting(false)
  }, [])

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!dragState.current.active) return
    e.preventDefault()    // prevent page scroll
    applyDelta(e.touches[0].clientX - dragState.current.startX)
  }, [applyDelta])

  const onTouchEnd = useCallback(() => {
    dragState.current.active = false
  }, [])

  // ─── global event listeners ───────────────────────────────────────────────
  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup',   onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup',   onMouseUp)
    }
  }, [onMouseMove, onMouseUp])

  useEffect(() => {
    // passive:false needed to call preventDefault on touchmove
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend',  onTouchEnd)
    return () => {
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend',  onTouchEnd)
    }
  }, [onTouchMove, onTouchEnd])

  // ─── hide hint after 3 s ──────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setHinting(false), 4000)
    return () => clearTimeout(t)
  }, [])

  // ─── reset to frame 0 ─────────────────────────────────────────────────────
  const reset = () => {
    if (videoRef.current) videoRef.current.currentTime = 0
  }

  return (
    <div
      className={`relative w-full select-none overflow-hidden rounded-sm bg-wool-cream ${aspectRatio} ${className}`}
      style={{ cursor: dragState.current.active ? 'grabbing' : 'grab' }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* ── Video ── */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        preload="auto"
        muted
        playsInline
        disablePictureInPicture
        onLoadedData={() => setReady(true)}
      />

      {/* ── Loading skeleton ── */}
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <span className="text-xs text-gray-400 tracking-widest uppercase">Cargando…</span>
        </div>
      )}

      {/* ── Hint overlay ── */}
      {ready && hinting && (
        <div
          className="
            absolute bottom-5 left-1/2 -translate-x-1/2
            flex items-center gap-2 px-4 py-2
            bg-andean-black/70 text-wool-cream
            text-xs tracking-widest uppercase rounded-full
            pointer-events-none select-none
            animate-pulse
          "
        >
          {/* left arrow */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M10 3L5 8l5 5V3z"/>
          </svg>
          Arrastra para girar
          {/* right arrow */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M6 3l5 5-5 5V3z"/>
          </svg>
        </div>
      )}

      {/* ── Reset button ── */}
      {ready && (
        <button
          onClick={reset}
          title="Restablecer vista"
          className="
            absolute top-3 right-3
            w-8 h-8 flex items-center justify-center
            bg-andean-black/50 hover:bg-andean-black/80
            text-wool-cream rounded-full
            transition-colors duration-200
            pointer-events-auto
          "
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      )}

      {/* ── 360° badge ── */}
      {ready && (
        <span
          className="
            absolute top-3 left-3
            text-[10px] font-bold tracking-widest uppercase
            px-2 py-0.5 rounded-full
            bg-inca-gold/90 text-andean-black
            pointer-events-none select-none
          "
        >
          360°
        </span>
      )}
    </div>
  )
}
