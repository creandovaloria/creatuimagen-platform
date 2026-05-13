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
      // Intentar sugerir un slug basado en el email si el slug está vacío
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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans selection:bg-blue-100">
      <div className="max-w-[440px] w-full space-y-8 text-center py-10">
        
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-[2rem] shadow-2xl shadow-blue-200 mb-2">
            <span className="text-white text-4xl font-black italic tracking-tighter">B</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight text-balance">Reserva tu Bio</h1>
          <p className="text-slate-500 text-lg max-w-[320px] mx-auto leading-tight">Solo necesitamos tus datos de contacto para empezar.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-10 rounded-[3rem] shadow-2xl shadow-slate-200 border border-white/50 space-y-6 text-left relative overflow-hidden">
          
          <div className="space-y-5">
            {/* Email */}
            <div className="group space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
              <input 
                required
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@correo.com"
                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-100 transition-all outline-none text-slate-800 font-semibold"
              />
            </div>

            {/* WhatsApp */}
            <div className="group space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 text-green-600/60">WhatsApp</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <span className="text-slate-300 font-bold">+52</span>
                </div>
                <input 
                  required
                  type="tel" 
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="55 1234 5678"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-green-50 transition-all outline-none text-slate-800 font-semibold"
                />
              </div>
            </div>

            {/* Link */}
            <div className="group space-y-2 bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
              <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-1">Reserva tu URL</label>
              <div className="flex items-center text-blue-600 font-black text-sm px-1">
                <span className="opacity-40">bios.me/</span>
                <input 
                  required
                  type="text" 
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="bg-transparent border-none outline-none p-0 ml-0.5 w-full placeholder:text-blue-200"
                  placeholder="tu-nombre"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-5 rounded-[1.5rem] font-black text-xl transition-all shadow-xl shadow-blue-100 ${
                isSubmitting 
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]'
              }`}
            >
              {isSubmitting ? 'Iniciando...' : 'Obtener mi Bio — $299'}
            </button>

            <div className="flex items-center justify-center gap-3 opacity-40 hover:opacity-60 transition-opacity pb-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Pago Seguro vía</span>
              <img src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo.png" alt="Mercado Pago" className="h-3 grayscale" />
            </div>
          </div>

        </form>

        <p className="text-slate-400 text-sm font-medium">
          ¿Dudas? <a href="https://wa.me/521234567890" target="_blank" className="text-green-600 font-black hover:underline decoration-2">Escríbenos</a>
        </p>
      </div>
    </div>
  )
}
