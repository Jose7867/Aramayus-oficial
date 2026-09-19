"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart, Eye } from "lucide-react";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
}

const FALLBACK_IMAGE = "/images/products/chompa-wari.jpeg";

export function ProductCard({ product }: Props) {
  const imageSrc = product.images?.[0] || FALLBACK_IMAGE;
  const colors = product.colors?.length ? product.colors : ["#8B1A1A"];

  return (
    <div className="card group cursor-pointer">
      <div className="relative overflow-hidden">
        <Link href={`/producto/${product.id}`}>
          <Image
            src={imageSrc}
            alt={product.name}
            width={400}
            height={500}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        {product.tag && (
          <span
            className={`absolute top-3 left-3 text-[9px] px-2 py-1 font-semibold tracking-wide rounded-sm
            ${
              product.tag === "Nuevo"
                ? "bg-coca-green text-green-100"
                : product.tag === "Promo"
                  ? "bg-wiphala-red text-red-100"
                  : "bg-inca-gold text-andean-black"
            }`}
          >
            {product.tag}
          </span>
        )}
        <button
          className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Agregar a favoritos"
        >
          <Heart className="w-3.5 h-3.5 text-wiphala-red" />
        </button>
      </div>
      <div className="p-4">
        <Link href={`/producto/${product.id}`}>
          <p className="text-[10px] tracking-widest uppercase text-wiphala-red mb-1">
            {product.category}
          </p>
          <h3 className="font-display text-base leading-tight mb-2 hover:text-inca-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex gap-1.5 mb-3">
          {colors.slice(0, 4).map((c) => (
            <div
              key={c}
              className="w-3 h-3 rounded-full border border-black/10"
              style={{ background: c }}
            />
          ))}
          {colors.length > 4 && (
            <span className="text-[10px] text-gray-400 self-center">+{colors.length - 4}</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold">S/ {product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs line-through text-gray-400 ml-2">
                S/ {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {/* BUG-004: navegar al PDP para seleccionar variante antes de agregar */}
          <Link
            href={`/producto/${product.id}`}
            className="bg-andean-black text-wool-cream px-3 py-1.5 text-[10px] tracking-widest uppercase rounded-sm hover:bg-inca-gold hover:text-andean-black transition-colors flex items-center gap-1"
          >
            <Eye className="w-3 h-3" /> Ver
          </Link>
        </div>
      </div>
    </div>
  );
}
