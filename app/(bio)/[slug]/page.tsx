import ProfileCard from '@/components/bio/ProfileCard'
import { getPerfilCompleto } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const { data: profile } = await getPerfilCompleto(resolvedParams.slug)

  if (!profile) return { title: 'Perfil No Encontrado' }

  return {
    title: `${profile.nombre} | Tarjeta Digital`,
    description: profile.bio || `Perfil profesional de ${profile.nombre}`,
    openGraph: {
      title: profile.nombre,
      description: profile.bio || `Perfil profesional de ${profile.nombre}`,
      images: profile.foto_url ? [profile.foto_url] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: profile.nombre,
      description: profile.bio || `Perfil profesional de ${profile.nombre}`,
      images: profile.foto_url ? [profile.foto_url] : [],
    }
  }
}

export default async function BioPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const { data: profileData, error } = await getPerfilCompleto(resolvedParams.slug)
  
  if (error || !profileData) {
    console.error("Error fetching profile:", error)
    return notFound()
  }

  // Detectar Origen del Tráfico
  const headersList = await headers()
  const referer = headersList.get('referer') || 'Directo'
  
  let fuente = 'Directo'
  if (referer.includes('instagram.com')) fuente = 'Instagram'
  else if (referer.includes('facebook.com')) fuente = 'Facebook'
  else if (referer.includes('t.co') || referer.includes('twitter.com')) fuente = 'Twitter'
  else if (referer.includes('tiktok.com')) fuente = 'TikTok'
  else if (referer.includes('google.com')) fuente = 'Google'

  // Incrementamos la visita con fuente de forma asíncrona
  const supabase = await createClient()
  supabase.rpc('registrar_visita_completa', { 
    target_slug: resolvedParams.slug,
    fuente_detectada: fuente 
  }).then(({ error }) => {
    if (error) console.error('Error incrementando visitas:', error)
  })

  return (
    <main 
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8"
      style={{ 
        background: `radial-gradient(at 0% 0%, ${profileData.theme_primary}15 0, transparent 50%), 
                     radial-gradient(at 100% 100%, ${profileData.theme_primary}10 0, transparent 50%),
                     #f8fafc` 
      }}
    >
      <ProfileCard profile={profileData} />
    </main>
  )
}
