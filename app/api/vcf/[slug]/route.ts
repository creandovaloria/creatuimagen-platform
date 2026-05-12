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
  
  // Nombre a mostrar (usa nombre legal si existe, sino el nombre público)
  const fn = vcfData?.nombre_legal || profile.nombre
  const n = fn.split(' ').reverse().join(';') // Simple aproximación para Last;First
  
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${n};;;`,
    `FN:${fn}`,
    `TITLE:${profile.rol}`,
    vcfData?.company ? `ORG:${vcfData.company}` : '',
    vcfData?.telefono ? `TEL;type=CELL;type=VOICE;type=pref:${vcfData.telefono}` : '',
    vcfData?.email ? `EMAIL;type=INTERNET;type=pref:${vcfData.email}` : '',
    vcfData?.website ? `URL;type=pref:${vcfData.website}` : '',
    profile.bio ? `NOTE:${profile.bio.replace(/\n/g, '\\n')}` : '',
    profile.foto_url ? `PHOTO;VALUE=uri:${profile.foto_url}` : '',
    'END:VCARD'
  ].filter(Boolean).join('\n')

  return new NextResponse(vcard, {
    headers: {
      'Content-Type': 'text/vcard',
      'Content-Disposition': `attachment; filename="${profile.slug}.vcf"`,
    },
  })
}
