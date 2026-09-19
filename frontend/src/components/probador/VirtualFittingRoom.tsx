"use client";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Ruler,
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  Info,
} from "lucide-react";
import { useCartStore } from "@store/cartStore";
import type { Product } from "@/types/product";
import {
  resolveProductAssetFolder,
  resolveProductVideoUrl,
} from "@/lib/productAssetPaths";

interface FittingRoomProps {
  product: Product;
}

const TOTAL_IMAGES = 72; // Asumimos 36 imágenes (0.png a 35.png)
const FULL_ROTATION_PX = 500; // Píxeles de arrastre para una rotación completa

export function VirtualFittingRoom({ product }: FittingRoomProps) {
  const rotationProgressRef = useRef(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Throttle del drag con requestAnimationFrame
  const rafRef = useRef<number | null>(null);
  const pendingXRef = useRef<number | null>(null);

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null);

  const [addedFeedback, setAddedFeedback] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const folderName = resolveProductAssetFolder(product) ?? "";
  const isVideoProduct =
    Boolean(product.video360) || product.model === "milano";
  const videoUrl =
    resolveProductVideoUrl(product) ||
    "/images/products/Milano/rotacion-360.mp4";
  const posterUrl =
    product.images?.[0] ||
    (folderName ? `/images/products/${folderName}/milano.jpeg` : "");

  // Calculador de talla recomendada (heurística básica con IMC)
  useEffect(() => {
    if (weight && height) {
      const w = parseFloat(weight);
      const h = parseFloat(height) / 100; // cm a m
      if (w > 0 && h > 0) {
        const bmi = w / (h * h);
        let rec = "M";
        if (bmi < 18.5) rec = "XS";
        else if (bmi < 22) rec = "S";
        else if (bmi < 25) rec = "M";
        else if (bmi < 28) rec = "L";
        else rec = "XL";

        if (product.sizes.includes(rec)) {
          setRecommendedSize(rec);
        } else {
          setRecommendedSize(product.sizes[0]);
        }
      }
    } else {
      setRecommendedSize(null);
    }
  }, [weight, height, product.sizes]);

  // --- Precarga de imágenes (solo para productos sin video) ---
  useEffect(() => {
    if (isVideoProduct) return;
    setImagesLoaded(false);
    let loadedCount = 0;
    let cancelled = false;

    for (let i = 0; i < TOTAL_IMAGES; i++) {
      const img = new window.Image();
      img.src = `/images/products/${folderName}/${i}.png`;
      img.onload = img.onerror = () => {
        loadedCount++;
        if (!cancelled && loadedCount === TOTAL_IMAGES) {
          setImagesLoaded(true);
        }
      };
    }

    return () => {
      cancelled = true;
    };
  }, [folderName, isVideoProduct]);

  // --- Detectar cuándo el video está listo para scrubbing sin cortes ---
  useEffect(() => {
    if (!isVideoProduct) return;
    setVideoReady(false);
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlayThrough = () => setVideoReady(true);
    video.addEventListener("canplaythrough", handleCanPlayThrough);

    // Por si ya estaba cacheado y el evento no dispara de nuevo
    if (video.readyState >= 4) setVideoReady(true);

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
    };
  }, [isVideoProduct, videoUrl]);

  // Mantener el video en pausa por defecto para que el scrubbing (seek)
  // funcione correctamente cuando el usuario arrastra para rotar.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (videoReady) {
      try {
        video.pause();
        // Asegurar tiempo inicial consistente
        if (video.duration && !isNaN(video.duration)) {
          video.currentTime = rotationProgressRef.current * video.duration;
        }
      } catch (err) {
        // ignore
      }
    }
  }, [videoReady]);

  // --- Procesa el frame de arrastre (llamado vía rAF) ---
  const applyDragFrame = useCallback(() => {
    rafRef.current = null;
    if (pendingXRef.current === null) return;

    const x = pendingXRef.current;
    const deltaX = x - startXRef.current;
    const deltaProgress = deltaX / FULL_ROTATION_PX;

    let nextProgress = rotationProgressRef.current + deltaProgress;
    while (nextProgress < 0) nextProgress += 1;
    nextProgress = nextProgress % 1;
    rotationProgressRef.current = nextProgress;

    const video = videoRef.current;
    if (video && video.duration && !isNaN(video.duration)) {
      // Evita apilar peticiones de seek mientras el navegador resuelve la anterior
      if (!video.seeking) {
        video.currentTime = nextProgress * video.duration;
      }
    }

    setCurrentIdx((prev) => {
      const newIdx = Math.floor(nextProgress * TOTAL_IMAGES) % TOTAL_IMAGES;
      return prev !== newIdx ? newIdx : prev;
    });

    startXRef.current = x;
  }, []);

  // --- Manejo del Arrastre (Mouse & Touch) ---
  const handleDragStart = (x: number) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    startXRef.current = x;
    // Pausar video al iniciar arrastre para evitar que la reproducción
    // automática interfiera con el seek por currentTime.
    const v = videoRef.current;
    if (v) v.pause();
  };

  const handleDragMove = (x: number) => {
    if (!isDraggingRef.current) return;
    pendingXRef.current = x;
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(applyDragFrame);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    isDraggingRef.current = false;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    pendingXRef.current = null;
  };

  // Limpieza del rAF al desmontar
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // --- Acciones ---
  const handleAddToCart = () => {
    const sizeToUse = recommendedSize || product.sizes[0];
    addItem({ ...product, colors: [product.colors[0]], sizes: [sizeToUse] });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const resetView = () => {
    rotationProgressRef.current = 0;
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
    setCurrentIdx(0);
  };

  const currentImageUrl = `/images/products/${folderName}/${currentIdx}.png`;
  const isReady = isVideoProduct ? videoReady : imagesLoaded;

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-stone-50 overflow-hidden">
      {/* ── Panel Izquierdo: Visor 360° ── */}
      <main className="flex-1 flex flex-col relative border-r border-gray-200">
        {/* Cabecera del Visor */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 z-10">
          <Link
            href={`/producto/${product.id}`}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-andean-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al producto
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={resetView}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded text-sm text-gray-500 hover:border-andean-black hover:text-andean-black transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Reiniciar vista
            </button>
          </div>
        </div>

        {/* Área de la Imagen / Video Interactivo */}
        <div
          className={`flex-1 relative w-full h-full select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={(e: ReactMouseEvent) => handleDragStart(e.clientX)}
          onMouseMove={(e: ReactMouseEvent) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e: ReactTouchEvent) =>
            handleDragStart(e.touches[0].clientX)
          }
          onTouchMove={(e: ReactTouchEvent) =>
            handleDragMove(e.touches[0].clientX)
          }
          onTouchEnd={handleDragEnd}
        >
          {isVideoProduct ? (
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <video
                ref={videoRef}
                src={videoUrl}
                poster={posterUrl}
                muted
                playsInline
                preload="auto"
                className="max-w-full max-h-full object-contain pointer-events-none"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
              <img
                src={currentImageUrl}
                alt={`${product.name} - Vista 360`}
                draggable={false}
                className="max-w-full max-h-full object-contain pointer-events-none"
              />
            </div>
          )}

          {/* Indicador de carga */}
          {!isReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-50/80 z-20">
              <p className="text-xs font-medium text-gray-500 animate-pulse">
                Cargando vista 360°…
              </p>
            </div>
          )}

          {/* Indicadores sobre la imagen */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-white/80 backdrop-blur text-xs font-medium text-andean-black rounded-full shadow-sm pointer-events-none">
            Arrastra horizontalmente para rotar el producto
          </div>
        </div>
      </main>

      {/* ── Panel Derecho: Info & Recomendador ── */}
      <aside className="w-96 flex flex-col bg-white overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <p className="text-[10px] tracking-widest uppercase text-inca-gold font-semibold mb-1">
            {product.category}
          </p>
          <h1 className="font-display text-2xl leading-tight text-andean-black mb-2">
            {product.name}
          </h1>
          <p className="text-xl font-bold text-andean-black mb-4">
            S/ {product.price}
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Recomendador de Tallas */}
        <div className="p-6 border-b border-gray-200 bg-stone-50">
          <div className="flex items-center gap-2 mb-4">
            <Ruler className="w-5 h-5 text-inca-gold" />
            <h3 className="font-semibold text-andean-black uppercase tracking-wider text-sm">
              Recomendador de Talla
            </h3>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            Ingresa tu peso y estatura para que podamos sugerirte la talla ideal
            para este modelo.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">
                Peso (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ej. 70"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">
                Estatura (cm)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Ej. 175"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold"
              />
            </div>
          </div>

          {recommendedSize && (
            <div className="bg-white border border-gray-200 p-4 rounded text-center shadow-sm">
              <p className="text-xs text-gray-500 mb-1">
                Tu talla recomendada es
              </p>
              <p className="text-2xl font-bold text-andean-black">
                {recommendedSize}
              </p>
            </div>
          )}
        </div>

        {/* Detalles Adicionales y Añadir al Carrito */}
        <div className="p-6 mt-auto">
          <div className="bg-wiphala-red/5 p-4 rounded mb-6 border border-wiphala-red/10 flex items-start gap-3">
            <Info className="w-5 h-5 text-wiphala-red flex-shrink-0" />
            <p className="text-xs text-wiphala-red/90 leading-relaxed">
              Estás viendo las fotografías originales de esta prenda en alta
              resolución. Al seleccionar una talla, estás garantizando el tejido
              y ajuste mostrados.
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center gap-2 py-4 text-sm font-bold tracking-widest uppercase rounded transition-all shadow-md ${
              addedFeedback
                ? "bg-coca-green text-white"
                : "bg-andean-black text-wool-cream hover:bg-inca-gold hover:text-andean-black"
            }`}
          >
            {addedFeedback ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> ¡Añadido al carrito!
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" /> Agregar al carrito{" "}
                {recommendedSize ? `(Talla ${recommendedSize})` : ""}
              </>
            )}
          </button>
        </div>
      </aside>
    </div>
  );
}
