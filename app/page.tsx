import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] selection:bg-blue-100">
      {/* Navegación Simple */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="text-xl font-black tracking-tighter text-slate-900">
          CREA TU IMAGEN <span className="text-blue-600">.</span>
        </div>
        <div className="space-x-8 text-sm font-medium text-slate-500">
          <Link href="/login" className="hover:text-slate-900 transition-colors">Entrar</Link>
          <Link href="/registro" className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-black transition-all">Empezar gratis</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 pt-20 pb-32 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
            <span>✨ Nuevo: Perfiles Pro para Expertos</span>
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tight">
            Tu mundo en <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">un solo link.</span>
          </h1>
          
          <p className="text-xl text-slate-500 max-w-md leading-relaxed">
            Crea una tarjeta digital profesional en segundos. Comparte tus redes, proyectos y datos de contacto con elegancia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
              href="/registro" 
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 hover:scale-[1.02] transition-all shadow-xl shadow-blue-600/20 text-center"
            >
              Crear mi Bio ahora
            </Link>
            <div className="flex items-center gap-3 px-4 py-4 text-slate-400 text-sm italic">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Únete a +1,000 profesionales
            </div>
          </div>
        </div>

        {/* Mockup / Visual Area */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative bg-white border border-slate-100 p-4 rounded-[2.5rem] shadow-2xl">
            {/* Simulación de Perfil */}
            <div className="bg-slate-50 rounded-[2rem] aspect-[9/16] overflow-hidden p-6 space-y-6">
              <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto animate-pulse"></div>
              <div className="space-y-2 text-center">
                <div className="h-4 w-32 bg-slate-200 rounded-full mx-auto"></div>
                <div className="h-2 w-20 bg-slate-200 rounded-full mx-auto opacity-50"></div>
              </div>
              <div className="space-y-3">
                <div className="h-12 w-full bg-white rounded-xl shadow-sm"></div>
                <div className="h-12 w-full bg-white rounded-xl shadow-sm"></div>
                <div className="h-12 w-full bg-white rounded-xl shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-12 text-center text-slate-400 text-sm">
        © 2026 Creando Valor IA. Todos los derechos reservados.
      </footer>
    </div>
  )
}
