'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegistroPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    whatsapp: '',
    slug: ''
  });

  const handleNombreChange = (val: string) => {
    const slug = val.toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    setFormData({ ...formData, nombre: val, slug });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-blue-600 text-white text-4xl font-black italic shadow-2xl shadow-blue-200">
            B
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Tu Bio Pro</h1>
            <p className="text-slate-500 font-medium text-lg">Reserva tu lugar en internet hoy.</p>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/60 border border-slate-100 space-y-8">
          
          <div className="space-y-6">
            
            {/* Campo: Nombre */}
            <div className="group space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-blue-500">
                Tu Nombre
              </label>
              <input
                type="text"
                placeholder="Ej. Arturo Barrios"
                required
                className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-blue-100 transition-all outline-none text-slate-800 font-bold text-lg placeholder:text-slate-300"
                value={formData.nombre}
                onChange={(e) => handleNombreChange(e.target.value)}
              />
            </div>

            {/* Campo: Email */}
            <div className="group space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-blue-500">
                Email Profesional
              </label>
              <input
                type="email"
                placeholder="hola@ejemplo.com"
                required
                className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-blue-100 transition-all outline-none text-slate-800 font-bold text-lg placeholder:text-slate-300"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Campo: WhatsApp */}
            <div className="group space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-green-500">
                WhatsApp (Envío de Accesos)
              </label>
              <div className="relative">
                <span className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 font-black text-lg">+</span>
                <input
                  type="tel"
                  placeholder="52 1 123 456 7890"
                  required
                  className="w-full pl-12 pr-8 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-green-100 transition-all outline-none text-slate-800 font-bold text-lg placeholder:text-slate-300"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                />
              </div>
            </div>

            {/* Campo: Link */}
            <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100/50 space-y-3">
              <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">URL Personalizada</label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center text-blue-600 font-black text-lg truncate">
                  <span className="opacity-30">bios.creatuimagen.online/</span>
                  <span className="text-blue-700 underline decoration-blue-200 underline-offset-4">{formData.slug || 'tu-link'}</span>
                </div>
                <input
                  type="text"
                  placeholder="personaliza-tu-link"
                  className="w-full px-6 py-3 bg-white border border-blue-100 rounded-xl outline-none focus:border-blue-300 text-sm font-bold text-blue-800 placeholder:text-blue-200 transition-all"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                />
              </div>
            </div>

          </div>

          {/* Botón */}
          <div className="space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-[2rem] text-xl shadow-2xl shadow-blue-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center space-x-3"
            >
              <span>{loading ? 'Preparando...' : 'Obtener mi Bio — $299'}</span>
            </button>
            <div className="flex items-center justify-center space-x-2 text-slate-400">
              <span className="text-[10px] font-bold uppercase tracking-tighter">Pago Seguro vía Mercado Pago</span>
            </div>
          </div>

        </form>

        <p className="text-center text-slate-400 text-xs px-10 leading-relaxed">
          Al hacer clic en el botón, serás redirigido a Mercado Pago para finalizar tu compra. Recibirás tus accesos de inmediato.
        </p>

      </div>
    </div>
  );
}
