// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Only validate in runtime, not during build
const isProduction = process.env.NODE_ENV === 'production'
const isBuild = process.env.NEXT_PHASE === 'phase-production-build'

if (!isBuild && isProduction && supabaseUrl === 'https://placeholder.supabase.co') {
  console.warn('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!isBuild && isProduction && supabaseAnonKey === 'placeholder-key') {
  console.warn('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types remain the same
export interface Observation {
  id: string
  user_id: string
  species_name: string
  photo_url: string | null
  latitude: number
  longitude: number
  notes: string | null
  created_at: string
}

export interface UserProfile {
  id: string
  email: string
  display_name: string | null
  avatar_url: string | null
  score: number
  created_at: string
}
