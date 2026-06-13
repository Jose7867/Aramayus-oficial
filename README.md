# Aramayus Art — Plataforma E-commerce

Tienda virtual de ropa artesanal peruana con probador virtual, panel administrativo y pasarela de pagos.

## Estructura del proyecto

```
aramayus-art/
├── frontend/      → Next.js 14 + Tailwind CSS
├── backend/       → Node.js + Express + JWT
├── database/      → PostgreSQL — migraciones y seeds
└── docs/          → Documentación técnica
```

## Requisitos previos

- Node.js 18+
- PostgreSQL 15+
- npm o yarn

## Instalación rápida

```bash
# 1. Clonar y entrar al proyecto
cd aramayus-art

# 2. Instalar dependencias del frontend
cd frontend && npm install

# 3. Instalar dependencias del backend
cd ../backend && npm install

# 4. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus datos

# 5. Crear la base de datos
cd ../database && psql -U postgres -f scripts/create_db.sql

# 6. Correr migraciones
cd ../backend && npm run migrate

# 7. Cargar datos de prueba
npm run seed

# 8. Iniciar en desarrollo
# Terminal 1 — Backend:
cd backend && npm run dev

# Terminal 2 — Frontend:
cd frontend && npm run dev
```

## URLs en desarrollo

| Servicio   | URL                         |
|------------|-----------------------------|
| Frontend   | http://localhost:3000       |
| Backend    | http://localhost:4000       |
| Admin      | http://localhost:3000/admin |
| API Docs   | http://localhost:4000/docs  |

## Credenciales de prueba

| Rol          | Email                    | Contraseña  |
|--------------|--------------------------|-------------|
| Administrador| admin@aramayus.com       | Admin123!   |
| Cliente      | cliente@ejemplo.com      | Cliente123! |
