import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

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

  // 2. Lógica de Subdominios (bios.creatuimagen.online, eventos.creatuimagen.online)
  const isBiosSubdomain = hostname.startsWith('bios.')
  const isEventosSubdomain = hostname.startsWith('eventos.')

  // 3. Mapeo de Dominios Personalizados a Slugs
  const customDomainMap: Record<string, string> = {
    'lilianachaglla.com': 'liliana-chaglla',
    'www.lilianachaglla.com': 'liliana-chaglla',
  }

  const customSlug = customDomainMap[hostname] || customDomainMap[hostname.replace('www.', '')]

  if (customSlug) {
    const rewriteUrl = new URL(`/${customSlug}${url.pathname === '/' ? '' : url.pathname}`, request.url)
    return NextResponse.rewrite(rewriteUrl)
  }

  // 4. Si es el subdominio de bios, pero no es dominio personalizado
  if (isBiosSubdomain && url.pathname === '/') {
    // Aquí podrías redirigir a una landing de "bios" si quisieras
    return await updateSession(request)
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
