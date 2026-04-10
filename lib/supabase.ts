import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 다른 파일에서 체크용으로 쓰는 함수입니다.
export const hasSupabaseEnv = () => {
  return !!(supabaseUrl && supabaseAnonKey);
};