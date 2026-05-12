"use client"

import { useState } from 'react'

export default function DomainSearch() {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query) return
    
    setIsSearching(true)
    setResult(null)

    try {
      const response = await fetch(`/api/domains/check?domain=${query}`)
      const data = await response.json()
      
      if (data.error) {
        alert(`Error: ${data.error}`)
      }

      setResult({
        domain: data.domain,
        available: data.available,
        total: data.price
      })
    } catch (error) {
      console.error('Error searching domain:', error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
      <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
        <span className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center text-sm">🌐</span>
        Buscador de Dominios (Reseller)
      </h4>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ej: lilianachaglla.com"
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-700"
        />
        <button 
          type="submit"
          disabled={isSearching}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-bold transition-all disabled:opacity-50"
        >
          {isSearching ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {result && (
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 animate-in fade-in slide-in-from-top-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-bold text-slate-900">{result.domain}</p>
              {result.available ? (
                <p className="text-xs text-green-600 font-medium">✨ Disponible para registro</p>
              ) : (
                <p className="text-xs text-red-500 font-medium">❌ No disponible</p>
              )}
            </div>
            {result.available && (
              <div className="text-right">
                <p className="text-lg font-black text-indigo-600">${result.total} USD</p>
                <p className="text-[10px] text-slate-400">Incluye gestión y configuración</p>
              </div>
            )}
          </div>
          
          {result.available && (
            <button className="w-full mt-4 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">
              Registrar y Configurar Vercel
            </button>
          )}
        </div>
      )}
    </section>
  )
}
