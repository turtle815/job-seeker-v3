import { createClient } from '@supabase/supabase-js'

// 빌드 에러를 방지하기 위해 '기본값'을 설정해줍니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// 이제 키가 없어도 빌드(포장) 단계에서 멈추지 않습니다.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
