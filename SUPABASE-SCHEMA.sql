-- ══════════════════════════════════════════════════════
-- creatuimagen.online — Supabase Schema v2
-- ══════════════════════════════════════════════════════

-- ── EVENTOS ──
CREATE TABLE IF NOT EXISTS eventos (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug            text UNIQUE NOT NULL,
  festejado       text NOT NULL,
  fecha           date NOT NULL,
  hora            time NOT NULL,
  lugar           text,
  activo          boolean DEFAULT true,
  -- Event Planner (cambia por evento)
  planner_nombre  text,
  planner_email   text,
  planner_phone   text,
  created_at      timestamptz DEFAULT now()
);

-- ── RSVP ──
CREATE TABLE IF NOT EXISTS rsvp (
  id                uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  evento_slug       text NOT NULL REFERENCES eventos(slug) ON DELETE CASCADE,
  nombre            text NOT NULL,
  telefono          text NOT NULL,
  email             text,
  asiste            boolean NOT NULL,
  num_personas      integer DEFAULT 1,
  restricciones     text,
  mensaje_regina    text,
  -- Tracking de notificaciones
  mail_invitado_ok  boolean DEFAULT false,
  mail_planner_ok   boolean DEFAULT false,
  wa_invitado_ok    boolean DEFAULT false,
  wa_planner_ok     boolean DEFAULT false,
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
  r.evento_slug,
  e.festejado,
  e.fecha,
  e.planner_nombre,
  e.planner_email,
  COUNT(*) FILTER (WHERE r.asiste = true)  AS confirmados,
  COUNT(*) FILTER (WHERE r.asiste = false) AS no_asisten,
  SUM(r.num_personas) FILTER (WHERE r.asiste = true) AS total_personas,
  COUNT(*) FILTER (WHERE r.restricciones IS NOT NULL AND r.asiste = true) AS con_restricciones,
  COUNT(*) AS total_respuestas
FROM rsvp r
JOIN eventos e ON e.slug = r.evento_slug
GROUP BY r.evento_slug, e.festejado, e.fecha, e.planner_nombre, e.planner_email;

-- ── RLS ──
ALTER TABLE rsvp    ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "rsvp_insert_public"   ON rsvp    FOR INSERT WITH CHECK (true);
CREATE POLICY "rsvp_select_public"   ON rsvp    FOR SELECT USING (true);
CREATE POLICY "rsvp_update_public"   ON rsvp    FOR UPDATE USING (true);
CREATE POLICY "eventos_select_public" ON eventos FOR SELECT USING (true);

-- ── EVENTO INICIAL: XV REGINA ──
INSERT INTO eventos (slug, festejado, fecha, hora, lugar, planner_nombre, planner_email, planner_phone)
VALUES (
  'XV-Regina',
  'Regina',
  '2026-06-06',
  '16:00',
  'Por definir',
  'Liz Barron',
  'liz@lizbarron.com',      -- reemplazar con email real de Liz
  '524272199374'             -- reemplazar con phone real de Liz
)
ON CONFLICT (slug) DO UPDATE SET
  planner_nombre = EXCLUDED.planner_nombre,
  planner_email  = EXCLUDED.planner_email,
  planner_phone  = EXCLUDED.planner_phone;
