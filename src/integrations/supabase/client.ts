
import { createClient } from '@supabase/supabase-js'

// These environment variables should be automatically provided by the Lovable-Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

// For development, we'll provide fallback values to prevent the error
// In production, these should be properly configured through the Supabase integration
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project') || supabaseAnonKey.includes('your-anon-key')) {
  console.warn('Supabase environment variables not configured. Some features may not work properly.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
