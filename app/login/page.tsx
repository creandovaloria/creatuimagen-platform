"use client"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError("Credenciales incorrectas. Intenta de nuevo.")
      setIsLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Crea Tu Imagen</h1>
          <p className="text-slate-500">Acceso al Panel de Administración</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all"
              placeholder="tu@correo.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Iniciando sesión...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
