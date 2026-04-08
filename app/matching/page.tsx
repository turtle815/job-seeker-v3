"use client";

import { useState } from "react";
import Link from "next/link";

export default function MatchingPage() {
  const [isMatching, setIsMatching] = useState(false);

  // 샘플 공고 데이터
  const jobs = [
    { id: 1, company: "(주)혁신기술", title: "프론트엔드 개발자 채용", reward: "역량 매칭률 95%", tags: ["React", "신입/경력"] },
    { id: 2, company: "에듀플러스", title: "직업 상담사 및 교육 기획", reward: "역량 매칭률 88%", tags: ["상담사자격증", "정규직"] },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-purple-600 mb-2">🤝 기업/채용 매칭</h1>
          <p className="text-slate-500">내 역량과 딱 맞는 기업을 AI가 추천해 드립니다.</p>
        </header>

        {/* 조건 검색 바 */}
        <div className="bg-white p-6 rounded-[32px] shadow-sm mb-10 flex flex-col md:flex-row gap-4">
          <input type="text" placeholder="직무, 기술스택, 지역 검색" className="flex-1 p-4 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-purple-500" />
          <button 
            onClick={() => {
              setIsMatching(true);
              setTimeout(() => setIsMatching(false), 1500); // 매칭 애니메이션 시뮬레이션
            }}
            className="bg-purple-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-purple-700 transition-all"
          >
            맞춤 기업 찾기
          </button>
        </div>

        {/* 공고 리스트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map(job => (
            <div key={job.id} className="bg-white p-8 rounded-[32px] shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">{job.reward}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">{job.title}</h2>
              <p className="text-slate-500 text-sm mb-6">{job.company}</p>
              <div className="flex gap-2">
                {job.tags.map(tag => (
                  <span key={tag} className="text-[10px] bg-slate-100 px-2 py-1 rounded-md text-slate-500">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}