// lib/supabase.ts (이걸로 통째로 바꾸세요)
import { createClient } from '@supabase/supabase-js'

// 하나로 합쳐진 주소와 키 설정
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 다른 파일들이 찾는 이름들
export const hasSupabaseEnv = () => true;