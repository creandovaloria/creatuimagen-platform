# PRD - Crea Tu Imagen Platform (Multi-tenant SaaS)

## 🎯 Visión del Proyecto
Transformar "Crea Tu Imagen" en una plataforma SaaS escalable donde se pueden gestionar múltiples tipos de servicios digitales bajo una sola infraestructura centralizada, utilizando subdominios y dominios personalizados.

## 🏗️ Arquitectura de Ruteo
El sistema utiliza un **Middleware de Next.js** para interceptar peticiones y servirlas según el subdominio o dominio:

- **Dominio Raíz (`creatuimagen.online`):** Página principal y Landing.
- **Subdominio Bios (`bios.creatuimagen.online`):** Perfiles personales y tarjetas VCF.
- **Subdominio Eventos (`eventos.creatuimagen.online`):** Invitaciones digitales.
- **Dominios Personalizados (`lilianachaglla.com`):** Mapeo transparente a perfiles específicos.

## 🛠️ Stack Tecnológico
- **Frontend:** Next.js (App Router) + Tailwind CSS.
- **Backend/Auth:** Supabase.
- **Infraestructura:** Vercel.
- **Base de Datos:** PostgreSQL (vía Supabase).

## ✅ Características Implementadas (MVP)
1. **Multi-tenancy:** Ruteo dinámico basado en `hostname`.
2. **Admin Dashboard:** Gestión centralizada de perfiles, colores, fotos y enlaces.
3. **Smart Links:** Los enlaces externos se sanitizan automáticamente para evitar errores de ruteo.
4. **VCF Generation:** Generación dinámica de archivos de contacto para descarga.
5. **Auth Robusta:** Acceso protegido para administradores con correos reales verificados.

---

## 🚀 Próximos Pasos
1. **Módulo de Eventos:** Implementar la lógica específica para el subdominio `eventos`.
2. **Integración con Resend:** Configurar SMTP externo para evitar bloqueos de reputación.
3. **Analytics por Perfil:** Dashboard para que cada cliente vea sus visitas.
