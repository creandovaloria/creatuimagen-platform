import { PerfilData, PerfilLinkData, ContactoVCFData } from '@/lib/supabase'

interface ProfileProps {
  profile: PerfilData & { 
    links: PerfilLinkData[],
    vcf: ContactoVCFData | null
  }
}

export default function ProfileCard({ profile }: ProfileProps) {
  // Función para asegurar que el link sea externo
  const ensureExternalLink = (url: string | null) => {
    if (!url) return '#'
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:')) {
      return url
    }
    return `https://${url}`
  }

  // Función específica para WhatsApp que limpia el número y genera el link wa.me
  const formatWhatsAppLink = (input: string | null) => {
    if (!input) return '#'
    
    // Si ya es un link completo de wa.me o api.whatsapp, lo dejamos pasar tras asegurar https
    if (input.includes('wa.me') || input.includes('whatsapp.com')) {
      return input.startsWith('http') ? input : `https://${input}`
    }

    // Si es solo un número, lo limpiamos
    let number = input.replace(/\D/g, '') // Solo números
    
    // Caso México: Si empieza con 521, quitar el 1 (obsoleto y da error en algunos dispositivos)
    if (number.startsWith('521') && number.length > 11) {
      number = '52' + number.substring(3)
    }

    return `https://wa.me/${number}`
  }

  return (
    <div className="w-full max-w-md bg-white/90 backdrop-blur-2xl border border-slate-100 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden animate-in fade-in zoom-in duration-500">
      {/* Banner / Top decorative section */}
      <div 
        className="h-40 w-full relative"
        style={{ 
          background: `linear-gradient(135deg, ${profile.theme_primary}, ${profile.theme_accent})` 
        }}
      >
        <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
      </div>
      
      {/* Profile Header */}
      <div className="px-8 pb-10 relative flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="w-36 h-36 -mt-20 mb-6 rounded-full border-[8px] border-white shadow-xl overflow-hidden bg-white flex items-center justify-center relative z-10 transition-transform duration-500 hover:scale-105">
          {profile.foto_url ? (
            <img 
              src={profile.foto_url} 
              alt={profile.nombre}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-5xl">👤</span>
          )}
        </div>
        
        {/* Name and Role */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight mb-2">{profile.nombre}</h1>
        <p className="text-sm font-bold uppercase tracking-[0.2em] mb-6" style={{ color: profile.theme_primary }}>
          {profile.rol}
        </p>
        
        {/* Bio */}
        <p className="text-slate-600 text-base leading-relaxed mb-10 px-2 font-medium">
          {profile.bio}
        </p>

        {/* Dynamic Links (Middle) */}
        <div className="w-full flex flex-col gap-4 mb-10">
          {profile.links.map((link) => (
            <a
              key={link.id}
              href={ensureExternalLink(link.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center p-5 rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-md"
              style={{
                backgroundColor: `${profile.theme_primary}08`, // 8% opacity
                color: profile.theme_primary,
                border: `1px solid ${profile.theme_primary}15`
              }}
            >
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ 
                  background: `linear-gradient(90deg, ${profile.theme_primary}, ${profile.theme_accent})` 
                }}
              />
              <span className="relative z-10 text-2xl mr-4 group-hover:text-white transition-colors duration-300">
                {link.icono}
              </span>
              <span className="relative z-10 flex-1 text-left group-hover:text-white transition-colors duration-300 text-lg">
                {link.titulo}
              </span>
              <span className="relative z-10 opacity-0 group-hover:opacity-100 group-hover:text-white transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                →
              </span>
            </a>
          ))}
        </div>

        {/* Fixed Social Icons (Bottom) */}
        <div className="flex flex-wrap justify-center gap-5 mb-8">
          {profile.instagram && (
            <a 
              href={ensureExternalLink(profile.instagram)} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-md hover:shadow-xl ${!profile.usa_colores_tema ? 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]' : ''}`} 
              style={!profile.usa_colores_tema ? { color: 'white' } : { backgroundColor: profile.theme_primary, color: 'white' }}
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
          )}
          {profile.linkedin && (
            <a 
              href={ensureExternalLink(profile.linkedin)} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-md hover:shadow-xl" 
              style={!profile.usa_colores_tema ? { backgroundColor: '#0A66C2', color: 'white' } : { backgroundColor: profile.theme_primary, color: 'white' }}
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          )}
          {profile.whatsapp && (
            <a 
              href={formatWhatsAppLink(profile.whatsapp)} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-md hover:shadow-xl" 
              style={!profile.usa_colores_tema ? { backgroundColor: '#25D366', color: 'white' } : { backgroundColor: profile.theme_primary, color: 'white' }}
              aria-label="WhatsApp"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </a>
          )}
          {profile.facebook && (
            <a 
              href={ensureExternalLink(profile.facebook)} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-md hover:shadow-xl" 
              style={!profile.usa_colores_tema ? { backgroundColor: '#1877F2', color: 'white' } : { backgroundColor: profile.theme_primary, color: 'white' }}
              aria-label="Facebook"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
            </a>
          )}
          {profile.tiktok && (
            <a 
              href={ensureExternalLink(profile.tiktok)} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-md hover:shadow-xl" 
              style={!profile.usa_colores_tema ? { backgroundColor: '#000000', color: 'white' } : { backgroundColor: profile.theme_primary, color: 'white' }}
              aria-label="TikTok"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.34 6.34 0 0 0 6.27 6.36 6.32 6.32 0 0 0 6.2-6.36V10.05a8.27 8.27 0 0 0 4.74 1.5v-3.4a4.85 4.85 0 0 1-2.62-.84Z"/></svg>
            </a>
          )}
          {profile.youtube && (
            <a 
              href={ensureExternalLink(profile.youtube)} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-md hover:shadow-xl" 
              style={!profile.usa_colores_tema ? { backgroundColor: '#FF0000', color: 'white' } : { backgroundColor: profile.theme_primary, color: 'white' }}
              aria-label="YouTube"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          )}
        </div>

        {/* vCard Save Button */}
        <a 
          href={`/api/vcf/${profile.slug}`}
          className="mt-2 w-full py-5 rounded-2xl font-bold text-white shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_15px_30px_-15px_rgba(0,0,0,0.5)] active:scale-95 block text-center text-lg relative overflow-hidden group"
          style={{ background: `linear-gradient(90deg, ${profile.theme_primary}, ${profile.theme_accent})` }}
        >
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <span className="relative z-10 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Guardar Contacto
          </span>
        </a>
      </div>
    </div>
  )
}
