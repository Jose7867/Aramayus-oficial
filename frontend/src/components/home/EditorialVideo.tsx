"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { settingsApi } from "@/services/api";

const defaultVideo = "/images/products/video%20de%20muestra.mp4";

export function EditorialVideo() {
  const [videoUrl, setVideoUrl] = useState(defaultVideo);

  useEffect(() => {
    let isMounted = true;

    settingsApi
      .getNosotros()
      .then(({ data }) => {
        if (isMounted && typeof data.homeVideo === "string" && data.homeVideo) {
          setVideoUrl(data.homeVideo);
        }
      })
      .catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="relative isolate min-h-[62vh] overflow-hidden bg-andean-black sm:min-h-[72vh]">
      <video
        key={videoUrl}
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="metadata"
        aria-label="Video editorial de la colección Aramayus Art"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
      <div className="relative flex min-h-[62vh] items-end px-6 pb-16 pt-28 sm:min-h-[72vh] sm:px-12 sm:pb-20 lg:px-20">
        <div className="max-w-xl text-white">
          <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-white/75">
            Hecho para llevar el origen
          </p>
          <h2 className="font-display text-4xl leading-tight sm:text-6xl">
            El movimiento <em className="text-inca-gold">de los Andes.</em>
          </h2>
          <Link
            href="/catalogo"
            className="mt-7 inline-flex border-b border-white/70 pb-2 text-xs uppercase tracking-[0.18em] transition-colors hover:border-inca-gold hover:text-inca-gold"
          >
            Descubre la colección
          </Link>
        </div>
      </div>
    </section>
  );
}
