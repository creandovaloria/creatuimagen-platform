"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    whatsapp: '',
    slug: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'slug') {
      // Limpiar el slug para que sea URL-friendly
      const cleanSlug = value.toLowerCase().replace(/[^a-z0-9-]/g, '-')
      setFormData(prev => ({ ...prev, slug: cleanSlug }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      
      if (data.init_point) {
        // Redirigir a Mercado Pago
        window.location.href = data.init_point
      } else {
        throw new Error(data.error || 'No se pudo crear la preferencia de pago')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full space-y-10 text-center">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-3xl shadow-xl shadow-blue-200 mb-4 animate-bounce-subtle">
            <span className="text-white text-3xl font-bold">B</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Tu Bio Profesional</h1>
          <p className="text-slate-500 text-lg">Crea tu tarjeta digital en menos de 2 minutos.</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 space-y-6 text-left">
          
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Nombre Completo</label>
              <input 
                required
                type="text" 
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Juan Pérez"
                className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-slate-700 font-medium"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Email</label>
              <input 
                required
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="juan@ejemplo.com"
                className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-slate-700 font-medium"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Tu Link Personalizado</label>
              <div className="relative">
                <input 
                  required
                  type="text" 
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="tu-nombre"
                  className="w-full pl-5 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-slate-700 font-bold"
                />
              </div>
              <p className="text-[10px] text-slate-400 italic ml-1">
                bios.creatuimagen.online/{formData.slug || 'tu-nombre'}
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-xl ${
              isSubmitting 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.01] shadow-blue-600/20'
            }`}
          >
            {isSubmitting ? 'Procesando pago...' : 'Continuar al Pago'}
          </button>

          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="text-[10px] text-slate-400 font-medium">Pago seguro vía</span>
            <img src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo.png" alt="Mercado Pago" className="h-3 opacity-50 grayscale" />
          </div>
        </form>

        {/* Footer */}
        <p className="text-slate-400 text-xs">
          ¿Ya tienes cuenta? <a href="/login" className="text-blue-600 font-bold hover:underline">Inicia sesión</a>
        </p>
      </div>

      <style jsx>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
