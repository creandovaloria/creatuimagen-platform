// ══════════════════════════════════════
// Notificaciones — Mail + WhatsApp
// ══════════════════════════════════════

export interface NotificationPayload {
  nombre: string
  telefono: string
  asiste: boolean
  num_personas: number
  restricciones?: string | null
  mensaje_regina?: string | null
  evento_slug: string
  action: 'created' | 'updated'
}

// ── EMAIL via Resend ──
export async function sendMailInvitado(payload: NotificationPayload) {
  const { nombre, asiste, num_personas } = payload
  const RESEND_KEY = process.env.RESEND_API_KEY
  if (!RESEND_KEY) return { ok: false, error: 'No RESEND_API_KEY' }

  const subject = asiste
    ? `¡Confirmación recibida! XV de Regina 🎀`
    : `Registro recibido — XV de Regina`

  const html = asiste ? `
    <div style="font-family:sans-serif;max-width:500px;margin:0 auto;color:#2a1a1f">
      <h1 style="color:#c0486a;font-size:28px">¡Hola ${nombre}! 🎀</h1>
      <p style="font-size:16px;line-height:1.6">
        Tu asistencia a los <strong>XV años de Regina</strong> ha sido confirmada.
      </p>
      <div style="background:#fde8ed;border-radius:16px;padding:20px;margin:20px 0">
        <p style="margin:0;font-size:15px">
          📅 <strong>6 de Junio 2026</strong> · 4:00 pm<br/>
          👥 <strong>${num_personas} persona${num_personas > 1 ? 's' : ''}</strong>
        </p>
      </div>
      <p style="font-size:14px;color:#6b4a52">
        El lugar se confirmará próximamente. ¡Te esperamos! 💕
      </p>
      <hr style="border:1px solid #f0b8c8;margin:20px 0"/>
      <p style="font-size:12px;color:#b5566e">
        Realizado por arturobarrios.com · Liz Barron Event Planner
      </p>
    </div>
  ` : `
    <div style="font-family:sans-serif;max-width:500px;margin:0 auto;color:#2a1a1f">
      <h1 style="color:#6b4a52;font-size:24px">Hola ${nombre}</h1>
      <p>Recibimos tu respuesta. Lamentamos que no puedas asistir a los XV de Regina.</p>
    </div>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'invitaciones@creatuimagen.online',
      to: ['invitaciones@creatuimagen.online'], // TODO: agregar email al form
      subject,
      html,
    })
  })
  return { ok: res.ok }
}

export async function sendMailLiz(payload: NotificationPayload) {
  const { nombre, asiste, num_personas, restricciones, mensaje_regina } = payload
  const RESEND_KEY = process.env.RESEND_API_KEY
  const LIZ_EMAIL = process.env.LIZ_EMAIL || 'liz@lizbarron.com'
  if (!RESEND_KEY) return { ok: false, error: 'No RESEND_API_KEY' }

  const emoji = asiste ? '✅' : '❌'
  const html = `
    <div style="font-family:sans-serif;max-width:500px;margin:0 auto;color:#2a1a1f">
      <h2 style="color:#c0486a">${emoji} Nuevo RSVP — XV Regina</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px;color:#6b4a52;font-weight:bold">Nombre</td><td>${nombre}</td></tr>
        <tr><td style="padding:8px;color:#6b4a52;font-weight:bold">Teléfono</td><td>${payload.telefono}</td></tr>
        <tr><td style="padding:8px;color:#6b4a52;font-weight:bold">Asiste</td><td>${asiste ? `✅ Sí — ${num_personas} persona${num_personas>1?'s':''}` : '❌ No'}</td></tr>
        ${restricciones ? `<tr><td style="padding:8px;color:#6b4a52;font-weight:bold">Restricciones</td><td>${restricciones}</td></tr>` : ''}
        ${mensaje_regina ? `<tr><td style="padding:8px;color:#6b4a52;font-weight:bold">Mensaje</td><td>${mensaje_regina}</td></tr>` : ''}
      </table>
      <hr style="border:1px solid #f0b8c8"/>
      <p style="font-size:12px;color:#b5566e">creatuimagen.online · arturobarrios.com</p>
    </div>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'invitaciones@creatuimagen.online',
      to: [LIZ_EMAIL],
      subject: `${emoji} RSVP XV Regina — ${nombre} (${asiste ? `${num_personas} personas` : 'No asiste'})`,
      html,
    })
  })
  return { ok: res.ok }
}

// ── WHATSAPP via Twilio ──
export async function sendWAInvitado(payload: NotificationPayload) {
  const { nombre, asiste, num_personas, telefono } = payload
  const SID   = process.env.TWILIO_ACCOUNT_SID
  const TOKEN = process.env.TWILIO_AUTH_TOKEN
  const FROM  = process.env.TWILIO_WA_NUMBER // 'whatsapp:+14155238886'
  if (!SID || !TOKEN || !FROM) return { ok: false, error: 'No Twilio config' }

  const msg = asiste
    ? `🎀 ¡Hola ${nombre}! Tu asistencia a los XV de Regina está confirmada.\n\n📅 6 de Junio 2026 · 4:00 pm\n👥 ${num_personas} persona${num_personas>1?'s':''}\n\n¡Te esperamos! 💕`
    : `Hola ${nombre}, recibimos tu respuesta. Lamentamos que no puedas asistir a los XV de Regina 💕`

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

export async function sendWALiz(payload: NotificationPayload) {
  const { nombre, asiste, num_personas, telefono, restricciones } = payload
  const SID   = process.env.TWILIO_ACCOUNT_SID
  const TOKEN = process.env.TWILIO_AUTH_TOKEN
  const FROM  = process.env.TWILIO_WA_NUMBER
  const LIZ   = process.env.LIZ_PHONE || '524272199374'
  if (!SID || !TOKEN || !FROM) return { ok: false, error: 'No Twilio config' }

  const emoji = asiste ? '✅' : '❌'
  const msg = `${emoji} *Nuevo RSVP — XV Regina*\n\n👤 *${nombre}*\n📱 ${telefono}\n${asiste ? `✅ Sí asiste — ${num_personas} persona${num_personas>1?'s':''}` : '❌ No asiste'}${restricciones ? `\n🍽️ ${restricciones}` : ''}`

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
        To: `whatsapp:+${LIZ}`,
        Body: msg,
      }).toString()
    }
  )
  return { ok: res.ok }
}
