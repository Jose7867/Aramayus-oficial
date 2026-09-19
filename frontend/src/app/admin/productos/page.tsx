"use client";
import { useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Search, Filter, Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { productsApi } from "@/services/api";
import { useProductsQuery } from "@/hooks/useCatalogQueries";

export default function ProductosPage() {
  const queryClient = useQueryClient();
  const { data: products = [], isLoading: loading } = useProductsQuery({
    limit: 50,
  });
  const [search, setSearch] = useState("");

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) return;
    try {
      await productsApi.delete(id);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (error) {
      console.error("Failed to delete product", error);
      alert("Error al eliminar producto");
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  const getTotalStock = (stock: any) => {
    if (!stock) return 0;
    let total = 0;
    Object.values(stock).forEach((colors: any) => {
      Object.values(colors).forEach((qty: any) => {
        total += Number(qty);
      });
    });
    return total;
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display text-andean-black">Productos</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestiona tu catálogo de prendas y accesorios.
          </p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="btn-primary flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" /> Nuevo Producto
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o categoría..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-inca-gold transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors text-gray-600 font-medium shrink-0">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Producto</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4">Precio</th>
                <th className="px-6 py-4">Stock Total</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Cargando productos...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No se encontraron productos.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-sm bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          {product.images[0] && (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-andean-black">
                            {product.name}
                          </div>
                          <div className="text-[10px] text-gray-400 mt-0.5">
                            ID: {product.id.slice(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      S/ {product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      {getTotalStock(product.stock) > 0 ? (
                        <span className="text-gray-600">
                          {getTotalStock(product.stock)} uds.
                        </span>
                      ) : (
                        <span className="text-red-500 font-medium">
                          Agotado
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-[10px] uppercase tracking-wide font-semibold rounded-sm ${product.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}
                      >
                        {product.active ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/productos/${product.id}`}
                          className="p-2 text-gray-400 hover:text-inca-gold transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
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

        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 bg-gray-50/50">
          <div>
            Mostrando {filteredProducts.length} de {products.length} productos
          </div>
          <div className="flex items-center gap-1">
            <button
              className="px-3 py-1 border border-gray-200 rounded-sm hover:bg-white disabled:opacity-50"
              disabled
            >
              Anterior
            </button>
            <button
              className="px-3 py-1 border border-gray-200 rounded-sm hover:bg-white disabled:opacity-50"
              disabled
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
