interface LinkItem {
  id: string
  title: string
  url: string
  icon: string
}

interface ProfileProps {
  profile: {
    name: string
    role: string
    bio: string
    avatarUrl: string
    theme: {
      primary: string
      accent: string
    }
    links: LinkItem[]
  }
}

export default function ProfileCard({ profile }: ProfileProps) {
  return (
    <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
      {/* Banner / Top decorative section */}
      <div 
        className="h-32 w-full"
        style={{ 
          background: `linear-gradient(135deg, ${profile.theme.primary}, ${profile.theme.accent})` 
        }}
      />
      
      {/* Profile Header */}
      <div className="px-6 pb-6 relative flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="w-28 h-28 -mt-14 mb-4 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
          <img 
            src={profile.avatarUrl} 
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Name and Role */}
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{profile.name}</h1>
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mt-1 mb-3">
          {profile.role}
        </p>
        
        {/* Bio */}
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {profile.bio}
        </p>

        {/* Links */}
        <div className="w-full flex flex-col gap-3">
          {profile.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              className="group relative flex items-center p-4 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-95"
              style={{
                backgroundColor: `${profile.theme.primary}10`, // 10% opacity
                color: profile.theme.primary,
              }}
            >
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ 
                  background: `linear-gradient(90deg, ${profile.theme.primary}, ${profile.theme.accent})` 
                }}
              />
              <span className="relative z-10 text-xl mr-3 group-hover:text-white transition-colors">
                {link.icon}
              </span>
              <span className="relative z-10 flex-1 text-left group-hover:text-white transition-colors font-semibold">
                {link.title}
              </span>
            </a>
          ))}
        </div>

        {/* vCard Save Button */}
        <button 
          className="mt-8 w-full py-4 rounded-full font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          style={{ background: profile.theme.primary }}
        >
          Guardar Contacto
        </button>
      </div>
    </div>
  )
}
