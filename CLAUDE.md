# CLAUDE.md — Contexto del Proyecto creatuimagen.online

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
