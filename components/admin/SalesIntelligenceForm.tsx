'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SalesIntelligenceForm({ venta }: { venta: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    vendedor: venta.vendedor || 'Arturo',
    canal_venta: venta.canal_venta || 'WhatsApp',
    medio_demo: venta.medio_demo || 'Video',
    titulo_conceptual: venta.titulo_conceptual || '',
    ideas_principales: venta.ideas_principales || '',
    que_funciono: venta.que_funciono || '',
    significado_personal: venta.significado_personal || '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase
      .schema('crm')
      .from('ventas')
      .update(formData)
      .eq('id', venta.id)

    setLoading(false)
    if (error) {
      alert('Error guardando: ' + error.message)
    } else {
      router.refresh()
      alert('✅ ¡Inteligencia guardada con éxito!')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">¿Quién cerró?</label>
          <input 
            type="text"
            value={formData.vendedor}
            onChange={(e) => setFormData({...formData, vendedor: e.target.value})}
            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Canal de Venta</label>
          <select 
            value={formData.canal_venta}
            onChange={(e) => setFormData({...formData, canal_venta: e.target.value})}
            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          >
            <option value="WhatsApp">WhatsApp</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="Referido">Referido</option>
            <option value="Web">Web Directa</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Título Conceptual</label>
        <input 
          type="text"
          placeholder="Ej: La Bio de la Consultora Ejecutiva"
          value={formData.titulo_conceptual}
          onChange={(e) => setFormData({...formData, titulo_conceptual: e.target.value})}
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold text-xl placeholder:text-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">¿Qué funcionó? (El Cierre)</label>
        <textarea 
          rows={3}
          placeholder="Describe la frase, el demo o el argumento que convenció al cliente..."
          value={formData.que_funciono}
          onChange={(e) => setFormData({...formData, que_funciono: e.target.value})}
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Significado Personal</label>
        <textarea 
          rows={3}
          placeholder="¿Qué representa esta compra para la vida del cliente?"
          value={formData.significado_personal}
          onChange={(e) => setFormData({...formData, significado_personal: e.target.value})}
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      <div className="pt-4">
        <button 
          disabled={loading}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-[2rem] font-black text-lg transition-all shadow-xl shadow-blue-200 disabled:opacity-50 hover:-translate-y-1 active:translate-y-0"
        >
          {loading ? 'Sincronizando...' : 'Guardar Inteligencia de Venta'}
        </button>
      </div>
    </form>
  )
}
