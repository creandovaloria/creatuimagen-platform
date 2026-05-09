# 📚 Lecciones Aprendidas
# creatuimagen.online — Plataforma de Presencia Digital

---

## 🏗 Decisiones de arquitectura

### ✅ Next.js > HTML puro para producción
HTML puro tiene fricciones en Vercel: routing manual, sin serverless functions, sin caché.
Next.js es serverless por default — zero config, rutas automáticas, build optimizado.

### ✅ Cloudinary > base64 para imágenes
Base64 = parche para prototipos locales. En producción: Cloudinary con URL pública + CDN.
HTML de 50KB vs 1.4MB. Lazy loading, optimización automática por dispositivo.

### ✅ SoundCloud Widget API > YouTube IFrame para música
YouTube error 150 = video bloqueado para embedding por el artista.
SoundCloud Widget API via postMessage funciona sin restricciones.
Usar `SC.Widget(iframe)` con el SDK cargado dinámicamente.

### ✅ Un solo repo, múltiples subdominios
`invitaciones.creatuimagen.online` vive en `creandovaloria/creatuimagen-platform`.
Vercel maneja múltiples dominios por proyecto sin costo extra.

### ✅ Serverless Functions para lógica sensible
Credenciales NUNCA en el HTML. El HTML solo conoce la URL de la API.

---

## 🐛 Errores y soluciones

### Error 1 — Imágenes no visibles en navegador
**Causa:** Rutas `/mnt/user-data/uploads/` no accesibles desde browser.
**Solución prod:** Cloudinary con URL pública.
**Solución prototipo:** base64 embebido.

### Error 2 — Countdown encimado sobre imagen
**Causa:** `position: absolute` sobre imagen del calendario.
**Solución:** Construir calendario en HTML/CSS y countdown como elemento de flujo normal debajo.

### Error 3 — 404 en Vercel con HTML estático
**Causa:** `vercel.json` con `@vercel/static` no funciona correctamente.
**Solución:** Next.js desde el inicio — zero config routing.

### Error 4 — Play/pause toggle desincronizado
**Causa:** Variable local `isPlaying` no refleja estado real del player.
**Solución:** `player.getPlayerState() === 1` directamente.

### Error 5 — Repo con carpetas de otros proyectos
**Causa:** Repo `invitaciones` ya tenía contenido previo.
**Solución:** Repo nuevo `creatuimagen-platform` dedicado.

### Error 6 — Token GitHub en el chat
**Riesgo:** Tokens en texto plano. Revocar después de cada sesión.

### Error 7 — Imágenes cortadas en hero section
**Causa:** `object-cover` + altura fija recorta imágenes.
**Solución:** NO usar altura fija. Dejar proporción natural. Usar ScrollHint para indicar scroll.

### Error 8 — YouTube error 150 → RESUELTO con SoundCloud
**Causa:** Icona Pop bloquea embedding en YouTube (error 150).
**Solución:** SoundCloud Widget API. Track oficial Big Beat Records.
**URL:** `https://soundcloud.com/wearebigbeat/icona-pop-i-love-it-feat-charli-xcx`
**Implementación:** iframe oculto + `SC.Widget(iframe)` + bind READY/PLAY/PAUSE/FINISH.

### Error 9 — Module not found en Vercel pero no en local
**Causa:** Archivo creado localmente pero no incluido en push a GitHub.
**Prevención:** Subir archivos nuevos al repo inmediatamente al crearlos.

### Error 10 — Primer click no reproduce en iOS/iPadOS
**Causa:** Safari requiere user gesture directo. postMessage no cuenta.
**Solución:** `pendingPlay` ref — si el usuario clickea antes del READY event, se reproduce automáticamente al disparar READY.

---

## 🎯 Prompts óptimos

### Para nueva invitación
```
Crea un componente Next.js mobile-first para invitación digital de [tipo].
Stack: Next.js 14 App Router, Tailwind CSS, Cloudinary para imágenes.

Datos:
- Festejado/a: [nombre]
- Fecha: [fecha ISO]
- Lugar: [nombre + dirección] o porDefinir=true
- Canción: [canción] — SoundCloud URL: [url]
- RSVP WhatsApp: [número] — Mensaje: [texto]
- Imágenes Cloudinary: [URLs por sección]
- Secciones: intro → música → calendario+countdown → fotos → dresscode → lugar → rsvp → footer

Animaciones: pétalos CSS, scroll reveal, ecualizador cuando suena música.
Footer: "arturobarrios.com · Liz Barron Event Planner"
Sin base64. Sin HTML puro. Componentes React separados.
```

---

## 🚀 Stack de producción

| Capa | Tecnología | Estado |
|------|-----------|--------|
| Framework | Next.js 14 App Router | ✅ |
| Hosting | Vercel (Creando Valor IA) | ✅ |
| Repo | creandovaloria/creatuimagen-platform | ✅ |
| Dominio | invitaciones.creatuimagen.online | ✅ |
| Imágenes | Cloudinary (dl66zeuix) | ✅ |
| Música | SoundCloud Widget API | ✅ |
| Base de datos | Supabase | 🔜 |
| Pagos | Stripe | 🔜 |
| WhatsApp | Meta Business API | 🔜 |

