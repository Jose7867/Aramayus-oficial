"use client";
import { useEffect, useState } from "react";
import { Info, Save, Image as ImageIcon, LayoutTemplate } from "lucide-react";
import { settingsApi, uploadsApi } from "@/services/api";

type NosotrosFormData = {
  title: string;
  subtitle: string;
  description: string;
  mission: string;
  vision: string;
  image: string;
};

const initialFormData: NosotrosFormData = {
  title: "Nuestra historia",
  subtitle: "Tejiendo cultura desde 1990",
  description:
    "Prendas artesanales únicas, elaboradas por manos peruanas con técnicas ancestrales transmitidas de generación en generación.",
  mission:
    "Preservar y revalorar el arte textil andino creando prendas de alta calidad que conecten nuestra herencia cultural con el mundo moderno.",
  vision:
    "Ser la marca referente a nivel global en moda ética y sostenible inspirada en la cosmovisión andina.",
  image: "/images/nosotros-hero.jpeg",
};

export default function NosotrosAdminPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<NosotrosFormData>(initialFormData);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  useEffect(() => {
    let isMounted = true;

    settingsApi
      .getNosotros()
      .then(({ data }) => {
        if (!isMounted) return;
        setFormData({ ...initialFormData, ...data });
      })
      .catch(console.error);

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileToUpload(file);
    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, image: previewUrl }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      let finalImageUrl = formData.image || "";
      if (fileToUpload) {
        const { data: uploadData } = await uploadsApi.uploadImage(fileToUpload);
        finalImageUrl = uploadData.url;
      }
      
      const payload = { ...formData, image: finalImageUrl };
      const { data } = await settingsApi.updateNosotros(payload);
      setFormData({ ...initialFormData, ...data });
      setFileToUpload(null);
      alert("Cambios guardados correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al guardar cambios");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-display text-andean-black flex items-center gap-2">
          <LayoutTemplate className="w-6 h-6 text-inca-gold" />
          Página Nosotros
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Gestiona la información, misión, visión y valores de la marca.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-andean-black mb-4 uppercase tracking-widest border-b border-gray-100 pb-2">
              Contenido Principal
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Título de la sección
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Subtítulo (Opcional)
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Historia / Descripción
                </label>
                <textarea
                  rows={6}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold transition-all resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-andean-black mb-4 uppercase tracking-widest border-b border-gray-100 pb-2">
              Misión y Visión
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Misión
                </label>
                <textarea
                  rows={5}
                  name="mission"
                  value={formData.mission}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Visión
                </label>
                <textarea
                  rows={5}
                  name="vision"
                  value={formData.vision}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold transition-all resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-andean-black mb-4 uppercase tracking-widest border-b border-gray-100 pb-2">
              Valores de la Marca
            </h2>
            <div className="space-y-4">
              {["Autenticidad", "Sostenibilidad", "Comercio Justo"].map(
                (valor, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row gap-3 sm:items-center"
                  >
                    <input
                      type="text"
                      defaultValue={valor}
                      className="w-full sm:w-1/3 px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold"
                    />
                    <input
                      type="text"
                      defaultValue="Nuestras prendas respetan a la comunidad y al medio ambiente..."
                      className="w-full sm:w-2/3 px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold text-gray-600"
                    />
                    <button className="text-xs text-wiphala-red hover:underline font-medium shrink-0">
                      Eliminar
                    </button>
                  </div>
                ),
              )}
              <button className="text-xs text-inca-gold font-medium hover:underline flex items-center gap-1">
                + Añadir Valor
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm sticky top-24">
            <h2 className="text-sm font-semibold text-andean-black mb-4 uppercase tracking-widest border-b border-gray-100 pb-2">
              Imagen Principal
            </h2>
            <label className="border-2 border-dashed border-gray-200 rounded-sm p-8 text-center hover:border-inca-gold transition-colors cursor-pointer group bg-stone-50 flex flex-col items-center justify-center relative overflow-hidden">
              {formData.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={formData.image}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <>
                  <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-inca-gold transition-colors" />
                  <p className="text-xs text-gray-500 font-medium">
                    Haz clic para subir una imagen
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    JPG, PNG o WEBP (Max. 2MB)
                  </p>
                </>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            <div className="mt-4">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                O usar URL de imagen
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={(e) => {
                  handleChange(e);
                  setFileToUpload(null);
                }}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-inca-gold focus:ring-1 focus:ring-inca-gold transition-colors"
              />
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-3">
              <button
                onClick={handleSave}
                disabled={loading}
                type="button"
                className="w-full bg-andean-black text-white py-3 rounded-sm text-xs tracking-widest uppercase hover:bg-inca-gold transition-colors flex items-center justify-center gap-2 font-semibold shadow-sm disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Guardar Cambios
              </button>
              <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1">
                <Info className="w-3 h-3" /> Los cambios se reflejarán en la
                web.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
