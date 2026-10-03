import { Request, Response } from "express";
import { randomUUID } from "crypto";
import { db } from "../config/database";
import {
  supabase,
  SUPABASE_BUCKET,
} from "../config/supabase";

function safeJsonParse<T>(value: unknown, fallback: T): T {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return fallback;
    try {
      const parsed = JSON.parse(trimmed);
      return parsed !== undefined ? parsed : fallback;
    } catch {
      return fallback;
    }
  }
  return (value as T) ?? fallback;
}

async function uploadToSupabase(
  file: Express.Multer.File,
  folder: string,
): Promise<string> {
  const extension = file.originalname.includes(".")
    ? file.originalname.substring(
        file.originalname.lastIndexOf("."),
      )
    : "";

  const filename = `${Date.now()}-${randomUUID()}${extension}`;

  const filePath = `${folder}/${filename}`;

  const { error } = await supabase.storage
    .from(SUPABASE_BUCKET)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(
      `Error al subir archivo a Supabase: ${error.message}`,
    );
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from(SUPABASE_BUCKET)
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function getAllProducts(req: Request, res: Response) {
  try {
    const {
      category,
      search,
      min_price,
      max_price,
      tag,
      featured,
      sort = "created_at",
      page = 1,
      limit = 12,
    } = req.query;
    let query = db("products").where("active", true);
    if (category) query = query.where("category", category);
    if (search)
      query = query.where(function () {
        this.where("name", "like", `%${search}%`).orWhere(
          "description",
          "like",
          `%${search}%`,
        );
      });
    if (min_price) query = query.where("price", ">=", Number(min_price));
    if (max_price) query = query.where("price", "<=", Number(max_price));
    if (tag) query = query.where("tag", tag);
    if (featured) query = query.where("featured", true);

    const sortMap: Record<string, [string, string]> = {
      price_asc: ["price", "asc"],
      price_desc: ["price", "desc"],
      newest: ["created_at", "desc"],
      bestseller: ["sold_count", "desc"],
    };
    const [col, dir] = sortMap[sort as string] || ["created_at", "desc"];

    const total = (await query.clone().count("* as count").first()) as any;
    const products = await query
      .orderBy(col, dir)
      .limit(Number(limit))
      .offset((Number(page) - 1) * Number(limit));
    res.json({
      products,
      total: Number(total?.count || 0),
      page: Number(page),
      limit: Number(limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener productos" });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const product = await db("products")
      .where({ id: req.params.id, active: true })
      .first();
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch {
    res.status(500).json({ message: "Error del servidor" });
  }
}

export async function getFeaturedProducts(_: Request, res: Response) {
  try {
    const products = await db("products")
      .where({ featured: true, active: true })
      .limit(8);
    res.json(products);
  } catch {
    res.status(500).json({ message: "Error del servidor" });
  }
}

export async function createProduct(req: any, res: Response) {
  try {
    const {
      name,
      description,
      category,
      price,
      original_price,
      colors,
      sizes,
      stock,
      material,
      weight,
      tag,
      featured,
    } = req.body;
    const imagesFiles = Array.isArray(req.files?.images)
      ? req.files.images
      : [];
    const videoFile = req.files?.video360?.[0];

    const images = await Promise.all(
     imagesFiles.map((file: Express.Multer.File) =>
       uploadToSupabase(file, "products"),
     ),
    );

    const video360 = videoFile
      ? await uploadToSupabase(videoFile, "videos")
      : null;

    const parsedColors = safeJsonParse(colors, []);
    const parsedSizes = safeJsonParse(sizes, []);
    const parsedStock = safeJsonParse(stock, {});

    const id = randomUUID();
    await db("products").insert({
      id,
      name,
      description,
      category,
      price: Number(price),
      original_price: original_price ? Number(original_price) : null,
      colors: JSON.stringify(parsedColors),
      sizes: JSON.stringify(parsedSizes),
      stock: JSON.stringify(parsedStock),
      material,
      weight,
      images: JSON.stringify(images),
      video360,
      tag: tag || null,
      featured: featured === "true" || featured === true ? 1 : 0,
    });
    const product = await db("products").where({ id }).first();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear producto" });
  }
}

export async function updateProduct(req: any, res: Response) {
  try {
    const {
      name,
      description,
      category,
      price,
      original_price,
      colors,
      sizes,
      stock,
      material,
      weight,
      tag,
      featured,
      active,
    } = req.body;
    const imagesFiles = Array.isArray(req.files?.images)
      ? req.files.images
      : [];
    const videoFile = req.files?.video360?.[0];

    const current = await db("products").where({ id: req.params.id }).first();

    let finalImages = current?.images;
    if (req.body.existing_images !== undefined || imagesFiles.length) {
      const existing = safeJsonParse(req.body.existing_images, []);
      
      const newImgs = await Promise.all(
  	imagesFiles.map((file: Express.Multer.File) =>
    	  uploadToSupabase(file, "products"),
  	),
      );

      finalImages = JSON.stringify([...existing, ...newImgs]);
    }

    let finalVideo = current?.video360;
    if (req.body.remove_video === "true") {
      finalVideo = null;
    } else if (videoFile) {
      finalVideo = await uploadToSupabase(videoFile, "videos");
    }

    await db("products")
      .where({ id: req.params.id })
      .update({
        name,
        description,
        category,
        price: Number(price),
        original_price: original_price ? Number(original_price) : null,
        colors: JSON.stringify(safeJsonParse(colors, [])),
        sizes: JSON.stringify(safeJsonParse(sizes, [])),
        stock: JSON.stringify(safeJsonParse(stock, {})),
        material,
        weight,
        images: finalImages,
        video360: finalVideo,
        tag: tag || null,
        featured: featured === "true" || featured === true ? 1 : 0,
        active: active !== "false" && active !== false ? 1 : 0,
      });
    const product = await db("products").where({ id: req.params.id }).first();
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al actualizar producto" });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    await db("products").where({ id: req.params.id }).update({ active: 0 });
    res.json({ message: "Producto eliminado correctamente" });
  } catch {
    res.status(500).json({ message: "Error al eliminar producto" });
  }
}
