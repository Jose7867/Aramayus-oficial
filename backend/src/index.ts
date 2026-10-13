import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'

import productRoutes  from './routes/products'
import authRoutes     from './routes/auth'
import orderRoutes    from './routes/orders'
import userRoutes     from './routes/users'
import categoryRoutes from './routes/categories'
import uploadRoutes   from './routes/uploads'
import settingsRoutes from './routes/settings'
import heroRoutes     from './routes/hero'
import { initDb }     from './config/database'

dotenv.config()

const app  = express()
const PORT = process.env.PORT || 4000

// Seguridad
const allowedOrigins = [
  process.env.NEXT_PUBLIC_SITE_URL,
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'http://127.0.0.1:3002',
].filter(Boolean) as string[]

app.use(helmet())
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
      return
    }

    callback(new Error('No autorizado por CORS'))
  },
  credentials: true,
}))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }))

// Parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Archivos estáticos (imágenes subidas)
app.use('/uploads', express.static('src/uploads'))

// Rutas
app.use('/api/auth',       authRoutes)
app.use('/api/products',   productRoutes)
app.use('/api/orders',     orderRoutes)
app.use('/api/users',      userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/uploads',    uploadRoutes)
app.use('/api/settings',   settingsRoutes)
app.use('/api/hero',       heroRoutes)

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok', time: new Date().toISOString() }))

initDb().then(() => {
  app.listen(PORT, () => console.log(`🚀 Backend corriendo en http://localhost:${PORT}`))
}).catch((err) => {
  console.error('Error al inicializar la base de datos:', err)
  process.exit(1)
})

