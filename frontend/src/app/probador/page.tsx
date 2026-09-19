"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const VirtualFittingRoom = dynamic(
  () =>
    import("@components/probador/VirtualFittingRoom").then(
      (mod) => mod.VirtualFittingRoom,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        Cargando probador virtual...
      </div>
    ),
  },
);
import { PRODUCTS } from "@/data/products";
import { findProductById } from "@/lib/productLookup";
import { useProductsQuery } from "@/hooks/useCatalogQueries";

function ProbadorContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");
  const { data: products = PRODUCTS, isLoading } = useProductsQuery({
    limit: 50,
  });

  const product = productId
    ? findProductById(products, productId)
    : products[0];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Cargando producto...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No se encontró el producto seleccionado.
      </div>
    );
  }

  return <VirtualFittingRoom product={product} />;
}

export default function ProbadorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Cargando probador...
        </div>
      }
    >
      <ProbadorContent />
    </Suspense>
  );
}
