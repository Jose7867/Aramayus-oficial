import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, 'src/uploads/products'),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`)
  },
})

const fileFilter = (_: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp']
  allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Solo se permiten imágenes JPG, PNG y WebP'))
}

export const uploadProductImages = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 6 },
}).array('images', 6)
