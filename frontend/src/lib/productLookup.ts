export type ProductLookupItem = {
  id?: string | number;
  model?: string;
  slug?: string;
  name?: string;
};

function normalize(value?: string | number): string {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

export function findProductById<T extends ProductLookupItem>(
  products: T[],
  identifier?: string | number | null,
): T | undefined {
  if (identifier === undefined || identifier === null || identifier === "") {
    return undefined;
  }

  const target = normalize(identifier);

  const exactMatch = products.find((product) => {
    const id = normalize(product.id);
    const model = normalize(product.model);
    const slug = normalize(product.slug);
    const name = normalize(product.name);

    return (
      id === target || model === target || slug === target || name === target
    );
  });

  if (exactMatch) {
    return exactMatch;
  }

  return products.find((product) => {
    const id = normalize(product.id);
    const model = normalize(product.model);
    const slug = normalize(product.slug);
    const name = normalize(product.name);

    return (
      id.includes(target) ||
      model.includes(target) ||
      slug.includes(target) ||
      name.includes(target)
    );
  });
}
