// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

// Validate URL format
try {
  new URL(supabaseUrl)
} catch (error) {
  throw new Error(`Invalid NEXT_PUBLIC_SUPABASE_URL format: ${supabaseUrl}`)
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
