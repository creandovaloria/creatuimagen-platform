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

-- ── RLS EVENTOS ──
ALTER TABLE rsvp    ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "rsvp_insert_public"   ON rsvp    FOR INSERT WITH CHECK (true);
CREATE POLICY "rsvp_select_public"   ON rsvp    FOR SELECT USING (true);
CREATE POLICY "rsvp_update_public"   ON rsvp    FOR UPDATE USING (true);
CREATE POLICY "eventos_select_public" ON eventos FOR SELECT USING (true);

-- ══════════════════════════════════════════════════════
-- ── PERFILES DIGITALES (LINKTREES) ──
-- ══════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS perfiles (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug            text UNIQUE NOT NULL,
  nombre          text NOT NULL,
  rol             text NOT NULL,
  bio             text,
  foto_url        text,
  theme_primary   text DEFAULT '#1a1a1a',
  theme_accent    text DEFAULT '#4ade80',
  activo          boolean DEFAULT true,
  created_at      timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS perfil_links (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  perfil_id       uuid NOT NULL REFERENCES perfiles(id) ON DELETE CASCADE,
  titulo          text NOT NULL,
  url             text NOT NULL,
  icono           text,
  orden           integer DEFAULT 0,
  created_at      timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contactos_vcf (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  perfil_id       uuid UNIQUE NOT NULL REFERENCES perfiles(id) ON DELETE CASCADE,
  telefono        text,
  email           text,
  website         text,
  company         text
);

-- ── RLS PERFILES ──
ALTER TABLE perfiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfil_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE contactos_vcf ENABLE ROW LEVEL SECURITY;

CREATE POLICY "perfiles_select_public" ON perfiles FOR SELECT USING (true);
CREATE POLICY "perfil_links_select_public" ON perfil_links FOR SELECT USING (true);
CREATE POLICY "contactos_vcf_select_public" ON contactos_vcf FOR SELECT USING (true);

-- ── PERFIL INICIAL DE PRUEBA: ARTURO BARRIOS ──
INSERT INTO perfiles (slug, nombre, rol, bio, foto_url, theme_primary, theme_accent)
VALUES (
  'arturo-barrios',
  'Arturo Barrios',
  'AI Strategist & Consultant',
  'Ayudo a profesionales y empresas a integrar Inteligencia Artificial para escalar sus ventas y operaciones. 🚀',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  '#1a1a1a',
  '#4ade80'
) ON CONFLICT (slug) DO NOTHING;

-- Nota: Para los links, se deben insertar obteniendo primero el ID del perfil insertado.
