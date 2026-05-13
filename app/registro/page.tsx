"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    slug: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    if (name === 'nombre') {
      // Auto-generar slug basado en el nombre si el slug está vacío o era automático
      const cleanSlug = value.toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
      
      setFormData(prev => ({ 
        ...prev, 
        nombre: value,
        slug: prev.slug === '' || prev.slug === prev.nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') ? cleanSlug : prev.slug
      }))
    } else if (name === 'slug') {
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
      <div className="max-w-[440px] w-full space-y-8 text-center">
        
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-[2rem] shadow-2xl shadow-blue-200 mb-2">
            <span className="text-white text-4xl font-black italic tracking-tighter">B</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Tu Bio Profesional</h1>
          <p className="text-slate-500 text-lg max-w-[280px] mx-auto leading-tight">Crea tu tarjeta digital en segundos.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-10 rounded-[3rem] shadow-2xl shadow-slate-200 border border-white/50 space-y-8 text-left relative overflow-hidden">
          
          <div className="space-y-6">
            {/* Nombre */}
            <div className="group space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-blue-600">Nombre Completo</label>
              <div className="relative">
                <input 
                  required
                  type="text" 
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej. Juan Pérez"
                  className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-blue-100 transition-all outline-none text-slate-800 font-semibold placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Email */}
            <div className="group space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-blue-600">Email Personal</label>
              <input 
                required
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hola@ejemplo.com"
                className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-blue-100 transition-all outline-none text-slate-800 font-semibold placeholder:text-slate-300"
              />
            </div>

            {/* Slug / Link */}
            <div className="group space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-blue-600">Tu Link Personalizado</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <span className="text-slate-300 font-medium">bios.me/</span>
                </div>
                <input 
                  required
                  type="text" 
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="tu-nombre"
                  className="w-full pl-[85px] pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-blue-100 transition-all outline-none text-blue-600 font-bold placeholder:text-slate-300"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-5 rounded-[1.5rem] font-black text-xl transition-all shadow-xl shadow-blue-100 ${
                isSubmitting 
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed translate-y-0.5' 
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200 active:scale-[0.98]'
              }`}
            >
              {isSubmitting ? 'Cargando...' : 'Obtener mi Bio — $299'}
            </button>

            <div className="flex items-center justify-center gap-3 opacity-40 hover:opacity-60 transition-opacity">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Pago Seguro</span>
              <img src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo.png" alt="Mercado Pago" className="h-3.5 grayscale" />
            </div>
          </div>

        </form>

        <p className="text-slate-400 text-sm font-medium">
          ¿Ya tienes cuenta? <a href="/login" className="text-blue-600 font-black hover:underline decoration-2">Entrar</a>
        </p>
      </div>
    </div>
  )
}
