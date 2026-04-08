 "use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function SignupPage() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!fullName || !email || !phone || !password) {
      window.alert("모든 항목을 입력해 주세요.");
      return;
    }

    if (password.length < 8) {
      window.alert("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1) Supabase Auth 계정 생성
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) {
        window.alert(error.message);
        return;
      }

      if (!data.user) {
        window.alert("가입 처리 중 사용자 정보를 확인할 수 없습니다.");
        return;
      }

      // 2) profiles 테이블에 사용자 기본 정보 저장
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: fullName,
        phone
      });

      if (profileError) {
        window.alert(profileError.message);
        return;
      }

      // 3) 성공 알림 후 메인 페이지 이동
      window.alert("회원가입 성공!");
      router.push("/");
    } catch (unknownError) {
      // 4) 예외 발생 시 알림창으로 에러 표시
      const message = unknownError instanceof Error ? unknownError.message : "회원가입 중 알 수 없는 오류가 발생했습니다.";
      window.alert(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-md rounded-2xl border border-sky-100 bg-white p-8 shadow-xl shadow-sky-100/70">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">Join Job Seeker Platform</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">회원가입</h1>
          <p className="mt-2 text-sm text-slate-600">기본 정보를 입력하고 맞춤형 구직 서비스를 시작하세요.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">이름</span>
            <input
              name="name"
              type="text"
              required
              placeholder="홍길동"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-400 transition focus:border-sky-500 focus:ring-2"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">이메일</span>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-400 transition focus:border-sky-500 focus:ring-2"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">연락처</span>
            <input
              name="phone"
              type="tel"
              required
              placeholder="010-1234-5678"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-400 transition focus:border-sky-500 focus:ring-2"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">비밀번호 설정</span>
            <input
              name="password"
              type="password"
              required
              minLength={8}
              placeholder="8자 이상 입력"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-400 transition focus:border-sky-500 focus:ring-2"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-sky-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:from-sky-700 hover:to-indigo-700"
          >
            {isSubmitting ? "가입 처리 중..." : "가입하기"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          <Link href="/" className="font-medium text-indigo-700 hover:text-indigo-800">
            메인으로 돌아가기
          </Link>
        </div>
      </section>
    </main>
  );
}
