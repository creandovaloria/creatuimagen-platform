# PRD — Product Requirements Document
# creatuimagen.online

**Versión:** 1.0  
**Fecha:** Mayo 2026  
**Autor:** Arturo Barrios  

---

## 1. Visión del producto

Plataforma SaaS de presencia digital para eventos y personas, que permite crear invitaciones digitales y perfiles personales de alto impacto visual, con funcionalidades avanzadas (RSVP, analytics, WhatsApp automático, contacto VCF), todo bajo la marca arturobarrios.com.

---

## 2. Problema que resuelve

| Problema | Solución |
|---------|---------|
| Invitaciones en papel son caras y no medibles | Invitación digital con analytics |
| WhatsApp masivo manual para RSVP | Confirmación automática con dashboard |
| Linktree genérico sin identidad | Perfil digital con marca propia |
| Tarjetas de presentación físicas | VCF digital siempre actualizado |

---

## 3. Usuarios objetivo

| Usuario | Rol | Necesidad |
|---------|-----|-----------|
| Arturo Barrios | Admin / vendedor | Crear y gestionar todos los eventos |
| Liz Barron | Event Planner aliada | Ver RSVPs de sus eventos en tiempo real |
| Cliente final | Festejado/a o marca | Ver su invitación o perfil bonito |
| Invitado | Consumidor | Confirmar asistencia fácilmente |

---

## 4. Productos

### 4.1 Invitaciones Digitales
**URL:** invita.creatuimagen.online/[slug]

#### Funcionalidades core (MVP)
- [ ] Página mobile-first con scroll fluido
- [ ] Imágenes desde Cloudinary (no base64)
- [ ] Slideshow animado de fotos con CSS transitions
- [ ] Pétalos / confeti CSS animation al abrir
- [ ] Reproductor de música (YouTube Audio API, solo audio)
- [ ] Calendario del mes con día marcado
- [ ] Countdown en tiempo real (días, horas, min, seg)
- [ ] Sección lugar del evento con foto + botón Google Maps
- [ ] Formulario RSVP → guarda en Supabase
- [ ] Notificación WhatsApp automática a Event Planner
- [ ] Footer branding arturobarrios.com

#### Funcionalidades Pro
- [ ] Dashboard RSVP en tiempo real
- [ ] Analytics: aperturas, dispositivos, ciudades
- [ ] Recordatorio automático 3 días antes (WhatsApp/Email)
- [ ] Exportar lista de invitados a Excel
- [ ] Código QR de la invitación para imprimir

#### Funcionalidades Premium
- [ ] Dominio propio del cliente
- [ ] Video mensaje de la festejada
- [ ] Música de fondo autoplay (con user gesture)
- [ ] Múltiples secciones personalizables

---

### 4.2 Perfiles Digitales
**URL:** bio.creatuimagen.online/[slug]

#### Funcionalidades core (MVP)
- [ ] Foto de perfil desde Cloudinary
- [ ] Nombre y bio corta
- [ ] Links a redes sociales y servicios (orden configurable)
- [ ] Botón "Guardar Contacto" → genera .vcf dinámico desde Supabase
- [ ] Colores y tipografía personalizados por perfil
- [ ] Mobile-first, compartible por WhatsApp

#### Funcionalidades Pro
- [ ] PWA instalable (ícono en pantalla de inicio)
- [ ] Analytics: clicks por link, visitas totales
- [ ] Múltiples secciones: galería, testimonios, servicios
- [ ] Formulario de contacto directo

---

### 4.3 Dashboard Admin
**URL:** dashboard.creatuimagen.online

#### Funcionalidades
- [ ] Login seguro (Supabase Auth)
- [ ] Vista global de todos los eventos activos
- [ ] CRUD completo de eventos e invitaciones
- [ ] CRUD de perfiles digitales
- [ ] Subida de imágenes a Cloudinary
- [ ] Ver RSVPs por evento
- [ ] Analytics por evento
- [ ] Gestión de planes y clientes

---

## 5. Tabla de funcionalidades visuales para invitaciones

