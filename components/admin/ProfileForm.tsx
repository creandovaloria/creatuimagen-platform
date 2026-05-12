"use client"

import { useState } from 'react'
import { updatePerfilConVCF, PerfilData, ContactoVCFData } from '@/lib/supabase'

interface ProfileFormProps {
  profile: PerfilData & { vcf: ContactoVCFData | null }
}

const InputField = ({ label, name, type = "text", placeholder = "", value, onChange }: any) => (
  <div>
    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</label>
    <input 
      type={type} 
      name={name} 
      value={value || ''} 
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
)

export default function ProfileForm({ profile }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    // Perfil Básico
    nombre: profile.nombre,
    rol: profile.rol,
    bio: profile.bio || '',
    foto_url: profile.foto_url || '',
    theme_primary: profile.theme_primary,
    theme_accent: profile.theme_accent,
    // Redes Fijas
    instagram: profile.instagram || '',
    linkedin: profile.linkedin || '',
    tiktok: profile.tiktok || '',
    facebook: profile.facebook || '',
    youtube: profile.youtube || '',
    whatsapp: profile.whatsapp || '',
    usa_colores_tema: profile.usa_colores_tema || false,
    // VCard
    vcard_nombre_legal: profile.vcf?.nombre_legal || '',
    vcard_telefono: profile.vcf?.telefono || '',
    vcard_email: profile.vcf?.email || '',
    vcard_website: profile.vcf?.website || '',
    vcard_company: profile.vcf?.company || '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    setFormData(prev => ({ ...prev, [target.name]: value }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        return
      }
      const file = e.target.files[0]
      
      // Proteger el Free Tier: Límite configurable por variable de entorno (por defecto 2MB)
      const maxMb = Number(process.env.NEXT_PUBLIC_MAX_UPLOAD_MB || 2)
      if (file.size > maxMb * 1024 * 1024) {
        setMessage(`❌ Error: La imagen pesa más de ${maxMb}MB. Sube una más ligera para no saturar el servidor.`)
        return
      }
      
      setIsUploading(true)
      setMessage('')

      // 1. Obtener cliente de Supabase
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()

      // 2. Crear nombre de archivo único
      const fileExt = file.name.split('.').pop()
      const fileName = `${profile.slug}-${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      // 3. Subir a Supabase Storage (bucket "avatars")
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })

      if (uploadError) {
        throw uploadError
      }

      // 4. Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      // 5. Actualizar el estado del formulario con la nueva URL
      setFormData(prev => ({ ...prev, foto_url: publicUrl }))
      setMessage('✅ Foto subida correctamente (recuerda guardar los cambios abajo)')
    } catch (error: any) {
      setMessage(`❌ Error al subir imagen: ${error.message}`)
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage('')
    
    const { error } = await updatePerfilConVCF(
      profile.slug,
      profile.id,
      {
        nombre: formData.nombre,
        rol: formData.rol,
        bio: formData.bio,
        foto_url: formData.foto_url,
        theme_primary: formData.theme_primary,
        theme_accent: formData.theme_accent,
        instagram: formData.instagram,
        linkedin: formData.linkedin,
        tiktok: formData.tiktok,
        facebook: formData.facebook,
        youtube: formData.youtube,
        whatsapp: formData.whatsapp,
        usa_colores_tema: formData.usa_colores_tema,
      },
      {
        nombre_legal: formData.vcard_nombre_legal,
        telefono: formData.vcard_telefono,
        email: formData.vcard_email,
        website: formData.vcard_website,
        company: formData.vcard_company,
      }
    )
    
    if (error) {
      setMessage(`❌ Error: ${error.message}`)
    } else {
      setMessage('✅ Perfil guardado con éxito')
    }
    setIsSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* SECCIÓN 1: Perfil Básico */}
      <div className="space-y-4">
        <h4 className="font-bold text-slate-800 border-b pb-2">1. Información Pública</h4>
        <InputField label="Nombre (Display)" name="nombre" required value={formData.nombre} onChange={handleChange} />
        <InputField label="Título Profesional / Rol" name="rol" required value={formData.rol} onChange={handleChange} />
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Biografía</label>
          <textarea 
            name="bio" 
            value={formData.bio} 
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        
        {/* Upload Foto */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Foto de Perfil</label>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 h-16 w-16 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
              {formData.foto_url ? (
                <img src={formData.foto_url} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <span className="text-2xl text-slate-400">👤</span>
              )}
            </div>
            <div className="flex-1">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 disabled:opacity-50"
              />
              {isUploading && <p className="text-xs text-indigo-500 mt-1">Subiendo imagen...</p>}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Color Principal</label>
            <input type="color" name="theme_primary" value={formData.theme_primary} onChange={handleChange} className="h-8 w-full rounded cursor-pointer" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Color Acento</label>
            <input type="color" name="theme_accent" value={formData.theme_accent} onChange={handleChange} className="h-8 w-full rounded cursor-pointer" />
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: Datos vCard */}
      <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <h4 className="font-bold text-slate-800 border-b pb-2">2. Datos de Contacto (vCard)</h4>
        <p className="text-xs text-slate-500 mb-4">Estos datos se guardan al presionar el botón "Guardar Contacto".</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Nombre Legal" name="vcard_nombre_legal" value={formData.vcard_nombre_legal} onChange={handleChange} />
          <InputField label="Organización / Empresa" name="vcard_company" value={formData.vcard_company} onChange={handleChange} />
          <InputField label="Teléfono / Celular" name="vcard_telefono" value={formData.vcard_telefono} onChange={handleChange} />
          <InputField label="Correo Electrónico" name="vcard_email" type="email" value={formData.vcard_email} onChange={handleChange} />
          <InputField label="Sitio Web Principal" name="vcard_website" type="text" value={formData.vcard_website} onChange={handleChange} />
        </div>
      </div>

      {/* SECCIÓN 3: Redes Fijas */}
      <div className="space-y-4">
        <h4 className="font-bold text-slate-800 border-b pb-2">3. Redes Sociales Fijas</h4>
        <p className="text-xs text-slate-500 mb-4">Aparecerán como íconos al final de tu tarjeta. Déjalas en blanco para ocultar.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Instagram URL" name="instagram" type="text" placeholder="https://instagram.com/..." value={formData.instagram} onChange={handleChange} />
          <InputField label="LinkedIn URL" name="linkedin" type="text" placeholder="https://linkedin.com/in/..." value={formData.linkedin} onChange={handleChange} />
          <InputField label="WhatsApp URL (API)" name="whatsapp" type="text" placeholder="https://wa.me/..." value={formData.whatsapp} onChange={handleChange} />
          <InputField label="Facebook URL" name="facebook" type="text" placeholder="https://facebook.com/..." value={formData.facebook} onChange={handleChange} />
          <InputField label="TikTok URL" name="tiktok" type="text" placeholder="https://tiktok.com/@..." value={formData.tiktok} onChange={handleChange} />
          <InputField label="YouTube URL" name="youtube" type="text" placeholder="https://youtube.com/..." value={formData.youtube} onChange={handleChange} />
        </div>
        
        {/* Toggle Colores Originales */}
        <div className="mt-4 flex items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
          <input
            id="usa_colores_tema"
            name="usa_colores_tema"
            type="checkbox"
            checked={formData.usa_colores_tema}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
          />
          <label htmlFor="usa_colores_tema" className="ml-2 block text-sm text-slate-700 cursor-pointer font-medium">
            Usar mis colores personalizados del tema en los íconos sociales
          </label>
        </div>
      </div>

      {message && (
        <div className={`p-3 rounded-md text-sm font-medium ${message.startsWith('✅') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isSaving}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 px-4 rounded-xl font-bold shadow-lg transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
      >
        {isSaving ? 'Guardando...' : 'Guardar Cambios del Perfil'}
      </button>
    </form>
  )
}
