"use client";

import { useState } from "react";

export default function JobPage() {
  const [keyword, setKeyword] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!keyword) return alert("검색어를 입력하세요!");
    setLoading(true);
    try {
      // ⚠️ 커리어넷에서 받은 본인의 키를 아래 따옴표 안에 넣으세요
      const API_KEY = "본인의_커리어넷_키_입력"; 
      
      const response = await fetch(
        `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${API_KEY}&svcType=api&svcCode=JOB&contentType=json&gubun=job_dic_list&searchJobNm=${keyword}`
      );
      const result = await response.json();
      setJobs(result.dataSearch?.content || []);
    } catch (error) {
      console.error("실패:", error);
      alert("데이터를 가져오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-black mb-8 text-indigo-900">💼 직업 백과사전</h1>
      
      <div className="flex gap-3 mb-12">
        <input 
          type="text" 
          placeholder="어떤 직업이 궁금하신가요?" 
          className="flex-1 p-4 border-2 border-indigo-100 rounded-2xl focus:border-indigo-500 outline-none shadow-sm"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button 
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-8 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg"
        >
          검색
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-indigo-500 font-bold animate-pulse">데이터 로딩 중...</div>
      ) : (
        <div className="grid gap-6">
          {jobs.length > 0 ? jobs.map((job: any) => (
            <div key={job.job_dic_list_no} className="p-6 border-2 border-gray-50 rounded-3xl bg-white shadow-sm hover:border-indigo-200 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{job.job_nm}</h3>
                <span className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-bold">#{job.job_cl}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{job.summary}</p>
            </div>
          )) : (
            <div className="text-center py-20 text-gray-400 border-2 border-dashed rounded-3xl">
              검색 결과가 여기에 표시됩니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}