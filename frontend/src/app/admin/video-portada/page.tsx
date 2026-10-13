'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, CheckCircle2, Film, LoaderCircle, Save, Upload, Video } from 'lucide-react'
import { heroApi, uploadsApi } from '@services/api'

export default function VideoPortadaPage() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    heroApi.get()
      .then(({ data }) => {
        if (!active) return
        setVideoUrl(data.videoUrl ?? null)
        setEnabled(Boolean(data.enabled))
      })
      .catch(() => {
        if (active) setError('No se pudo cargar la configuración de la portada.')
      })
      .finally(() => {
        if (active) setInitialLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null)
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  const handleSave = async () => {
    setLoading(true)
    setMessage('')
    setError('')

    try {
      let finalUrl = videoUrl

      if (file) {
        const uploadResponse = await uploadsApi.uploadHeroVideo(file)
        finalUrl = uploadResponse.data.url
      }

      if (enabled && !finalUrl) {
        setError('Selecciona un video antes de activar la portada.')
        return
      }

      await heroApi.update({
        videoUrl: finalUrl,
        enabled,
      })

      setVideoUrl(finalUrl)
      setFile(null)
      setMessage('La configuración de la portada se guardó correctamente.')
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        'No se pudo guardar la portada. Comprueba tu conexión e inténtalo nuevamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  const displayedVideo = previewUrl || videoUrl

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-gray-500">
        <LoaderCircle className="mr-3 h-5 w-5 animate-spin" />
        Cargando configuración...
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-12">
      <header>
        <div className="mb-2 flex items-center gap-3">
          <div className="rounded-sm bg-inca-gold/15 p-3 text-inca-gold">
            <Film className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-display text-andean-black">
              Video de portada
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Personaliza el fondo principal de Aramayus Art.
            </p>
          </div>
        </div>
      </header>

      {message && (
        <div className="flex items-start gap-2 border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          {message}
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          {error}
        </div>
      )}

      <section className="overflow-hidden border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-gray-50/60 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-andean-black">
            Vista previa
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Así podrás comprobar el video antes de guardar los cambios.
          </p>
        </div>

        <div className="bg-andean-black p-4">
          <div className="relative aspect-video overflow-hidden bg-black">
            {displayedVideo ? (
              <video
                key={displayedVideo}
                src={displayedVideo}
                controls
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-white/60">
                <Video className="h-10 w-10" />
                <p className="text-sm">Todavía no hay un video seleccionado.</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6 p-5">
          <div>
            <label
              htmlFor="hero-video"
              className="mb-2 block text-sm font-medium text-gray-800"
            >
              Seleccionar video MP4
            </label>

            <input
              id="hero-video"
              type="file"
              accept="video/mp4,.mp4"
              onChange={(event) => {
                const selected = event.target.files?.[0] ?? null
                setMessage('')
                setError('')

                if (selected && !selected.name.toLowerCase().endsWith('.mp4')) {
                  setError('Selecciona un archivo con extensión .mp4.')
                  event.target.value = ''
                  setFile(null)
                  return
                }

                if (selected && selected.size > 50 * 1024 * 1024) {
                  setError('El video supera el límite de 50 MB.')
                  event.target.value = ''
                  setFile(null)
                  return
                }

                setFile(selected)
              }}
              className="block w-full rounded-sm border border-gray-300 bg-white p-3 text-sm text-gray-700 file:mr-4 file:rounded-sm file:border-0 file:bg-andean-black file:px-4 file:py-2 file:text-xs file:font-medium file:text-white"
            />

            <p className="mt-2 text-xs leading-relaxed text-gray-500">
              Formato MP4, máximo 50 MB. Para una portada fluida, se recomienda
              un video comprimido, preferiblemente de 10 a 20 segundos.
            </p>

            {file && (
              <p className="mt-2 text-xs text-gray-700">
                Archivo seleccionado: {file.name} · {(file.size / (1024 * 1024)).toFixed(1)} MB
              </p>
            )}
          </div>

          <label className="flex cursor-pointer items-start gap-3 border border-gray-200 p-4">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(event) => {
                setEnabled(event.target.checked)
                setMessage('')
              }}
              className="mt-1 h-4 w-4 accent-amber-700"
            />
            <span>
              <span className="block text-sm font-medium text-gray-900">
                Activar video en la portada
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-gray-500">
                Si lo desactivas, la página principal volverá a mostrar la
                imagen de fondo habitual.
              </span>
            </span>
          </label>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-5">
            <span className={`text-xs font-medium ${enabled && videoUrl ? 'text-green-700' : 'text-gray-500'}`}>
              {enabled && videoUrl
                ? 'Video de portada activado'
                : 'Se utilizará la imagen alternativa'}
            </span>

            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="btn-dark flex items-center gap-2 px-6 py-3 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : file ? (
                <Upload className="h-4 w-4" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {loading
                ? 'Guardando...'
                : file
                  ? 'Subir y guardar video'
                  : 'Guardar configuración'}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
