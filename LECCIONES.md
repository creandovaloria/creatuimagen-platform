# 📚 Lecciones Aprendidas
# creatuimagen.online — Plataforma de Presencia Digital

---

## 🏗 Arquitectura — Decisiones clave

### ✅ Next.js > HTML puro para producción
HTML puro tiene fricciones serias en Vercel: routing manual con `vercel.json`, 
sin serverless functions, sin caché inteligente, sin build optimizado.
Next.js es serverless por default en Vercel — zero config, rutas automáticas.

### ✅ Cloudinary > base64 para imágenes
Base64 fue un parche para desarrollo local sin servidor.
En producción: imágenes en Cloudinary con URL pública + CDN global.
Resultado: HTML de 50KB vs 1.4MB, lazy loading, optimización por dispositivo.

### ✅ Supabase para todo el backend
Auth + BD + Storage + Realtime en un solo servicio.
Free tier suficiente para los primeros 100 clientes.

### ✅ Un solo repo, múltiples subdominios
`invita.creatuimagen.online` y `perfil.creatuimagen.online` 
viven en el mismo repo Next.js.
Vercel maneja múltiples dominios por proyecto sin costo extra.

### ✅ Serverless Functions para toda lógica sensible
Credenciales NUNCA en el HTML público.
El HTML solo conoce la URL de la API — la API tiene las keys.
CORS configurado para solo aceptar los dominios propios.

---

## 🐛 Errores encontrados y soluciones

### Error 1 — Imágenes no visibles en el navegador
**Causa:** HTML usaba rutas `/mnt/user-data/uploads/` (ruta local del servidor de Claude).  
**Solución:** Convertir a base64 para prototipo local.  
**Solución correcta en prod:** Cloudinary con URL pública.  
**Aprendizaje:** Siempre verificar con `ls /mnt/user-data/uploads/` que el archivo existe antes de procesarlo.

### Error 2 — Countdown encimado sobre imagen
**Causa:** `position: absolute` sobre imagen del calendario causaba superposición.  
**Solución:** Construir calendario en HTML/CSS (grid 7 columnas) y countdown como elemento de flujo normal debajo.  
**Aprendizaje:** Elementos interactivos y en tiempo real siempre en código, no sobre imágenes.

### Error 3 — 404 en Vercel con HTML estático
**Causa:** `vercel.json` con `@vercel/static` no sirve archivos correctamente en todas las configuraciones.  
**Solución:** `index.html` en la raíz del repo sin `vercel.json` — Vercel lo detecta automáticamente.  
**Solución correcta:** Usar Next.js desde el inicio — zero config routing.

### Error 4 — Play/pause toggle desincronizado
**Causa:** Variable local `isPlaying` no refleja el estado real del player de YouTube.  
**Solución:** Consultar `player.getPlayerState() === YT.PlayerState.PLAYING` directamente.  
**Aprendizaje:** Siempre usar la fuente de verdad del componente externo, no una variable local.

### Error 5 — Repo con carpetas de otros proyectos
**Causa:** El repo `invitaciones` ya tenía contenido de otros proyectos (admin, landing, supabase, web).  
**Solución:** Repo nuevo dedicado por producto.  
**Aprendizaje:** Un repo por producto/dominio. Estructura clara desde el inicio.

### Error 6 — Token GitHub en el chat
**Situación:** El token `ghp_...` se compartió en el chat para autenticar la API de GitHub.  
**Riesgo:** Tokens en texto plano en conversaciones.  
**Solución futura:** Usar GitHub Apps o secrets de Vercel para automatización.  
**Acción inmediata:** Revocar el token usado una vez terminada la sesión.

---

## 💡 Decisiones de producto

### Base64 — para qué sirve realmente
- ✅ Prototipar sin servidor
- ✅ Ver diseño en local sin infraestructura
- ✅ Compartir un archivo HTML autónomo por WhatsApp
- ❌ Producción (lento, sin caché, difícil de mantener)

### HTML puro vs Next.js
| | HTML puro | Next.js |
|--|-----------|---------|
| Prototipo rápido | ✅ | ⚠️ |
| Producción | ❌ | ✅ |
| Serverless | ❌ | ✅ nativo |
| Routing | Manual | Automático |
| Deploy Vercel | Fricción | Zero config |
| Multi-tenant | Imposible | ✅ |

### Arquitectura multi-tenant
Cada evento/perfil es un registro en Supabase con un `slug` único.
Una sola plantilla Next.js sirve a todos los clientes.
```
/[slug]/page.tsx → busca en BD por slug → renderiza con esos datos
```

