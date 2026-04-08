"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

function toQuery(message: string) {
  return encodeURIComponent(message);
}

export async function signupAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !phone || !password) {
    redirect(`/signup?error=${toQuery("모든 항목을 입력해 주세요.")}`);
  }

  if (password.length < 8) {
    redirect(`/signup?error=${toQuery("비밀번호는 8자 이상이어야 합니다.")}`);
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone
        }
      }
    });

    if (error) {
      redirect(`/signup?error=${toQuery(error.message)}`);
    }

    if (!data.user) {
      redirect(`/signup?error=${toQuery("가입 처리 중 사용자 정보를 확인할 수 없습니다.")}`);
    }
  } catch (_error) {
    redirect(`/signup?error=${toQuery("회원가입 처리 중 오류가 발생했습니다. Supabase 설정과 DB 트리거를 확인해 주세요.")}`);
  }

  redirect(`/signup?success=${toQuery("회원가입 요청이 완료되었습니다. 이메일 인증을 확인해 주세요.")}`);
}
