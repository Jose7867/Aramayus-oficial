"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@components/shared/ProductCard";
import { useFeaturedProductsQuery } from "@/hooks/useCatalogQueries";

export function FeaturedProducts() {
  const { data: products = [] } = useFeaturedProductsQuery();
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const visible = 3;

  const next = () =>
    setIdx((i) =>
      products.length > 0
        ? (i + 1) % Math.max(1, products.length - visible + 1)
        : 0,
    );
  const prev = () => setIdx((i) => Math.max(0, i - 1));

  useEffect(() => {
    if (products.length <= visible) return;
    timerRef.current = setInterval(next, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [products.length]);

  if (products.length === 0) return null;

  return (
    <section className="py-16 bg-wool-cream">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="section-eyebrow">Lo más querido</p>
          <h2 className="font-display text-4xl">Productos Destacados</h2>
        </div>
        <div className="relative">
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white border border-gray-100 rounded-full flex items-center justify-center hover:border-inca-gold transition-colors shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="overflow-hidden px-10">
            <div
              className="flex gap-6 transition-transform duration-500"
              style={{ transform: `translateX(-${idx * (100 / visible)}%)` }}
            >
              {products.map((p) => (
                <div
                  key={p.id}
                  className="min-w-[calc(33.33%-1rem)] flex-shrink-0"
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={next}
            aria-label="Siguiente"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white border border-gray-100 rounded-full flex items-center justify-center hover:border-inca-gold transition-colors shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({
            length: Math.max(1, products.length - visible + 1),
          }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Ir a slide ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-inca-gold" : "bg-inca-gold/25"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
