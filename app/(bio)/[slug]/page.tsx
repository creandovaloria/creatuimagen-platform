import ProfileCard from '@/components/bio/ProfileCard'
import { getPerfilCompleto } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

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

  return (
    <main 
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: `${profileData.theme_accent}` }}
    >
      <ProfileCard profile={profileData} />
    </main>
  )
}
