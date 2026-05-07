import { NextRequest, NextResponse } from 'next/server'
import { checkExistingRSVP, insertRSVP, updateRSVP } from '@/lib/supabase'
import { sendMailLiz, sendWALiz } from '@/lib/notifications'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, telefono, asiste, num_personas, restricciones, mensaje_regina } = body

    if (!nombre?.trim()) return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 })
    if (!telefono?.trim()) return NextResponse.json({ error: 'Teléfono requerido' }, { status: 400 })
    if (asiste === undefined) return NextResponse.json({ error: 'Confirma tu asistencia' }, { status: 400 })

    const eventoSlug = 'XV-Regina'
    const telefonoLimpio = telefono.replace(/\D/g, '')

    const payload = {
      nombre: nombre.trim(),
      telefono: telefonoLimpio,
      asiste,
      num_personas: asiste ? (num_personas || 1) : 0,
      restricciones: restricciones?.trim() || null,
      mensaje_regina: mensaje_regina?.trim() || null,
      evento_slug: eventoSlug,
      action: 'created' as const,
    }

    // Verificar duplicado
    const { data: existing } = await checkExistingRSVP(eventoSlug, telefonoLimpio)

    let data, error, action

    if (existing) {
      // Actualizar
      const result = await updateRSVP(eventoSlug, telefonoLimpio, {
        nombre: payload.nombre,
        asiste: payload.asiste,
        num_personas: payload.num_personas,
        restricciones: payload.restricciones,
        mensaje_regina: payload.mensaje_regina,
      })
      data = result.data; error = result.error; action = 'updated'
    } else {
      // Insertar
      const result = await insertRSVP({
        evento_slug: eventoSlug,
        nombre: payload.nombre,
        telefono: payload.telefono,
        asiste: payload.asiste,
        num_personas: payload.num_personas,
        restricciones: payload.restricciones,
        mensaje_regina: payload.mensaje_regina,
      })
      data = result.data; error = result.error; action = 'created'
    }

    if (error) throw error

    // Notificaciones en paralelo (no bloqueantes)
    const notifPayload = { ...payload, action: action as 'created' | 'updated' }
    Promise.allSettled([
      sendMailLiz(notifPayload),
      sendWALiz(notifPayload),
    ]).then(results => {
      console.log('Notificaciones:', results.map(r => r.status))
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
