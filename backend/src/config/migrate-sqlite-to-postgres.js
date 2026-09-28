const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config({
  path: path.join(__dirname, "../../../.env"),
});

const sqlitePath = path.join(
  __dirname,
  "..",
  "data",
  "aramayus.db"
);

const sqlite = new sqlite3.Database(sqlitePath);

const pg = new Client({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || "aramayus_art",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
});

function sqliteAll(sql) {
  return new Promise((resolve, reject) => {
    sqlite.all(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function createTables() {
  await pg.query(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      phone VARCHAR(255),
      role VARCHAR(255) NOT NULL DEFAULT 'customer',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS categories (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description VARCHAR(255),
      image VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      category VARCHAR(255),
      price DOUBLE PRECISION NOT NULL,
      original_price DOUBLE PRECISION,
      colors TEXT DEFAULT '[]',
      sizes TEXT DEFAULT '[]',
      stock TEXT DEFAULT '{}',
      material VARCHAR(255),
      weight VARCHAR(255),
      images TEXT DEFAULT '[]',
      tag VARCHAR(255),
      featured BOOLEAN DEFAULT FALSE,
      active BOOLEAN DEFAULT TRUE,
      sold_count INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      video360 VARCHAR(255),
      updated_at TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS orders (
      id VARCHAR(255) PRIMARY KEY,
      order_number VARCHAR(255) NOT NULL UNIQUE,
      user_id VARCHAR(255) NOT NULL,
      subtotal DOUBLE PRECISION NOT NULL,
      shipping DOUBLE PRECISION NOT NULL DEFAULT 0,
      discount DOUBLE PRECISION NOT NULL DEFAULT 0,
      total DOUBLE PRECISION NOT NULL,
      status VARCHAR(255) NOT NULL DEFAULT 'pending',
      payment_method VARCHAR(255),
      shipping_address TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id VARCHAR(255) PRIMARY KEY,
      order_id VARCHAR(255) NOT NULL,
      product_id VARCHAR(255),
      product_name VARCHAR(255) NOT NULL,
      product_image VARCHAR(255),
      selected_color VARCHAR(255),
      selected_size VARCHAR(255),
      quantity INTEGER NOT NULL,
      unit_price DOUBLE PRECISION NOT NULL,
      subtotal DOUBLE PRECISION NOT NULL
    );
  `);
}

async function migrateTable(table, columns, transform = (row) => row) {
  const rows = await sqliteAll(`SELECT * FROM ${table}`);

  console.log(`Migrando ${table}: ${rows.length} registros...`);

  for (const originalRow of rows) {
    const row = transform(originalRow);

    const values = columns.map((column) => row[column]);

    const placeholders = values
      .map((_, index) => `$${index + 1}`)
      .join(", ");

    await pg.query(
      `
      INSERT INTO ${table} (${columns.join(", ")})
      VALUES (${placeholders})
      ON CONFLICT DO NOTHING
      `,
      values
    );
  }
}

async function verify() {
  console.log("\n=== VERIFICACIÓN ===");

  const tables = [
    "users",
    "categories",
    "products",
    "orders",
    "order_items",
  ];

  for (const table of tables) {
    const result = await pg.query(
      `SELECT COUNT(*)::int AS count FROM ${table}`
    );

    console.log(`${table}: ${result.rows[0].count}`);
  }
}

async function main() {
  console.log("======================================");
  console.log(" SQLite → PostgreSQL");
  console.log(" Aramayus Art");
  console.log("======================================\n");

  console.log("SQLite:", sqlitePath);
  console.log(
    "PostgreSQL:",
    `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  );

  await pg.connect();

  console.log("\n✓ Conectado a PostgreSQL");

  await createTables();

  console.log("✓ Tablas creadas/verificadas\n");

  await pg.query("BEGIN");

  try {
    await migrateTable("users", [
      "id",
      "name",
      "email",
      "password_hash",
      "phone",
      "role",
      "created_at",
    ]);

    await migrateTable("categories", [
      "id",
      "name",
      "description",
      "image",
      "created_at",
    ]);

    await migrateTable(
      "products",
      [
        "id",
        "name",
        "description",
        "category",
        "price",
        "original_price",
        "colors",
        "sizes",
        "stock",
        "material",
        "weight",
        "images",
        "tag",
        "featured",
        "active",
        "sold_count",
        "created_at",
        "video360",
        "updated_at",
      ],
      (row) => ({
        ...row,
        featured: Boolean(row.featured),
        active: Boolean(row.active),
      })
    );

    await migrateTable("orders", [
      "id",
      "order_number",
      "user_id",
      "subtotal",
      "shipping",
      "discount",
      "total",
      "status",
      "payment_method",
      "shipping_address",
      "created_at",
      "updated_at",
    ]);

    await migrateTable("order_items", [
      "id",
      "order_id",
      "product_id",
      "product_name",
      "product_image",
      "selected_color",
      "selected_size",
      "quantity",
      "unit_price",
      "subtotal",
    ]);

    await pg.query("COMMIT");

    console.log("\n✓ Migración completada correctamente");

    await verify();
  } catch (error) {
    await pg.query("ROLLBACK");

    console.error("\n✗ Error durante la migración:");
    console.error(error);

    throw error;
  }
}

main()
  .catch(() => {
    process.exitCode = 1;
  })
  .finally(async () => {
    sqlite.close();
    await pg.end().catch(() => {});
  });
