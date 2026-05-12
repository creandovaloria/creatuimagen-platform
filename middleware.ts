import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host')?.toLowerCase() || ''

  // 1. Siempre ejecutar la sesión de Supabase primero para manejar auth
  const res = await updateSession(request)

  // 2. Definir rutas que NUNCA deben ser reescritas (Admin, API, etc.)
  const isInternal = 
    url.pathname.startsWith('/_next') || 
    url.pathname.startsWith('/api') || 
    url.pathname.startsWith('/admin') ||
    url.pathname.startsWith('/auth') ||
    url.pathname.startsWith('/login') ||
    url.pathname.includes('.')

  if (isInternal) return res

  // 3. Dominios principales
  const MAIN_DOMAINS = [
    'localhost:3000', 
    'localhost', 
    'creatuimagen.online', 
    'www.creatuimagen.online',
    'creatuimagen-platform-6unq.vercel.app'
  ]

  const isMainDomain = MAIN_DOMAINS.some(domain => hostname === domain)

  // 4. Lógica de Dominios Personalizados
  if (!isMainDomain) {
    const customDomainMap: Record<string, string> = {
      'lilianachaglla.com': 'lilianachaglla',
      'www.lilianachaglla.com': 'lilianachaglla',
    }

    const slug = customDomainMap[hostname] || customDomainMap[hostname.replace('www.', '')]

    if (slug) {
      const rewriteUrl = new URL(`/${slug}${url.pathname === '/' ? '' : url.pathname}`, request.url)
      return NextResponse.rewrite(rewriteUrl)
    }
  }

  return res
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
