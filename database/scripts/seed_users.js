/**
 * seed_users.js — Inserta usuarios de prueba en la base de datos.
 * Uso: node database/scripts/seed_users.js
 *
 * Requiere: pg, bcryptjs, dotenv instalados en el backend.
 */

require('dotenv').config({ path: require('path').join(__dirname, '../../.env') })
const { Pool } = require('pg')
const bcrypt   = require('bcryptjs')

const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME     || 'aramayus_art',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD,
})

async function seedUsers() {
  const client = await pool.connect()
  try {
    console.log('🔗 Conectado a PostgreSQL:', process.env.DB_NAME)

    const users = [
      { name: 'Administrador',  email: 'admin@aramayus.com',    password: 'Admin123!',    role: 'admin'    },
      { name: 'Cliente Ejemplo', email: 'cliente@ejemplo.com',  password: 'Cliente123!',  role: 'customer' },
    ]

    for (const u of users) {
      const hash = await bcrypt.hash(u.password, 12)
      const res  = await client.query(
        `INSERT INTO users (name, email, password_hash, role)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (email) DO UPDATE
           SET password_hash = EXCLUDED.password_hash,
               name          = EXCLUDED.name,
               role          = EXCLUDED.role
         RETURNING id, name, email, role`,
        [u.name, u.email, hash, u.role]
      )
      console.log(`✅ ${res.rows[0].role.toUpperCase()} — ${res.rows[0].email} (id: ${res.rows[0].id})`)
    }

    console.log('\n🎉 Usuarios insertados correctamente.')
    console.log('   admin@aramayus.com   →  Admin123!')
    console.log('   cliente@ejemplo.com  →  Cliente123!\n')
  } catch (err) {
    console.error('❌ Error:', err.message)
    if (err.message.includes('connect')) {
      console.error('\n💡 Asegúrate de que:')
      console.error('   1. PostgreSQL está corriendo')
      console.error('   2. La base de datos "aramayus_art" existe')
      console.error('   3. DB_PASSWORD en .env es correcta')
    }
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

seedUsers()
