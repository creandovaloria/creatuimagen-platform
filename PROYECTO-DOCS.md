# 📁 Mapa del Proyecto — creatuimagen.online

## Descripción general

Plataforma de presencia digital para invitaciones y perfiles, construida sobre Next.js + Supabase + Cloudinary, desplegada en Vercel bajo el subdominio `invitaciones.creatuimagen.online`.

---

## 🗂️ Documentos del proyecto

| Documento | Descripción | Ubicación |
|-----------|-------------|-----------|
| `README.md` | Arquitectura general, stack, productos y monetización | [GitHub](https://github.com/creandovaloria/creatuimagen-platform/blob/main/README.md) |
| `CLAUDE.md` | Contexto para Claude — leer al inicio de cada sesión | [GitHub](https://github.com/creandovaloria/creatuimagen-platform/blob/main/CLAUDE.md) |
| `PRD.md` | Product Requirements — funcionalidades, roadmap, tabla visual | [GitHub](https://github.com/creandovaloria/creatuimagen-platform/blob/main/PRD.md) |
| `LECCIONES.md` | Errores resueltos, decisiones de arquitectura, prompts | [GitHub](https://github.com/creandovaloria/creatuimagen-platform/blob/main/LECCIONES.md) |
| `MONETIZACION.md` | Estrategia de precios, planes, proyección de ingresos | [GitHub](https://github.com/creandovaloria/creatuimagen-platform/blob/main/MONETIZACION.md) |
| `ASSETS-REFERENCIA.md` | Tabla de imágenes — resoluciones, formatos, URLs Cloudinary | [GitHub](https://github.com/creandovaloria/creatuimagen-platform/blob/main/ASSETS-REFERENCIA.md) |
| `SUPABASE-SCHEMA.sql` | Schema completo de base de datos — ejecutar en Supabase | [GitHub](https://github.com/creandovaloria/creatuimagen-platform/blob/main/SUPABASE-SCHEMA.sql) |
| `ENV-VARIABLES.md` | Variables de entorno, cuentas y servicios ⚠️ solo local | iCloud / Local (NO en GitHub) |

---

## 🌐 URLs del proyecto

| URL | Descripción | Estado |
|-----|-------------|--------|
| `invitaciones.creatuimagen.online/XV-Regina` | Invitación v1 — botón WhatsApp | ✅ Live |
| `invitaciones.creatuimagen.online/XV-Regina-b` | Invitación v2 — formulario Supabase | 🔄 En pruebas |
| `creatuimagen-platform.vercel.app` | URL default de Vercel | ✅ Live |

---

## 📦 Repositorios

| Repo | Descripción | Link |
|------|-------------|------|
| `creatuimagen-platform` | Plataforma principal Next.js | [GitHub](https://github.com/creandovaloria/creatuimagen-platform) |
| `invitaciones-XV-Regina` | HTML estático histórico (archivo) | [GitHub](https://github.com/creandovaloria/invitaciones-XV-Regina) |

---

## 🛠️ Servicios conectados

| Servicio | Para qué | Panel | Estado |
|---------|---------|-------|--------|
| **Vercel** | Hosting + deploy automático | [vercel.com](https://vercel.com/creando-valor-ias-projects/creatuimagen-platform) | ✅ |
| **GitHub** | Repositorio de código | [github.com/creandovaloria](https://github.com/creandovaloria) | ✅ |
| **Supabase** | Base de datos + auth | [supabase.com](https://supabase.com) | 🔄 Pendiente config |
| **Cloudinary** | Imágenes CDN | [cloudinary.com](https://console.cloudinary.com) | ✅ |
| **Resend** | Emails transaccionales | [resend.com](https://resend.com) | 🔄 Pendiente key |
| **Meta Business** | WhatsApp Business API | [business.facebook.com](https://business.facebook.com) | 🔄 Pendiente config |
| **Namecheap** | DNS dominios | [namecheap.com](https://namecheap.com) | ✅ |

---

## 📂 Estructura del código

```
creatuimagen-platform/
├── app/
│   ├── XV-Regina/          → Invitación v1 (WA button)
│   ├── XV-Regina-b/        → Invitación v2 (Supabase form)
│   └── api/rsvp/           → API endpoint confirmaciones
├── components/invitaciones/
│   ├── Petals.tsx           → Animación pétalos
│   ├── MusicPlayer.tsx      → Reproductor SoundCloud
│   ├── CalendarioCountdown.tsx → Calendario + countdown
│   ├── Collage.tsx          → Fotos polaroid
│   ├── Fotos.tsx            → Collage + tira combinados
│   ├── DressCode.tsx        → Código de vestimenta
│   ├── Venue.tsx            → Lugar del evento
│   ├── Tira.tsx             → Tira fotográfica
│   ├── RSVP.tsx             → Sección RSVP (v1 con WA)
│   ├── RSVPWithForm.tsx     → Sección RSVP (v2 con form)
│   ├── RSVPForm.tsx         → Formulario de confirmación
│   ├── Footer.tsx           → Footer branding
│   ├── ScrollReveal.tsx     → Animación scroll
│   └── ScrollHint.tsx       → Flecha "desliza"
├── lib/
│   ├── supabase.ts          → Cliente + funciones BD
│   ├── notifications.ts     → Email (Resend) + WA (Meta)
│   └── regina-images.ts     → URLs Cloudinary
└── docs/
    ├── README.md
    ├── CLAUDE.md
    ├── PRD.md
    ├── LECCIONES.md
    ├── MONETIZACION.md
    ├── ASSETS-REFERENCIA.md
    └── SUPABASE-SCHEMA.sql
```

---

## 🚀 Casos activos

| Evento | Ruta | Fecha | Planner | Estado |
|--------|------|-------|---------|--------|
| XV Regina | `/XV-Regina` | 6 Jun 2026 | Liz Barron | ✅ Live v1 |
| XV Regina (form) | `/XV-Regina-b` | 6 Jun 2026 | Liz Barron | 🔄 Pruebas v2 |

---

## ⚡ Comandos útiles

```bash
# Clonar el repo
git clone https://github.com/creandovaloria/creatuimagen-platform.git

# Instalar dependencias
cd creatuimagen-platform && npm install

# Desarrollo local
npm run dev   # → http://localhost:3000

# Build de producción
npm run build
```

---

## 📋 Próximos pasos

- [ ] Configurar Supabase — ejecutar SUPABASE-SCHEMA.sql
- [ ] Agregar env vars en Vercel (ver ENV-VARIABLES.md)
- [ ] Configurar Meta WA Business API
- [ ] Probar flujo completo en /XV-Regina-b
- [ ] Dashboard de Liz para ver RSVPs
- [ ] Cuando esté validado → reemplazar v1 con v2
