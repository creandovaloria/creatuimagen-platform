# creatuimagen.online — Plataforma de Presencia Digital

Plataforma multi-producto para invitaciones digitales y perfiles digitales personales, construida sobre Next.js + Supabase + Cloudinary, desplegada en Vercel.

## Estado actual — Mayo 2026

| Módulo | Estado | URL |
|--------|--------|-----|
| Perfiles digitales (Bio) | ✅ MVP funcional | `bio.creatuimagen.online/[slug]` |
| Admin de perfiles | ✅ Funcional (admin local) | `/dashboard/perfiles/[slug]` |
| Invitaciones digitales | 🔄 En desarrollo | `invita.creatuimagen.online/[slug]` |
| Dashboard multi-cliente | 🔜 Próximo | `dashboard.creatuimagen.online` |

---

## Marca
- **Plataforma operativa:** creatuimagen.online
- **Marca principal:** arturobarrios.com (footer en todos los productos)
- **Event Planner aliada:** Liz Barron Event Planner

---

## Arquitectura de subdominios

```
creatuimagen.online
├── invita.creatuimagen.online       ← Invitaciones digitales
│     ├── /XV-Regina                 ← XV años Regina (caso 1)
│     └── /[slug]                    ← futuros eventos
│
├── bio.creatuimagen.online          ← Perfiles digitales tipo linktree
│     ├── /arturo-barrios            ← demo activa ✅
│     ├── /andy-villarruel           ← pendiente datos
│     └── /[slug]
│
└── dashboard.creatuimagen.online    ← Panel de administración
      ├── /login
      ├── /eventos
      └── /perfiles
```

---

## Stack tecnológico

| Capa | Tecnología | Plan gratuito |
|------|-----------|---------------|
| Framework | Next.js 14 (App Router) | — |
| Hosting | Vercel | Hobby (gratis) |
| Base de datos | Supabase | 500MB, 50k usuarios |
| Storage (avatars) | Supabase Storage | Incluido en free tier |
| Imágenes/Video eventos | Cloudinary | 25GB, 25k transformaciones |
| Autenticación | Supabase Auth | Incluido |
| Pagos | Stripe | 2.9% por transacción |
| WhatsApp | Meta Business API | 1,000 conv/mes gratis |
| Emails | Resend | 3,000/mes gratis |
| Contacto VCF | Serverless Function | — |
| DNS | Namecheap | — |

**Costo operativo mes 1–100 clientes: $0**

---

## Productos

### 1. Perfiles Digitales (`bio.creatuimagen.online`) ✅ MVP Listo

Páginas personales tipo linktree con identidad visual propia y descarga de contacto.

**Funcionalidades implementadas:**
- ✅ Foto de perfil — subida a Supabase Storage (bucket `avatars`, máx 2MB configurable)
- ✅ Nombre, rol y bio editables desde panel admin
- ✅ Colores personalizados: `theme_primary` + `theme_accent`
- ✅ Toggle de íconos: colores corporativos reales o color del tema personalizado
- ✅ Links dinámicos con emoji, título y URL (drag & drop orden pendiente)
- ✅ Íconos SVG de redes fijas: Instagram, LinkedIn, WhatsApp, Facebook, TikTok, YouTube
- ✅ Botón "Guardar Contacto" → descarga `.vcf` con datos del contacto desde Supabase
- ✅ Panel admin CRUD completo

**Pendiente:**
- [ ] Diseño visual premium de la tarjeta (UI polish)
- [ ] PWA instalable
- [ ] Analytics de clicks por link

### 2. Invitaciones Digitales (`invita.creatuimagen.online`) 🔄 En desarrollo

Landing pages mobile-first para eventos: XV años, bodas, bautizos, cumpleaños.

**Funcionalidades planeadas:**
- Diseño fullscreen scroll fluido para celular
- Countdown en tiempo real
- Reproductor de música (SoundCloud Widget API)
- RSVP con Supabase + notificación WhatsApp automática

