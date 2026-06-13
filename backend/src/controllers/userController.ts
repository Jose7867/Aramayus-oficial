import { Request, Response } from 'express'
import { pool } from '../config/database'

export async function getAllUsers(_: Request, res: Response) {
  try {
    const { rows } = await pool.query('SELECT id, name, email, phone, role, created_at FROM users ORDER BY created_at DESC')
    res.json(rows)
  } catch { res.status(500).json({ message: 'Error del servidor' }) }
}
export async function getUserById(req: any, res: Response) {
  try {
    const id = req.user.role === 'admin' ? req.params.id : req.user.id
    const { rows } = await pool.query('SELECT id, name, email, phone, role FROM users WHERE id=$1', [id])
    if (!rows[0]) return res.status(404).json({ message: 'Usuario no encontrado' })
    res.json(rows[0])
  } catch { res.status(500).json({ message: 'Error del servidor' }) }
}
export async function updateUser(req: any, res: Response) {
  try {
    const { name, phone } = req.body
    const id = req.user.role === 'admin' ? req.params.id : req.user.id
    const { rows } = await pool.query(
      'UPDATE users SET name=$1, phone=$2 WHERE id=$3 RETURNING id,name,email,phone,role',
      [name, phone, id]
    )
    res.json(rows[0])
  } catch { res.status(500).json({ message: 'Error del servidor' }) }
}
export async function deleteUser(req: Request, res: Response) {
  try {
    await pool.query('DELETE FROM users WHERE id=$1', [req.params.id])
    res.json({ message: 'Usuario eliminado' })
  } catch { res.status(500).json({ message: 'Error del servidor' }) }
}
