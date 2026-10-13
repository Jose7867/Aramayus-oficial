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


const videoUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    const mime = file.mimetype.split(";")[0].trim().toLowerCase();
    const hasMp4Extension = file.originalname.toLowerCase().endsWith(".mp4");

    if (mime === "video/mp4" && hasMp4Extension) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten videos MP4"));
    }
  },
});

router.post(
  "/hero-video",
  authenticate,
  requireAdmin,
  videoUpload.single("video"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Selecciona un archivo MP4",
        });
      }

      const filePath = `hero-videos/${Date.now()}-${randomUUID()}.mp4`;

      const { error } = await supabase.storage
        .from(SUPABASE_BUCKET)
        .upload(filePath, req.file.buffer, {
          contentType: "video/mp4",
          upsert: false,
        });

      if (error) {
        console.error("Error al subir video a Supabase:", error);

        return res.status(500).json({
          message: "No se pudo subir el video a Supabase",
        });
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from(SUPABASE_BUCKET)
        .getPublicUrl(filePath);

      return res.json({ url: publicUrl });
    } catch (error) {
      console.error("Error al subir el video de portada:", error);

      return res.status(500).json({
        message: "Error al subir el video de portada",
      });
    }
  },
);

export default router;
