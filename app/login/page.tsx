"use client";

import { useState } from "react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[32px] p-10 shadow-xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 mb-2">
            {isLogin ? "로그인" : "회원가입"}
          </h1>
          <p className="text-slate-400">전체 공개 서비스는 로그인 없이도 이용 가능합니다!</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          alert("로그인 성공! 마이페이지로 이동합니다.");
          window.location.href = "/mypage"; // 로그인 성공 시 마이페이지로 이동
        }}>
          {!isLogin && (
            <input placeholder="이름" className="w-full p-4 bg-slate-50 rounded-2xl outline-none" required />
          )}
          <input type="email" placeholder="이메일" className="w-full p-4 bg-slate-50 rounded-2xl outline-none" required />
          <input type="password" placeholder="비밀번호" className="w-full p-4 bg-slate-50 rounded-2xl outline-none" required />
          
          <button className="w-full bg-indigo-600 text-white p-4 rounded-2xl font-black text-lg mt-4 shadow-lg">
            {isLogin ? "로그인하기" : "가입 완료"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-600 font-bold">
            {isLogin ? "처음이신가요? 회원가입" : "이미 회원이신가요? 로그인"}
          </button>
        </div>
      </div>
    </div>
  );
}