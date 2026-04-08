"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// 브라우저의 결제 객체(IMP)를 인식시키기 위한 설정
declare global {
  interface Window {
    IMP: any;
  }
}

export default function AptitudeTest() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const router = useRouter();

  const handlePayment = () => {
    // 1. 브라우저에 결제 엔진이 로드되었는지 확인
    if (typeof window !== "undefined" && window.IMP) {
      const { IMP } = window;
      IMP.init("imp12086326"); // 포트원 테스트 가맹점 코드

      // 2. 결제 요청
      IMP.request_pay({
        pg: "kakaopay", // 카카오페이 테스트 모드
        pay_method: "card",
        merchant_uid: `mid_${new Date().getTime()}`,
        name: "상세 유료 적성검사 (프리미엄)",
        amount: 9900,
        buyer_email: "test@example.com",
        buyer_name: "사용자",
      }, (rsp: any) => {
        if (rsp.success) {
          alert("결제 완료! 상세 검사 페이지로 이동합니다.");
          // 결제 성공 시 이동할 페이지 (예: /test/result-premium)
        } else {
          alert(`결제 실패: ${rsp.error_msg}`);
        }
      });
    } else {
      alert("결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  const questions = [
    { q: "새로운 사람들과 대화하며 일하는 것이 즐겁나요?" },
    { q: "복잡한 수치나 데이터를 분석하는 것에 흥미를 느끼나요?" },
    { q: "창의적인 해결책을 찾는 게 좋나요?" },
  ];

  const handleAnswer = (value: number) => {
    setScore(score + value);
    if (step < 3) setStep(step + 1);
    else setStep(4);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      {step === 0 && (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">30초 직업 적성 검사 🔍</h1>
          <button onClick={() => setStep(1)} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition">시작하기</button>
        </div>
      )}

      {step >= 1 && step <= 3 && (
        <div>
          <div className="mb-4 text-sm text-blue-600 font-bold tracking-widest">QUESTION 0{step}</div>
          <h2 className="text-xl font-bold mb-8 leading-tight">{questions[step - 1].q}</h2>
          <div className="space-y-3">
            <button onClick={() => handleAnswer(10)} className="w-full p-4 border rounded-xl hover:bg-blue-50 text-left font-semibold">매우 그렇다</button>
            <button onClick={() => handleAnswer(0)} className="w-full p-4 border rounded-xl hover:bg-blue-50 text-left font-semibold">아니다</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 italic text-blue-600 underline">검사 완료!</h2>
          <p className="mb-8 text-gray-700">당신은 <span className="font-bold">{score >= 20 ? "전략적 리더형" : "실무 전문가형"}</span>입니다.</p>
          
          <div className="space-y-4">
            <button onClick={handlePayment} className="w-full bg-yellow-400 text-black py-4 rounded-xl font-black shadow-lg hover:bg-yellow-300 transition-transform active:scale-95">
              💛 카카오페이로 상세검사 결제 (9,900원)
            </button>
            <button onClick={() => router.push('/consulting')} className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-200">
              전문 상담사 대화하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}