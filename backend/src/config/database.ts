import knex from "knex";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

dotenv.config();

const dataDir = path.join(__dirname, "..", "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbPath = process.env.DB_PATH || path.join(dataDir, "aramayus.db");

export const db = knex({
  client: "sqlite3",
  connection: { filename: dbPath },
  useNullAsDefault: true,
});

async function seedDefaultUsers() {
  const users = [
    {
      name: "Administrador",
      email: "admin@aramayus.com",
      password: "Admin123!",
      role: "admin",
    },
    {
      name: "Cliente Ejemplo",
      email: "cliente@ejemplo.com",
      password: "Cliente123!",
      role: "customer",
    },
  ];

  for (const user of users) {
    const existing = await db("users")
      .whereRaw("LOWER(email) = ?", [user.email.toLowerCase()])
      .first();

    if (existing) {
      await db("users")
        .where({ id: existing.id })
        .update({
          name: user.name,
          role: user.role,
          password_hash: await bcrypt.hash(user.password, 12),
        });
      continue;
    }

    await db("users").insert({
      id: randomUUID(),
      name: user.name,
      email: user.email,
      password_hash: await bcrypt.hash(user.password, 12),
      role: user.role,
    });
  }
}

async function seedDefaultCategories() {
  const categories = [
    {
      id: randomUUID(),
      name: "Chompas",
      description: "Tejidos a mano con lana de alpaca y oveja",
    },
    {
      id: randomUUID(),
      name: "Ponchos",
      description: "Piezas ceremoniales y de uso diario",
    },
    {
      id: randomUUID(),
      name: "Camisas",
      description: "Camisas bordadas con motivos andinos",
    },
    {
      id: randomUUID(),
      name: "Faldas",
      description: "Polleras y faldas tradicionales",
    },
    {
      id: randomUUID(),
      name: "Vestidos",
      description: "Vestidos artesanales para toda ocasión",
    },
    {
      id: randomUUID(),
      name: "Accesorios",
      description: "Bolsos, gorros, bufandas y más",
    },
  ];

  for (const category of categories) {
    const exists = await db("categories")
      .whereRaw("LOWER(name) = ?", [category.name.toLowerCase()])
      .first();

    if (!exists) {
      await db("categories").insert(category);
    }
  }
}

async function ensureProductColumns() {
  const hasTable = await db.schema.hasTable("products");
  if (!hasTable) return;

  const columns = await db("products").columnInfo();

  const addColumn = async (
    columnName: string,
    builder: (table: any) => void,
  ) => {
    if (!columns[columnName]) {
      await db.schema.alterTable("products", (table) => builder(table));
    }
  };

  await addColumn("original_price", (table) => table.float("original_price"));
  await addColumn("images", (table) => table.text("images").defaultTo("[]"));
  await addColumn("colors", (table) => table.text("colors").defaultTo("[]"));
  await addColumn("sizes", (table) => table.text("sizes").defaultTo("[]"));
  await addColumn("stock", (table) => table.text("stock").defaultTo("{}"));
  await addColumn("material", (table) => table.string("material"));
  await addColumn("weight", (table) => table.string("weight"));
  await addColumn("video360", (table) => table.string("video360"));
  await addColumn("tag", (table) => table.string("tag"));
  await addColumn("featured", (table) =>
    table.boolean("featured").defaultTo(false),
  );
  await addColumn("active", (table) => table.boolean("active").defaultTo(true));
  await addColumn("sold_count", (table) =>
    table.integer("sold_count").defaultTo(0),
  );

  if (!columns.updated_at) {
    await db.raw("ALTER TABLE products ADD COLUMN updated_at DATETIME");
  }
}

async function seedDefaultProducts() {
  const count = await db("products").count<{ "count(*)": number }>("*").first();
  if ((count?.["count(*)"] ?? 0) > 0) return;

  const products = [
    {
      id: randomUUID(),
      name: "Chompa Andina Wari",
      description:
        "Tejida a mano con 100% lana de alpaca bebé. Diseño inspirado en la cultura Wari con rombos y líneas geométricas en colores naturales.",
      category: "Chompas",
      price: 185,
      original_price: null,
      colors: JSON.stringify(["#8B1A1A", "#2D5A3D", "#C8860A", "#1A0A00"]),
      sizes: JSON.stringify(["S", "M", "L", "XL"]),
      stock: JSON.stringify({
        S: { "#8B1A1A": 8, "#2D5A3D": 5 },
        M: { "#8B1A1A": 12, "#C8860A": 6 },
        L: { "#C8860A": 4 },
        XL: { "#1A0A00": 2 },
      }),
      material: "100% Lana de Alpaca Bebé",
      weight: 420,
      images: JSON.stringify(["/images/products/chompa-wari.jpeg"]),
      video360: null,
      tag: "Destacado",
      featured: 1,
      active: 1,
      sold_count: 0,
    },
    {
      id: randomUUID(),
      name: "Chompa Beige",
      description:
        "Chompa artesanal en color beige, tejida con técnicas tradicionales.",
      category: "Chompas",
      price: 160,
      original_price: null,
      colors: JSON.stringify(["#F5F5DC"]),
      sizes: JSON.stringify(["S", "M", "L", "XL"]),
      stock: JSON.stringify({
        S: { "#F5F5DC": 5 },
        M: { "#F5F5DC": 10 },
        L: { "#F5F5DC": 8 },
        XL: { "#F5F5DC": 2 },
      }),
      material: "100% Lana de Alpaca",
      weight: 400,
      images: JSON.stringify([
        "/images/products/chompa beige/chompa beige.jpeg",
      ]),
      video360: null,
      tag: "Nuevo",
      featured: 1,
      active: 1,
      sold_count: 0,
    },
    {
      id: randomUUID(),
      name: "Chompa Roja",
      description:
        "Chompa artesanal en color rojo, tejida con técnicas tradicionales.",
      category: "Chompas",
      price: 165,
      original_price: null,
      colors: JSON.stringify(["#FF0000"]),
      sizes: JSON.stringify(["S", "M", "L", "XL"]),
      stock: JSON.stringify({
        S: { "#FF0000": 5 },
        M: { "#FF0000": 10 },
        L: { "#FF0000": 8 },
        XL: { "#FF0000": 2 },
      }),
      material: "100% Lana de Alpaca",
      weight: 400,
      images: JSON.stringify(["/images/products/chompa roja/chompa roja.jpeg"]),
      video360: null,
      tag: "Nuevo",
      featured: 1,
      active: 1,
      sold_count: 0,
    },
    {
      id: randomUUID(),
      name: "Poncho Real Tawantinsuyu",
      description:
        "Poncho ceremonial tejido con técnica prehispánica. Cada pieza toma 3 semanas en completarse. Colección limitada.",
      category: "Ponchos",
      price: 220,
      original_price: 280,
      colors: JSON.stringify(["#7B5EA7", "#8B1A1A"]),
      sizes: JSON.stringify(["S", "M", "L", "XL"]),
      stock: JSON.stringify({
        S: { "#7B5EA7": 5 },
        M: { "#7B5EA7": 8, "#8B1A1A": 6 },
        L: { "#8B1A1A": 4 },
        XL: { "#7B5EA7": 2 },
      }),
      material: "Lana de Oveja y Alpaca",
      weight: 850,
      images: JSON.stringify(["/images/products/poncho.jpeg"]),
      video360: null,
      tag: "Promo",
      featured: 1,
      active: 1,
      sold_count: 0,
    },
    {
      id: randomUUID(),
      name: "Falda Pollera Inca",
      description:
        "Pollera típica con bordados multicolor. Tela pesada de alta calidad con forro interior. Ideal para danzas y uso cotidiano.",
      category: "Faldas",
      price: 155,
      original_price: null,
      colors: JSON.stringify(["#C8860A", "#2D5A3D", "#8B1A1A", "#7B5EA7"]),
      sizes: JSON.stringify(["XS", "S", "M", "L"]),
      stock: JSON.stringify({
        XS: { "#C8860A": 4 },
        S: { "#8B1A1A": 6, "#2D5A3D": 5 },
        M: { "#C8860A": 3 },
        L: { "#7B5EA7": 2 },
      }),
      material: "Lana y Algodón",
      weight: 600,
      images: JSON.stringify(["/images/products/Guante-tejido.jpeg"]),
      video360: null,
      tag: "Destacado",
      featured: 1,
      active: 1,
      sold_count: 0,
    },
    {
      id: randomUUID(),
      name: "Bolso Tejido Qero",
      description:
        "Bolso artesanal tejido a mano con motivos de vasos ceremoniales Qero. Práctico para uso diario.",
      category: "Accesorios",
      price: 75,
      original_price: null,
      colors: JSON.stringify(["#1A0A00", "#C8860A"]),
      sizes: JSON.stringify(["Único"]),
      stock: JSON.stringify({ Único: { "#1A0A00": 15, "#C8860A": 12 } }),
      material: "Lana de Alpaca",
      weight: 180,
      images: JSON.stringify(["/images/products/bolso1.jpeg"]),
      video360: null,
      tag: "Nuevo",
      featured: 0,
      active: 1,
      sold_count: 0,
    },
    {
      id: randomUUID(),
      name: "Vestido Pachamama",
      description:
        "Vestido largo con bordados florales inspirados en la Pachamama. Tela ligera y fluida, perfecta para el verano andino.",
      category: "Vestidos",
      price: 195,
      original_price: 240,
      colors: JSON.stringify(["#8B1A1A", "#7B5EA7", "#2D5A3D"]),
      sizes: JSON.stringify(["S", "M", "L", "XL"]),
      stock: JSON.stringify({
        S: { "#8B1A1A": 5 },
        M: { "#7B5EA7": 4, "#2D5A3D": 3 },
        L: { "#8B1A1A": 2 },
        XL: { "#2D5A3D": 1 },
      }),
      material: "Algodón y Seda Natural",
      weight: 350,
      images: JSON.stringify(["/images/products/Accesorios.jpeg"]),
      video360: null,
      tag: "Promo",
      featured: 1,
      active: 1,
      sold_count: 0,
    },
  ];

  await db("products").insert(products);
}

// ─── Auto-migrate: crea las tablas si no existen ──────────────────────────────
export async function initDb() {
  const exists = (table: string) => db.schema.hasTable(table);

  if (!(await exists("users"))) {
    await db.schema.createTable("users", (t) => {
      t.string("id").primary();
      t.string("name").notNullable();
      t.string("email").unique().notNullable();
      t.string("password_hash").notNullable();
      t.string("phone");
      t.string("role").notNullable().defaultTo("customer");
      t.timestamp("created_at").defaultTo(db.fn.now());
    });
  }

  if (!(await exists("categories"))) {
    await db.schema.createTable("categories", (t) => {
      t.string("id").primary();
      t.string("name").notNullable();
      t.string("description");
      t.string("image");
      t.timestamp("created_at").defaultTo(db.fn.now());
    });
  }

  if (!(await exists("products"))) {
    await db.schema.createTable("products", (t) => {
      t.string("id").primary();
      t.string("name").notNullable();
      t.text("description");
      t.string("category");
      t.float("price").notNullable();
      t.float("original_price");
      t.text("colors").defaultTo("[]");
      t.text("sizes").defaultTo("[]");
      t.text("stock").defaultTo("{}");
      t.string("material");
      t.string("weight");
      t.text("images").defaultTo("[]");
      t.string("video360");
      t.string("tag");
      t.boolean("featured").defaultTo(false);
      t.boolean("active").defaultTo(true);
      t.integer("sold_count").defaultTo(0);
      t.timestamp("created_at").defaultTo(db.fn.now());
      t.timestamp("updated_at").defaultTo(db.fn.now());
    });
  }

  await ensureProductColumns();

  if (!(await exists("orders"))) {
    await db.schema.createTable("orders", (t) => {
      t.string("id").primary();
      t.string("order_number").unique().notNullable();
      t.string("user_id").notNullable();
      t.float("subtotal").notNullable();
      t.float("shipping").notNullable().defaultTo(0);
      t.float("discount").notNullable().defaultTo(0);
      t.float("total").notNullable();
      t.string("status").notNullable().defaultTo("pending");
      t.string("payment_method");
      t.text("shipping_address");
      t.timestamp("created_at").defaultTo(db.fn.now());
      t.timestamp("updated_at").defaultTo(db.fn.now());
    });
  }

  if (!(await exists("order_items"))) {
    await db.schema.createTable("order_items", (t) => {
      t.string("id").primary();
      t.string("order_id").notNullable();
      t.string("product_id");
      t.string("product_name").notNullable();
      t.string("product_image");
      t.string("selected_color");
      t.string("selected_size");
      t.integer("quantity").notNullable();
      t.float("unit_price").notNullable();
      t.float("subtotal").notNullable();
    });
  }

  await seedDefaultUsers();
  await seedDefaultCategories();
  await seedDefaultProducts();
  console.log("[DB] SQLite listo en", dbPath);
}
