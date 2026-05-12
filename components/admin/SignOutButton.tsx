"use client"

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <button 
      onClick={handleSignOut}
      className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 transition-colors"
    >
      🚪 Cerrar Sesión
    </button>
  )
}
