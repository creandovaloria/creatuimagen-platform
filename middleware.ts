import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createClient } from '@supabase/supabase-js'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host')?.toLowerCase() || ''

  // 1. Rutas de sistema (NUNCA se reescriben)
  if (
    url.pathname.startsWith('/_next') || 
    url.pathname.startsWith('/api') || 
    url.pathname.startsWith('/admin') ||
    url.pathname.startsWith('/auth') ||
    url.pathname.startsWith('/login') ||
    url.pathname.includes('.')
  ) {
    return await updateSession(request)
  }

  // 2. Lógica para DOMINIOS PERSONALIZADOS (Dinámica desde DB)
  // No procesamos subdominios internos de creatuimagen.online para el ruteo dinámico
  const isMainDomain = hostname.includes('creatuimagen.online') || hostname.includes('vercel.app') || hostname.includes('localhost')

  if (!isMainDomain) {
    // Usamos una instancia ligera de supabase para el middleware
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Buscamos si el dominio (o su versión sin www) está en la DB
    const cleanHostname = hostname.replace('www.', '')
    const { data: perfil } = await supabase
      .from('perfiles')
      .select('slug')
      .eq('custom_domain', cleanHostname)
      .eq('activo', true)
      .maybeSingle()

    if (perfil?.slug) {
      const rewriteUrl = new URL(`/${perfil.slug}${url.pathname === '/' ? '' : url.pathname}`, request.url)
      return NextResponse.rewrite(rewriteUrl)
    }
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
