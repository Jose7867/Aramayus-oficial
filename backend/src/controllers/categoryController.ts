import { Request, Response } from 'express'
import { randomUUID } from 'crypto'
import { db } from '../config/database'

export async function getCategories(_: Request, res: Response) {
  try {
    const categories = await db('categories').orderBy('name')
    res.json(categories)
  } catch { res.status(500).json({ message: 'Error del servidor' }) }
}
export async function createCategory(req: Request, res: Response) {
  try {
    const { name, description, image } = req.body
    const id = randomUUID()
    await db('categories').insert({ id, name, description, image })
    const category = await db('categories').where({ id }).first()
    res.status(201).json(category)
  } catch { res.status(500).json({ message: 'Error del servidor' }) }
}
export async function updateCategory(req: Request, res: Response) {
  try {
    const { name, description, image } = req.body
    await db('categories').where({ id: req.params.id }).update({ name, description, image })
    const category = await db('categories').where({ id: req.params.id }).first()
    res.json(category)
  } catch { res.status(500).json({ message: 'Error del servidor' }) }
}
export async function deleteCategory(req: Request, res: Response) {
  try {
    await db('categories').where({ id: req.params.id }).delete()
    res.json({ message: 'Categoría eliminada' })
  } catch { res.status(500).json({ message: 'Error del servidor' }) }
}