| Funcionalidad | Tecnología | Peso | Dificultad | Impacto WOW |
|--------------|-----------|------|-----------|-------------|
| Pétalos cayendo | CSS animation puro | ~0 KB | ⭐ Fácil | ⭐⭐⭐⭐⭐ |
| Confeti al abrir | CSS + JS básico | ~2 KB | ⭐ Fácil | ⭐⭐⭐⭐⭐ |
| Slideshow fotos con fade | CSS animation | ~0 KB | ⭐ Fácil | ⭐⭐⭐⭐ |
| Countdown en vivo | JS nativo | ~1 KB | ⭐ Fácil | ⭐⭐⭐⭐ |
| Reproductor música oculto | YouTube IFrame API | externo | ⭐⭐ Medio | ⭐⭐⭐⭐⭐ |
| Ecualizador animado | CSS animation | ~1 KB | ⭐ Fácil | ⭐⭐⭐⭐ |
| Parallax scroll | CSS + JS | ~2 KB | ⭐⭐ Medio | ⭐⭐⭐⭐ |
| Partículas flotantes | Canvas API | ~5 KB | ⭐⭐ Medio | ⭐⭐⭐⭐ |
| Reveal al hacer scroll | IntersectionObserver | ~1 KB | ⭐ Fácil | ⭐⭐⭐ |
| Cursor personalizado | CSS | ~0 KB | ⭐ Fácil | ⭐⭐⭐ |
| Animaciones Lottie | Lottie-web | ~60 KB | ⭐⭐ Medio | ⭐⭐⭐⭐⭐ |
| Glitter / brillo hover | CSS filter | ~0 KB | ⭐ Fácil | ⭐⭐⭐⭐ |
| Typewriter text | JS básico | ~1 KB | ⭐ Fácil | ⭐⭐⭐ |
| Video background | Cloudinary + HTML5 | externo | ⭐⭐ Medio | ⭐⭐⭐⭐⭐ |
| Morphing shapes | CSS clip-path | ~0 KB | ⭐⭐ Medio | ⭐⭐⭐⭐ |
| Glassmorphism cards | CSS backdrop-filter | ~0 KB | ⭐ Fácil | ⭐⭐⭐⭐ |
| Scroll horizontal fotos | CSS scroll-snap | ~0 KB | ⭐ Fácil | ⭐⭐⭐⭐ |
| Flip card foto | CSS 3D transform | ~0 KB | ⭐ Fácil | ⭐⭐⭐ |
| Mapa embed Google | Google Maps iframe | externo | ⭐ Fácil | ⭐⭐⭐ |
| QR code dinámico | qrcode.js | ~40 KB | ⭐ Fácil | ⭐⭐⭐ |

---

## 6. Casos de uso activos

### Caso 1 — XV Regina
- **Producto:** Invitación digital
- **URL:** invita.creatuimagen.online/XV-Regina
- **Fecha evento:** 23 mayo 2026, 4:00 pm
- **Lugar:** Limmon, San Juan del Río, Qro.
- **Prioridad:** 🔴 Alta — fecha próxima

### Caso 2 — Andy Villarruel (FOCO ACTUAL)
- **Producto:** Perfil digital
- **URL:** bio.creatuimagen.online/andy-villarruel
- **Funcionalidades:** foto, links, botón guardar contacto VCF
- **Prioridad:** 🔴 Alta — primer perfil del producto

---

## 7. Stack y arquitectura

```
invita.creatuimagen.online          bio.creatuimagen.online
        │                                      │
        └──────────────────────────────────────┘
                           │
              Next.js 14 (App Router)
              Vercel Serverless Functions
                           │
              ┌────────────┴────────────┐
           Supabase                Cloudinary
        (BD + Auth)            (Imágenes + Video)
              │
    ┌─────────┼─────────┐
  Stripe   Resend   Meta WA API
 (pagos)  (emails)  (whatsapp)
```

---

## 8. Roadmap

### Fase 1 — MVP (actual)
- [x] Invitación estática HTML — Regina (prototipo)
- [ ] Migrar Regina a Next.js con Cloudinary
- [ ] Perfil digital Andy Villarruel con VCF
- [ ] Deploy en creatuimagen.online

### Fase 2 — Pro
- [ ] RSVP con Supabase + notificación WhatsApp
- [ ] Dashboard básico para Liz
- [ ] Analytics de apertura

### Fase 3 — Scale
- [ ] Multi-tenant completo
- [ ] Pagos con Stripe
- [ ] WhatsApp automático masivo
- [ ] Dominio propio por cliente
