import { useQuery } from "@tanstack/react-query";
import { api, productsApi } from "@/services/api";
import { PRODUCTS } from "@/data/products";
import type { Product } from "@/types/product";

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
};

function asArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.filter(Boolean).map(String) : [];
    } catch {
      return value ? [value] : [];
    }
  }
  return [];
}

function normalizeProduct(
  product: Partial<Product> & Record<string, unknown>,
): Product {
  const source = product as Record<string, unknown>;
  const images = asArray(source.images);
  const colors = asArray(source.colors);
  const sizes = asArray(source.sizes);

  return {
    id: String(source.id ?? ""),
    name: String(source.name ?? "Producto"),
    description: String(source.description ?? ""),
    category: String(source.category ?? "General"),
    price: Number(source.price ?? 0),
    originalPrice: source.originalPrice
      ? Number(source.originalPrice)
      : undefined,
    images: images.length ? images : ["/images/products/chompa-wari.jpeg"],
    video360:
      typeof source.video360 === "string" && source.video360.trim() !== ""
        ? source.video360
        : undefined,
    colors: colors.length ? colors : ["#8B1A1A"],
    sizes: sizes.length ? sizes : ["M"],
    stock:
      typeof source.stock === "string"
        ? (() => {
            try {
              return JSON.parse(source.stock);
            } catch {
              return {};
            }
          })()
        : ((source.stock as
            | Record<string, Record<string, number>>
            | undefined) ?? {}),
    material: String(source.material ?? ""),
    weight: Number(source.weight ?? 0),
    tag: (source.tag as Product["tag"]) || undefined,
    model: typeof source.model === "string" ? source.model : undefined,
    featured: Boolean(source.featured),
    active: source.active !== false,
    createdAt: String(source.createdAt ?? ""),
  };
}

export function useCategoriesQuery() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await api.get("/categories");
      return Array.isArray(data) ? data : [];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useProductsQuery(params?: Record<string, unknown>) {
  return useQuery<Product[]>({
    queryKey: ["products", params ?? {}],
    queryFn: async () => {
      const { data } = await productsApi.getAll(params ?? {});
      const apiProducts = Array.isArray(data?.products)
        ? data.products
        : Array.isArray(data)
          ? data
          : [];

      if (apiProducts.length === 0) {
        return PRODUCTS;
      }

      return apiProducts.map(
        (product: Partial<Product> & Record<string, unknown>) =>
          normalizeProduct(product),
      );
    },
    staleTime: 60 * 1000,
  });
}

export function useFeaturedProductsQuery() {
  return useQuery<Product[]>({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data } = await productsApi.getFeatured();
      const products = Array.isArray(data) ? data : [];
      return products.length > 0
        ? products.map(
            (product: Partial<Product> & Record<string, unknown>) =>
              normalizeProduct(product),
          )
        : PRODUCTS.filter((product) => product.featured);
    },
    staleTime: 5 * 60 * 1000,
  });
}
