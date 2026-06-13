import { Router } from 'express'
import { authenticate, requireAdmin } from '../middleware/auth'
import { createOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus } from '../controllers/orderController'

const router = Router()
router.post('/',           authenticate, createOrder)
router.get('/my',          authenticate, getMyOrders)
router.get('/:id',         authenticate, getOrderById)
router.get('/',            authenticate, requireAdmin, getAllOrders)
router.patch('/:id/status',authenticate, requireAdmin, updateOrderStatus)

export default router
