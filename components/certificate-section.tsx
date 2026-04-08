"use client";

import { useState } from "react";
import { CertificateItem } from "@/lib/certificates/types";

type CertificateSectionProps = {
  certificates: CertificateItem[];
};

export function CertificateSection({ certificates }: CertificateSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const usesCache = certificates.some((cert) => cert.source === "cache");
  const usesFallback = certificates.some((cert) => cert.source === "fallback");

  function handleCardClick(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <>
      {usesCache ? (
        <div className="mb-4 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">
          API 응답이 지연되어 최근 저장된 데이터를 표시하고 있습니다.
        </div>
      ) : null}

      {usesFallback ? (
        <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          API 응답이 지연되어 샘플 데이터를 표시하고 있습니다.
        </div>
      ) : null}

      <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => {
          const isOpen = openId === cert.id;

          return (
            <article
              key={cert.id}
              className="h-fit self-start rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => handleCardClick(cert.id)}
                aria-expanded={isOpen}
                className="flex w-full flex-col gap-1 text-left"
              >
                <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {cert.jobType}
                </span>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-900">{cert.name}</h3>
                <p className="text-sm text-slate-600">{cert.agency}</p>
                <p className="text-sm leading-snug text-slate-500">시험 일정: {cert.examSchedule}</p>
                <p className="mt-2 text-xs font-semibold text-indigo-700">{isOpen ? "상세 정보 접기" : "상세 정보 보기"}</p>
              </button>

              {isOpen ? (
                <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
                  <dl className="space-y-2.5">
                    <div className="grid grid-cols-[84px_1fr] items-start gap-2">
                      <dt className="font-semibold text-slate-900">자격증명</dt>
                      <dd className="leading-snug">{cert.name || "정보 없음"}</dd>
                    </div>
                    <div className="grid grid-cols-[84px_1fr] items-start gap-2">
                      <dt className="font-semibold text-slate-900">직종</dt>
                      <dd className="leading-snug">{cert.jobType || "정보 없음"}</dd>
                    </div>
                    <div className="grid grid-cols-[84px_1fr] items-start gap-2">
                      <dt className="font-semibold text-slate-900">시험 일정</dt>
                      <dd className="leading-snug">{cert.examSchedule || "정보 없음"}</dd>
                    </div>
                    <div className="grid grid-cols-[84px_1fr] items-start gap-2">
                      <dt className="font-semibold text-slate-900">접수 기간</dt>
                      <dd className="leading-snug">{cert.applicationPeriod || "정보 없음"}</dd>
                    </div>
                    <div className="pt-1">
                      <dt className="font-semibold text-slate-900">상세 설명</dt>
                      <dd className="mt-1 leading-relaxed">{cert.description || "상세 정보가 제공되지 않았습니다."}</dd>
                    </div>
                  </dl>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </>
  );
}
