// ══════════════════════════════════════════════
// Notificaciones — Mail (Resend) + WA (Meta API)
// ══════════════════════════════════════════════

const FROM_EMAIL = 'hola@invitaciones.arturobarrios.com'

export interface NotificationPayload {
  // Datos del invitado
  nombre: string
  telefono: string
  email?: string | null
  asiste: boolean
  num_personas: number
  restricciones?: string | null
  mensaje_regina?: string | null
  action: 'created' | 'updated'
  // Datos del evento (vienen de Supabase)
  festejado: string
  fecha: string
  hora: string
  // Datos del planner (vienen de Supabase, escalable)
  planner_nombre: string
  planner_email: string
  planner_phone: string
}

// ────────────────────────────────────
// EMAIL AL INVITADO via Resend
// ────────────────────────────────────
export async function sendMailInvitado(payload: NotificationPayload) {
  if (!payload.email) return { ok: false, skipped: true }
  const RESEND_KEY = process.env.RESEND_API_KEY
  if (!RESEND_KEY) return { ok: false, error: 'No RESEND_API_KEY' }

  const { nombre, asiste, num_personas, festejado, fecha, hora } = payload
  const fechaStr = new Date(fecha).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  const html = asiste ? `
    <div style="font-family:Georgia,serif;max-width:500px;margin:0 auto;background:#fdf0f3;border-radius:24px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#c0486a,#d4718a);padding:32px;text-align:center">
        <p style="color:white;font-size:40px;margin:0">🎀</p>
        <h1 style="color:white;font-size:22px;margin:8px 0 0">¡Confirmación recibida!</h1>
      </div>
      <div style="padding:32px">
        <p style="font-size:16px;color:#2a1a1f">Hola <strong>${nombre}</strong>,</p>
        <p style="font-size:15px;color:#6b4a52;line-height:1.7">
          Tu asistencia a los <strong style="color:#c0486a">XV años de ${festejado}</strong> ha sido confirmada. ¡Qué emoción tenerte!
        </p>
        <div style="background:white;border-radius:16px;padding:20px;margin:20px 0;border:2px solid #f0b8c8">
          <p style="margin:0;font-size:15px;color:#2a1a1f;line-height:2">
            📅 <strong>${fechaStr}</strong> · ${hora}<br/>
            👥 <strong>${num_personas} persona${num_personas > 1 ? 's' : ''}</strong><br/>
            📍 Lugar por confirmar próximamente
          </p>
        </div>
        <p style="font-size:14px;color:#6b4a52;line-height:1.7">
          ¡Te esperamos con mucho cariño! 💕
        </p>
      </div>
      <div style="background:#fff8fa;padding:16px;text-align:center;border-top:1px solid #f0b8c8">
        <p style="font-size:11px;color:#b5566e;margin:0">
          Realizado por arturobarrios.com · Liz Barron Event Planner
        </p>
      </div>
    </div>
  ` : `
    <div style="font-family:Georgia,serif;max-width:500px;margin:0 auto;padding:32px;background:#fdf0f3;border-radius:24px">
      <h2 style="color:#6b4a52">Hola ${nombre},</h2>
      <p style="color:#6b4a52;line-height:1.7">Recibimos tu respuesta. Lamentamos que no puedas acompañarnos en los XV de ${festejado}. ¡Te mandamos un abrazo enorme! 💕</p>
      <p style="font-size:11px;color:#b5566e;margin-top:24px">Realizado por arturobarrios.com · Liz Barron Event Planner</p>
    </div>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `XV ${festejado} <${FROM_EMAIL}>`,
      to: [payload.email],
      subject: asiste
        ? `¡Listo ${nombre}! Tu lugar en los XV de ${festejado} está confirmado 🎀`
        : `Recibimos tu respuesta — XV de ${festejado}`,
      html,
    })
  })
  return { ok: res.ok }
}

// ────────────────────────────────────
// EMAIL AL EVENT PLANNER via Resend
// ────────────────────────────────────
export async function sendMailPlanner(payload: NotificationPayload) {
  const RESEND_KEY = process.env.RESEND_API_KEY
  if (!RESEND_KEY) return { ok: false, error: 'No RESEND_API_KEY' }

  const { nombre, asiste, num_personas, telefono, email, restricciones, mensaje_regina, action, festejado, planner_nombre, planner_email } = payload
  const emoji = asiste ? '✅' : '❌'
  const accion = action === 'updated' ? ' (actualización)' : ''

  const html = `
    <div style="font-family:sans-serif;max-width:500px;margin:0 auto">
      <div style="background:linear-gradient(135deg,#c0486a,#d4718a);padding:20px;border-radius:16px 16px 0 0">
        <h2 style="color:white;margin:0">${emoji} RSVP — XV ${festejado}${accion}</h2>
      </div>
      <div style="background:#fff8fa;padding:24px;border:2px solid #f0b8c8;border-top:none;border-radius:0 0 16px 16px">
        <p style="color:#6b4a52;margin:0 0 16px">Hola <strong>${planner_nombre}</strong>, llegó un nuevo RSVP:</p>
        <table style="width:100%;border-collapse:collapse">
          <tr style="border-bottom:1px solid #f0b8c8">
            <td style="padding:10px;color:#b5566e;font-weight:bold;width:40%">Nombre</td>
            <td style="padding:10px;color:#2a1a1f">${nombre}</td>
          </tr>
          <tr style="border-bottom:1px solid #f0b8c8">
            <td style="padding:10px;color:#b5566e;font-weight:bold">WhatsApp</td>
            <td style="padding:10px;color:#2a1a1f">${telefono}</td>
          </tr>
          ${email ? `<tr style="border-bottom:1px solid #f0b8c8">
            <td style="padding:10px;color:#b5566e;font-weight:bold">Email</td>
            <td style="padding:10px;color:#2a1a1f">${email}</td>
          </tr>` : ''}
          <tr style="border-bottom:1px solid #f0b8c8">
            <td style="padding:10px;color:#b5566e;font-weight:bold">Asistencia</td>
            <td style="padding:10px;color:#2a1a1f">
              ${asiste ? `✅ Sí asiste — <strong>${num_personas} persona${num_personas > 1 ? 's' : ''}</strong>` : '❌ No asiste'}
            </td>
          </tr>
          ${restricciones ? `<tr style="border-bottom:1px solid #f0b8c8">
            <td style="padding:10px;color:#b5566e;font-weight:bold">Restricciones</td>
            <td style="padding:10px;color:#2a1a1f">${restricciones}</td>
          </tr>` : ''}
          ${mensaje_regina ? `<tr>
            <td style="padding:10px;color:#b5566e;font-weight:bold">Mensaje</td>
            <td style="padding:10px;color:#2a1a1f;font-style:italic">"${mensaje_regina}"</td>
          </tr>` : ''}
        </table>
      </div>
      <p style="font-size:11px;color:#b5566e;text-align:center;margin-top:12px">
        creatuimagen.online · arturobarrios.com
      </p>
    </div>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `creatuimagen <${FROM_EMAIL}>`,
      to: [planner_email],
      subject: `${emoji} XV ${festejado} — ${nombre} ${asiste ? `(${num_personas} persona${num_personas>1?'s':''})` : '(No asiste)'}${accion}`,
      html,
    })
  })
  return { ok: res.ok }
}

