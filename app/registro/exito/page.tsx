'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function ExitoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get('slug');
  const [checking, setChecking] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!slug) return;

    // Función para revisar si el perfil ya existe
    const checkProfile = async () => {
      try {
        const res = await fetch(`/${slug}`, { method: 'HEAD' });
        if (res.ok) {
          setReady(true);
          setChecking(false);
        } else {
          // Reintentar en 2 segundos
          setTimeout(checkProfile, 2000);
        }
      } catch (e) {
        setTimeout(checkProfile, 2000);
      }
    };

    checkProfile();
  }, [slug]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-md space-y-8 bg-white p-12 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100">
        
        <div className="flex flex-col items-center space-y-6">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-green-100">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">¡Pago Confirmado!</h1>
            <p className="text-slate-500 font-medium">Tu presencia digital acaba de subir de nivel.</p>
          </div>
        </div>

        <div className="p-6 bg-slate-50 rounded-3xl space-y-3">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tu nueva dirección es:</p>
          <div className="text-blue-600 font-black text-lg break-all">
            bios.creatuimagen.online/{slug}
          </div>
        </div>

        <div className="space-y-4">
          {ready ? (
            <button
              onClick={() => router.push(`/admin/perfiles/${slug}`)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl text-lg shadow-xl shadow-blue-200 transition-all transform hover:-translate-y-1 active:translate-y-0"
            >
              Configurar mi Bio ahora
            </button>
          ) : (
            <div className="flex flex-col items-center space-y-4 py-2">
              <div className="flex items-center space-x-3 text-blue-600 font-bold">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Preparando tu panel de acceso...</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium italic">
                Estamos creando tu perfil en este momento. Solo toma unos segundos.
              </p>
            </div>
          )}
          
          <p className="text-[11px] text-slate-400">
            También te enviamos un email con tu link de acceso directo.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ExitoPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ExitoContent />
    </Suspense>
  );
}
