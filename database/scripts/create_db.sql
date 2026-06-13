-- Crear la base de datos (ejecutar como superusuario)
CREATE DATABASE aramayus_art
  WITH ENCODING = 'UTF8'
  LC_COLLATE = 'es_PE.UTF-8'
  LC_CTYPE = 'es_PE.UTF-8'
  TEMPLATE = template0;

\c aramayus_art
\i ../migrations/001_create_tables.sql
\i ../seeds/001_seed_data.sql
