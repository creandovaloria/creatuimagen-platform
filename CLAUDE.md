# CLAUDE.md — Contexto del Proyecto creatuimagen.online

Lee este archivo al inicio de cada sesión para entender el proyecto completo.

---

## Proyecto

**Plataforma:** creatuimagen.online  
**Marca paraguas:** arturobarrios.com  
**Repo:** creandovaloria/creatuimagen-platform  
**Framework:** Next.js 14 App Router  
**Hosting:** Vercel (cuenta: Creando Valor IA)  
**DNS:** Namecheap (creatuimagen.online + arturobarrios.com)

---

## Subdominios

| Subdominio | Producto | Estado |
|-----------|---------|--------|
| invita.creatuimagen.online | Invitaciones digitales | 🔄 En desarrollo |
| bio.creatuimagen.online | Perfiles digitales | ✅ MVP funcional |
| dashboard.creatuimagen.online | Panel admin | 🔜 Próximo |

---

## Colaboradores

- **Arturo Barrios** — desarrollo, diseño digital
  - Web: arturobarrios.com
  - Repo GitHub: creandovaloria
- **Liz Barron** — Event Planner
  - WhatsApp RSVP: +524272199374

---

## Casos activos

### Invitación XV-Regina
- Festejada: Regina
- Fecha: 23 mayo 2026, 4:00 pm
- Lugar: Limmon, Paso de los Guzmán 12, Centro, San Juan del Río, Qro.
- Maps: https://maps.google.com/?q=Limmon+Paso+de+los+Guzman+12+Centro+76800+San+Juan+del+Rio+Qro
- Canción: I Love It — Icona Pop ft. Charli XCX (YouTube ID: 7kzPMz7bSGo)
- RSVP WhatsApp: +524272199374 (Liz Barron)
- URL destino: invita.creatuimagen.online/XV-Regina
- Secciones: intro → música → calendario+countdown → collage → lugar → tira fotográfica → mensaje+flamingo+rsvp

### Perfil Digital — Arturo Barrios (Demo activa)
- URL destino: bio.creatuimagen.online/arturo-barrios
- Estado: ✅ MVP en producción local
- Funcionalidades: foto perfil (Supabase Storage), links dinámicos, botón guardar contacto (.vcf), colores de tema personalizados, toggle colores corporativos de redes sociales

### Perfil Digital — Andy Villarruel
- URL destino: bio.creatuimagen.online/andy-villarruel
- Estado: pendiente datos de Andy

---

## Convenciones de código

- **Mobile-first siempre** — diseño desde 390px hacia arriba
- **Unidades en vw/vh** para tipografía y espaciado en invitaciones
- **Supabase Storage (bucket `avatars`)** para fotos de perfil — NO Cloudinary para perfiles
- **Cloudinary** para invitaciones (imágenes de eventos)
- **Credenciales en .env.local** — nunca en el código
- **Serverless Functions** para toda lógica de negocio
- **Supabase** para auth + BD + storage

---

## Variables de Entorno (Vercel)

| Variable | Descripción | Valor / Fuente |
|----------|-------------|----------------|
| `NEXT_PUBLIC_URL` | URL base de la app | `https://bios.creatuimagen.online` |
| `RESEND_BIOS_CREA_TU_IMAGEN_API_KEY` | Email para Bios | Resend (Dominio `mail.bios.creatuimagen.online`) |
| `RESEND_ARTURO_API_KEY` | Email para Arturo Personal | Resend (Dominio `arturobarrios.com`) |
| `MP_BIOS_ACCESS_TOKEN` | Pagos Mercado Pago | MP Dashboard (Modo Producción) |
| `NEXT_PUBLIC_SUPABASE_URL` | Base de Datos | Supabase Dashboard |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Base de Datos | Supabase Dashboard |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin DB (Webhook) | Supabase Dashboard |

---

## Variables de entorno

```env
# Supabase (obligatorias)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Storage / Uploads
NEXT_PUBLIC_MAX_UPLOAD_MB=2        # Límite de peso de fotos (default 2MB)

# Cloudinary (para invitaciones)
CLOUDINARY_CLOUD_NAME=dl66zeuix
CLOUDINARY_API_KEY=746435372454527
CLOUDINARY_API_SECRET=

# Pagos y comunicaciones (pendiente)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
META_WHATSAPP_TOKEN=
```

---

## Base de datos Supabase — esquema actual

