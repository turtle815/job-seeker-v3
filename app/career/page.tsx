import React from 'react';

// 1. 커리어넷 API 데이터 가져오기 (서버 컴포넌트)
async function getCareerData(query: string) {
  const apiKey = process.env.CAREERNET_API_KEY; // Vercel에 키 추가 필수!
  const baseUrl = "https://www.career.go.kr/cnet/openapi/getOpenApi";
  
  // 필수 파라미터들: gubun=job (직업정보), contentType=json (JSON형식)
  const url = `${baseUrl}?apiKey=${apiKey}&svcType=api&svcCode=JOB&gubun=job_dic_list&contentType=json&searchTarget=1&searchWord=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json();
    
    // 커리어넷 데이터 구조는 dataSearch.content 안에 목록이 있습니다.
    return data.dataSearch?.content || [];
  } catch (error) {
    console.error("커리어넷 API 에러:", error);
    return [];
  }
}

export default async function CareerPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";
  const jobs = query ? await getCareerData(query) : [];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">커리어넷 직업 탐색</h1>
          <p className="text-slate-500">관심 있는 직업을 검색하고 상세 정보를 확인해 보세요.</p>
        </header>

        {/* 검색창 */}
        <form action="/career" method="GET" className="mb-12 flex gap-3">
          <input
            name="q"
            defaultValue={query}
            placeholder="직업 이름을 입력하세요 (예: 요리사, 개발자)"
            className="flex-1 p-5 rounded-2xl border-none shadow-lg text-lg focus:ring-2 focus:ring-indigo-500 outline-none text-black"
          />
          <button type="submit" className="bg-indigo-600 text-white px-10 rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg">
            검색
          </button>
        </form>

        {/* 결과 리스트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {!query && (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400">찾고 싶은 직업을 검색창에 입력해 주세요!</p>
            </div>
          )}

          {jobs.length > 0 ? (
            jobs.map((job: any) => (
              <div key={job.job_dic_list_no} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.job_category?.split(',').map((cat: string) => (
                    <span key={cat} className="text-[10px] bg-indigo-50 text-indigo-600 font-bold px-2 py-1 rounded-md">
                      {cat.trim()}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">
                  {job.job_nm}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {job.job_summary || "상세 설명이 준비 중인 직업입니다."}
                </p>

                {/* 핵심! 커리어넷 사이트로 이동하는 외부 링크 */}
                <a 
                  href={`https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${job.job_dic_list_no}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition-all text-sm"
                >
                  상세 정보 보기 (커리어넷)
                </a>
              </div>
            ))
          ) : query ? (
            <div className="col-span-full text-center py-20">
              <p className="text-slate-400">'{query}'에 대한 직업 정보를 찾을 수 없습니다.</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}