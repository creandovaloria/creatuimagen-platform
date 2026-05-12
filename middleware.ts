import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host')?.toLowerCase() || ''

  // Dominios principales de la plataforma
  const MAIN_DOMAINS = [
    'localhost:3000', 
    'localhost', 
    'creatuimagen.online', 
    'www.creatuimagen.online',
    'creatuimagen-platform-6unq.vercel.app'
  ]

  // Mapeo robusto: Cualquier variación de lilianachaglla.com apunta al slug 'lilianachaglla'
  const customDomainMap: Record<string, string> = {
    'lilianachaglla.com': 'lilianachaglla',
    'www.lilianachaglla.com': 'lilianachaglla',
  }

  const isMainDomain = MAIN_DOMAINS.some(domain => hostname === domain)

  // Rutas internas que nunca deben ser reescritas
  const isInternal = 
    url.pathname.startsWith('/_next') || 
    url.pathname.startsWith('/api') || 
    url.pathname.startsWith('/admin') ||
    url.pathname.startsWith('/auth') ||
    url.pathname.startsWith('/login') ||
    url.pathname.includes('.')

  if (!isMainDomain && !isInternal) {
    // Buscar si el hostname (limpio) está en nuestro mapa
    const slug = customDomainMap[hostname] || customDomainMap[hostname.replace('www.', '')]

    if (slug) {
      const rewriteUrl = new URL(`/${slug}${url.pathname === '/' ? '' : url.pathname}`, request.url)
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
