import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProfileForm from '@/components/admin/ProfileForm'
import LinksManager from '@/components/admin/LinksManager'

export default async function EditProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const supabase = await createClient()
  
  // 1. Obtener datos principales del perfil (filtrado por RLS si no es admin)
  const { data: profile, error: perfilError } = await supabase
    .from('perfiles')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single()

  if (perfilError || !profile) {
    return notFound()
  }

  // 2. Obtener links
  const { data: links } = await supabase
    .from('perfil_links')
    .select('*')
    .eq('perfil_id', profile.id)
    .order('orden', { ascending: true })

  // 3. Obtener datos de contacto VCF (opcional)
  const { data: vcf } = await supabase
    .from('contactos_vcf')
    .select('*')
    .eq('perfil_id', profile.id)
    .maybeSingle()

  const fullProfile = {
    ...profile,
    links: links || [],
    vcf: vcf || null
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
          <ProfileForm profile={fullProfile} />
        </div>

        {/* Bottom: Dynamic Links */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Enlaces Dinámicos Extras</h3>
          <p className="text-sm text-slate-500 mb-6">
            Usa esta sección para agregar botones dinámicos adicionales (como agendar citas, descargar un PDF, enlaces a tu blog, etc).
          </p>
          <LinksManager perfilId={fullProfile.id} initialLinks={fullProfile.links} />
        </div>
      </div>
    </div>
  )
}
