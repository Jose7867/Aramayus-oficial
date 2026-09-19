import { Request, Response } from 'express'
import { db } from '../config/database'

export async function getAllUsers(_: Request, res: Response) {
  try {
    const users = await db('users').select('id', 'name', 'email', 'phone', 'role', 'created_at').orderBy('created_at', 'desc')
    res.json(users)
  } catch { res.status(500).json({ message: 'Error del servidor' }) }
}
export async function getUserById(req: any, res: Response) {
  try {
    const id = req.user.role === 'admin' ? req.params.id : req.user.id
    const user = await db('users').select('id', 'name', 'email', 'phone', 'role').where({ id }).first()
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
    res.json(user)
  } catch { res.status(500).json({ message: 'Error del servidor' }) }
}
export async function updateUser(req: any, res: Response) {
  try {
    const { name, phone } = req.body
    const id = req.user.role === 'admin' ? req.params.id : req.user.id
    await db('users').where({ id }).update({ name, phone })
    const user = await db('users').select('id', 'name', 'email', 'phone', 'role').where({ id }).first()
    res.json(user)
  } catch { res.status(500).json({ message: 'Error del servidor' }) }
}
export async function deleteUser(req: Request, res: Response) {
  try {
    await db('users').where({ id: req.params.id }).delete()
    res.json({ message: 'Usuario eliminado' })
  } catch { res.status(500).json({ message: 'Error del servidor' }) }
}

