"use client";

import "./globals.css";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <html lang="ko">
      <body className="relative">
        {/* 메인 콘텐츠 영역 */}
        {children}

        {/* --- 🤖 AI 챗봇 UI 영역 --- */}
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
          
          {/* 챗봇 대화창 */}
          {isChatOpen && (
            <div className="mb-4 w-80 h-[450px] bg-white rounded-[32px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-indigo-600 p-5 text-white flex justify-between items-center">
                <div>
                  <h3 className="font-bold">커리어 가이드 챗봇</h3>
                  <p className="text-[10px] opacity-80">무료 이용 문의 대응 중</p>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-xl">×</button>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-slate-700 max-w-[80%]">
                  안녕하세요! 무엇을 도와드릴까요? <br/>
                  <b>이용 문의</b>나 <b>유료 상담 안내</b>를 도와드려요.
                </div>
                <div className="bg-indigo-100 p-3 rounded-2xl rounded-tr-none shadow-sm text-sm text-indigo-900 ml-auto max-w-[80%]">
                  유료 상담 범위가 어떻게 되나요?
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-slate-700 max-w-[80%]">
                  심층 진로 상담 및 자기소개서 첨삭은 <b>유료 서비스</b>입니다. 상담사 연결을 도와드릴까요?
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-white">
                <input 
                  type="text" 
                  placeholder="메시지를 입력하세요..." 
                  className="w-full p-3 bg-slate-100 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {/* 챗봇 열기 버튼 */}
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="w-16 h-16 bg-indigo-600 rounded-full shadow-xl flex items-center justify-center text-white text-3xl hover:scale-110 transition-transform active:scale-95"
          >
            {isChatOpen ? "💬" : "🤖"}
          </button>
        </div>
        {/* --- 챗봇 영역 끝 --- */}

      </body>
    </html>
  );
}