---

## 📐 Cloudinary — Cloud: dl66zeuix

### XV-Regina
| Imagen | URL |
|--------|-----|
| intro | `f_auto,q_auto/v1778143812/1.1_1_Intro_qw3b4e.png` |
| musica | `f_auto,q_auto/v1778144448/1.1_2_Reproductor_buyhad.png` |
| collage | `f_auto,q_auto/v1778145447/1.1_4_Collage_Polaroid_fupy5g.png` |
| tira | `f_auto,q_auto/v1778145084/1.1_6_Tira_mkxcnh.jpg` |
| flamingo | `f_auto,q_auto/v1778145782/1.1_7_Flamingo_gpdtsc.png` |
| restaurante | pendiente |

Base URL: `https://res.cloudinary.com/dl66zeuix/image/upload/`

---

## 🗓 Evento XV Regina
- **Fecha:** 6 de Junio 2026, 4:00 pm
- **Lugar:** Por definir
- **RSVP:** Liz Barron +524272199374
- **URL:** invitaciones.creatuimagen.online/XV-Regina
- **Canción:** I Love It — Icona Pop ft. Charli XCX

---

## 🏗️ Decisiones de arquitectura — Escalabilidad

### Decisión 10 — Datos del planner en Supabase, no en env vars
**Problema:** Email y teléfono de Liz Barron estaban en variables de entorno (`LIZ_EMAIL`, `LIZ_PHONE`).  
**Por qué es malo:** Para cada nuevo evento habría que agregar nuevas env vars en Vercel. No escala.  
**Solución:** Los datos del planner van en la tabla `eventos` de Supabase:
```sql
eventos.planner_nombre
eventos.planner_email
eventos.planner_phone
```
**Beneficio:** Para un nuevo evento solo se inserta un registro en Supabase. Sin tocar código ni Vercel.

### Decisión 11 — Twilio → Meta WhatsApp Business API
**Problema:** Se había planificado Twilio para WhatsApp.  
**Razón del cambio:** El cliente ya tiene cuenta de Meta Business verificada.  
**Beneficio:** Sin costo adicional de Twilio, integración directa con la cuenta existente.  
**Implementación:**
```typescript
// Meta Graph API v19.0
POST https://graph.facebook.com/v19.0/{META_PHONE_ID}/messages
Authorization: Bearer {META_WA_TOKEN}
{ messaging_product: 'whatsapp', to: '521234567890', type: 'text', text: { body: msg } }
```

### Decisión 12 — Email desde dominio invitaciones.arturobarrios.com
**Razón:** Plan gratuito de Resend permite 1 dominio. Ya estaba verificado `invitaciones.arturobarrios.com`.  
**From:** `hola@invitaciones.arturobarrios.com`  
**Cuando escale:** Agregar `creatuimagen.online` en plan Pro de Resend (~$20 USD/mes).

### Decisión 13 — Variables de entorno mínimas (solo 5)
**Variables reales en Vercel:**
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
RESEND_API_KEY
META_WA_TOKEN
META_WA_PHONE_ID
```
Todo lo demás (planner, festejado, fecha, lugar) viene de Supabase. Sin hardcodear nada.

---

## 🐛 Troubleshooting — Vercel deployments

### Error 10 — Múltiples deployments en error por Supabase
**Causa:** La API route `/api/rsvp` intentaba conectar a Supabase en build time, pero las env vars no estaban configuradas en Vercel.  
**Síntoma:** 10+ deployments en rojo consecutivos.  
**Solución:** Cliente de Supabase lazy-loaded — solo se inicializa en runtime cuando llega una request, no en build time.
```typescript
let _supabase: SupabaseClient | null = null
function getSupabase() {
  if (_supabase) return _supabase
  // Solo se ejecuta cuando hay una request real
  _supabase = createClient(url, key)
  return _supabase
}
```
**Prevención:** Agregar las env vars en Vercel ANTES de hacer el primer deploy con Supabase.

### Error 11 — Build local exitoso pero Vercel en error
**Causa frecuente:** Archivo nuevo creado localmente pero no incluido en el push a GitHub.  
**Síntoma:** `Module not found` en Vercel, pero localmente compila sin problemas.  
**Solución:** Verificar con `repo.get_contents()` que el archivo existe en el repo antes de continuar.  
**Prevención:** Al crear un archivo nuevo, subirlo a GitHub inmediatamente.

### Error 12 — YouTube error 150 en reproductor de música
**Causa:** Icona Pop tiene embedding deshabilitado en todos sus videos de YouTube.  
**Síntoma:** El player se inicializa (`YT Player ready ✅`) pero al reproducir aparece `YT Error: 150`.  
**Solución:** Migrar a SoundCloud Widget API.
```typescript
// SoundCloud Widget SDK
widget = SC.Widget(iframeRef)
widget.bind(SC.Widget.Events.READY, () => setReady(true))
widget.play() // funciona en iOS y Android
```
**Aprendizaje:** Antes de implementar, verificar si el video permite embed en `youtube.com/embed/{ID}`.
