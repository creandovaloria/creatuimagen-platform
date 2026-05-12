import { getPerfilCompleto } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProfileForm from '@/components/admin/ProfileForm'
import LinksManager from '@/components/admin/LinksManager'

export default async function EditProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const { data: profile, error } = await getPerfilCompleto(resolvedParams.slug)

  if (error || !profile) {
    return notFound()
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin" className="text-slate-500 hover:text-slate-700">
            ← Volver
          </Link>
          <h2 className="text-2xl font-bold text-slate-800">Editar Perfil: {profile.nombre}</h2>
        </div>
        <a 
          href={`/${profile.slug}`} 
          target="_blank" 
          className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Ver Tarjeta ↗
        </a>
      </div>

      <div className="space-y-8">
        {/* Top: Profile & VCard Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <ProfileForm profile={profile} />
        </div>

        {/* Bottom: Dynamic Links */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Enlaces Dinámicos Extras</h3>
          <p className="text-sm text-slate-500 mb-6">
            Usa esta sección para agregar botones dinámicos adicionales (como agendar citas, descargar un PDF, enlaces a tu blog, etc).
          </p>
          <LinksManager perfilId={profile.id} initialLinks={profile.links} />
        </div>
      </div>
    </div>
  )
}
