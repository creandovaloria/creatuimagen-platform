import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export const dynamic = 'force-dynamic'

export default async function VentasAdminPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== 'creandovalor.ia@gmail.com') {
    redirect('/login')
  }

  // Obtenemos las ventas con los datos del cliente
  const { data: ventas, error } = await supabase
    .schema('crm')
    .from('ventas')
    .select(`
      *,
      clientes (
        nombre,
        email
      )
    `)
    .order('fecha', { ascending: false })

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Centro de Ventas</h1>
          <p className="text-slate-500 font-medium">Inteligencia comercial y registro de éxitos</p>
        </div>
        <div className="flex bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl border border-emerald-100 font-bold items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Sistema CRM Activo
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-100 p-4 rounded-2xl text-red-700">
          Error cargando ventas: {error.message}
        </div>
      ) : !ventas || ventas.length === 0 ? (
        <div className="bg-slate-50 border border-slate-100 p-12 rounded-[2.5rem] text-center">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Aún no hay ventas registradas</h3>
          <p className="text-slate-500 mb-6 max-w-sm mx-auto">Las ventas de Mercado Pago aparecerán aquí automáticamente cuando los clientes completen su pago.</p>
          <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all">
            Registrar Venta Manual (Próximamente)
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ventas.map((venta) => (
            <Link 
              key={venta.id} 
              href={`/admin/ventas/${venta.id}`}
              className="group bg-white border border-slate-100 p-6 rounded-[2rem] hover:shadow-2xl hover:shadow-slate-200/50 transition-all hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Decoración sutil */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-emerald-50 transition-colors"></div>
              
              <div className="relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {format(new Date(venta.fecha), 'dd MMM, yyyy', { locale: es })}
                  </div>
                  <div className="text-lg font-black text-emerald-600">
                    ${Number(venta.monto).toLocaleString('es-MX')}
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {venta.clientes?.nombre || 'Cliente Desconocido'}
                </h3>
                <p className="text-sm text-slate-500 mb-4 line-clamp-1">{venta.clientes?.email}</p>

                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {venta.metodo_pago}
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {venta.producto}
                  </span>
                </div>

                <div className="pt-4 border-t border-slate-50">
                  <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-tighter">Título Conceptual</p>
                  <p className="text-sm text-slate-700 italic font-medium">
                    "{venta.titulo_conceptual || 'Sin título definido'}"
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between text-slate-400 group-hover:text-blue-600 transition-colors">
                  <span className="text-xs font-bold uppercase tracking-widest">Ver Inteligencia</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
