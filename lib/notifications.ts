// ══════════════════════════════════════
// Notificaciones — Mail + WhatsApp
// ══════════════════════════════════════

const FROM_EMAIL = 'XV Regina <hola@invitaciones.arturobarrios.com>'
const LIZ_EMAIL  = process.env.LIZ_EMAIL || 'liz@lizbarron.com'
const LIZ_PHONE  = process.env.LIZ_PHONE || '524272199374'

export interface NotificationPayload {
  nombre: string
  telefono: string
  email?: string | null
  asiste: boolean
  num_personas: number
  restricciones?: string | null
  mensaje_regina?: string | null
  evento_slug: string
  action: 'created' | 'updated'
}

// ── EMAIL AL INVITADO ──
export async function sendMailInvitado(payload: NotificationPayload) {
  if (!payload.email) return { ok: false, skipped: true }
  const RESEND_KEY = process.env.RESEND_API_KEY
  if (!RESEND_KEY) return { ok: false, error: 'No RESEND_API_KEY' }

  const { nombre, asiste, num_personas } = payload

  const html = asiste ? `
    <div style="font-family:Georgia,serif;max-width:500px;margin:0 auto;background:#fdf0f3;border-radius:24px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#c0486a,#d4718a);padding:32px;text-align:center">
        <p style="color:white;font-size:32px;margin:0">🎀</p>
        <h1 style="color:white;font-size:24px;margin:8px 0 0">¡Confirmación recibida!</h1>
      </div>
      <div style="padding:32px">
        <p style="font-size:16px;color:#2a1a1f">Hola <strong>${nombre}</strong>,</p>
        <p style="font-size:15px;color:#6b4a52;line-height:1.7">
          Tu asistencia a los <strong style="color:#c0486a">XV años de Regina</strong> ha sido confirmada. ¡Qué emoción tenerte!
        </p>
        <div style="background:white;border-radius:16px;padding:20px;margin:20px 0;border:2px solid #f0b8c8">
          <p style="margin:0;font-size:15px;color:#2a1a1f;line-height:2">
            📅 <strong>6 de Junio 2026</strong> · 4:00 pm<br/>
            👥 <strong>${num_personas} persona${num_personas > 1 ? 's' : ''}</strong><br/>
            📍 Lugar por confirmar próximamente
          </p>
        </div>
        <p style="font-size:14px;color:#6b4a52;line-height:1.7">
          Te esperamos con mucho cariño. ¡Va a ser una noche increíble! 💕
        </p>
      </div>
      <div style="background:#fff8fa;padding:16px;text-align:center;border-top:1px solid #f0b8c8">
        <p style="font-size:11px;color:#b5566e;margin:0">
          Realizado por arturobarrios.com · Liz Barron Event Planner
        </p>
      </div>
    </div>
  ` : `
    <div style="font-family:Georgia,serif;max-width:500px;margin:0 auto;padding:32px">
      <h2 style="color:#6b4a52">Hola ${nombre}</h2>
      <p style="color:#6b4a52;line-height:1.7">
        Recibimos tu respuesta. Lamentamos que no puedas acompañarnos en los XV de Regina, 
        pero te mandamos un abrazo enorme. 💕
      </p>
      <p style="font-size:11px;color:#b5566e">Realizado por arturobarrios.com · Liz Barron Event Planner</p>
    </div>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [payload.email],
      subject: asiste
        ? `¡Listo ${nombre}! Tu lugar en los XV de Regina está confirmado 🎀`
        : `Recibimos tu respuesta — XV de Regina`,
      html,
    })
  })
  return { ok: res.ok }
}

// ── EMAIL A LIZ ──
export async function sendMailLiz(payload: NotificationPayload) {
  const RESEND_KEY = process.env.RESEND_API_KEY
  if (!RESEND_KEY) return { ok: false, error: 'No RESEND_API_KEY' }

  const { nombre, asiste, num_personas, telefono, restricciones, mensaje_regina, email, action } = payload
  const emoji = asiste ? '✅' : '❌'
  const accion = action === 'updated' ? '(actualización)' : '(nuevo)'

  const html = `
    <div style="font-family:sans-serif;max-width:500px;margin:0 auto">
      <div style="background:linear-gradient(135deg,#c0486a,#d4718a);padding:20px;border-radius:16px 16px 0 0">
        <h2 style="color:white;margin:0">${emoji} RSVP XV Regina ${accion}</h2>
      </div>
      <div style="background:#fff8fa;padding:24px;border:2px solid #f0b8c8;border-top:none;border-radius:0 0 16px 16px">
        <table style="width:100%;border-collapse:collapse">
          <tr style="border-bottom:1px solid #f0b8c8">
            <td style="padding:10px;color:#b5566e;font-weight:bold;width:40%">Nombre</td>
            <td style="padding:10px;color:#2a1a1f">${nombre}</td>
          </tr>
          <tr style="border-bottom:1px solid #f0b8c8">
            <td style="padding:10px;color:#b5566e;font-weight:bold">Teléfono</td>
            <td style="padding:10px;color:#2a1a1f">${telefono}</td>
          </tr>
          ${email ? `<tr style="border-bottom:1px solid #f0b8c8">
            <td style="padding:10px;color:#b5566e;font-weight:bold">Email</td>
            <td style="padding:10px;color:#2a1a1f">${email}</td>
          </tr>` : ''}
          <tr style="border-bottom:1px solid #f0b8c8">
            <td style="padding:10px;color:#b5566e;font-weight:bold">Asistencia</td>
            <td style="padding:10px;color:#2a1a1f">${asiste ? `✅ Sí — ${num_personas} persona${num_personas > 1 ? 's' : ''}` : '❌ No asiste'}</td>
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
    headers: {
      'Authorization': `Bearer ${RESEND_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [LIZ_EMAIL],
      subject: `${emoji} XV Regina — ${nombre} ${asiste ? `(${num_personas} persona${num_personas>1?'s':''})` : '(No asiste)'} ${accion}`,
      html,
    })
  })
  return { ok: res.ok }
}

// ── WHATSAPP A LIZ via Twilio ──
export async function sendWALiz(payload: NotificationPayload) {
  const SID   = process.env.TWILIO_ACCOUNT_SID
  const TOKEN = process.env.TWILIO_AUTH_TOKEN
  const FROM  = process.env.TWILIO_WA_NUMBER
  if (!SID || !TOKEN || !FROM) return { ok: false, error: 'No Twilio config' }

  const { nombre, asiste, num_personas, telefono, restricciones, action } = payload
  const emoji = asiste ? '✅' : '❌'
  const accion = action === 'updated' ? '_(actualización)_' : ''

  const msg = [
    `${emoji} *Nuevo RSVP — XV Regina* ${accion}`,
    ``,
    `👤 *${nombre}*`,
    `📱 ${telefono}`,
    asiste
      ? `✅ Sí asiste — *${num_personas} persona${num_personas>1?'s':''}*`
      : `❌ No asiste`,
    restricciones ? `🍽️ _${restricciones}_` : null,
  ].filter(Boolean).join('\n')

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${SID}/Messages.json`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${SID}:${TOKEN}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        From: FROM,
        To: `whatsapp:+${LIZ_PHONE}`,
        Body: msg,
      }).toString()
    }
  )
  return { ok: res.ok }
}

// ── WHATSAPP AL INVITADO via Twilio ──
export async function sendWAInvitado(payload: NotificationPayload) {
  const SID   = process.env.TWILIO_ACCOUNT_SID
  const TOKEN = process.env.TWILIO_AUTH_TOKEN
  const FROM  = process.env.TWILIO_WA_NUMBER
  if (!SID || !TOKEN || !FROM) return { ok: false, error: 'No Twilio config' }

  const { nombre, asiste, num_personas, telefono } = payload

  const msg = asiste
    ? `🎀 *¡Hola ${nombre}!*\n\nTu asistencia a los *XV años de Regina* está confirmada.\n\n📅 *6 de Junio 2026* · 4:00 pm\n👥 *${num_personas} persona${num_personas>1?'s':''}*\n📍 Lugar por confirmar\n\n¡Te esperamos con mucho cariño! 💕`
    : `Hola *${nombre}*, recibimos tu respuesta.\n\nLamentamos que no puedas acompañarnos en los XV de Regina. ¡Te mandamos un abrazo! 💕`

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${SID}/Messages.json`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${SID}:${TOKEN}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        From: FROM,
        To: `whatsapp:+52${telefono}`,
        Body: msg,
      }).toString()
    }
  )
  return { ok: res.ok }
}
