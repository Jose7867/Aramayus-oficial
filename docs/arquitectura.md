# Arquitectura del Proyecto — Aramayus Art

## Stack Tecnológico

| Capa       | Tecnología               | Versión  |
|------------|--------------------------|----------|
| Frontend   | Next.js (App Router)     | 14.2     |
| Estilos    | Tailwind CSS             | 3.4      |
| Animaciones| Framer Motion            | 11       |
| Estado     | Zustand + React Query    | 4.5 / 5  |
| Backend    | Node.js + Express        | 20 / 4.19|
| Base datos | PostgreSQL               | 15+      |
| Auth       | JWT (jsonwebtoken)       | 9        |
| Imágenes   | Multer + Sharp           | local    |

## Flujo de datos

```
[Cliente]  →  Next.js Frontend  →  Express API  →  PostgreSQL
              (Zustand store)       (JWT auth)      (15 tablas)
```

## Estructura de rutas API

| Método | Ruta                      | Acceso   | Descripción              |
|--------|---------------------------|----------|--------------------------|
| GET    | /api/products             | Público  | Listar productos         |
| GET    | /api/products/featured    | Público  | Productos destacados     |
| GET    | /api/products/:id         | Público  | Detalle de producto      |
| POST   | /api/products             | Admin    | Crear producto           |
| PUT    | /api/products/:id         | Admin    | Editar producto          |
| DELETE | /api/products/:id         | Admin    | Eliminar producto        |
| POST   | /api/auth/login           | Público  | Iniciar sesión           |
| POST   | /api/auth/register        | Público  | Registrar usuario        |
| GET    | /api/auth/me              | Auth     | Perfil actual            |
| POST   | /api/orders               | Auth     | Crear pedido             |
| GET    | /api/orders/my            | Auth     | Mis pedidos              |
| GET    | /api/orders               | Admin    | Todos los pedidos        |
| PATCH  | /api/orders/:id/status    | Admin    | Cambiar estado           |
| GET    | /api/categories           | Público  | Listar categorías        |
| POST   | /api/uploads/image        | Admin    | Subir imagen             |
