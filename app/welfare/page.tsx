"use client";

import { useState, useEffect } from "react";

export default function WelfarePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // API 호출 함수
  const fetchWelfare = async () => {
    setLoading(true);
    try {
      // ⚠️ 실제 서비스 시에는 발급받은 API 키를 넣어주세요.
      const API_KEY = "658c9126b3bd1928f34a30c57f01b092ce53b2091fce9c0d19e505a6d3bdaac9"; 
      const response = await fetch(
        `http://apis.data.go.kr/B554287/NationalWelfareInformations/getNationalWelfarelist?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&dataType=JSON`
      );
      const result = await response.json();
      setData(result.servList || []);
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWelfare();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-black mb-4">🏛️ 실시간 복지 혜택</h1>
      
      <div className="flex gap-2 mb-8">
        <input 
          type="text" 
          placeholder="지역이나 혜택 검색 (예: 서울, 월세)" 
          className="flex-1 p-4 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={fetchWelfare} className="bg-blue-600 text-white px-8 rounded-xl font-bold">검색</button>
      </div>

      {loading ? (
        <div className="text-center py-20 font-bold text-gray-400">데이터를 불러오고 있습니다...</div>
      ) : (
        <div className="grid gap-4">
          {data.length > 0 ? data.map((item: any) => (
            <div key={item.servId} className="p-6 border rounded-2xl bg-white shadow-sm border-gray-50">
              <h3 className="text-xl font-bold mb-2 text-blue-600">{item.servNm}</h3>
              <p className="text-gray-600 mb-4">{item.servDgst}</p>
              <div className="flex justify-between items-center text-sm text-gray-400 font-medium">
                <span>담당기관: {item.jurMnofNm}</span>
                <button className="text-blue-500 border-b border-blue-500">상세내용 보기</button>
              </div>
            </div>
          )) : (
            <div className="text-center py-20 text-gray-400">검색 결과가 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}