// ────────────────────────────────────
// WA AL PLANNER via Meta Business API
// ────────────────────────────────────
export async function sendWAPlanner(payload: NotificationPayload) {
  const META_TOKEN   = process.env.META_WA_TOKEN
  const META_PHONE_ID = process.env.META_WA_PHONE_ID
  if (!META_TOKEN || !META_PHONE_ID) return { ok: false, error: 'No Meta WA config' }

  const { nombre, asiste, num_personas, telefono, restricciones, action, festejado, planner_phone } = payload
  const emoji = asiste ? '✅' : '❌'
  const accion = action === 'updated' ? ' _(actualización)_' : ''

  const msg = [
    `${emoji} *RSVP — XV ${festejado}*${accion}`,
    ``,
    `👤 *${nombre}*`,
    `📱 ${telefono}`,
    asiste
      ? `✅ Sí asiste — *${num_personas} persona${num_personas>1?'s':''}*`
      : `❌ No asiste`,
    restricciones ? `🍽️ _${restricciones}_` : null,
  ].filter(Boolean).join('\n')

  const res = await fetch(
    `https://graph.facebook.com/v19.0/${META_PHONE_ID}/messages`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${META_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: planner_phone,
        type: 'text',
        text: { body: msg },
      })
    }
  )
  return { ok: res.ok }
}

// ────────────────────────────────────
// WA AL INVITADO via Meta Business API
// ────────────────────────────────────
export async function sendWAInvitado(payload: NotificationPayload) {
  const META_TOKEN    = process.env.META_WA_TOKEN
  const META_PHONE_ID = process.env.META_WA_PHONE_ID
  if (!META_TOKEN || !META_PHONE_ID) return { ok: false, error: 'No Meta WA config' }

  const { nombre, asiste, num_personas, telefono, festejado, fecha, hora } = payload
  const fechaStr = new Date(fecha).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })

  const msg = asiste
    ? `🎀 *¡Hola ${nombre}!*\n\nTu asistencia a los *XV años de ${festejado}* está confirmada.\n\n📅 *${fechaStr}* · ${hora}\n👥 *${num_personas} persona${num_personas>1?'s':''}*\n📍 Lugar por confirmar\n\n¡Te esperamos con mucho cariño! 💕`
    : `Hola *${nombre}*, recibimos tu respuesta.\n\nLamentamos que no puedas acompañarnos en los XV de ${festejado}. ¡Te mandamos un abrazo! 💕`

  const res = await fetch(
    `https://graph.facebook.com/v19.0/${META_PHONE_ID}/messages`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${META_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: `52${telefono}`,
        type: 'text',
        text: { body: msg },
      })
    }
  )
  return { ok: res.ok }
}
