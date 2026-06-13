import { Request, Response } from 'express'
import { pool } from '../config/database'

export async function createOrder(req: any, res: Response) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const { items, shipping_address, payment_method, coupon } = req.body
    const subtotal = items.reduce((s: number, i: any) => s + i.unit_price * i.quantity, 0)
    const shipping = subtotal >= 200 ? 0 : 15
    const discount = 0 // TODO: validar cupón
    const total = subtotal + shipping - discount
    const orderNum = `AA-${Date.now()}`
    const { rows } = await client.query(
      `INSERT INTO orders (order_number, user_id, subtotal, shipping, discount, total, status, payment_method, shipping_address)
       VALUES ($1,$2,$3,$4,$5,$6,'pending',$7,$8) RETURNING *`,
      [orderNum, req.user.id, subtotal, shipping, discount, total, payment_method, JSON.stringify(shipping_address)]
    )
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, product_name, product_image, selected_color, selected_size, quantity, unit_price, subtotal)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [rows[0].id, item.product_id, item.product_name, item.product_image,
         item.selected_color, item.selected_size, item.quantity, item.unit_price, item.unit_price * item.quantity]
      )
    }
    await client.query('COMMIT')
    res.status(201).json(rows[0])
  } catch {
    await client.query('ROLLBACK')
    res.status(500).json({ message: 'Error al crear el pedido' })
  } finally {
    client.release()
  }
}

export async function getMyOrders(req: any, res: Response) {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]
    )
    res.json(rows)
  } catch {
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export async function getOrderById(req: any, res: Response) {
  try {
    const { rows } = await pool.query('SELECT * FROM orders WHERE id = $1', [req.params.id])
    if (!rows[0]) return res.status(404).json({ message: 'Pedido no encontrado' })
    if (rows[0].user_id !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Acceso denegado' })
    const items = await pool.query('SELECT * FROM order_items WHERE order_id = $1', [req.params.id])
    res.json({ ...rows[0], items: items.rows })
  } catch {
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export async function getAllOrders(req: Request, res: Response) {
  try {
    const { status, page = 1, limit = 20 } = req.query
    let q = 'SELECT o.*, u.name as customer_name, u.email as customer_email FROM orders o LEFT JOIN users u ON o.user_id = u.id'
    const params: any[] = []
    if (status) { q += ' WHERE o.status = $1'; params.push(status) }
    q += ` ORDER BY o.created_at DESC LIMIT $${params.length+1} OFFSET $${params.length+2}`
    params.push(Number(limit), (Number(page)-1)*Number(limit))
    const { rows } = await pool.query(q, params)
    res.json(rows)
  } catch {
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export async function updateOrderStatus(req: Request, res: Response) {
  try {
    const { status } = req.body
    const validStatuses = ['pending','confirmed','preparing','shipped','delivered','cancelled']
    if (!validStatuses.includes(status)) return res.status(400).json({ message: 'Estado inválido' })
    const { rows } = await pool.query(
      'UPDATE orders SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *', [status, req.params.id]
    )
    res.json(rows[0])
  } catch {
    res.status(500).json({ message: 'Error del servidor' })
  }
}
