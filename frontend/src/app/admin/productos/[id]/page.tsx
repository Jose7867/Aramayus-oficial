"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, UploadCloud, Save, Plus, X, Trash2 } from "lucide-react";
import { productsApi } from "@/services/api";

const PRESET_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Único"];
const PRESET_COLORS = [
  { name: "Negro", hex: "#1A1A1A" },
  { name: "Blanco", hex: "#FFFFFF" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Rojo", hex: "#C0392B" },
  { name: "Azul", hex: "#2C3E89" },
  { name: "Verde", hex: "#2D6A4F" },
  { name: "Marrón", hex: "#6B3A2A" },
  { name: "Dorado", hex: "#C8860A" },
  { name: "Morado", hex: "#7B5EA7" },
  { name: "Gris", hex: "#757575" },
];

type ColorEntry = { name: string; hex: string };

export default function EditarProductoPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [video360, setVideo360] = useState<File | null>(null);
  const [video360Url, setVideo360Url] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    original_price: "",
    description: "",
    material: "",
    weight: "",
    tag: "",
    featured: false,
    active: true,
  });

  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<ColorEntry[]>([]);
  const [customSize, setCustomSize] = useState("");
  const [customColorHex, setCustomColorHex] = useState("#000000");
  const [customColorName, setCustomColorName] = useState("");
  const [stock, setStock] = useState<Record<string, Record<string, number>>>(
    {},
  );

  // ─── Load product ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!productId) return;
    productsApi
      .getById(productId)
      .then(({ data }) => {
        setFormData({
          name: data.name || "",
          category: data.category || "",
          price: data.price || "",
          original_price: data.originalPrice || data.original_price || "",
          description: data.description || "",
          material: data.material || "",
          weight: data.weight || "",
          tag: data.tag || "",
          featured: Boolean(data.featured),
          active: data.active !== false && data.active !== 0,
        });

        // Load sizes
        const rawSizes: string[] =
          typeof data.sizes === "string"
            ? JSON.parse(data.sizes || "[]")
            : data.sizes || [];
        setSizes(rawSizes);

        // Load colors — map raw hex values to ColorEntry objects with names
        const rawColors: string[] =
          typeof data.colors === "string"
            ? JSON.parse(data.colors || "[]")
            : data.colors || [];
        const colorEntries: ColorEntry[] = rawColors.map((hex) => {
          const preset = PRESET_COLORS.find(
            (p) => p.hex.toLowerCase() === hex.toLowerCase(),
          );
          return preset || { name: hex, hex };
        });
        setColors(colorEntries);

        // Load stock
        const rawStock =
          typeof data.stock === "string"
            ? JSON.parse(data.stock || "{}")
            : data.stock || {};
        setStock(rawStock);

        // Load images
        if (data.images) {
          const imgs: string[] =
            typeof data.images === "string"
              ? JSON.parse(data.images)
              : data.images;
          setImageUrls(imgs);
        }

        if (data.video360) setVideo360Url(data.video360);
        setLoadingData(false);
      })
      .catch(() => setLoadingData(false));
  }, [productId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  // ─── Images ─────────────────────────────────────────────────────────────────
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles]);
      setImageUrls((prev) => [
        ...prev,
        ...newFiles.map((f) => URL.createObjectURL(f)),
      ]);
    }
  };

  const removeImage = (i: number) => {
    const url = imageUrls[i];
    if (url.startsWith("blob:")) URL.revokeObjectURL(url);
    setImages((prev) => {
      // only File[] entries correspond to blob: URLs
      const blobUrls = imageUrls.filter((u) => u.startsWith("blob:"));
      const blobIdx = blobUrls.indexOf(url);
      if (blobIdx >= 0) {
        const newFiles = [...prev];
        newFiles.splice(blobIdx, 1);
        return newFiles;
      }
      return prev;
    });
    setImageUrls((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setVideo360(file);
      setVideo360Url(URL.createObjectURL(file));
    }
  };

  const removeVideo = () => {
    if (video360Url.startsWith("blob:")) URL.revokeObjectURL(video360Url);
    setVideo360(null);
    setVideo360Url("");
  };

  // ─── Sizes ──────────────────────────────────────────────────────────────────
  const toggleSize = (s: string) =>
    setSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );

  const addCustomSize = () => {
    const s = customSize.trim().toUpperCase();
    if (s && !sizes.includes(s)) setSizes((prev) => [...prev, s]);
    setCustomSize("");
  };

  const removeSize = (s: string) =>
    setSizes((prev) => prev.filter((x) => x !== s));

  // ─── Colors ─────────────────────────────────────────────────────────────────
  const addPresetColor = (c: ColorEntry) => {
    if (!colors.some((x) => x.hex === c.hex)) setColors((prev) => [...prev, c]);
  };

  const addCustomColor = () => {
    const name = customColorName.trim() || customColorHex;
    if (!colors.some((x) => x.hex === customColorHex)) {
      setColors((prev) => [...prev, { name, hex: customColorHex }]);
    }
    setCustomColorName("");
  };

  const removeColor = (hex: string) =>
    setColors((prev) => prev.filter((c) => c.hex !== hex));

  // ─── Stock ──────────────────────────────────────────────────────────────────
  const handleStockChange = (size: string, colorHex: string, qty: number) => {
    setStock((prev) => ({
      ...prev,
      [size]: { ...(prev[size] || {}), [colorHex]: qty },
    }));
  };

  // ─── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, String(v)));

      data.append("colors", JSON.stringify(colors.map((c) => c.hex)));
      data.append("sizes", JSON.stringify(sizes));
      data.append("stock", JSON.stringify(stock));

      // Existing backend images (not blobs)
      const existingImages = imageUrls.filter(
        (url) => !url.startsWith("blob:"),
      );
      data.append("existing_images", JSON.stringify(existingImages));

      // New uploaded images
      images.forEach((img) => data.append("images", img));

      if (video360) {
        data.append("video360", video360);
      } else if (!video360Url) {
        data.append("remove_video", "true");
      }

      await productsApi.update(productId, data);
      router.push("/admin/productos");
    } catch (error: any) {
      console.error("Error al actualizar producto", error);
      const msg =
        error?.response?.data?.message || error?.message || "Error desconocido";
      alert(`Error al actualizar: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-inca-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/productos"
          className="p-2 border border-gray-200 rounded-sm hover:bg-white transition-colors text-gray-500"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-display text-andean-black">
            Editar Producto
          </h1>
          <p className="text-sm text-gray-500 mt-1">{formData.name}</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* ── Col izquierda (2/3) ──────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Info general */}
          <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-andean-black uppercase tracking-widest mb-4 pb-2 border-b border-gray-100">
              Información General
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Nombre del producto <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-base w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="input-base w-full resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Material
                  </label>
                  <input
                    type="text"
                    name="material"
                    value={formData.material}
                    onChange={handleInputChange}
                    className="input-base w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Peso (gramos)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="input-base w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tallas y Colores */}
          <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm space-y-6">
            <h2 className="text-sm font-semibold text-andean-black uppercase tracking-widest pb-2 border-b border-gray-100">
              Tallas y Colores
            </h2>

            {/* Tallas */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Tallas Disponibles
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {PRESET_SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSize(s)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-sm border transition-all ${
                      sizes.includes(s)
                        ? "bg-andean-black text-white border-andean-black"
                        : "bg-white text-gray-600 border-gray-200 hover:border-andean-black"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customSize}
                  onChange={(e) => setCustomSize(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustomSize();
                    }
                  }}
                  className="input-base w-32 uppercase"
                  placeholder="Otra talla"
                />
                <button
                  type="button"
                  onClick={addCustomSize}
                  className="p-2 border border-gray-200 rounded-sm hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {sizes.filter((s) => !PRESET_SIZES.includes(s)).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {sizes
                    .filter((s) => !PRESET_SIZES.includes(s))
                    .map((s) => (
                      <div
                        key={s}
                        className="flex items-center gap-1 bg-andean-black/5 border border-andean-black/20 px-3 py-1 rounded-sm text-xs font-medium text-andean-black"
                      >
                        {s}
                        <button
                          type="button"
                          onClick={() => removeSize(s)}
                          className="ml-1"
                        >
                          <X className="w-3 h-3 hover:text-red-500" />
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Colores */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Colores Disponibles
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => addPresetColor(c)}
                    title={c.name}
                    className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                      colors.some((x) => x.hex === c.hex)
                        ? "border-andean-black scale-110 ring-2 ring-andean-black/30"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customColorHex}
                  onChange={(e) => setCustomColorHex(e.target.value)}
                  className="h-9 w-10 cursor-pointer p-0 border-0 rounded-sm"
                />
                <input
                  type="text"
                  value={customColorName}
                  onChange={(e) => setCustomColorName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustomColor();
                    }
                  }}
                  placeholder="Nombre del color (ej. Turquesa)"
                  className="input-base flex-1"
                />
                <button
                  type="button"
                  onClick={addCustomColor}
                  className="p-2 border border-gray-200 rounded-sm hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {colors.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {colors.map((c) => (
                    <div
                      key={c.hex}
                      className="flex items-center gap-2 bg-gray-100 pl-2 pr-1 py-1 rounded-sm text-xs border border-gray-200"
                    >
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-gray-700">{c.name}</span>
                      <button
                        type="button"
                        onClick={() => removeColor(c.hex)}
                        className="p-0.5"
                      >
                        <X className="w-3 h-3 text-gray-500 hover:text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tabla de stock */}
            {sizes.length > 0 && (
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-xs font-semibold text-andean-black uppercase tracking-widest mb-3">
                  Stock por Variante
                </h3>
                <div className="overflow-x-auto border border-gray-200 rounded-sm">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-2.5 font-medium text-gray-500">
                          Talla
                        </th>
                        {colors.length > 0 ? (
                          colors.map((c) => (
                            <th
                              key={c.hex}
                              className="px-4 py-2.5 font-medium text-gray-500 text-center"
                            >
                              <div className="flex items-center justify-center gap-1.5">
                                <div
                                  className="w-3 h-3 rounded-full border border-gray-300"
                                  style={{ backgroundColor: c.hex }}
                                />
                                <span>{c.name}</span>
                              </div>
                            </th>
                          ))
                        ) : (
                          <th className="px-4 py-2.5 font-medium text-gray-500 text-center">
                            Cantidad
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {sizes.map((size) => (
                        <tr key={size} className="hover:bg-gray-50/50">
                          <td className="px-4 py-3 font-semibold text-gray-700">
                            {size}
                          </td>
                          {colors.length > 0 ? (
                            colors.map((c) => (
                              <td key={c.hex} className="px-4 py-3 text-center">
                                <input
                                  type="number"
                                  min="0"
                                  value={stock[size]?.[c.hex] ?? 0}
                                  onChange={(e) =>
                                    handleStockChange(
                                      size,
                                      c.hex,
                                      parseInt(e.target.value) || 0,
                                    )
                                  }
                                  className="w-16 px-2 py-1 text-center border border-gray-200 rounded-sm focus:border-inca-gold focus:outline-none"
                                />
                              </td>
                            ))
                          ) : (
                            <td className="px-4 py-3 text-center">
                              <input
                                type="number"
                                min="0"
                                value={stock[size]?.["default"] ?? 0}
                                onChange={(e) =>
                                  handleStockChange(
                                    size,
                                    "default",
                                    parseInt(e.target.value) || 0,
                                  )
                                }
                                className="w-16 px-2 py-1 text-center border border-gray-200 rounded-sm focus:border-inca-gold focus:outline-none"
                              />
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Media */}
          <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-andean-black uppercase tracking-widest mb-4 pb-2 border-b border-gray-100">
              Imágenes y Video
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Imágenes del producto
                </label>
                <label className="border-2 border-dashed border-gray-200 rounded-sm p-6 text-center hover:border-inca-gold transition-colors cursor-pointer flex flex-col items-center gap-2 bg-stone-50">
                  <UploadCloud className="w-8 h-8 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    Haz clic para añadir más imágenes
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {imageUrls.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3">
                    {imageUrls.map((url, i) => (
                      <div key={i} className="relative group aspect-square">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={
                            url.startsWith("blob:") || url.startsWith("/")
                              ? url
                              : `/uploads/${url}`
                          }
                          alt=""
                          className="w-full h-full object-cover rounded-sm border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Video 360°
                </label>
                {!video360Url ? (
                  <label className="border-2 border-dashed border-gray-200 rounded-sm p-4 text-center hover:border-inca-gold transition-colors cursor-pointer flex items-center gap-3 bg-stone-50">
                    <UploadCloud className="w-5 h-5 text-gray-400 shrink-0" />
                    <span className="text-xs text-gray-500">
                      Subir video MP4/WebM
                    </span>
                    <input
                      type="file"
                      accept="video/mp4,video/webm"
                      onChange={handleVideoChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative">
                    <video
                      src={video360Url}
                      className="w-full rounded-sm border border-gray-200 max-h-40 object-cover"
                      muted
                    />
                    <button
                      type="button"
                      onClick={removeVideo}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Col derecha (1/3) ────────────────────────────────── */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-andean-black uppercase tracking-widest mb-4 pb-2 border-b border-gray-100">
              Organización y Precio
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Precio (S/) <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="number"
                  step="0.01"
                  min="0"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="input-base w-full text-lg font-medium text-inca-gold"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Precio Original (tachado)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="original_price"
                  value={formData.original_price}
                  onChange={handleInputChange}
                  className="input-base w-full text-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Categoría <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="input-base w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Etiqueta
                </label>
                <select
                  name="tag"
                  value={formData.tag}
                  onChange={handleInputChange}
                  className="input-base w-full"
                >
                  <option value="">Sin etiqueta</option>
                  <option value="Nuevo">Nuevo</option>
                  <option value="Destacado">Destacado</option>
                  <option value="Promo">Promo</option>
                  <option value="Agotado">Agotado</option>
                </select>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-inca-gold focus:ring-inca-gold"
                />
                <span className="text-xs font-medium text-gray-700">
                  Producto Destacado
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-inca-gold focus:ring-inca-gold"
                />
                <span className="text-xs font-medium text-gray-700">
                  Producto Activo
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-andean-black text-white py-3 rounded-sm text-xs tracking-widest uppercase hover:bg-inca-gold transition-colors flex items-center justify-center gap-2 font-semibold shadow-sm disabled:opacity-60"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
