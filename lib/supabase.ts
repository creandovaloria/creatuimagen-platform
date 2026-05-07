import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _supabase: SupabaseClient | null = null

function getSupabase() {
  if (_supabase) return _supabase
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Missing Supabase env vars')
  _supabase = createClient(url, key)
  return _supabase
}

export interface RSVPData {
  id?: string
  evento_slug: string
  nombre: string
  telefono: string
  asiste: boolean
  num_personas: number
  restricciones?: string | null
  mensaje_regina?: string | null
  created_at?: string
  updated_at?: string
}

export async function checkExistingRSVP(eventoSlug: string, telefono: string) {
  const sb = getSupabase()
  const { data, error } = await sb
    .from('rsvp')
    .select('*')
    .eq('evento_slug', eventoSlug)
    .eq('telefono', telefono)
    .maybeSingle()
  return { data, error }
}

export async function insertRSVP(rsvp: RSVPData) {
  const sb = getSupabase()
  const { data, error } = await sb.from('rsvp').insert(rsvp).select().single()
  return { data, error }
}

export async function updateRSVP(eventoSlug: string, telefono: string, rsvp: Partial<RSVPData>) {
  const sb = getSupabase()
  const { data, error } = await sb
    .from('rsvp')
    .update({ ...rsvp, updated_at: new Date().toISOString() })
    .eq('evento_slug', eventoSlug)
    .eq('telefono', telefono)
    .select()
    .single()
  return { data, error }
}

export async function getRSVPList(eventoSlug: string) {
  const sb = getSupabase()
  const { data, error } = await sb
    .from('rsvp')
    .select('*')
    .eq('evento_slug', eventoSlug)
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function getDashboardStats(eventoSlug: string) {
  const sb = getSupabase()
  const { data, error } = await sb
    .from('dashboard_rsvp')
    .select('*')
    .eq('evento_slug', eventoSlug)
    .maybeSingle()
  return { data, error }
}
