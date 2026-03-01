import { supabase } from './supabase'

// ── USERS ────────────────────────────────────────────────────
export async function saveUser({ name, phone, city, industry, age_range, language, interests }) {
  const { data, error } = await supabase
    .from('users')
    .insert([{ name, phone, city, industry, age_range, language, interests }])
    .select()
  if (error) console.error('saveUser error:', error)
  return data?.[0]
}

// ── MOODS ────────────────────────────────────────────────────
export async function saveMood(mood) {
  const { error } = await supabase
    .from('moods')
    .insert([{ mood }])
  if (error) console.error('saveMood error:', error)
}

export async function getMoodStats() {
  const { data, error } = await supabase
    .from('moods')
    .select('mood')
  if (error) return []
  // Count each mood
  const counts = {}
  data.forEach(({ mood }) => { counts[mood] = (counts[mood] || 0) + 1 })
  return counts
}

// ── VENTS ────────────────────────────────────────────────────
export async function getVents() {
  const { data, error } = await supabase
    .from('vents')
    .select('*')
    .eq('status', 'visible')
    .order('created_at', { ascending: false })
  if (error) console.error('getVents error:', error)
  return data || []
}

export async function postVent({ text, emoji = '😤' }) {
  const { data, error } = await supabase
    .from('vents')
    .insert([{ text, emoji }])
    .select()
  if (error) console.error('postVent error:', error)
  return data?.[0]
}

export async function likeVent(id, currentHearts) {
  const { error } = await supabase
    .from('vents')
    .update({ hearts: currentHearts + 1 })
    .eq('id', id)
  if (error) console.error('likeVent error:', error)
}

export async function updateVentStatus(id, status) {
  const { error } = await supabase
    .from('vents')
    .update({ status })
    .eq('id', id)
  if (error) console.error('updateVentStatus error:', error)
}

export async function deleteVent(id) {
  const { error } = await supabase
    .from('vents')
    .delete()
    .eq('id', id)
  if (error) console.error('deleteVent error:', error)
}

// ── EVENTS ───────────────────────────────────────────────────
export async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: true })
  if (error) console.error('getEvents error:', error)
  return data || []
}

export async function createEvent(event) {
  const { data, error } = await supabase
    .from('events')
    .insert([event])
    .select()
  if (error) console.error('createEvent error:', error)
  return data?.[0]
}

export async function updateEvent(id, updates) {
  const { error } = await supabase
    .from('events')
    .update(updates)
    .eq('id', id)
  if (error) console.error('updateEvent error:', error)
}

export async function deleteEvent(id) {
  const { error } = await supabase
    .from('events')
    .update({ is_active: false })
    .eq('id', id)
  if (error) console.error('deleteEvent error:', error)
}

// ── RSVPs ────────────────────────────────────────────────────
export async function saveRSVP({ event_id, user_name, user_phone }) {
  const { error } = await supabase
    .from('rsvps')
    .insert([{ event_id, user_name, user_phone }])
  if (error) console.error('saveRSVP error:', error)
}

export async function getRSVPCount(event_id) {
  const { count, error } = await supabase
    .from('rsvps')
    .select('*', { count: 'exact', head: true })
    .eq('event_id', event_id)
  if (error) return 0
  return count || 0
}

// ── BUDDY CONVERSATIONS ──────────────────────────────────────
export async function saveBuddyMessage({ session_id, role, content, persona, language }) {
  const { error } = await supabase
    .from('buddy_conversations')
    .insert([{ session_id, role, content, persona, language }])
  if (error) console.error('saveBuddyMessage error:', error)
}

// ── USERS (admin) ────────────────────────────────────────────
export async function getUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) console.error('getUsers error:', error)
  return data || []
}

// ── APP SETTINGS ─────────────────────────────────────────────
export async function getSettings() {
  const { data, error } = await supabase
    .from('app_settings')
    .select('*')
  if (error) console.error('getSettings error:', error)
  // Convert array to object { key: value }
  const settings = {}
  data?.forEach(({ key, value }) => { settings[key] = value })
  return settings
}

export async function updateSetting(key, value) {
  const { error } = await supabase
    .from('app_settings')
    .update({ value, updated_at: new Date().toISOString() })
    .eq('key', key)
  if (error) console.error('updateSetting error:', error)
}

