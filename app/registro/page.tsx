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
    
    if (name === 'nombre') {
      // Generar slug automáticamente desde el nombre
      const cleanSlug = value.toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
      
      setFormData(prev => ({ 
        ...prev, 
        nombre: value,
        slug: prev.slug === '' || prev.slug === prev.nombre.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') ? cleanSlug : prev.slug
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
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 sm:p-6 font-sans selection:bg-blue-100">
      <div className="max-w-[480px] w-full space-y-10 py-10">
        
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-[2.2rem] shadow-2xl shadow-blue-100">
            <span className="text-white text-4xl font-black italic tracking-tighter">B</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Tu Bio Profesional</h1>
            <p className="text-slate-500 text-lg font-medium">Empieza tu presencia digital aquí.</p>
          </div>
        </div>

        {/* Formulario con todos los campos necesarios */}
        <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200/60 border border-white space-y-8">
          
          <div className="space-y-6">
            {/* Nombre */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Tu Nombre</label>
              <input 
                required
                type="text" 
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej. Arturo Barrios"
                className="w-full px-7 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-100 transition-all outline-none text-slate-800 font-bold text-lg"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email</label>
              <input 
                required
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hola@ejemplo.com"
                className="w-full px-7 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-100 transition-all outline-none text-slate-800 font-bold text-lg"
              />
            </div>

            {/* WhatsApp */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 text-green-600/50">WhatsApp (Envío de accesos)</label>
              <div className="relative">
                <span className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 font-black">+52</span>
                <input 
                  required
                  type="tel" 
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="55 1234 5678"
                  className="w-full pl-16 pr-7 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-green-50 transition-all outline-none text-slate-800 font-bold text-lg"
                />
              </div>
            </div>

            {/* URL reservation */}
            <div className="space-y-2 p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100/50">
              <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Tu URL Reservada</label>
              <div className="flex items-center text-blue-600 font-black text-base truncate">
                <span className="opacity-30 tracking-tight">bios.creatuimagen.online/</span>
                <input 
                  required
                  type="text" 
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="bg-transparent border-none outline-none p-0 ml-0.5 w-full placeholder:text-blue-200"
                  placeholder="tu-link"
                />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-5 rounded-[1.8rem] font-black text-xl transition-all shadow-2xl ${
                isSubmitting 
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-300 active:scale-[0.98]'
              }`}
            >
              {isSubmitting ? 'Cargando...' : 'Obtener mi Bio — $299'}
            </button>

            <div className="flex items-center justify-center gap-3 opacity-30">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pago Seguro</span>
              <img src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo.png" alt="Mercado Pago" className="h-3 grayscale" />
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
