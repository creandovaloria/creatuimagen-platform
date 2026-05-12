import { getAllPerfiles } from '@/lib/supabase'
import Link from 'next/link'

export default async function AdminDashboard() {
  const { data: perfiles, error } = await getAllPerfiles()

  if (error) {
    return <div className="text-red-500">Error cargando perfiles: {error.message}</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Perfiles</h2>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + Nuevo Perfil
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Perfil</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {perfiles?.map((perfil) => (
              <tr key={perfil.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded-full object-cover" src={perfil.foto_url || ''} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-slate-900">{perfil.nombre}</div>
                      <div className="text-sm text-slate-500">/{perfil.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900">{perfil.rol}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${perfil.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {perfil.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/admin/perfiles/${perfil.slug}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    Editar
                  </Link>
                  <a href={`/${perfil.slug}`} target="_blank" className="text-slate-600 hover:text-slate-900">
                    Ver ↗
                  </a>
                </td>
              </tr>
            ))}
            
            {!perfiles || perfiles.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  No hay perfiles creados todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
