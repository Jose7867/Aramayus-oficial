import { Router } from 'express'
import { authenticate, requireAdmin } from '../middleware/auth'
import {
  getAllProducts, getProductById, createProduct,
  updateProduct, deleteProduct, getFeaturedProducts
} from '../controllers/productController'
import { uploadProductImages } from '../middleware/upload'

const router = Router()

router.get('/',          getAllProducts)
router.get('/featured',  getFeaturedProducts)
router.get('/:id',       getProductById)
router.post('/',         authenticate, requireAdmin, uploadProductImages, createProduct)
router.put('/:id',       authenticate, requireAdmin, uploadProductImages, updateProduct)
router.delete('/:id',    authenticate, requireAdmin, deleteProduct)

export default router
