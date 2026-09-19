import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  user?: { id: string; role: string; email: string }
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Token requerido' })

  if (process.env.NODE_ENV === 'development' && token === 'mock-token-dev') {
    req.user = { id: 'mock-admin-001', role: 'admin', email: 'admin@aramayus.com' }
    return next()
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!) as AuthRequest['user']
    next()
  } catch {
    res.status(401).json({ message: 'Token inválido o expirado' })
  }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Acceso denegado' })
  next()
}
