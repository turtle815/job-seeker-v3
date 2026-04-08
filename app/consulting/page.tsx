"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

const CONSULT_FIELDS = [
  "정보기술(IT)",
  "회계/세무",
  "사무/OA",
  "마케팅/영업",
  "서비스/교육",
  "기타"
];

export default function ConsultingPage() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [field, setField] = useState(CONSULT_FIELDS[0]);
  const [concern, setConcern] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completeMessage, setCompleteMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const trimmedConcern = concern.trim();
    if (!trimmedConcern) {
      window.alert("고민 내용을 입력해 주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      if (userError || !user) {
        window.alert("상담 신청은 로그인 후 이용할 수 있습니다.");
        router.push("/signup");
        return;
      }

      const { error } = await supabase.from("consultations").insert({
        user_id: user.id,
        category: field,
        content: trimmedConcern,
        status: "대기중"
      });

      if (error) {
        window.alert(error.message);
        return;
      }

      setConcern("");
      setCompleteMessage("전문 상담사 배정은 유료 서비스입니다. 곧 안내 연락을 드립니다.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "상담 신청 중 오류가 발생했습니다.";
      window.alert(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-14 md:px-10">
      <section className="rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 px-8 py-10 text-white shadow-lg">
        <h1 className="text-3xl font-bold">상담 신청</h1>
        <p className="mt-3 text-sm text-white/90 md:text-base">
          상담받고 싶은 자격증 분야와 고민 내용을 남겨주시면 상담 절차를 안내해드립니다.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        {completeMessage ? (
          <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {completeMessage}
          </div>
        ) : (
          <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            전문 상담사 배정은 유료 서비스입니다. 곧 안내 연락을 드립니다.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">상담 희망 자격증 분야</span>
            <select
              value={field}
              onChange={(event) => setField(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none ring-sky-400 transition focus:border-sky-500 focus:ring-2"
            >
              {CONSULT_FIELDS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">간단한 고민 내용</span>
            <textarea
              value={concern}
              onChange={(event) => setConcern(event.target.value)}
              rows={6}
              placeholder="예: 정보처리기사와 전산회계 중 어느 자격증부터 준비하면 좋을지 고민입니다."
              className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none ring-sky-400 transition focus:border-sky-500 focus:ring-2"
            />
          </label>

          <div className="flex flex-wrap items-center gap-3">
          <Link href="/consulting/success">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-gradient-to-r from-sky-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition enabled:hover:from-sky-700 enabled:hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "신청 중..." : "상담 신청"}
            </button></Link>
            <Link href="/mypage" className="text-sm font-medium text-indigo-700 hover:text-indigo-800">
              마이페이지에서 신청 현황 보기
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
