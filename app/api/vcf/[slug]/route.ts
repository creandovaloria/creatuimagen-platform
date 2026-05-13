import { getPerfilCompleto } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await params
  const { data: profile, error } = await getPerfilCompleto(resolvedParams.slug)

  if (error || !profile) {
    return new NextResponse('Profile not found', { status: 404 })
  }

  // Generar vCard string
  const vcfData = profile.vcf
  
  // Procesar nombre para formato N (Last;First;Middle;Prefix;Suffix)
  const nameParts = (vcfData?.nombre_legal || profile.nombre).trim().split(' ')
  let n = ''
  if (nameParts.length >= 2) {
    const last = nameParts.pop()
    const first = nameParts.join(' ')
    n = `${last};${first};;;`
  } else {
    n = `${nameParts[0]};;;;`
  }
  
  const fn = vcfData?.nombre_legal || profile.nombre

  // Procesar imagen a Base64 si existe
  let photoBase64 = ''
  if (profile.foto_url) {
    try {
      const response = await fetch(profile.foto_url)
      const buffer = await response.arrayBuffer()
      photoBase64 = Buffer.from(buffer).toString('base64')
    } catch (e) {
      console.error('Error procesando imagen para VCF:', e)
    }
  }

  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${n}`,
    `FN:${fn}`,
    `TITLE:${profile.rol}`,
    vcfData?.company ? `ORG:${vcfData.company}` : '',
    vcfData?.telefono ? `TEL;TYPE=CELL,VOICE:${vcfData.telefono.replace(/\s/g, '')}` : '',
    vcfData?.email ? `EMAIL;TYPE=INTERNET,HOME:${vcfData.email}` : '',
    vcfData?.website ? `URL;TYPE=WORK:${vcfData.website}` : '',
    profile.bio ? `NOTE:${profile.bio.replace(/\n/g, '\\n')}` : '',
    photoBase64 ? `PHOTO;ENCODING=b;TYPE=JPEG:${photoBase64}` : '',
    'END:VCARD'
  ].filter(line => {
    if (!line) return false
    const colonIndex = line.indexOf(':')
    return colonIndex !== -1 && line.substring(colonIndex + 1).trim() !== ''
  }).join('\r\n')

  return new NextResponse(vcard, {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `attachment; filename="${profile.slug}.vcf"`,
    },
  })
}
