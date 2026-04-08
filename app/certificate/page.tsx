"use client";

import { useState } from "react";
import Link from "next/link"; // 속도 개선을 위한 Link 추가

export default function CertificatePage() {
  const [selectedCert, setSelectedCert] = useState<any>(null);

  // 샘플 데이터
  const certifications = [
    { id: 1, name: "정보처리기사", category: "IT/소프트웨어", jobs: "개발자, 시스템 엔지니어", exam: "필기/실기", tip: "IT 필수 자격증" },
    { id: 2, name: "직업상담사 2급", category: "상담/교육", jobs: "직업상담사", exam: "필기/실기", tip: "상담 전문가 자격증" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* --- 여기부터가 화면에 보이는 부분입니다 --- */}
        <h1 className="text-3xl font-black text-orange-600 mb-2">📜 자격증 가이드</h1>
        <p className="text-slate-500 mb-10">직무별 필수 및 우대 자격증 정보를 확인하세요.</p>

        {/* 🔍 검색 필터 영역 (이미지에서 넣으셨던 코드 위치) */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input 
            type="text" 
            placeholder="찾으시는 직무나 자격증을 입력하세요" 
            className="flex-1 p-4 bg-white rounded-2xl shadow-sm outline-none border-2 border-transparent focus:border-orange-500 text-slate-800"
          />
          <select className="p-4 bg-white rounded-2xl shadow-sm outline-none border-2 border-transparent focus:border-orange-500 text-slate-500">
            <option>전체 카테고리</option>
            <option>IT/소프트웨어</option>
            <option>경영/회계</option>
            <option>상담/교육</option>
          </select>
          <button className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-orange-100">
            검색
          </button>
        </div>

        {/* 카드 그리드 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert) => (
            <div 
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="bg-white p-6 rounded-[24px] shadow-sm border-2 border-transparent hover:border-orange-500 cursor-pointer transition-all"
            >
              <span className="text-xs font-bold bg-orange-50 text-orange-600 px-3 py-1 rounded-full mb-3 inline-block">
                {cert.category}
              </span>
              <h2 className="text-xl font-bold text-slate-800 mb-2">{cert.name}</h2>
              <p className="text-slate-400 text-sm">상세 정보 보기</p>
            </div>
          ))}
        </div>
        {/* --- 여기까지 --- */}

      </div>
    </div>
  );
}