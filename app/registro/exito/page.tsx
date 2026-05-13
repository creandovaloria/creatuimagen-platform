"use client"

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, Suspense } from 'react'
import confetti from 'canvas-confetti'

function ExitoContent() {
  const searchParams = useSearchParams()
  const slug = searchParams.get('slug')
  
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#9333ea', '#10b981']
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-500">
        
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 text-green-600 rounded-full mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">¡Pago Confirmado!</h1>
          <p className="text-slate-500 text-lg">Tu presencia digital acaba de subir de nivel.</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 space-y-6">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Tu nueva dirección es:</p>
            <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between group">
              <span className="text-blue-600 font-bold overflow-hidden text-ellipsis whitespace-nowrap mr-2">
                bios.creatuimagen.online/{slug}
              </span>
              <Link 
                href={`/${slug}`} 
                target="_blank"
                className="bg-white p-2 rounded-xl shadow-sm hover:shadow-md transition-all text-slate-400 hover:text-blue-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Link 
              href={`/admin/perfiles/${slug}`}
              className="block w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-bold transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98]"
            >
              Personalizar mi Perfil
            </Link>
            <p className="text-[10px] text-slate-400">
              Te enviamos los accesos y el recibo a tu correo electrónico.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ExitoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <ExitoContent />
    </Suspense>
  )
}
