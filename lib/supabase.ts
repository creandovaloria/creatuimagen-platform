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

export interface EventoData {
  slug: string
  festejado: string
  fecha: string
  hora: string
  lugar?: string
  planner_nombre?: string
  planner_email?: string
  planner_phone?: string
}

export interface RSVPData {
  id?: string
  evento_slug: string
  nombre: string
  telefono: string
  email?: string | null
  asiste: boolean
  num_personas: number
  restricciones?: string | null
  mensaje_regina?: string | null
}

// Obtener evento con datos del planner
export async function getEvento(slug: string) {
  const sb = getSupabase()
  const { data, error } = await sb
    .from('eventos')
    .select('*')
    .eq('slug', slug)
    .single()
  return { data: data as EventoData | null, error }
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

// -- Funciones para Perfiles (Linktrees) --

export interface PerfilData {
  id: string
  slug: string
  nombre: string
  email: string | null
  rol: string
  bio: string | null
  foto_url: string | null
  theme_primary: string
  theme_accent: string
  activo: boolean
  instagram: string | null
  linkedin: string | null
  tiktok: string | null
  facebook: string | null
  youtube: string | null
  whatsapp: string | null
  usa_colores_tema: boolean
  custom_domain: string | null
  user_id: string | null
}

export interface PerfilLinkData {
  id: string
  titulo: string
  url: string
  icono: string | null
  orden: number
}

export interface ContactoVCFData {
  id: string
  perfil_id?: string
  nombre_legal: string | null
  telefono: string | null
  email: string | null
  website: string | null
  company: string | null
}

export async function getPerfilCompleto(slug: string) {
  const sb = getSupabase()
  
  // 1. Obtener datos principales del perfil
  const { data: perfil, error: perfilError } = await sb
    .from('perfiles')
    .select('*')
    .eq('slug', slug)
    .eq('activo', true)
    .single()

  if (perfilError || !perfil) {
    return { data: null, error: perfilError }
  }

  // 2. Obtener links
  const { data: links, error: linksError } = await sb
    .from('perfil_links')
    .select('*')
    .eq('perfil_id', perfil.id)
    .order('orden', { ascending: true })

  // 3. Obtener datos de contacto VCF (opcional)
  const { data: vcf } = await sb
    .from('contactos_vcf')
    .select('*')
    .eq('perfil_id', perfil.id)
    .maybeSingle()

  return {
    data: {
      ...perfil,
      links: links || [],
      vcf: vcf || null
    },
    error: null
  }
}

export async function getPerfilByDomain(domain: string) {
  const sb = getSupabase()
  const { data, error } = await sb
    .from('perfiles')
    .select('slug')
    .eq('custom_domain', domain)
    .eq('activo', true)
    .maybeSingle()
  
  return { data, error }
}

// -- Funciones para Administración de Perfiles --

export async function getAllPerfiles() {
  const sb = getSupabase()
  const { data, error } = await sb
    .from('perfiles')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function updatePerfil(slug: string, updates: Partial<PerfilData>) {
  const sb = getSupabase()
  const { data, error } = await sb
    .from('perfiles')
    .update(updates)
    .eq('slug', slug)
    .select()
    .single()
  return { data, error }
}

export async function insertPerfilLink(linkData: Omit<PerfilLinkData, 'id'> & { perfil_id: string }) {
  const sb = getSupabase()
  const { data, error } = await sb
    .from('perfil_links')
    .insert([linkData])
    .select()
    .single()
  return { data, error }
}

export async function updatePerfilLink(id: string, updates: Partial<PerfilLinkData>) {
  const sb = getSupabase()
  const { data, error } = await sb
    .from('perfil_links')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

export async function deletePerfilLink(id: string) {
  const sb = getSupabase()
  const { error } = await sb
    .from('perfil_links')
    .delete()
    .eq('id', id)
  return { error }
}

export async function updatePerfilConVCF(
  slug: string, 
  perfilId: string,
  perfilUpdates: Partial<PerfilData>, 
  vcfUpdates: Partial<ContactoVCFData>
) {
  const sb = getSupabase()
  
  // 1. Update Perfil
  const { error: perfilError } = await sb
    .from('perfiles')
    .update(perfilUpdates)
    .eq('slug', slug)
    
  if (perfilError) return { error: perfilError }

  // 2. Upsert VCF (Insert or Update if exists by perfil_id)
  const { error: vcfError } = await sb
    .from('contactos_vcf')
    .upsert({ 
      perfil_id: perfilId,
      ...vcfUpdates 
    }, { onConflict: 'perfil_id' })

  return { error: vcfError }
}
