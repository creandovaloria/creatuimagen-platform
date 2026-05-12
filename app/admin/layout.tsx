import Link from "next/link"
import { createClient } from '@/lib/supabase/server'
import SignOutButton from '@/components/admin/SignOutButton'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <span className="font-bold text-xl text-slate-800">Admin Panel</span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          <Link 
            href="/admin" 
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-indigo-50 text-indigo-700"
          >
            📊 Dashboard
          </Link>
          <a 
            href="https://supabase.com" 
            target="_blank"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-700 hover:bg-slate-50 hover:text-slate-900"
          >
            🗄️ Supabase
          </a>
        </nav>
        <div className="p-4 border-t border-slate-200">
          <div className="text-xs text-slate-500 mb-2 px-3 truncate">
            {user?.email}
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold text-slate-800">Crea Tu Imagen</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

