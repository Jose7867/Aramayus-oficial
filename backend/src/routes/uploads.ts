import { Router } from "express";
import { authenticate, requireAdmin } from "../middleware/auth";
import multer from "multer";
import { randomUUID } from "crypto";
import {
  supabase,
  SUPABASE_BUCKET,
} from "../config/supabase";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
  fileFilter: (_, file, cb) => {
    const mime = file.mimetype.split(";")[0].trim().toLowerCase();

    const allowed = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/avif",
      "image/gif",
      "image/heic",
      "image/heif",
    ];

    allowed.includes(mime)
      ? cb(null, true)
      : cb(new Error(`Tipo de archivo no permitido: ${file.mimetype}`));
  },
});

const router = Router();

router.post(
  "/image",
  authenticate,
  requireAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No se subió ningún archivo",
        });
      }

      const extension = req.file.originalname.includes(".")
        ? req.file.originalname.substring(
            req.file.originalname.lastIndexOf("."),
          )
        : "";

      const filename = `${Date.now()}-${randomUUID()}${extension}`;

      const filePath = `products/${filename}`;

      const { error } = await supabase.storage
        .from(SUPABASE_BUCKET)
        .upload(filePath, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: false,
        });

      if (error) {
        console.error("Error Supabase:", error);

        return res.status(500).json({
          message: "Error al subir imagen a Supabase",
        });
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from(SUPABASE_BUCKET)
        .getPublicUrl(filePath);

      return res.json({
        url: publicUrl,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Error al subir imagen",
      });
    }
  },
);

export default router;
