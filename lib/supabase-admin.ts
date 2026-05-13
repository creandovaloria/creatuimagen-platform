import { createClient } from '@supabase/supabase-js'

// Usamos una función para que Supabase no se inicialice en Build Time
export const getSupabaseAdmin = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Supabase Admin: Faltan llaves de configuración.')
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey)
}
