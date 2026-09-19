type ProductLike = {
  images?: string[];
  model?: string;
  name?: string;
  video360?: string;
};

export function resolveProductAssetFolder(
  product?: ProductLike | null,
): string | null {
  const directFolder = product?.images
    ?.find(Boolean)
    ?.match(/\/images\/products\/([^/]+)\/[^/]+$/)?.[1];

  if (directFolder) {
    const normalized = directFolder.trim();
    if (normalized.toLowerCase() === "milano") return "Milano";
    return normalized;
  }

  const fallbackName = (product?.model ?? product?.name ?? "")
    .trim()
    .replace(/\s+/g, " ");

  if (!fallbackName) return null;

  const normalizedFallback =
    fallbackName.toLowerCase() === "milano" ? "Milano" : fallbackName;

  return normalizedFallback;
}

export function resolveProductVideoUrl(product?: ProductLike | null): string {
  if (product?.video360) return product.video360;

  const folder = resolveProductAssetFolder(product);
  if (!folder) return "";

  return `/images/products/${folder}/rotacion-360.mp4`;
}
