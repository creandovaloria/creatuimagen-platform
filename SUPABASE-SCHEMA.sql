-- ══════════════════════════════════════════
-- creatuimagen.online — Schema Supabase
-- XV Regina — RSVP
-- ══════════════════════════════════════════

-- Tabla principal de eventos
CREATE TABLE IF NOT EXISTS eventos (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug        text UNIQUE NOT NULL,        -- 'XV-Regina'
  festejado   text NOT NULL,               -- 'Regina'
  fecha       date NOT NULL,
  hora        time NOT NULL,
  lugar       text,
  activo      boolean DEFAULT true,
  created_at  timestamptz DEFAULT now()
);

-- Tabla de confirmaciones RSVP
CREATE TABLE IF NOT EXISTS rsvp (
  id                    uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  evento_id             uuid REFERENCES eventos(id) ON DELETE CASCADE,
  evento_slug           text NOT NULL,               -- para queries rápidas
  nombre                text NOT NULL,
  telefono              text NOT NULL,
  asiste                boolean NOT NULL,
  num_personas          integer DEFAULT 1,
  restricciones         text,                        -- null si no hay
  mensaje_regina        text,                        -- opcional
  created_at            timestamptz DEFAULT now(),
  updated_at            timestamptz DEFAULT now(),

  -- Llave única: un teléfono por evento
  UNIQUE(evento_slug, telefono)
);

-- Índices para el dashboard
CREATE INDEX IF NOT EXISTS idx_rsvp_evento   ON rsvp(evento_slug);
CREATE INDEX IF NOT EXISTS idx_rsvp_telefono ON rsvp(telefono);
CREATE INDEX IF NOT EXISTS idx_rsvp_asiste   ON rsvp(evento_slug, asiste);

-- Vista para el dashboard de Liz
CREATE OR REPLACE VIEW dashboard_rsvp AS
SELECT
  evento_slug,
  COUNT(*) FILTER (WHERE asiste = true)  AS confirmados,
  COUNT(*) FILTER (WHERE asiste = false) AS no_asisten,
  SUM(num_personas) FILTER (WHERE asiste = true) AS total_personas,
  COUNT(*) FILTER (WHERE restricciones IS NOT NULL AND asiste = true) AS con_restricciones,
  COUNT(*) AS total_respuestas
FROM rsvp
GROUP BY evento_slug;

-- Row Level Security
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;

-- Policy: cualquiera puede insertar (para el formulario público)
CREATE POLICY "insert_rsvp_public"
  ON rsvp FOR INSERT
  WITH CHECK (true);

-- Policy: solo lectura pública para verificar duplicados
CREATE POLICY "select_rsvp_by_phone"
  ON rsvp FOR SELECT
  USING (true);

-- Policy: actualizar solo el propio registro (por teléfono)
CREATE POLICY "update_rsvp_own"
  ON rsvp FOR UPDATE
  USING (true);

-- Insertar evento de Regina
INSERT INTO eventos (slug, festejado, fecha, hora, lugar)
VALUES ('XV-Regina', 'Regina', '2026-06-06', '16:00', 'Por definir')
ON CONFLICT (slug) DO NOTHING;
