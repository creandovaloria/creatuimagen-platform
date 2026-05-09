import { NextRequest, NextResponse } from 'next/server'
import { checkExistingRSVP, insertRSVP, updateRSVP, getEvento } from '@/lib/supabase'
import { sendMailPlanner, sendMailInvitado, sendWAPlanner, sendWAInvitado } from '@/lib/notifications'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, telefono, email, asiste, num_personas, restricciones, mensaje_regina } = body

    // Validaciones
    if (!nombre?.trim())   return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 })
    if (!telefono?.trim()) return NextResponse.json({ error: 'Teléfono requerido' }, { status: 400 })
    if (asiste === undefined) return NextResponse.json({ error: 'Confirma tu asistencia' }, { status: 400 })

    const eventoSlug     = 'XV-Regina'
    const telefonoLimpio = telefono.replace(/\D/g, '')

    // Obtener datos del evento y planner desde Supabase
    const { data: evento, error: eventoError } = await getEvento(eventoSlug)
    if (eventoError || !evento) return NextResponse.json({ error: 'Evento no encontrado' }, { status: 404 })

    const rsvpData = {
      nombre:         nombre.trim(),
      telefono:       telefonoLimpio,
      email:          email?.trim() || null,
      asiste,
      num_personas:   asiste ? (num_personas || 1) : 0,
      restricciones:  restricciones?.trim() || null,
      mensaje_regina: mensaje_regina?.trim() || null,
    }

    // Verificar duplicado
    const { data: existing } = await checkExistingRSVP(eventoSlug, telefonoLimpio)

    let data, error, action: 'created' | 'updated'

    if (existing) {
      const result = await updateRSVP(eventoSlug, telefonoLimpio, rsvpData)
      data = result.data; error = result.error; action = 'updated'
    } else {
      const result = await insertRSVP({ evento_slug: eventoSlug, ...rsvpData })
      data = result.data; error = result.error; action = 'created'
    }

    if (error) throw error

    // Payload de notificaciones — planner viene de Supabase, no de env vars
    const notifPayload = {
      ...rsvpData,
      action,
      festejado:      evento.festejado,
      fecha:          evento.fecha,
      hora:           evento.hora,
      planner_nombre: evento.planner_nombre || '',
      planner_email:  evento.planner_email  || '',
      planner_phone:  evento.planner_phone  || '',
    }

    // Notificaciones en paralelo — no bloquean la respuesta
    Promise.allSettled([
      sendMailPlanner(notifPayload),
      sendMailInvitado(notifPayload),
      sendWAPlanner(notifPayload),
      sendWAInvitado(notifPayload),
    ]).then(results => {
      console.log('Notif:', results.map((r, i) =>
        `${['mailPlanner','mailInv','waPlanner','waInv'][i]}:${r.status}`
      ).join(' | '))
    })

    return NextResponse.json({ success: true, action, data })

  } catch (error: any) {
    console.error('RSVP error:', error)
    return NextResponse.json({ error: error.message || 'Error al guardar' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const telefono = request.nextUrl.searchParams.get('telefono')
  if (!telefono) return NextResponse.json({ exists: false })
  const { data } = await checkExistingRSVP('XV-Regina', telefono.replace(/\D/g, ''))
  return NextResponse.json({ exists: !!data, data })
}
