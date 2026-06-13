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

dotenv.config()

const app  = express()
const PORT = process.env.PORT || 4000

// Seguridad
app.use(helmet())
app.use(cors({ origin: process.env.NEXT_PUBLIC_SITE_URL, credentials: true }))
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

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok', time: new Date().toISOString() }))

app.listen(PORT, () => console.log(`🚀 Backend corriendo en http://localhost:${PORT}`))
