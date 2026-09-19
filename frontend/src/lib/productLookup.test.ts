import test from "node:test";
import assert from "node:assert/strict";
import { findProductById } from "./productLookup";
import { resolveProductVideoUrl } from "./productAssetPaths";

const products = [
  {
    id: "1",
    name: "Chompa",
    model: "chompa",
    category: "Chompas",
    price: 100,
    images: [],
    colors: ["#000"],
    sizes: ["M"],
    stock: {},
    material: "Alpaca",
    weight: 100,
    featured: true,
    active: true,
    createdAt: "",
  },
  {
    id: "9",
    name: "Milano",
    model: "milano",
    category: "Vestidos",
    price: 210,
    images: [],
    colors: ["#000"],
    sizes: ["M"],
    stock: {},
    material: "Seda",
    weight: 100,
    featured: true,
    active: true,
    createdAt: "",
  },
];

test("encuentra producto por id exacto", () => {
  assert.equal(findProductById(products, "9")?.name, "Milano");
});

test("encuentra producto por modelo cuando llega la ruta", () => {
  assert.equal(findProductById(products, "milano")?.id, "9");
});

test("resuelve el video desde la carpeta real de la imagen del producto", () => {
  const product = {
    id: "9",
    name: "Milano",
    model: "milano",
    images: ["/images/products/Milano/milano.jpeg"],
    video360: undefined,
  };

  assert.equal(
    resolveProductVideoUrl(product),
    "/images/products/Milano/rotacion-360.mp4",
  );
});