```sql
-- Perfil base del usuario
perfiles (
  id uuid PK,
  slug text UNIQUE,
  nombre text,
  email text,              -- Email del cliente (para notificaciones)
  rol text DEFAULT 'cliente',
  bio text,
  foto_url text,           -- URL pública de Supabase Storage (bucket avatars)
  theme_primary text,      -- Color HEX principal (ej: #1a56db)
  theme_accent text,       -- Color HEX acento (ej: #00c896)
  usa_colores_tema boolean DEFAULT false,  -- true = usar theme_primary en íconos sociales
  instagram text,
  linkedin text,
  tiktok text,
  facebook text,
  youtube text,
  whatsapp text,
  custom_domain text,
  user_id uuid,            -- Relación con auth.users
  activo boolean DEFAULT true,
  created_at timestamptz
)

-- Links dinámicos del perfil
perfil_links (
  id uuid PK,
  perfil_id uuid FK → perfiles.id,
  titulo text,
  url text,
  icono text,              -- emoji o nombre de ícono
  orden int
)

-- Datos VCard para descarga .vcf
contactos_vcf (
  id uuid PK,
  perfil_id uuid FK → perfiles.id,
  nombre_legal text,
  telefono text,
  email text,
  website text,
  company text
)
```

### Supabase Storage — Bucket `avatars`
- **Tipo:** Público
- **Políticas RLS activas:**
  - INSERT: público (permite subir)
  - UPDATE: público (permite reemplazar)
  - SELECT: público (permite leer URLs)
- **Límite de archivo:** controlado por `NEXT_PUBLIC_MAX_UPLOAD_MB` (default 2MB)
- **Naming:** `{slug}-{random}.{ext}`

---

## Lógica de colores de íconos sociales

El campo `usa_colores_tema` controla el comportamiento:

