import { Router } from "express";
import { db } from "../config/database";
import { authenticate, requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const settings = await db("hero_settings")
      .where({ id: "homepage" })
      .first();

    return res.json({
      videoUrl: settings?.video_url ?? null,
      enabled: settings?.enabled ?? false,
    });
  } catch (error) {
    console.error("Error al consultar el video de portada:", error);
    return res.status(500).json({
      message: "No se pudo consultar el video de portada",
    });
  }
});

router.put("/", authenticate, requireAdmin, async (req, res) => {
  try {
    const { videoUrl, enabled } = req.body;

    if (typeof enabled !== "boolean") {
      return res.status(400).json({
        message: "El estado del video no es válido",
      });
    }

    if (videoUrl !== null && videoUrl !== undefined && videoUrl !== "") {
      if (typeof videoUrl !== "string") {
        return res.status(400).json({
          message: "La URL del video no es válida",
        });
      }

      let parsedUrl: URL;

      try {
        parsedUrl = new URL(videoUrl);
      } catch {
        return res.status(400).json({
          message: "La URL del video no es válida",
        });
      }

      const validSupabaseUrl =
        parsedUrl.protocol === "https:" &&
        parsedUrl.hostname.endsWith(".supabase.co") &&
        parsedUrl.pathname.includes("/storage/v1/object/public/");

      if (!validSupabaseUrl) {
        return res.status(400).json({
          message: "El video debe estar alojado en el almacenamiento público de Supabase",
        });
      }
    }

    const normalizedUrl = videoUrl || null;

    if (enabled && !normalizedUrl) {
      return res.status(400).json({
        message: "Sube un video antes de activarlo",
      });
    }

    const existing = await db("hero_settings")
      .where({ id: "homepage" })
      .first();

    const values = {
      video_url: normalizedUrl,
      enabled,
      updated_at: db.fn.now(),
    };

    if (existing) {
      await db("hero_settings")
        .where({ id: "homepage" })
        .update(values);
    } else {
      await db("hero_settings").insert({
        id: "homepage",
        ...values,
      });
    }

    return res.json({
      videoUrl: normalizedUrl,
      enabled,
      message: "Configuración de portada guardada",
    });
  } catch (error) {
    console.error("Error al guardar el video de portada:", error);
    return res.status(500).json({
      message: "No se pudo guardar la configuración de portada",
    });
  }
});

export default router;