### 3. Dashboard (`dashboard.creatuimagen.online`) 🔜 Próximo

Panel multi-cliente con login seguro, gestión de perfiles y analytics.

---

## Variables de entorno

```env
# Supabase (requeridas)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Límite de upload (opcional, default 2MB)
NEXT_PUBLIC_MAX_UPLOAD_MB=2

# Cloudinary (para invitaciones)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Futuro
STRIPE_SECRET_KEY=
RESEND_API_KEY=
META_WHATSAPP_TOKEN=
```

---

## Estructura del repo

```
creatuimagen-platform/
├── app/
│   ├── (bio)/[slug]/page.tsx         ← tarjeta pública por slug
│   ├── (invita)/[slug]/page.tsx      ← invitación pública por slug
│   ├── dashboard/perfiles/[slug]/    ← admin de cada perfil
│   └── api/
│       ├── vcf/[slug]/route.ts       ← genera .vcf dinámico
│       └── rsvp/route.ts             ← guarda confirmaciones
├── components/
│   ├── bio/ProfileCard.tsx           ← tarjeta pública (UI)
│   └── admin/ProfileForm.tsx         ← formulario admin
├── lib/
│   └── supabase.ts                   ← interfaces + funciones BD
├── CLAUDE.md                         ← contexto del proyecto (leer primero)
├── LECCIONES.md                      ← lecciones aprendidas + troubleshooting
├── PRD.md                            ← product requirements
└── SUPABASE-SCHEMA.sql               ← esquema de BD
```

---

## Desarrollo local

```bash
npm install
cp .env.local.example .env.local  # completar con credenciales reales
npm run dev
```

Abre `http://localhost:3000`

---

## Monetización

| Producto | Plan | Precio MXN | Incluye |
|----------|------|-----------|---------| 
| Perfil Digital | Básico | $299 | Perfil + VCF + Storage foto, 6 meses |
| Perfil Digital | Pro | $699 | + PWA + Analytics + dominio custom, 12 meses |
| Invitación | Basic | $499 | 1 evento, RSVP, 3 meses |
| Invitación | Pro | $999 | + Dashboard, WhatsApp auto, 6 meses |
| Invitación | Premium | $1,999 | + Analytics, dominio propio, 12 meses |

---

