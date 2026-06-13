import { Router } from 'express'
import { authenticate, requireAdmin } from '../middleware/auth'
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController'

const router = Router()
router.get('/',     authenticate, requireAdmin, getAllUsers)
router.get('/:id',  authenticate, getUserById)
router.put('/:id',  authenticate, updateUser)
router.delete('/:id', authenticate, requireAdmin, deleteUser)

export default router
