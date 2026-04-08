"use client";

import { useState } from "react";

export default function MajorPage() {
  const [keyword, setKeyword] = useState("");
  const [majors, setMajors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMajors = async () => {
    if (!keyword) return alert("학과명을 입력하세요! (예: 경영, 컴퓨터)");
    setLoading(true);
    try {
      // ⚠️ 나중에 발급될 커리어넷 키를 여기에 넣으세요!
      const API_KEY = "발급받은_인증키_입력";
      
      const response = await fetch(
        `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${API_KEY}&svcType=api&svcCode=MAJOR&contentType=json&gubun=univ_list&searchTitle=${keyword}`
      );
      const result = await response.json();
      setMajors(result.dataSearch?.content || []);
    } catch (error) {
      console.error("학과 정보 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-black mb-8 text-emerald-900">🎓 대학 학과 가이드</h1>
      
      <div className="flex gap-3 mb-12">
        <input 
          type="text" 
          placeholder="관심 있는 학과를 입력하세요" 
          className="flex-1 p-4 border-2 border-emerald-100 rounded-2xl focus:border-emerald-500 outline-none"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={fetchMajors} className="bg-emerald-600 text-white px-8 rounded-2xl font-bold hover:bg-emerald-700 shadow-lg">
          학과 찾기
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-emerald-600 font-bold">전국 대학교 데이터를 분석 중...</div>
      ) : (
        <div className="grid gap-6">
          {majors.length > 0 ? majors.map((major: any, idx: number) => (
            <div key={idx} className="p-6 border-2 border-gray-50 rounded-3xl bg-white shadow-sm hover:border-emerald-200 transition-all">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">{major.facilName}</h3>
                <span className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full font-bold">#{major.lClass}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">대계열: {major.lClass} / 중계열: {major.mClass}</p>
              <button className="text-emerald-500 text-sm font-bold border-b border-emerald-500">상세 커리큘럼 보기</button>
            </div>
          )) : (
            <div className="text-center py-20 text-gray-400 border-2 border-dashed rounded-3xl">
              궁금한 학과를 검색해 보세요! (예: 간호, 기계, 디자인)
            </div>
          )}
        </div>
      )}
    </div>
  );
}