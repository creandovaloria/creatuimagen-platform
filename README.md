# Crea Tu Imagen - Platform

Plataforma SaaS Multi-tenant para la gestión de perfiles digitales (`bios`) e invitaciones (`eventos`).

## 🚀 Guía de Operación (Admin)

### Acceso al Panel
- **URL:** `https://bios.creatuimagen.online/admin`
- **Login:** Requiere credenciales de administrador autorizadas en Supabase.

### Cómo dar de alta un nuevo Cliente con Dominio Propio
1. **En Supabase:** Crear el perfil en la tabla `perfiles` y definir un `slug` (ej: `nombre-apellido`).
2. **En Vercel:** 
   - Ir al proyecto `creatuimagen-platform`.
   - Settings -> Domains -> Add.
   - Añadir el dominio del cliente (ej: `cliente.com`).
3. **En el Código:**
   - Abrir `middleware.ts`.
   - Añadir el mapeo en `customDomainMap`: `'cliente.com': 'slug-de-supabase'`.
   - Hacer `git push`.

## 🛠️ Desarrollo Local

1. Instalar dependencias: `npm install`
2. Configurar `.env.local` con las llaves de Supabase.
3. Correr dev server: `npm run dev`

## 🔐 Seguridad y Auth
- Las contraseñas de administrador deben ser gestionadas cuidadosamente.
- **IMPORTANTE:** No crear usuarios con correos inexistentes para evitar bloqueos de Supabase por rebotes de email.

## 💰 Configuración de Pagos (Mercado Pago)
La plataforma soporta múltiples cuentas de Mercado Pago según la unidad de negocio:
- `MP_BIOS_ACCESS_TOKEN`: Para ventas en bios.creatuimagen.online
- `MP_EVENTOS_ACCESS_TOKEN`: Para ventas en eventos.creatuimagen.online
- `MP_ARTURO_ACCESS_TOKEN`: Para ventas personales en arturobarrios.com
- `RESEND_API_KEY`: Para envío de correos transaccionales (Onboarding)
- `NEXT_PUBLIC_URL`: URL base para retornos de pago (https://bios.creatuimagen.online)

---
© 2026 Creando Valor IA
