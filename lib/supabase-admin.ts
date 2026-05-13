import { createClient } from '@supabase/supabase-js'

export const getSupabaseAdmin = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  // Si falta configuración, avisamos pero no rompemos el servidor
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.warn('⚠️ Supabase Admin: Faltan llaves de configuración en .env.local');
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey)
}