| `usa_colores_tema` | Comportamiento |
|---|---|
| `false` (default) | Colores corporativos reales (Instagram gradiente, LinkedIn #0A66C2, WhatsApp #25D366, etc.) |
| `true` | Usa `theme_primary` del perfil en todos los íconos |

---

## Archivos clave del módulo Bio

| Archivo | Responsabilidad |
|---------|----------------|
| `app/(bio)/[slug]/page.tsx` | Fetches perfil de Supabase, pasa props a ProfileCard |
| `components/bio/ProfileCard.tsx` | UI pública de la tarjeta (avatar, links, social icons, vCard button) |
| `components/admin/ProfileForm.tsx` | Formulario admin: edita perfil, sube foto, guarda cambios |
| `lib/supabase.ts` | Interfaces TypeScript + funciones de BD |
| `app/api/vcf/[slug]/route.ts` | Genera y sirve el archivo .vcf dinámico |

---

## Prompt estándar para nuevos perfiles

```
Crea un componente Next.js para un perfil digital tipo linktree usando el esquema de `perfiles` de Supabase.
- Nombre: [nombre]
- Slug: [slug]
- Foto: subida a Supabase Storage (bucket avatars)
- Links: desde tabla perfil_links
- Botón guardar contacto: llama a /api/vcf/[slug]
- theme_primary + theme_accent + usa_colores_tema
- Mobile-first
```

---

## Cloudinary — Storage de imágenes (solo invitaciones)

**Cuenta:** creandovaloria  
**Plan:** Free tier (25GB, 25k transformaciones/mes)  
**Cloud Name:** dl66zeuix  
**API Key:** 746435372454527  
**Uso:** SOLO para imágenes de invitaciones de eventos. Perfiles usan Supabase Storage.

**Folder structure:**
```
creatuimagen/
  XV-Regina/
    intro.jpg
    musica.jpg
    collage.jpg
    restaurante.jpg
    tira.jpg
    flamingo.jpg
  perfil/
    (no usar — usar Supabase Storage en su lugar)
```


Lee este archivo al inicio de cada sesión para entender el proyecto completo.

---

## Proyecto

**Plataforma:** creatuimagen.online  
**Marca paraguas:** arturobarrios.com  
**Repo:** creandovaloria/creatuimagen  
**Framework:** Next.js 14 App Router  
**Hosting:** Vercel (cuenta: Creando Valor IA)  
**DNS:** Namecheap (creatuimagen.online + arturobarrios.com)

---

## Subdominios

| Subdominio | Producto | Estado |
|-----------|---------|--------|
| invita.creatuimagen.online | Invitaciones digitales | 🔄 En desarrollo |
| bio.creatuimagen.online | Perfiles digitales | 🔄 En desarrollo |
| dashboard.creatuimagen.online | Panel admin | 🔜 Próximo |

---

## Colaboradores

- **Arturo Barrios** — desarrollo, diseño digital
  - Web: arturobarrios.com
  - Repo GitHub: creandovaloria
- **Liz Barron** — Event Planner
  - WhatsApp RSVP: +524272199374

---

## Casos activos

### Invitación XV-Regina
- Festejada: Regina
- Fecha: 23 mayo 2026, 4:00 pm
- Lugar: Limmon, Paso de los Guzmán 12, Centro, San Juan del Río, Qro.
- Maps: https://maps.google.com/?q=Limmon+Paso+de+los+Guzman+12+Centro+76800+San+Juan+del+Rio+Qro
- Canción: I Love It — Icona Pop ft. Charli XCX (YouTube ID: 7kzPMz7bSGo)
- RSVP WhatsApp: +524272199374 (Liz Barron)
- URL destino: invita.creatuimagen.online/XV-Regina
- Secciones: intro → música → calendario+countdown → collage → lugar → tira fotográfica → mensaje+flamingo+rsvp

### Perfil Digital — Andy Villarruel
- URL destino: bio.creatuimagen.online/andy-villarruel
- Funcionalidades: foto perfil, links, botón guardar contacto (.vcf)
- Estado: pendiente datos de Andy

---

## Convenciones de código

- **Mobile-first siempre** — diseño desde 390px hacia arriba
- **Unidades en vw/vh** para tipografía y espaciado en invitaciones
- **Imágenes en Cloudinary** — nunca base64 en producción
- **Credenciales en .env.local** — nunca en el código
- **Serverless Functions** para toda lógica de negocio
- **Supabase** para auth + BD + storage de documentos
- **Cloudinary** para imágenes y video

---

## Variables de entorno necesarias

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
META_WHATSAPP_TOKEN=
```

---

## Prompt estándar para nuevas invitaciones

```
Crea un componente Next.js mobile-first para una invitación digital de [tipo evento].
- Festejado/a: [nombre]
- Fecha: [fecha ISO]
- Lugar: [nombre, dirección completa]
- Canción: [canción] (YouTube ID: [ID])
- RSVP WhatsApp: [número]
- Imágenes en Cloudinary: [URLs]
- Secciones: [lista en orden]
- Animaciones: slideshow en collage, pétalos CSS, countdown en vivo
- Footer: "Realizado por arturobarrios.com · Liz Barron Event Planner"
```

## Prompt estándar para nuevos perfiles

```
Crea un componente Next.js para un perfil digital tipo linktree.
- Nombre: [nombre]
- Foto: [URL Cloudinary]
- Links: [lista]
- Botón guardar contacto: llama a /api/contacto/[slug]
- Colores: [paleta]
- Mobile-first
```

---

## Base de datos Supabase — tablas principales

```sql
tenants (id, slug, cliente, plan, activo, created_at)
eventos (id, tenant_id, festejado, fecha, lugar, hora, cancion_yt_id)
imagenes (id, tenant_id, tipo, url_cloudinary, orden)
rsvp (id, tenant_id, nombre, asistentes, mensaje, confirmado, created_at)
perfiles (id, slug, nombre, foto_url, bio, activo, created_at)
perfil_links (id, perfil_id, label, url, icono, orden)
contactos_vcf (id, perfil_id, telefono, email, website)
analytics (id, tenant_id, tipo, dispositivo, ciudad, created_at)
```

---

## Cloudinary — Storage de imágenes y video

**Cuenta:** creandovaloria (conectada con GitHub creandovaloria)
**Plan:** Free tier (25GB, 25k transformaciones/mes)
**Uso:** Store & manage assets
**Folder structure:**
```
creatuimagen/
  XV-Regina/
    intro.jpg
    musica.jpg
    collage.jpg
    restaurante.jpg
    tira.jpg
    flamingo.jpg
  perfil/
    (futuro)
```

**Flujo de imágenes (producción):**
- ❌ Base64 embebido en código (solo para prototipos locales)
- ✅ Subir a Cloudinary → URL pública → usar en Next.js con `<Image>` de Next.js
- Ventajas: CDN global, optimización automática por dispositivo, lazy loading, caché

**Cloud Name:** dl66zeuix
**API Key:** 746435372454527
**Console:** console.cloudinary.com/app/c-8c20443080...