### Música en invitaciones
- YouTube IFrame API: reproduce audio sin mostrar video (`playsinline: 1`)
- iOS requiere user gesture antes de reproducir (no autoplay sin clic)
- `player.getPlayerState()` es la fuente de verdad para play/pause

### Video en invitaciones
- Videos cortos (<30s): Cloudinary (optimiza por dispositivo)
- Videos largos: Mux o YouTube unlisted
- Animaciones: Lottie (JSON ~50-200KB, sin restricciones de autoplay)
- Slideshow: CSS animations (0KB extra, máximo impacto)

### VCF — tarjeta de contacto digital
- Generado dinámicamente por serverless function desde Supabase
- Si el cliente cambia su teléfono → actualiza en BD → VCF siempre correcto
- No es PWA — es simplemente un archivo `.vcf` descargable

---

## 🎯 Prompt óptimo para invitaciones

```
Crea un componente Next.js mobile-first para invitación digital de [tipo].
Stack: Next.js 14 App Router, Tailwind CSS, Cloudinary para imágenes.

Datos:
- Festejado/a: [nombre]
- Fecha: [fecha ISO 8601]  
- Lugar: [nombre completo + dirección]
- Canción: [canción] YouTube ID: [ID]
- RSVP: wa.me/[número]?text=[mensaje preescrito]
- Imágenes Cloudinary: [URLs por sección]

Secciones en orden: [lista]

Animaciones requeridas:
- Pétalos CSS cayendo al abrir (position: fixed, z-index alto)
- Slideshow fade entre fotos del collage
- Countdown en vivo con setInterval
- Ecualizador animado mientras suena música

Serverless:
- POST /api/rsvp → guarda en Supabase
- GET analytics al cargar → POST /api/track

Footer: "Realizado por arturobarrios.com · Liz Barron Event Planner"
Sin base64. Sin HTML puro. Todo en componentes React.
```

## 🎯 Prompt óptimo para perfiles digitales

```
Crea un componente Next.js mobile-first para perfil digital tipo linktree.
Stack: Next.js 14, Tailwind CSS, Supabase para datos.

Datos del perfil:
- Nombre: [nombre]
- Slug: [slug-url]
- Foto: [URL Cloudinary]
- Bio: [texto corto]
- Links: [lista con label, url, icono]
- Colores: [primario, secundario, fondo]

Funcionalidades:
- Botón "Guardar Contacto" → fetch /api/contacto/[slug] → descarga .vcf
- El .vcf se genera en serverless desde Supabase (teléfono, email, web, foto)
- Analytics: POST /api/track en cada visita y click de link

Mobile-first, compartible por WhatsApp, sin base64.
```

---

## 🚀 Configuración DNS Namecheap

### creatuimagen.online
```
CNAME  invita      → cname.vercel-dns.com
CNAME  perfil      → cname.vercel-dns.com  
CNAME  dashboard   → cname.vercel-dns.com
```

### arturobarrios.com
```
CNAME  invitaciones → cname.vercel-dns.com (redirect a creatuimagen)
```

---

## 📦 Funcionalidades visuales — tabla de referencia

| Funcionalidad | CSS | JS | Librería | Peso | Prioridad |
|--------------|-----|-----|---------|------|-----------|
| Pétalos cayendo | ✅ | mínimo | — | ~0KB | 🔴 MVP |
| Slideshow fade | ✅ | — | — | ~0KB | 🔴 MVP |
| Countdown | — | ✅ nativo | — | ~1KB | 🔴 MVP |
| Música oculta | — | ✅ | YouTube API | ext | 🔴 MVP |
| Scroll reveal | — | ✅ | IntersectionObserver | ~1KB | 🟡 V2 |
| Confeti | ✅ | mínimo | — | ~2KB | 🟡 V2 |
| Parallax | ✅ | mínimo | — | ~1KB | 🟡 V2 |
| Lottie animaciones | — | — | lottie-web | ~60KB | 🟡 V2 |
| Video background | — | — | Cloudinary | ext | 🟢 V3 |
| Partículas | — | ✅ | Canvas API | ~5KB | 🟢 V3 |

---

## 🔐 Seguridad

- Nunca credenciales en HTML público
- Tokens de GitHub: revocar después de cada sesión de trabajo con Claude
- CORS: whitelist solo de dominios propios en las API routes
- Supabase RLS (Row Level Security) habilitado desde el inicio
- Variables de entorno en Vercel Settings, nunca en el repo
