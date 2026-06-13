import { Request, Response } from 'express'
import { pool } from '../config/database'

export async function getCategories(_: Request, res: Response) {
  try {
    const { rows } = await pool.query('SELECT * FROM categories ORDER BY name')
    res.json(rows)
  } catch { res.status(500).json({ message: 'Error del servidor' }) }
}
export async function createCategory(req: Request, res: Response) {
  try {
    const { name, description, image } = req.body
    const { rows } = await pool.query(
      'INSERT INTO categories (name, description, image) VALUES ($1,$2,$3) RETURNING *',
      [name, description, image]
    )
    res.status(201).json(rows[0])
  } catch { res.status(500).json({ message: 'Error del servidor' }) }
}
export async function updateCategory(req: Request, res: Response) {
  try {
    const { name, description, image } = req.body
    const { rows } = await pool.query(
      'UPDATE categories SET name=$1, description=$2, image=$3 WHERE id=$4 RETURNING *',
      [name, description, image, req.params.id]
    )
    res.json(rows[0])
  } catch { res.status(500).json({ message: 'Error del servidor' }) }
}
export async function deleteCategory(req: Request, res: Response) {
  try {
    await pool.query('DELETE FROM categories WHERE id=$1', [req.params.id])
    res.json({ message: 'Categoría eliminada' })
  } catch { res.status(500).json({ message: 'Error del servidor' }) }
}
