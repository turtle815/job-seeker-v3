import { createClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseAnonKey, hasSupabaseEnv } from "@/lib/supabase";

export async function createServerSupabaseClient() {
  // 함수 호출 형태로 체크합니다.
  if (!hasSupabaseEnv()) {
    console.error("수파베이스 환경변수가 설정되지 않았습니다.");
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}