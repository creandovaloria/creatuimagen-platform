import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  // Consultamos todo lo necesario para el Centro de Comando
  const { data: perfiles } = await supabase.from('perfiles').select('*').order('created_at', { ascending: false })
  
  // Datos del CRM
  const { data: ventas } = await supabase.schema('crm').from('ventas').select('monto, fecha, id, producto').order('fecha', { ascending: false })
  const { count: totalClientes } = await supabase.schema('crm').from('clientes').select('*', { count: 'exact', head: true })

  const ingresosTotales = ventas?.reduce((acc, v) => acc + Number(v.monto), 0) || 0;
  const ventasRecientes = ventas?.slice(0, 5) || [];

  return (
    <div className="space-y-12">
      {/* SECCIÓN DE MÉTRICAS (KPIs) */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
          <div className="relative">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Ingresos Totales</p>
            <h3 className="text-4xl font-black text-emerald-600">${ingresosTotales.toLocaleString('es-MX')}</h3>
            <p className="text-xs text-emerald-600/60 font-bold mt-1">Ventas aprobadas</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
          <div className="relative">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Clientes Únicos</p>
            <h3 className="text-4xl font-black text-blue-600">{totalClientes || 0}</h3>
            <p className="text-xs text-blue-600/60 font-bold mt-1">Base CRM</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
          <div className="relative">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Bios Activas</p>
            <h3 className="text-4xl font-black text-indigo-600">{perfiles?.length || 0}</h3>
            <p className="text-xs text-indigo-600/60 font-bold mt-1">En línea</p>
          </div>
        </div>
      </section>

      {/* ACTIVIDAD RECIENTE & VENTAS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Ventas Recientes</h2>
            <Link href="/admin/ventas" className="text-xs font-bold text-blue-600 hover:underline">Ver todas</Link>
          </div>
          
          <div className="space-y-4">
            {ventasRecientes.map((v) => (
              <Link 
                key={v.id} 
                href={`/admin/ventas/${v.id}`}
                className="block bg-white p-5 rounded-3xl border border-slate-50 hover:shadow-lg transition-all hover:-translate-y-1 group"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-1">{v.producto}</p>
                    <p className="font-black text-slate-800 text-lg group-hover:text-blue-600 transition-colors">${Number(v.monto).toLocaleString('es-MX')}</p>
                  </div>
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <section className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Gestión de Perfiles</h2>
            <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-2xl font-black text-sm transition-all shadow-lg shadow-slate-200">
              + Nuevo Perfil
            </button>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/30 border border-slate-100 overflow-hidden">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Perfil</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Visitas</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado</th>
                  <th className="px-6 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-50">
                {perfiles?.map((perfil) => (
                  <tr key={perfil.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden border border-slate-100">
                          <img className="h-10 w-10 object-cover" src={perfil.foto_url || ''} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">{perfil.nombre}</div>
                          <div className="text-[10px] font-bold text-slate-400 tracking-tighter">/{perfil.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className="text-sm font-black text-slate-700">{perfil.visitas || 0}</span>
                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-tighter">Vistas</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-[10px] font-black leading-5 rounded-full ${perfil.activo ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                        {perfil.activo ? 'EN LÍNEA' : 'PAUSADO'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-black">
                      <Link href={`/admin/perfiles/${perfil.slug}`} className="text-slate-400 hover:text-blue-600 transition-colors mr-4">
                        EDITAR
                      </Link>
                      <a href={`/${perfil.slug}`} target="_blank" className="text-slate-400 hover:text-slate-900 transition-colors">
                        VER ↗
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
