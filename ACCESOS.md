# 🗝️ Accesos y Credenciales del Proyecto

> **IMPORTANTE:** Este archivo está en el `.gitignore`. NUNCA lo subas a un repositorio público.

## 📊 Matriz de Infraestructura

| Servicio | Propósito | Cuenta (Email) | Variable de Entorno (.env) | Referencia de Password |
| :--- | :--- | :--- | :--- | :--- |
| **Vercel** | Hosting y SSL | creandovaloria@gmail.com | `VERCEL_PROJECT_ID` | Google Auth |
| **Supabase** | DB y Auth | creandovaloria@gmail.com | `NEXT_PUBLIC_SUPABASE_URL` | Google Auth / DB Pass |
| **Mercado Pago** | Pagos Bios | creandovaloria@gmail.com | `MP_BIOS_ACCESS_TOKEN` | Panel Dev MP |
| **Mercado Pago** | Pagos Eventos | creandovaloria@gmail.com | `MP_EVENTOS_ACCESS_TOKEN` | Panel Dev MP |
| **Namecheap** | Dominios | creandovaloria@gmail.com | `NAMECHEAP_API_KEY` | Dashboard Namecheap |
| **Resend** | Email Transaccional | creandovaloria@gmail.com | `RESEND_API_KEY` | Dashboard Resend |
| **GitHub** | Código | creandovaloria@gmail.com | N/A | Google Auth |

## 🛠️ Variables de Entorno Actuales (.env.local)
Copia esto en tu archivo `.env.local` si necesitas recrearlo:

```bash
# SUPABASE
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# MERCADO PAGO
MP_BIOS_ACCESS_TOKEN=...
MP_EVENTOS_ACCESS_TOKEN=...
MP_ARTURO_ACCESS_TOKEN=...
NEXT_PUBLIC_URL=https://bios.creatuimagen.online

# NAMECHEAP
NAMECHEAP_API_USER=creandovaloria
NAMECHEAP_API_KEY=55a955be472441beb0f13d47db3364fd
NAMECHEAP_CLIENT_IP=3.87.42.13
```
