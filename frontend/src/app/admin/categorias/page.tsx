"use client";
import { useState } from "react";
import { Edit, Trash2, Plus, Image as ImageIcon, Save, X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useCategoriesQuery, type Category } from "@/hooks/useCatalogQueries";

export default function CategoriasPage() {
  const queryClient = useQueryClient();
  const { data: categories = [], isLoading: loading } = useCategoriesQuery();
  const [isEditing, setIsEditing] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleEdit = (category: Category) => {
    setIsEditing(category.id);
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image,
    });
  };

  const handleCancel = () => {
    setIsEditing(null);
    setFormData({ name: "", description: "", image: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && isEditing !== "new") {
        await api.put(`/categories/${isEditing}`, formData);
      } else {
        await api.post("/categories", formData);
      }
      handleCancel();
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    } catch (error) {
      console.error("Error saving category", error);
      alert("Error al guardar la categoría");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta categoría?"))
      return;
    try {
      await api.delete(`/categories/${id}`);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    } catch (error) {
      console.error("Failed to delete category", error);
      alert("Error al eliminar categoría");
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display text-andean-black">
            Categorías
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Organiza tus productos en categorías para facilitar la navegación.
          </p>
        </div>
        <button
          onClick={() => {
            setIsEditing("new");
            setFormData({ name: "", description: "", image: "" });
          }}
          className="btn-primary flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" /> Nueva Categoría
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-medium border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Imagen</th>
                  <th className="px-6 py-4">Nombre</th>
                  <th className="px-6 py-4 hidden md:table-cell">
                    Descripción
                  </th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      Cargando categorías...
                    </td>
                  </tr>
                ) : categories.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No hay categorías.
                    </td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr
                      key={cat.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 rounded-sm bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                          {cat.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-andean-black">
                        {cat.name}
                      </td>
                      <td className="px-6 py-4 text-gray-500 hidden md:table-cell truncate max-w-[200px]">
                        {cat.description}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(cat)}
                            className="p-2 text-gray-400 hover:text-inca-gold transition-colors"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(cat.id)}
                            className="p-2 text-gray-400 hover:text-wiphala-red transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar / Form Area */}
        <div>
          {isEditing && (
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 sticky top-6 animate-fade-in">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-andean-black uppercase tracking-widest">
                  {isEditing === "new" ? "Nueva Categoría" : "Editar Categoría"}
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="input-base w-full"
                    placeholder="Ej. Accesorios"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="input-base w-full resize-none"
                    placeholder="Breve descripción de la categoría..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    URL de Imagen
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="input-base w-full"
                    placeholder="https://..."
                  />
                  {formData.image && (
                    <div className="mt-2 w-full h-24 rounded-sm border border-gray-200 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    className="w-full btn-dark flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Guardar
                  </button>
                </div>
              </form>
            </div>
          )}
          {!isEditing && (
            <div className="bg-gray-50 border border-gray-200 border-dashed rounded-sm p-8 text-center text-gray-500">
              Selecciona una categoría para editarla o crea una nueva.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
