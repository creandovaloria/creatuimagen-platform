-- ══════════════════════════════════════════════════════
-- creatuimagen.online — Supabase Schema
-- Proyecto: creatuimagen-invitaciones (proyecto separado)
-- ══════════════════════════════════════════════════════

-- ── EVENTOS ──
CREATE TABLE IF NOT EXISTS eventos (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug        text UNIQUE NOT NULL,
  festejado   text NOT NULL,
  fecha       date NOT NULL,
  hora        time NOT NULL,
  lugar       text,
  activo      boolean DEFAULT true,
  created_at  timestamptz DEFAULT now()
);

-- ── RSVP ──
CREATE TABLE IF NOT EXISTS rsvp (
  id                uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  evento_slug       text NOT NULL REFERENCES eventos(slug) ON DELETE CASCADE,
  nombre            text NOT NULL,
  telefono          text NOT NULL,
  asiste            boolean NOT NULL,
  num_personas      integer DEFAULT 1,
  restricciones     text,
  mensaje_regina    text,
  -- Notificaciones
  mail_invitado_ok  boolean DEFAULT false,
  mail_liz_ok       boolean DEFAULT false,
  wa_invitado_ok    boolean DEFAULT false,
  wa_liz_ok         boolean DEFAULT false,
  created_at        timestamptz DEFAULT now(),
  updated_at        timestamptz DEFAULT now(),
  UNIQUE(evento_slug, telefono)
);

-- ── ÍNDICES ──
CREATE INDEX IF NOT EXISTS idx_rsvp_evento   ON rsvp(evento_slug);
CREATE INDEX IF NOT EXISTS idx_rsvp_asiste   ON rsvp(evento_slug, asiste);
CREATE INDEX IF NOT EXISTS idx_rsvp_telefono ON rsvp(telefono);

-- ── VISTA DASHBOARD ──
CREATE OR REPLACE VIEW dashboard_rsvp AS
SELECT
  evento_slug,
  COUNT(*) FILTER (WHERE asiste = true)   AS confirmados,
  COUNT(*) FILTER (WHERE asiste = false)  AS no_asisten,
  SUM(num_personas) FILTER (WHERE asiste = true) AS total_personas,
  COUNT(*) FILTER (WHERE restricciones IS NOT NULL AND asiste = true) AS con_restricciones,
  COUNT(*) AS total_respuestas
FROM rsvp
GROUP BY evento_slug;

-- ── RLS ──
ALTER TABLE rsvp    ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "rsvp_insert_public" ON rsvp FOR INSERT WITH CHECK (true);
CREATE POLICY "rsvp_select_public" ON rsvp FOR SELECT USING (true);
CREATE POLICY "rsvp_update_public" ON rsvp FOR UPDATE USING (true);
CREATE POLICY "eventos_select_public" ON eventos FOR SELECT USING (true);

-- ── EVENTO INICIAL ──
INSERT INTO eventos (slug, festejado, fecha, hora, lugar)
VALUES ('XV-Regina', 'Regina', '2026-06-06', '16:00', 'Por definir')
ON CONFLICT (slug) DO NOTHING;
