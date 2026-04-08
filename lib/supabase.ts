
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// 열쇠(환경 변수)를 가져오되, 없으면 뒤에 있는 가짜 주소(|| '...')를 써라!
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// 이렇게 하면 빌드할 때 에러가 안 나고 통과됩니다.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)