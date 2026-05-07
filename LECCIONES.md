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
