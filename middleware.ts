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

  // 2. Si estamos en el dominio principal, no hacemos nada especial
  if (
    hostname.includes('creatuimagen.online') || 
    hostname.includes('vercel.app') || 
    hostname.includes('localhost')
  ) {
    return await updateSession(request)
  }

  // 3. Lógica para DOMINIOS PERSONALIZADOS (Ej: lilianachaglla.com)
  const customDomainMap: Record<string, string> = {
    'lilianachaglla.com': 'lilianachaglla',
    'www.lilianachaglla.com': 'lilianachaglla',
  }

  const slug = customDomainMap[hostname] || customDomainMap[hostname.replace('www.', '')]

  if (slug) {
    // Redirigir internamente lilianachaglla.com/ -> /lilianachaglla
    const rewriteUrl = new URL(`/${slug}${url.pathname === '/' ? '' : url.pathname}`, request.url)
    return NextResponse.rewrite(rewriteUrl)
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
