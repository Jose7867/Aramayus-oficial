import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'crypto'
import { db } from '../config/database'

const signToken = (id: string, role: string, email: string) =>
  jwt.sign({ id, role, email }, process.env.JWT_SECRET!, { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any })

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email y contraseña requeridos' })
    const user = await db('users').where({ email }).first() as any
    if (!user || !(await bcrypt.compare(password, user.password_hash)))
      return res.status(401).json({ message: 'Credenciales inválidas' })
    const token = signToken(user.id, user.role, user.email)
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password, phone } = req.body
    const exists = await db('users').where({ email }).first()
    if (exists) return res.status(409).json({ message: 'El email ya está registrado' })
    const hash = await bcrypt.hash(password, 12)
    const id = randomUUID()
    await db('users').insert({ id, name, email, password_hash: hash, phone: phone || null, role: 'customer' })
    const user = await db('users').select('id', 'name', 'email', 'role').where({ id }).first() as any
    const token = signToken(user.id, 'customer', email)
    res.status(201).json({ token, user })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export async function me(req: any, res: Response) {
  try {
    const user = await db('users').select('id', 'name', 'email', 'phone', 'role', 'created_at').where({ id: req.user.id }).first()
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
    res.json(user)
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

