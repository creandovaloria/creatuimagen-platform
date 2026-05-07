# 📐 Tabla de referencia de assets — creatuimagen.online

## Invitaciones digitales — Especificaciones de imágenes

| # | Sección | Nombre archivo | Resolución | Orientación | Formato | Calidad | Cloudinary path |
|---|---------|---------------|-----------|-------------|---------|---------|----------------|
| 1 | Intro / portada | `intro.jpg` | 1080 x 1920px | Vertical 9:16 | JPG | 85% | creatuimagen/XV-Regina/intro |
| 2 | Reproductor música | `musica.jpg` | 1080 x 800px | Horizontal | JPG | 85% | creatuimagen/XV-Regina/musica |
| 3 | Collage Polaroid | `collage.jpg` | 1080 x 1080px | Cuadrada | JPG | 85% | creatuimagen/XV-Regina/collage |
| 4 | Lugar del evento | `restaurante.jpg` | 1080 x 800px | Horizontal | JPG | 85% | creatuimagen/XV-Regina/restaurante |
| 5 | Tira fotográfica | `tira.jpg` | 1080 x 800px | Horizontal | JPG | 85% | creatuimagen/XV-Regina/tira |
| 6 | Flamingo / RSVP | `flamingo.jpg` | 800 x 800px | Cuadrada | JPG | 85% | creatuimagen/XV-Regina/flamingo |

---

## Notas generales

- **Cloudinary optimiza automáticamente** según dispositivo — no te preocupes por múltiples versiones
- **Peso máximo sugerido antes de subir:** 2MB por imagen
- **Formato alternativo:** PNG solo si la imagen tiene transparencia (ej. flamingo con fondo transparente)
- Cloudinary convierte a **AVIF/WebP** automáticamente para navegadores modernos

---

## Perfiles digitales — Especificaciones (futuro)

| Sección | Nombre archivo | Resolución | Orientación | Cloudinary path |
|---------|---------------|-----------|-------------|----------------|
| Foto de perfil | `avatar.jpg` | 400 x 400px | Cuadrada | creatuimagen/perfiles/[slug]/avatar |
| Banner / fondo | `banner.jpg` | 1080 x 400px | Horizontal | creatuimagen/perfiles/[slug]/banner |

---

## URLs de Cloudinary — XV Regina

| Imagen | URL |
|--------|-----|
| intro | `https://res.cloudinary.com/dl66zeuix/image/upload/creatuimagen/XV-Regina/intro.jpg` |
| musica | `https://res.cloudinary.com/dl66zeuix/image/upload/creatuimagen/XV-Regina/musica.jpg` |
| collage | `https://res.cloudinary.com/dl66zeuix/image/upload/creatuimagen/XV-Regina/collage.jpg` |
| restaurante | `https://res.cloudinary.com/dl66zeuix/image/upload/creatuimagen/XV-Regina/restaurante.jpg` |
| tira | `https://res.cloudinary.com/dl66zeuix/image/upload/creatuimagen/XV-Regina/tira.jpg` |
| flamingo | `https://res.cloudinary.com/dl66zeuix/image/upload/creatuimagen/XV-Regina/flamingo.jpg` |

> ⚠️ Las URLs anteriores son el formato esperado. Confirmar con las URLs reales después de subir a Cloudinary.

---

## Transformaciones útiles de Cloudinary

| Transformación | URL ejemplo |
|---------------|------------|
| Resize a 390px (móvil) | `.../w_390,f_auto,q_auto/...` |
| Resize a 1080px (desktop) | `.../w_1080,f_auto,q_auto/...` |
| Recortar centrado | `.../w_1080,h_1920,c_fill/...` |
| Calidad automática | `.../f_auto,q_auto/...` |
