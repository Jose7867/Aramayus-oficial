import { Request, Response } from 'express'
import { pool } from '../config/database'

export async function getAllProducts(req: Request, res: Response) {
  try {
    const { category, search, min_price, max_price, tag, featured, sort = 'created_at DESC', page = 1, limit = 12 } = req.query
    let query = 'SELECT * FROM products WHERE active = true'
    const params: any[] = []
    let i = 1
    if (category)   { query += ` AND category = $${i++}`;           params.push(category) }
    if (search)     { query += ` AND (name ILIKE $${i} OR description ILIKE $${i})`; params.push(`%${search}%`); i++ }
    if (min_price)  { query += ` AND price >= $${i++}`;             params.push(Number(min_price)) }
    if (max_price)  { query += ` AND price <= $${i++}`;             params.push(Number(max_price)) }
    if (tag)        { query += ` AND tag = $${i++}`;                params.push(tag) }
    if (featured)   { query += ` AND featured = true` }
    const sortMap: Record<string, string> = {
      price_asc: 'price ASC', price_desc: 'price DESC',
      newest: 'created_at DESC', bestseller: 'sold_count DESC'
    }
    query += ` ORDER BY ${sortMap[sort as string] || 'created_at DESC'}`
    query += ` LIMIT $${i++} OFFSET $${i++}`
    params.push(Number(limit), (Number(page) - 1) * Number(limit))
    const { rows } = await pool.query(query, params)
    const count = await pool.query('SELECT COUNT(*) FROM products WHERE active = true')
    res.json({ products: rows, total: Number(count.rows[0].count), page: Number(page), limit: Number(limit) })
  } catch {
    res.status(500).json({ message: 'Error al obtener productos' })
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1 AND active = true', [req.params.id])
    if (!rows[0]) return res.status(404).json({ message: 'Producto no encontrado' })
    res.json(rows[0])
  } catch {
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export async function getFeaturedProducts(_: Request, res: Response) {
  try {
    const { rows } = await pool.query('SELECT * FROM products WHERE featured = true AND active = true LIMIT 8')
    res.json(rows)
  } catch {
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export async function createProduct(req: any, res: Response) {
  try {
    const { name, description, category, price, original_price, colors, sizes, stock, material, weight, tag, featured } = req.body
    const images = req.files?.map((f: any) => `/uploads/products/${f.filename}`) || []
    const { rows } = await pool.query(
      `INSERT INTO products (name, description, category, price, original_price, colors, sizes, stock, material, weight, images, tag, featured)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
      [name, description, category, price, original_price || null,
       JSON.stringify(colors), JSON.stringify(sizes), JSON.stringify(stock),
       material, weight, JSON.stringify(images), tag || null, featured === 'true']
    )
    res.status(201).json(rows[0])
  } catch {
    res.status(500).json({ message: 'Error al crear producto' })
  }
}

export async function updateProduct(req: any, res: Response) {
  try {
    const { name, description, category, price, original_price, colors, sizes, stock, material, weight, tag, featured, active } = req.body
    const newImages = req.files?.map((f: any) => `/uploads/products/${f.filename}`)
    const current = await pool.query('SELECT images FROM products WHERE id = $1', [req.params.id])
    const images = newImages?.length ? JSON.stringify(newImages) : current.rows[0]?.images
    const { rows } = await pool.query(
      `UPDATE products SET name=$1, description=$2, category=$3, price=$4, original_price=$5,
       colors=$6, sizes=$7, stock=$8, material=$9, weight=$10, images=$11, tag=$12, featured=$13, active=$14
       WHERE id=$15 RETURNING *`,
      [name, description, category, price, original_price || null,
       JSON.stringify(colors), JSON.stringify(sizes), JSON.stringify(stock),
       material, weight, images, tag || null, featured === 'true', active !== 'false', req.params.id]
    )
    if (!rows[0]) return res.status(404).json({ message: 'Producto no encontrado' })
    res.json(rows[0])
  } catch {
    res.status(500).json({ message: 'Error al actualizar producto' })
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    await pool.query('UPDATE products SET active = false WHERE id = $1', [req.params.id])
    res.json({ message: 'Producto eliminado correctamente' })
  } catch {
    res.status(500).json({ message: 'Error al eliminar producto' })
  }
}
