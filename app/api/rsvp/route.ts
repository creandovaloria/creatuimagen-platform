import { NextRequest, NextResponse } from 'next/server'
import { checkExistingRSVP, insertRSVP, updateRSVP } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, telefono, asiste, num_personas, restricciones, mensaje_regina } = body

    if (!nombre?.trim()) return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 })
    if (!telefono?.trim()) return NextResponse.json({ error: 'Teléfono requerido' }, { status: 400 })
    if (asiste === undefined) return NextResponse.json({ error: 'Confirma tu asistencia' }, { status: 400 })

    const eventoSlug = 'XV-Regina'
    const telefonoLimpio = telefono.replace(/\D/g, '')

    const { data: existing } = await checkExistingRSVP(eventoSlug, telefonoLimpio)

    if (existing) {
      const { data, error } = await updateRSVP(eventoSlug, telefonoLimpio, {
        nombre: nombre.trim(),
        asiste,
        num_personas: asiste ? (num_personas || 1) : 0,
        restricciones: restricciones?.trim() || null,
        mensaje_regina: mensaje_regina?.trim() || null,
      })
      if (error) throw error
      return NextResponse.json({ success: true, action: 'updated', data })
    }

    const { data, error } = await insertRSVP({
      evento_slug: eventoSlug,
      nombre: nombre.trim(),
      telefono: telefonoLimpio,
      asiste,
      num_personas: asiste ? (num_personas || 1) : 0,
      restricciones: restricciones?.trim() || null,
      mensaje_regina: mensaje_regina?.trim() || null,
    })
    if (error) throw error
    return NextResponse.json({ success: true, action: 'created', data })

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
