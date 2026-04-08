"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function MyDashboard() {
  const [coins, setCoins] = useState(110); // 기본 가입 축하금 포함
  const [steps, setSteps] = useState(0);
  const [stickers, setStickers] = useState<string[]>([]);
  const [inventory, setInventory] = useState<string[]>(["🏃", "🔥"]);

  // 걷기 달성 시 코인 지급 로직
  const handleWalk = () => {
    const newSteps = steps + 2000;
    setSteps(newSteps);
    if (newSteps >= 10000) {
      setCoins(prev => prev + 100);
      alert("축하합니다! 1만 걸음 달성 100토큰 지급! 🎉");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        
        {/* 상단 코인 및 프로필 상단바 */}
        <div className="flex flex-col md:flex-row gap-6 mb-10 items-stretch">
          <div className="flex-1 bg-white p-8 rounded-[32px] shadow-sm border-b-4 border-indigo-600">
            <h1 className="text-2xl font-black text-slate-900">홍길동 님의 대시보드</h1>
            <p className="text-slate-400 text-sm mt-1">꿈을 향해 한 걸음 더!</p>
          </div>
          <div className="bg-amber-400 p-8 rounded-[32px] shadow-lg flex flex-col justify-center items-center text-white min-w-[200px]">
            <span className="text-sm font-bold opacity-90">보유 토큰</span>
            <span className="text-3xl font-black">{coins.toLocaleString()} 🪙</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 만걸음 걷기 체크 카드 */}
          <div className="lg:col-span-1 bg-white p-8 rounded-[32px] shadow-sm">
            <h3 className="text-xl font-bold mb-4">👟 오늘의 발자취</h3>
            <div className="relative h-4 bg-slate-100 rounded-full mb-4 overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-500"
                style={{ width: `${(steps / 10000) * 100}%` }}
              ></div>
            </div>
            <p className="text-center font-bold text-slate-700 mb-6">{steps} / 10,000 걸음</p>
            <button 
              onClick={handleWalk}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800"
            >
              걸음 수 업데이트 (시뮬레이션)
            </button>
          </div>

          {/* 마이페이지 꾸미기 공간 (스티커 부착) */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[32px] shadow-sm relative min-h-[300px] border-2 border-dashed border-slate-200">
            <h3 className="text-xl font-bold mb-6">🖼️ 마이룸 꾸미기</h3>
            <div className="flex flex-wrap gap-4">
              {stickers.map((s, i) => (
                <span key={i} className="text-5xl animate-bounce">{s}</span>
              ))}
            </div>
            <div className="absolute bottom-6 right-6 flex gap-2">
              <Link href="/shop" className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-md">스티커 샵 가기 🛒</Link>
            </div>
          </div>
        </div>

        {/* 기존 지원 현황 등 하단 영역... */}
      </div>
    </div>
  );
}