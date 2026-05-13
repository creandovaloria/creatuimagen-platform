import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Este cliente tiene permisos totales (BYPASS RLS)
// Solo se debe usar en el servidor (API Routes / Webhooks)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)
