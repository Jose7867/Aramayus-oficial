-- ============================================================
--  ARAMAYUS ART — Migración inicial
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USUARIOS
CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  phone         VARCHAR(20),
  role          VARCHAR(20) NOT NULL DEFAULT 'customer' CHECK (role IN ('admin','customer')),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- DIRECCIONES
CREATE TABLE IF NOT EXISTS addresses (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  label      VARCHAR(50),
  street     TEXT NOT NULL,
  city       VARCHAR(80) NOT NULL,
  region     VARCHAR(80),
  country    VARCHAR(60) DEFAULT 'Perú',
  zip        VARCHAR(20),
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CATEGORÍAS
CREATE TABLE IF NOT EXISTS categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        VARCHAR(80) UNIQUE NOT NULL,
  description TEXT,
  image       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- PRODUCTOS
CREATE TABLE IF NOT EXISTS products (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name           VARCHAR(150) NOT NULL,
  description    TEXT,
  category       VARCHAR(80) NOT NULL,
  price          NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2),
  images         JSONB DEFAULT '[]',
  colors         JSONB DEFAULT '[]',
  sizes          JSONB DEFAULT '[]',
  stock          JSONB DEFAULT '{}',
  material       VARCHAR(120),
  weight         INTEGER,
  tag            VARCHAR(30) CHECK (tag IN ('Nuevo','Promo','Destacado')),
  featured       BOOLEAN DEFAULT false,
  active         BOOLEAN DEFAULT true,
  sold_count     INTEGER DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_category  ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured  ON products(featured) WHERE active = true;
CREATE INDEX IF NOT EXISTS idx_products_tag       ON products(tag) WHERE active = true;

-- PEDIDOS
CREATE TABLE IF NOT EXISTS orders (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number     VARCHAR(30) UNIQUE NOT NULL,
  user_id          UUID REFERENCES users(id),
  subtotal         NUMERIC(10,2) NOT NULL,
  shipping         NUMERIC(10,2) DEFAULT 0,
  discount         NUMERIC(10,2) DEFAULT 0,
  total            NUMERIC(10,2) NOT NULL,
  status           VARCHAR(30) DEFAULT 'pending'
                   CHECK (status IN ('pending','confirmed','preparing','shipped','delivered','cancelled')),
  payment_method   VARCHAR(50),
  payment_status   VARCHAR(30) DEFAULT 'pending'
                   CHECK (payment_status IN ('pending','paid','failed')),
  shipping_address JSONB,
  notes            TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user   ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- ITEMS DE PEDIDO
CREATE TABLE IF NOT EXISTS order_items (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id       UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id     UUID,
  product_name   VARCHAR(150),
  product_image  TEXT,
  selected_color VARCHAR(30),
  selected_size  VARCHAR(10),
  quantity       INTEGER NOT NULL,
  unit_price     NUMERIC(10,2) NOT NULL,
  subtotal       NUMERIC(10,2) NOT NULL
);

-- CUPONES
CREATE TABLE IF NOT EXISTS coupons (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code         VARCHAR(30) UNIQUE NOT NULL,
  type         VARCHAR(20) CHECK (type IN ('percent','fixed')),
  value        NUMERIC(10,2) NOT NULL,
  min_purchase NUMERIC(10,2) DEFAULT 0,
  max_uses     INTEGER,
  used_count   INTEGER DEFAULT 0,
  active       BOOLEAN DEFAULT true,
  expires_at   TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- FAVORITOS
CREATE TABLE IF NOT EXISTS favorites (
  user_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, product_id)
);
