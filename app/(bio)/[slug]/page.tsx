import ProfileCard from '@/components/bio/ProfileCard'
import { getPerfilCompleto } from '@/lib/supabase'
import { notFound } from 'next/navigation'

export default async function BioPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  // Fetch real data from Supabase using resolvedParams.slug
  const { data: profileData, error } = await getPerfilCompleto(resolvedParams.slug)

  
  if (error || !profileData) {
    console.error("Error fetching profile:", error)
    return notFound()
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <ProfileCard profile={profileData} />
    </main>
  )
}
