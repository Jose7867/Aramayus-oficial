import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, "src/uploads/products"),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

const fileFilter = (
  _: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
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
    "video/mp4",
    "video/webm",
    "video/quicktime",
  ];

  allowed.includes(mime)
    ? cb(null, true)
    : cb(new Error(`Tipo de archivo no permitido: ${file.mimetype}`));
};

export const uploadProductImages = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024, files: 7 },
}).fields([
  { name: "images", maxCount: 6 },
  { name: "video360", maxCount: 1 },
]);
