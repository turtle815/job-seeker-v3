"use client";

import { useState } from "react";
import Link from "next/link"; // 속도 향상을 위해 Link 사용

export default function MyDashboard() {
  const [coins, setCoins] = useState(115); // 로그인 토큰 등 반영
  const [steps, setSteps] = useState(6000);

  // 1. 기존의 시각적 지표 데이터
  const stats = [
    { label: "지원 완료", count: 12, color: "text-blue-600" },
    { label: "상담 진행", count: 3, color: "text-purple-600" },
    { label: "스크랩", count: 25, color: "text-emerald-600" },
  ];

  // 2. 상태별 태그 데이터
  const applyStatus = [
    { company: "(주)테크이노베이션", position: "프론트엔드", date: "04-05", status: "서류검토중" },
    { company: "글로벌 솔루션", position: "기획자", date: "04-02", status: "면접예정" },
    { company: "미래가치연구소", position: "분석가", date: "03-30", status: "불합격" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* 상단: 프로필 & 코인 (핵심 지표) */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="flex-1 bg-white p-8 rounded-[32px] shadow-sm">
            <h1 className="text-2xl font-black text-slate-900">홍길동 님의 커리어 보드 🚀</h1>
            <p className="text-slate-400 text-sm">성공적인 취업을 응원합니다!</p>
          </div>
          <div className="bg-amber-400 px-10 py-8 rounded-[32px] shadow-lg text-white flex flex-col justify-center items-center">
            <span className="text-sm font-bold opacity-90">보유 토큰</span>
            <span className="text-3xl font-black">{coins.toLocaleString()} 🪙</span>
          </div>
        </div>

        {/* 3구 성취감 지표 카드 (복구) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[32px] shadow-sm text-center border-b-4 border-slate-100">
              <p className="text-slate-500 font-bold mb-2">{stat.label}</p>
              <p className={`text-4xl font-black ${stat.color}`}>{stat.count}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 왼쪽: 지원 현황 (상태별 태그 복구) */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[32px] shadow-sm">
            <h3 className="text-xl font-bold mb-6">최근 지원 현황</h3>
            <div className="space-y-4">
              {applyStatus.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                  <div>
                    <p className="font-bold text-slate-800">{item.company}</p>
                    <p className="text-xs text-slate-400">{item.position} | {item.date}</p>
                  </div>
                  <span className={`text-xs font-black px-4 py-1.5 rounded-full ${
                    item.status === '면접예정' ? 'bg-blue-100 text-blue-600' : 
                    item.status === '불합격' ? 'bg-red-100 text-red-600' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 오른쪽: 걸음수 & 유료상담 (기능 통합) */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[32px] shadow-sm border-2 border-indigo-50">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">👟 만걸음 챌린지</h3>
              <div className="h-3 bg-slate-100 rounded-full mb-3 overflow-hidden">
                <div className="h-full bg-indigo-500 transition-all" style={{ width: '60%' }}></div>
              </div>
              <p className="text-sm font-bold text-slate-600 text-center mb-4">{steps.toLocaleString()} / 10,000</p>
              <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-bold">걸음 수 인증</button>
            </div>

            <div className="bg-indigo-900 p-8 rounded-[32px] text-white shadow-xl">
              <h3 className="text-xl font-bold mb-2">전문가 유료 상담</h3>
              <p className="text-indigo-200 text-xs mb-6 leading-relaxed">심층 진로 상담 및 자소서 첨삭이 가능합니다.</p>
              <button className="w-full bg-white text-indigo-900 py-4 rounded-2xl font-black hover:bg-indigo-50 transition-colors">상담 예약하기</button>
            </div>

            <Link href="/shop" className="block text-center p-4 bg-amber-50 text-amber-700 rounded-2xl font-bold border border-amber-200 hover:bg-amber-100">
              🛒 스티커 샵에서 마이룸 꾸미기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}