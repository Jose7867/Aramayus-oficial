"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Heart,
  ArrowLeft,
  Shirt,
  Ruler,
  Package,
  Tag,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useCartStore } from "@store/cartStore";
import { useProductsQuery } from "@/hooks/useCatalogQueries";
import { findProductById } from "@/lib/productLookup";

// ─── Mapa de nombres de colores ───────────────────────────────────────────────
const COLOR_NAMES: Record<string, string> = {
  "#8B1A1A": "Rojo Andino",
  "#2D5A3D": "Verde Coca",
  "#C8860A": "Dorado Inca",
  "#7B5EA7": "Morado Wiphala",
  "#F5F0E8": "Crema Natural",
  "#1A0A00": "Negro Obsidiana",
};

function AccordionItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left text-sm font-semibold text-andean-black tracking-wide"
      >
        {title}
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>
      {open && (
        <div className="pb-4 text-sm text-gray-600 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data: products = [], isLoading } = useProductsQuery({ limit: 50 });
  const product = findProductById(products, productId);

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [activeImg, setActiveImg] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    if (product) {
      if (product.colors.length === 1 && !selectedColor)
        setSelectedColor(product.colors[0]);
      if (product.sizes.length === 1 && !selectedSize)
        setSelectedSize(product.sizes[0]);
    }
  }, [product, selectedColor, selectedSize]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-500">
        <p className="text-lg">Cargando producto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-500">
        <p className="text-lg">Producto no encontrado</p>
        <Link
          href="/catalogo"
          className="btn-dark px-6 py-2 text-xs uppercase tracking-widest"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) return;
    addItem({ ...product, colors: [selectedColor], sizes: [selectedSize] });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const handleGoToProbador = () => {
    router.push(`/probador?product=${encodeURIComponent(String(product.id))}`);
  };

  const canAdd = !!selectedColor && !!selectedSize;

  return (
    <div className="min-h-screen bg-stone-50/30">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-inca-gold transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link
            href="/catalogo"
            className="hover:text-inca-gold transition-colors"
          >
            Catálogo
          </Link>
          <span>/</span>
          <Link
            href={`/catalogo?category=${product.category}`}
            className="hover:text-inca-gold transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-andean-black font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-andean-black transition-colors mb-6 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ── Galería de imágenes / Visor 360° ── */}
          <div className="flex flex-col gap-3">
            {/* Galería de fotos (sin Vista 360) */}
            <div className="flex gap-3">
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex flex-col gap-2 w-16">
                  {product.images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`relative w-16 h-20 overflow-hidden rounded-sm border-2 transition-all ${
                        activeImg === i
                          ? "border-inca-gold"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`${product.name} ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main image */}
              <div className="flex-1 relative aspect-[3/4] rounded-sm overflow-hidden bg-stone-100 shadow-md group">
                <Image
                  src={product.images[activeImg] || product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                />
                {product.tag && (
                  <span
                    className={`absolute top-4 left-4 text-[9px] px-2.5 py-1.5 font-bold tracking-widest uppercase rounded-sm ${
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
                {/* Wishlist */}
                <button
                  onClick={() => setWishlist(!wishlist)}
                  className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${wishlist ? "fill-wiphala-red text-wiphala-red" : "text-gray-400"}`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* ── Información del producto ── */}
          <div className="flex flex-col">
            {/* Categoría y nombre */}
            <p className="text-[10px] tracking-widest uppercase text-inca-gold font-semibold mb-2">
              {product.category}
            </p>
            <h1 className="font-display text-3xl leading-tight text-andean-black mb-3">
              {product.name}
            </h1>

            {/* Precio */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-2xl font-bold text-andean-black">
                S/ {product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base line-through text-gray-400">
                    S/ {product.originalPrice}
                  </span>
                  <span className="text-xs bg-wiphala-red/10 text-wiphala-red px-2 py-0.5 rounded-sm font-semibold">
                    -
                    {Math.round(
                      (1 - product.price / product.originalPrice) * 100,
                    )}
                    %
                  </span>
                </>
              )}
            </div>

            {/* Descripción corta */}
            <p className="text-sm text-gray-600 leading-relaxed mb-6 border-l-2 border-inca-gold/40 pl-4">
              {product.description}
            </p>

            {/* ── Selector de color ── */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-widest font-semibold text-andean-black">
                  Color
                </span>
                {selectedColor && (
                  <span className="text-xs text-gray-500">
                    {COLOR_NAMES[selectedColor] || selectedColor}
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                {product.colors.map((hex) => (
                  <button
                    key={hex}
                    onClick={() => setSelectedColor(hex)}
                    title={COLOR_NAMES[hex] || hex}
                    className={`w-9 h-9 rounded-full border-2 transition-all hover:scale-110 ${
                      selectedColor === hex
                        ? "border-andean-black scale-110 ring-2 ring-offset-2 ring-andean-black"
                        : "border-transparent hover:border-gray-300"
                    }`}
                    style={{ background: hex }}
                  />
                ))}
              </div>
            </div>

            {/* ── Selector de talla ── */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-widest font-semibold text-andean-black">
                  Talla
                </span>
                <button className="text-xs text-gray-400 hover:text-inca-gold transition-colors flex items-center gap-1">
                  <Ruler className="w-3 h-3" /> Guía de tallas
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] px-4 py-2 text-[11px] font-semibold border rounded-sm transition-all ${
                      selectedSize === size
                        ? "bg-andean-black text-wool-cream border-andean-black"
                        : "border-gray-200 text-gray-600 hover:border-andean-black hover:text-andean-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {(!selectedColor || !selectedSize) && (
                <p className="text-[11px] text-gray-400 mt-2">
                  {!selectedColor && !selectedSize
                    ? "* Selecciona color y talla"
                    : !selectedColor
                      ? "* Selecciona un color"
                      : "* Selecciona una talla"}
                </p>
              )}
            </div>

            {/* ── Botones de acción ── */}
            <div className="flex flex-col gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={!canAdd}
                className={`flex items-center justify-center gap-2 py-3.5 text-sm font-semibold tracking-widest uppercase rounded-sm transition-all ${
                  addedFeedback
                    ? "bg-coca-green text-white"
                    : canAdd
                      ? "bg-andean-black text-wool-cream hover:bg-inca-gold hover:text-andean-black"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {addedFeedback ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> ¡Añadido al carrito!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Agregar al carrito
                  </>
                )}
              </button>

              {/* Botón al Probador Virtual */}
              {product.category.toLowerCase() !== "accesorios" && (
                <button
                  onClick={handleGoToProbador}
                  className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold tracking-widest uppercase rounded-sm border-2 border-inca-gold text-inca-gold hover:bg-inca-gold hover:text-andean-black transition-all"
                >
                  <Shirt className="w-4 h-4" />
                  Probarme esta prenda
                </button>
              )}
            </div>

            {/* ── Características rápidas ── */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: Tag, label: "Material", value: product.material },
                { icon: Package, label: "Peso", value: `${product.weight}g` },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-stone-50 rounded-sm px-4 py-3 border border-gray-100"
                >
                  <Icon className="w-4 h-4 text-inca-gold flex-shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-andean-black">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Acordeones de detalle ── */}
            <div className="border-t border-gray-100 mt-2">
              <AccordionItem title="Descripción completa">
                <p>{product.description}</p>
                <p className="mt-3">
                  Cada pieza es elaborada a mano por artesanas peruanas usando
                  técnicas ancestrales transmitidas de generación en generación.
                  La variación natural en colores y texturas es parte de la
                  autenticidad y el valor artesanal de este producto.
                </p>
              </AccordionItem>
              <AccordionItem title="Composición y cuidados">
                <ul className="space-y-1.5 list-none">
                  <li>
                    • <strong>Material:</strong> {product.material}
                  </li>
                  <li>• Lavar a mano con agua fría</li>
                  <li>• No usar blanqueadores</li>
                  <li>• Secar en horizontal a la sombra</li>
                  <li>• Planchar a temperatura baja</li>
                </ul>
              </AccordionItem>
              <AccordionItem title="Envíos y devoluciones">
                <ul className="space-y-1.5 list-none">
                  <li>• Envíos a todo el Perú en 3–5 días hábiles</li>
                  <li>• Envíos internacionales disponibles</li>
                  <li>• Devoluciones gratis hasta 30 días</li>
                  <li>• Producto 100% auténtico con certificado artesanal</li>
                </ul>
              </AccordionItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
