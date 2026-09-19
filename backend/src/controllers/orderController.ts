import { Response } from 'express'
import { randomUUID } from 'crypto'
import { db } from '../config/database'

export async function createOrder(req: any, res: Response) {
  try {
    const { items, shipping_address, payment_method, coupon } = req.body
    const subtotal = items.reduce((s: number, i: any) => s + i.unit_price * i.quantity, 0)
    const shipping = subtotal >= 200 ? 0 : 15
    const discount = 0
    const total = subtotal + shipping - discount
    const orderId = randomUUID()
    const orderNum = `AA-${Date.now()}`

    await db('orders').insert({
      id: orderId,
      order_number: orderNum,
      user_id: req.user.id,
      subtotal,
      shipping,
      discount,
      total,
      status: 'pending',
      payment_method,
      shipping_address: JSON.stringify(shipping_address),
    })

    for (const item of items) {
      await db('order_items').insert({
        id: randomUUID(),
        order_id: orderId,
        product_id: item.product_id,
        product_name: item.product_name,
        product_image: item.product_image,
        selected_color: item.selected_color,
        selected_size: item.selected_size,
        quantity: item.quantity,
        unit_price: item.unit_price,
        subtotal: item.unit_price * item.quantity,
      })
    }

    const order = await db('orders').where({ id: orderId }).first()
    res.status(201).json(order)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error al crear el pedido' })
  }
}

export async function getMyOrders(req: any, res: Response) {
  try {
    const orders = await db('orders').where({ user_id: req.user.id }).orderBy('created_at', 'desc')
    res.json(orders)
  } catch {
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export async function getOrderById(req: any, res: Response) {
  try {
    const order = await db('orders').where({ id: req.params.id }).first()
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' })
    if (order.user_id !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Acceso denegado' })
    const items = await db('order_items').where({ order_id: req.params.id })
    res.json({ ...order, items })
  } catch {
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export async function getAllOrders(req: any, res: Response) {
  try {
    const { status, page = 1, limit = 20 } = req.query
    let query = db('orders as o')
      .leftJoin('users as u', 'o.user_id', 'u.id')
      .select('o.*', 'u.name as customer_name', 'u.email as customer_email')
      .orderBy('o.created_at', 'desc')
      .limit(Number(limit))
      .offset((Number(page) - 1) * Number(limit))
    if (status) query = query.where('o.status', status)
    const rows = await query
    res.json(rows)
  } catch {
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export async function updateOrderStatus(req: any, res: Response) {
  try {
    const { status } = req.body
    const validStatuses = ['pending', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled']
    if (!validStatuses.includes(status)) return res.status(400).json({ message: 'Estado inválido' })
    await db('orders').where({ id: req.params.id }).update({ status, updated_at: new Date().toISOString() })
    const order = await db('orders').where({ id: req.params.id }).first()
    res.json(order)
  } catch {
    res.status(500).json({ message: 'Error del servidor' })
  }
}

