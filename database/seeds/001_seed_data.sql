-- ============================================================
--  ARAMAYUS ART — Datos iniciales de prueba
-- ============================================================

-- Admin (contraseña: Admin123!)
INSERT INTO users (name, email, password_hash, role) VALUES
('Administrador', 'admin@aramayus.com',
 '$2a$12$L5IWuLwcJLqh8AkPX8HoYOlU777fuATcnLlEZN0Ox9BhYIjUVJOn2', 'admin')
ON CONFLICT (email) DO UPDATE
  SET password_hash = EXCLUDED.password_hash,
      role          = EXCLUDED.role;

-- Cliente de prueba (contraseña: Cliente123!)
INSERT INTO users (name, email, password_hash, role) VALUES
('Cliente Ejemplo', 'cliente@ejemplo.com',
 '$2a$12$N/fh5nrC5yQdX1iNTK5t7.FofvHwq/bhBJVtmmsrNpHQ9vw1AYegK', 'customer')
ON CONFLICT (email) DO UPDATE
  SET password_hash = EXCLUDED.password_hash,
      role          = EXCLUDED.role;

-- Categorías
INSERT INTO categories (name, description) VALUES
('Chompas',    'Tejidos a mano con lana de alpaca y oveja'),
('Ponchos',    'Piezas ceremoniales y de uso diario'),
('Camisas',    'Camisas bordadas con motivos andinos'),
('Faldas',     'Polleras y faldas tradicionales'),
('Vestidos',   'Vestidos artesanales para toda ocasión'),
('Accesorios', 'Bolsos, gorros, bufandas y más')
ON CONFLICT (name) DO NOTHING;

-- Productos de muestra
INSERT INTO products (name, description, category, price, original_price, colors, sizes, stock, material, weight, tag, featured) VALUES
(
  'Chompa Andina Wari',
  'Tejida a mano con 100% lana de alpaca bebé. Diseño inspirado en la cultura Wari con rombos y líneas geométricas en colores naturales.',
  'Chompas', 185.00, NULL,
  '["#8B1A1A","#2D5A3D","#C8860A","#1A0A00"]',
  '["S","M","L","XL"]',
  '{"S":{"#8B1A1A":8,"#2D5A3D":5},"M":{"#8B1A1A":12,"#C8860A":6},"L":{"#C8860A":4},"XL":{"#1A0A00":2}}',
  '100% Lana de Alpaca Bebé', 420, 'Destacado', true
),
(
  'Chompa Beige',
  'Chompa artesanal en color beige, tejida con técnicas tradicionales.',
  'Chompas', 160.00, NULL,
  '["#F5F5DC"]',
  '["S","M","L","XL"]',
  '{"S":{"#F5F5DC":5},"M":{"#F5F5DC":10},"L":{"#F5F5DC":8},"XL":{"#F5F5DC":2}}',
  '100% Lana de Alpaca', 400, 'Nuevo', true
),
(
  'Chompa Roja',
  'Chompa artesanal en color rojo, tejida con técnicas tradicionales.',
  'Chompas', 165.00, NULL,
  '["#FF0000"]',
  '["S","M","L","XL"]',
  '{"S":{"#FF0000":5},"M":{"#FF0000":10},"L":{"#FF0000":8},"XL":{"#FF0000":2}}',
  '100% Lana de Alpaca', 400, 'Nuevo', true
),
(
  'Poncho Real Tawantinsuyu',
  'Poncho ceremonial tejido con técnica prehispánica. Cada pieza toma 3 semanas en completarse. Colección limitada.',
  'Ponchos', 220.00, 280.00,
  '["#7B5EA7","#8B1A1A"]',
  '["S","M","L","XL"]',
  '{"S":{"#7B5EA7":5},"M":{"#7B5EA7":8,"#8B1A1A":6},"L":{"#8B1A1A":4},"XL":{"#7B5EA7":2}}',
  'Lana de Oveja y Alpaca', 850, 'Promo', true
),
(
  'Falda Pollera Inca',
  'Pollera típica con bordados multicolor. Tela pesada de alta calidad con forro interior. Ideal para danzas y uso cotidiano.',
  'Faldas', 155.00, NULL,
  '["#C8860A","#2D5A3D","#8B1A1A","#7B5EA7"]',
  '["XS","S","M","L"]',
  '{"XS":{"#C8860A":4},"S":{"#8B1A1A":6,"#2D5A3D":5},"M":{"#C8860A":3},"L":{"#7B5EA7":2}}',
  'Lana y Algodón', 600, 'Destacado', true
),
(
  'Bolso Tejido Qero',
  'Bolso artesanal tejido a mano con motivos de vasos ceremoniales Qero. Práctico para uso diario.',
  'Accesorios', 75.00, NULL,
  '["#1A0A00","#C8860A"]',
  '["Único"]',
  '{"Único":{"#1A0A00":15,"#C8860A":12}}',
  'Lana de Alpaca', 180, 'Nuevo', false
),
(
  'Vestido Pachamama',
  'Vestido largo con bordados florales inspirados en la Pachamama. Tela ligera y fluida, perfecta para el verano andino.',
  'Vestidos', 195.00, 240.00,
  '["#8B1A1A","#7B5EA7","#2D5A3D"]',
  '["S","M","L","XL"]',
  '{"S":{"#8B1A1A":5},"M":{"#7B5EA7":4,"#2D5A3D":3},"L":{"#8B1A1A":2},"XL":{"#2D5A3D":1}}',
  'Algodón y Seda Natural', 350, 'Promo', true
);

-- Cupones de prueba
INSERT INTO coupons (code, type, value, min_purchase, max_uses) VALUES
('INTI20',   'percent', 10,  100, 500),
('ANDINO15', 'percent',  8,   50, 200),
('CUSCO10',  'percent', 10,  150, 100)
ON CONFLICT (code) DO NOTHING;

RAISE NOTICE 'Seed completado exitosamente';
