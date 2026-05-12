import ProfileCard from '@/components/bio/ProfileCard'

// Mock data until Supabase is connected
const mockProfile = {
  name: 'Arturo Barrios',
  role: 'AI Strategist & Consultant',
  bio: 'Ayudo a profesionales y empresas a integrar Inteligencia Artificial para escalar sus ventas y operaciones. 🚀',
  avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  theme: {
    primary: '#1a1a1a',
    accent: '#4ade80' // A vibrant green accent
  },
  links: [
    { id: '1', title: 'Agendar Consultoría AI', url: '#', icon: '🗓️' },
    { id: '2', title: 'Mi Masterclass Gratuita', url: '#', icon: '🎓' },
    { id: '3', title: 'LinkedIn', url: '#', icon: '💼' },
    { id: '4', title: 'Instagram', url: '#', icon: '📸' }
  ]
}

export default function BioPage({ params }: { params: { slug: string } }) {
  // In the future, we will fetch data from Supabase using params.slug
  // const { data } = await supabase.from('profiles').select('*').eq('slug', params.slug).single()
  
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <ProfileCard profile={mockProfile} />
    </main>
  )
}
