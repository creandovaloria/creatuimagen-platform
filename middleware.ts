import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host')?.toLowerCase() || ''

  // Dominios principales de la plataforma (ajustar según sea necesario)
  const MAIN_DOMAINS = [
    'localhost:3000', 
    'localhost', 
    'creatuimagen.online', 
    'www.creatuimagen.online',
    'creatuimagen-platform-6unq.vercel.app' // Tu URL actual de Vercel
  ]

  // Mapeo de dominios personalizados a slugs
  const customDomainMap: Record<string, string> = {
    'lilianachaglla.com': 'lilianachaglla',
    'www.lilianachaglla.com': 'lilianachaglla',
  }

  // Verificar si es un dominio personalizado
  const isCustomDomain = !MAIN_DOMAINS.some(domain => hostname === domain || hostname.endsWith('.' + domain))

  // Rutas que NO deben ser reescritas
  const isInternal = 
    url.pathname.startsWith('/_next') || 
    url.pathname.startsWith('/api') || 
    url.pathname.startsWith('/admin') ||
    url.pathname.startsWith('/auth') ||
    url.pathname.startsWith('/login') ||
    url.pathname.includes('.') // Archivos estáticos como favicon.ico, etc.

  if (isCustomDomain && !isInternal) {
    const slug = customDomainMap[hostname]

    if (slug) {
      // Reescribir internamente a la página del bio: /lilianachaglla
      const rewriteUrl = new URL(`/${slug}${url.pathname === '/' ? '' : url.pathname}`, request.url)
      console.log(`Rewriting ${hostname}${url.pathname} to ${rewriteUrl.pathname}`)
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
