import { getSupabase, getSupabaseAdmin } from './supabase';

// ─── Properties ───────────────────────────────────────────────────────────────

export async function getProperties(featuredOnly = false) {
  let query = getSupabase().from('properties').select('*').order('created_at', { ascending: false });
  if (featuredOnly) query = query.eq('featured', true);
  const { data, error } = await query;
  if (error) { console.error(error); return []; }
  return data || [];
}

export async function getProperty(id: string) {
  const { data } = await getSupabase().from('properties').select('*').eq('id', id).single();
  return data;
}

export async function createProperty(property: Record<string, unknown>) {
  const { data, error } = await getSupabaseAdmin().from('properties').insert(property).select().single();
  if (error) throw error;
  return data;
}

export async function updateProperty(id: string, updates: Record<string, unknown>) {
  const { data, error } = await getSupabaseAdmin()
    .from('properties')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProperty(id: string) {
  const { error } = await getSupabaseAdmin().from('properties').delete().eq('id', id);
  if (error) throw error;
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getTestimonials(visibleOnly = true) {
  let query = getSupabase().from('testimonials').select('*').order('created_at', { ascending: false });
  if (visibleOnly) query = query.eq('visible', true);
  const { data, error } = await query;
  if (error) { console.error(error); return []; }
  return data || [];
}

export async function createTestimonial(testimonial: Record<string, unknown>) {
  const { data, error } = await getSupabaseAdmin().from('testimonials').insert(testimonial).select().single();
  if (error) throw error;
  return data;
}

export async function updateTestimonial(id: string, updates: Record<string, unknown>) {
  const { data, error } = await getSupabaseAdmin().from('testimonials').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteTestimonial(id: string) {
  const { error } = await getSupabaseAdmin().from('testimonials').delete().eq('id', id);
  if (error) throw error;
}

// ─── Site Settings ────────────────────────────────────────────────────────────

export async function getSetting(key: string) {
  const { data } = await getSupabase().from('site_settings').select('value').eq('key', key).single();
  return data?.value || null;
}

export async function getAllSettings(): Promise<Record<string, unknown>> {
  const { data } = await getSupabase().from('site_settings').select('*');
  const result: Record<string, unknown> = {};
  (data || []).forEach((row) => { result[row.key] = row.value; });
  return result;
}

export async function upsertSetting(key: string, value: Record<string, unknown>) {
  const { error } = await getSupabaseAdmin()
    .from('site_settings')
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
  if (error) throw error;
}

// ─── Sections ─────────────────────────────────────────────────────────────────

export async function getSections() {
  const { data } = await getSupabase().from('sections').select('*').order('order_index');
  return data || [];
}

export async function updateSection(name: string, updates: Record<string, unknown>) {
  const { error } = await getSupabaseAdmin().from('sections').update(updates).eq('name', name);
  if (error) throw error;
}
