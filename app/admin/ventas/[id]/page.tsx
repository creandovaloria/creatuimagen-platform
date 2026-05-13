import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import SalesIntelligenceForm from '@/components/admin/SalesIntelligenceForm'

export const dynamic = 'force-dynamic'

export default async function VentaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== 'creandovalor.ia@gmail.com') {
    redirect('/login')
  }

  const { data: venta, error } = await supabase
    .schema('crm')
    .from('ventas')
    .select(`
      *,
      clientes (
        nombre,
        email,
        telefono
      )
    `)
    .eq('id', resolvedParams.id)
    .single()

  if (error || !venta) {
    notFound()
  }

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <Link 
        href="/admin/ventas" 
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-8 transition-colors group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver a Ventas
      </Link>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden mb-8">
        <div className="bg-slate-900 p-8 text-white">
          <div className="flex justify-between items-center mb-6">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
              Detalle de Transacción
            </span>
            <div className="text-3xl font-black text-emerald-400">
              ${Number(venta.monto).toLocaleString('es-MX')}
            </div>
          </div>
          <h1 className="text-3xl font-black mb-1">{venta.clientes?.nombre}</h1>
          <p className="text-slate-400 font-medium">{venta.clientes?.email}</p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Método</p>
              <p className="font-bold text-slate-900 uppercase">{venta.metodo_pago}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Producto</p>
              <p className="font-bold text-slate-900">{venta.producto}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ID Pago</p>
              <p className="font-bold text-slate-900 truncate">{venta.referencia || 'N/A'}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Vendedor</p>
              <p className="font-bold text-slate-900">{venta.vendedor}</p>
            </div>
          </div>

          <hr className="border-slate-50 mb-12" />

          {/* Formulario de Inteligencia */}
          <SalesIntelligenceForm venta={venta} />
        </div>
      </div>
    </div>
  )
}
