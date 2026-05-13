import { createClient } from '@supabase/supabase-js'

export const getSupabaseAdmin = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  // Si estamos en build time y no hay llaves, no rompas el proceso
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('⚠️ Supabase Admin: Llaves no detectadas (Ignorar si es Build Time)');
      return null as any; 
    }
    throw new Error('Supabase Admin: Faltan llaves de configuración.');
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey)
}
