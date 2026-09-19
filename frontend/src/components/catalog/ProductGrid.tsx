"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@components/shared/ProductCard";
import { useProductsQuery } from "@/hooks/useCatalogQueries";

const PAGE_SIZE = 8;

export function ProductGrid() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();

  const categoryFilter = searchParams.get("category");
  const materialFilter = searchParams.get("material");
  const ocasionFilter = searchParams.get("ocasion");
  const collectionFilter =
    searchParams.get("collection") || searchParams.get("coleccion");

  const queryParams = {
    limit: 50,
    ...(categoryFilter ? { category: categoryFilter } : {}),
    ...(sort !== "relevance" ? { sort } : {}),
  };

  const { data: products = [] } = useProductsQuery(queryParams);

  let filteredProducts = products;

  if (materialFilter) {
    filteredProducts = filteredProducts.filter((p) =>
      p.material.toLowerCase().includes(materialFilter.toLowerCase()),
    );
  }

  if (ocasionFilter) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.description.toLowerCase().includes(ocasionFilter.toLowerCase()) ||
        p.category.toLowerCase().includes(ocasionFilter.toLowerCase()),
    );
  }

  if (collectionFilter) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.category.toLowerCase().includes(collectionFilter.toLowerCase()) ||
        p.name.toLowerCase().includes(collectionFilter.toLowerCase()),
    );
  }

  // ─── Paginación funcional (BUG-008) ──────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  // Resetear a página 1 si cambian los filtros haría que la página actual quede fuera de rango
  const safePage = Math.min(page, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          <strong className="text-andean-black">
            {filteredProducts.length}
          </strong>{" "}
          productos encontrados
        </p>
        <div className="flex items-center gap-3">
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            className="input-base text-xs py-1.5"
          >
            <option value="relevance">Más relevantes</option>
            <option value="price_asc">Precio: menor a mayor</option>
            <option value="price_desc">Precio: mayor a menor</option>
            <option value="newest">Más nuevos</option>
          </select>
          <div className="flex gap-1">
            {[
              ["grid", LayoutGrid],
              ["list", List],
            ].map(([v, Icon]) => (
              <button
                key={v as string}
                onClick={() => setView(v as "grid" | "list")}
                className={`p-1.5 border rounded-sm transition-all ${view === v ? "bg-inca-gold text-andean-black border-inca-gold" : "border-gray-200 text-gray-400"}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className={
          view === "grid"
            ? "grid grid-cols-2 xl:grid-cols-3 gap-5"
            : "flex flex-col gap-4"
        }
      >
        {paginatedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* ── Paginación funcional ── */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1 mt-10">
          <button
            onClick={() => handlePageChange(safePage - 1)}
            disabled={safePage === 1}
            className="w-8 h-8 flex items-center justify-center border rounded-sm border-gray-200 text-gray-500 hover:border-inca-gold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Página anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => handlePageChange(n)}
              aria-current={n === safePage ? "page" : undefined}
              className={`w-8 h-8 text-sm rounded-sm border transition-all ${n === safePage ? "bg-inca-gold text-andean-black border-inca-gold font-semibold" : "border-gray-200 text-gray-500 hover:border-inca-gold"}`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(safePage + 1)}
            disabled={safePage === totalPages}
            className="w-8 h-8 flex items-center justify-center border rounded-sm border-gray-200 text-gray-500 hover:border-inca-gold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Página siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

