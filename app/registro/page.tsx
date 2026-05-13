"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    email: '',
    whatsapp: '',
    slug: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    if (name === 'slug') {
      const cleanSlug = value.toLowerCase().replace(/[^a-z0-9-]/g, '-')
      setFormData(prev => ({ ...prev, slug: cleanSlug }))
    } else if (name === 'email') {
      const suggestedSlug = value.split('@')[0].toLowerCase().replace(/[^a-z0-9-]/g, '-')
      setFormData(prev => ({ 
        ...prev, 
        email: value,
        slug: prev.slug === '' ? suggestedSlug : prev.slug
      }))
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
        window.location.href = data.init_point
      } else {
        throw new Error(data.error || 'No se pudo crear el pago')
      }
    } catch (err: any) {
      alert(`❌ Error: ${err.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 font-sans selection:bg-blue-100">
      <div className="max-w-[480px] w-full space-y-10 py-12">
        
        {/* Logo & Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-600 rounded-[2.5rem] shadow-2xl shadow-blue-200">
            <span className="text-white text-5xl font-black italic tracking-tighter">B</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">Reserva tu Bio</h1>
            <p className="text-slate-500 text-xl font-medium">Solo datos básicos para empezar.</p>
          </div>
        </div>

        {/* Card Formulario */}
        <form onSubmit={handleSubmit} className="bg-white p-10 sm:p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200/60 border border-white space-y-10">
          
          <div className="space-y-8">
            {/* Email */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email de contacto</label>
              <input 
                required
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@correo.com"
                className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-3xl focus:bg-white focus:border-blue-100 transition-all outline-none text-slate-800 font-bold text-lg placeholder:text-slate-300"
              />
            </div>

            {/* WhatsApp */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">WhatsApp</label>
              <div className="relative">
                <span className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 font-black text-lg">+52</span>
                <input 
                  required
                  type="tel" 
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="55 1234 5678"
                  className="w-full pl-20 pr-8 py-5 bg-slate-50 border-2 border-transparent rounded-3xl focus:bg-white focus:border-blue-100 transition-all outline-none text-slate-800 font-bold text-lg placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* URL Reservation */}
            <div className="space-y-3 p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100/50">
              <label className="text-xs font-black text-blue-400 uppercase tracking-[0.2em]">Reserva tu URL</label>
              <div className="flex items-center text-blue-600 font-black text-lg truncate">
                <span className="opacity-30">bios.me/</span>
                <input 
                  required
                  type="text" 
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="bg-transparent border-none outline-none p-0 ml-1 w-full placeholder:text-blue-200"
                  placeholder="tu-nombre"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-6 rounded-3xl font-black text-2xl transition-all shadow-2xl ${
                isSubmitting 
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-300 active:scale-[0.98]'
              }`}
            >
              {isSubmitting ? 'Cargando...' : 'Obtener mi Bio — $299'}
            </button>

            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 opacity-30">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pago seguro vía</span>
                <img src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo.png" alt="Mercado Pago" className="h-3.5 grayscale" />
              </div>
              <p className="text-[11px] text-slate-400 font-medium text-center leading-relaxed max-w-[280px]">
                Te enviaremos el link de configuración a tu WhatsApp tras confirmar el pago.
              </p>
            </div>
          </div>

        </form>

        <div className="text-center">
          <p className="text-slate-400 font-bold text-sm">
            ¿Ya tienes cuenta? <a href="/login" className="text-blue-600 hover:underline decoration-2 ml-1">Inicia sesión</a>
          </p>
        </div>
      </div>
    </div>
  )
}
