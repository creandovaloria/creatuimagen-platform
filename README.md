# creatuimagen.online — Plataforma de Presencia Digital

Plataforma multi-producto para invitaciones digitales y perfiles digitales personales, construida sobre Next.js + Supabase + Cloudinary, desplegada en Vercel.

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
