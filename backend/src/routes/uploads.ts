import { Router } from 'express'
import { authenticate, requireAdmin } from '../middleware/auth'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, 'src/uploads/products'),
  filename:    (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
})
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } })

const router = Router()
router.post('/image', authenticate, requireAdmin, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No se subió ningún archivo' })
  res.json({ url: `/uploads/products/${req.file.filename}` })
})

export default router
