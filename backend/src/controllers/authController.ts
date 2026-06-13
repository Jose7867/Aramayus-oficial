import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { pool } from '../config/database'

const signToken = (id: string, role: string, email: string) =>
  jwt.sign({ id, role, email }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email y contraseña requeridos' })
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    const user = rows[0]
    if (!user || !(await bcrypt.compare(password, user.password_hash)))
      return res.status(401).json({ message: 'Credenciales inválidas' })
    const token = signToken(user.id, user.role, user.email)
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password, phone } = req.body
    const exists = await pool.query('SELECT id FROM users WHERE email = $1', [email])
    if (exists.rows.length) return res.status(409).json({ message: 'El email ya está registrado' })
    const hash = await bcrypt.hash(password, 12)
    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password_hash, phone, role) VALUES ($1,$2,$3,$4,$5) RETURNING id, name, email, role',
      [name, email, hash, phone || null, 'customer']
    )
    const token = signToken(rows[0].id, 'customer', email)
    res.status(201).json({ token, user: rows[0] })
  } catch {
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export async function me(req: any, res: Response) {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, email, phone, role, created_at FROM users WHERE id = $1',
      [req.user.id]
    )
    if (!rows[0]) return res.status(404).json({ message: 'Usuario no encontrado' })
    res.json(rows[0])
  } catch {
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export async function refreshToken(req: Request, res: Response) {
  try {
    const { token } = req.body
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    const newToken = signToken(decoded.id, decoded.role, decoded.email)
    res.json({ token: newToken })
  } catch {
    res.status(401).json({ message: 'Token inválido' })
  }
}