## Créditos
- Desarrollo: [arturobarrios.com](https://arturobarrios.com)
- Event Planner: Liz Barron Event Planner (+524272199374)


## Marca
- **Plataforma operativa:** creatuimagen.online
- **Marca principal:** arturobarrios.com (footer en todos los productos)
- **Event Planner aliada:** Liz Barron Event Planner

---

## Arquitectura de subdominios

```
creatuimagen.online
├── invita.creatuimagen.online       ← Invitaciones digitales
│     ├── /XV-Regina                 ← XV años Regina (caso 1)
│     ├── /Boda-Ana-Carlos           ← próximos eventos
│     └── /Cumple-Luis
│
├── bio.creatuimagen.online       ← Perfiles digitales tipo linktree
│     ├── /andy-villarruel           ← caso 1
│     ├── /liz-barron
│     └── /arturo-barrios
│
└── dashboard.creatuimagen.online    ← Panel de administración
      ├── /login
      ├── /eventos
      └── /perfiles
```

---

## Stack tecnológico

| Capa | Tecnología | Plan gratuito |
|------|-----------|---------------|
| Framework | Next.js 14 (App Router) | — |
| Hosting | Vercel | Hobby (gratis) |
| Base de datos | Supabase | 500MB, 50k usuarios |
| Imágenes/Video | Cloudinary | 25GB, 25k transformaciones |
| Autenticación | Supabase Auth | Incluido |
| Pagos | Stripe | 2.9% por transacción |
| WhatsApp | Meta Business API | 1,000 conv/mes gratis |
| Emails | Resend | 3,000/mes gratis |
| Contacto VCF | Serverless Function | — |
| Animaciones | Lottie + CSS | — |
| DNS | Namecheap | — |

**Costo operativo mes 1–100 clientes: $0**

---

## Productos

### 1. Invitaciones Digitales (`invita.creatuimagen.online`)
Landing pages mobile-first para eventos: XV años, bodas, bautizos, cumpleaños.

**Funcionalidades:**
- Diseño fullscreen scroll fluido para celular
- Countdown en tiempo real
- Calendario del evento
- Slideshow animado de fotos
- Reproductor de canción favorita (YouTube Audio API)
- Pétalos / confeti CSS animation
- Sección lugar del evento con Google Maps
- RSVP con formulario → guarda en Supabase
- Botón WhatsApp con mensaje preescrito
- Footer branding arturobarrios.com

### 2. Perfiles Digitales (`bio.creatuimagen.online`)
Páginas personales tipo linktree con identidad visual propia.

**Funcionalidades:**
- Foto de perfil con identidad visual
- Links a redes sociales y servicios
- Botón "Guardar Contacto" → descarga .vcf dinámico desde Supabase
- Instalable como PWA (ícono en pantalla de inicio)
- Optimizado para compartir por WhatsApp

### 3. Dashboard (`dashboard.creatuimagen.online`)
Panel de administración para Arturo, Liz y clientes.

**Funcionalidades:**
- Login seguro (Supabase Auth)
- CRUD de eventos e invitaciones
- Lista de confirmados RSVP en tiempo real
- Analytics: aperturas, dispositivos, ciudades
- Exportar lista de invitados a Excel
- Gestión de perfiles digitales
- Subida de imágenes a Cloudinary

---

## Estructura del repo

```
creatuimagen/
├── app/
│   ├── (invita)/
│   │   └── [slug]/
│   │       └── page.tsx          ← invitación dinámica por slug
│   ├── (bio)/
│   │   └── [slug]/
│   │       └── page.tsx          ← perfil digital por slug
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── eventos/
│   │   └── perfiles/
│   └── api/
│       ├── rsvp/route.ts         ← guarda confirmación
│       ├── contacto/[slug]/route.ts ← genera .vcf dinámico
│       ├── track/route.ts        ← analytics de apertura
│       └── whatsapp/route.ts     ← notificaciones automáticas
├── components/
│   ├── invitaciones/
│   │   ├── Slideshow.tsx
│   │   ├── Countdown.tsx
│   │   ├── Calendario.tsx
│   │   ├── MusicPlayer.tsx
│   │   ├── PetalosAnimation.tsx
│   │   ├── VenueMap.tsx
│   │   └── RSVPForm.tsx
│   ├── perfil/
│   │   ├── ProfileCard.tsx
│   │   ├── LinkButton.tsx
│   │   └── SaveContactButton.tsx
│   └── ui/
│       └── (componentes compartidos)
├── lib/
│   ├── supabase.ts
│   ├── cloudinary.ts
│   └── vcf.ts
├── public/
└── CLAUDE.md
```

---

## Casos de uso activos

| Producto | Cliente | URL | Estado |
|----------|---------|-----|--------|
| Invitación XV | Regina | invita.creatuimagen.online/XV-Regina | 🔄 En desarrollo |
| Perfil digital | Andy Villarruel | bio.creatuimagen.online/andy-villarruel | 🔄 En desarrollo |

---

## Monetización

| Producto | Plan | Precio MXN | Incluye |
|----------|------|-----------|---------|
| Invitación | Basic | $499 | 1 evento, RSVP, 3 meses |
| Invitación | Pro | $999 | + Dashboard, WhatsApp auto, 6 meses |
| Invitación | Premium | $1,999 | + Analytics, dominio propio, 12 meses |
| Perfil Digital | Básico | $299 | Perfil + VCF, 6 meses |
| Perfil Digital | Pro | $699 | + PWA + Analytics, 12 meses |
| Paquete Liz | Especial | TBD | Múltiples eventos + dashboard unificado |

---

## Créditos
- Desarrollo: [arturobarrios.com](https://arturobarrios.com)
- Event Planner: Liz Barron Event Planner (+524272199374)
