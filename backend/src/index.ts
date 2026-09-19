import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import productRoutes from "./routes/products";
import authRoutes from "./routes/auth";
import orderRoutes from "./routes/orders";
import userRoutes from "./routes/users";
import categoryRoutes from "./routes/categories";
import uploadRoutes from "./routes/uploads";
import settingsRoutes from "./routes/settings";
import { initDb } from "./config/database";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4000;

// ─── CORS ────────────────────────────────────────────────────────────────────
const isDev = process.env.NODE_ENV !== "production";

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      // In development: allow any localhost/127.0.0.1 origin on any port
      if (isDev && (origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:"))) {
        return callback(null, true);
      }
      // In production: use explicit allowlist from env
      const allowed = [
        process.env.NEXT_PUBLIC_SITE_URL,
        process.env.FRONTEND_URL,
        "http://localhost:3000",
      ].filter(Boolean) as string[];
      if (allowed.includes(origin)) return callback(null, true);
      callback(new Error(`CORS bloqueado para origen: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 500 }));

// Parsing
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));

// Archivos estáticos (imágenes subidas)
app.use("/uploads", express.static("src/uploads"));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/settings", settingsRoutes);

// Health check
app.get("/health", (_, res) =>
  res.json({ status: "ok", time: new Date().toISOString() }),
);

// ─── Start ───────────────────────────────────────────────────────────────────
async function start() {
  await initDb();
  const server = app.listen(PORT, () =>
    console.log(`🚀 Backend corriendo en http://localhost:${PORT}`),
  );

  server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
      console.error(`❌ Puerto ${PORT} en uso. Cierra el proceso anterior e inténtalo de nuevo.`);
      process.exit(1);
    } else {
      throw err;
    }
  });
}

start().catch((err) => {
  console.error("Error al inicializar la base de datos:", err);
  process.exit(1);
});
