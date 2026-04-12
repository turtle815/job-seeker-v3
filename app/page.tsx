import React from 'react';

// --- 1. 데이터 가져오는 함수들 (Server Functions) ---

// 복지 API (XML)
async function getWelfareData(query: string) {
  const serviceKey = process.env.WELFARE_API_KEY;
  console.log("1. 복지 검색 시작 - 키 존재여부:", !!serviceKey); // 키가 있으면 true
  const url = `https://apis.data.go.kr/B554287/LocalGovernmentWelfareInformations/LcgvWelfarelist?serviceKey=${serviceKey}&pageNo=1&numOfRows=5&searchWrd=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    console.log("2. 복지 서버 응답 상태:", res.status);
    return await res.text();
  } catch (e) { return null; }
}

// 커리어넷 API (JSON)
async function getCareerData(query: string) {
  const apiKey = process.env.CAREERNET_API_KEY;
  const url = `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${apiKey}&svcType=api&svcCode=JOB&gubun=job_dic_list&contentType=json&searchWord=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, { cache: 'no-store' });
  
    const data = await res.json();
    return data.dataSearch?.content || [];
  } catch (e) { 
    console.log("X. 커리어 에러 발생:", e); // 반드시 괄호 { } 안에 있어야 합니다.
    return []; 
  }
} //
// XML 태그 추출 도우미
function extractTag(xml: string, tagName: string): string[] {
  const regex = new RegExp(`<${tagName}>(.*?)<\/${tagName}>`, 'g');
  const matches = xml.match(regex);
  return matches ? matches.map(m => m.replace(/<[^>]*>/g, '')) : [];
}

// --- 2. 메인 페이지 컴포넌트 ---

export default async function HomePage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";
  
  // 검색어가 있을 때만 양쪽 API 동시 호출
  const [xmlWelfare, careerJobs] = query 
    ? await Promise.all([getWelfareData(query), getCareerData(query)])
    : [null, []];

  const welfareTitles = xmlWelfare ? extractTag(xmlWelfare, 'servNm') : [];
  const welfareDetails = xmlWelfare ? extractTag(xmlWelfare, 'servDtl') : [];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900">
      {/* 히어로 섹션 */}
      <div className="bg-indigo-600 py-16 px-6 text-center text-white">
        <h1 className="text-4xl font-extrabold mb-4">내게 맞는 복지와 커리어 찾기</h1>
        <p className="text-indigo-100 mb-8">키워드 하나로 지자체 혜택부터 직업 정보까지 한 번에 확인하세요.</p>
        
        <form action="/" method="GET" className="max-w-2xl mx-auto relative">
          <input
            name="q"
            defaultValue={query}
            placeholder="예: 서울 청년, 요리사, 컴퓨터"
            className="w-full p-5 pl-8 pr-32 rounded-full text-black shadow-2xl focus:ring-4 focus:ring-indigo-300 outline-none"
          />
          <button type="submit" className="absolute right-2 top-2 bottom-2 bg-indigo-800 text-white px-8 rounded-full font-bold hover:bg-black transition-all">
            검색
          </button>
        </form>
      </div>

      <div className="max-w-6xl mx-auto p-6 md:p-12">
        {!query && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg font-medium">검색어를 입력하시면 맞춤 정보를 불러옵니다. 😊</p>
          </div>
        )}

        {query && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* 왼쪽: 복지 혜택 결과 */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-blue-500">🏢</span> 지자체 복지 혜택
              </h2>
              <div className="space-y-4">
                {welfareTitles.length > 0 ? welfareTitles.map((title, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-lg mb-2">{title}</h3>
                    <p className="text-slate-600 text-sm line-clamp-2 mb-4">{welfareDetails[i]}</p>
                    <button className="text-blue-600 text-sm font-bold hover:underline">상세보기(준비중) →</button>
                  </div>
                )) : <p className="text-slate-400">복지 검색 결과가 없습니다.</p>}
              </div>
            </div>

            {/* 오른쪽: 커리어넷 직업 결과 */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-indigo-500">🎓</span> 직업백과사전
              </h2>
              <div className="space-y-4">
                {careerJobs.length > 0 ? careerJobs.map((job: any) => (
                  <div key={job.job_dic_list_no} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-lg mb-2">{job.job_nm}</h3>
                    <p className="text-slate-600 text-sm line-clamp-2 mb-4">{job.job_summary}</p>
                    <div className="flex gap-2">
                      <a 
                        href={`https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${job.job_dic_list_no}`}
                        target="_blank"
                        className="text-xs bg-indigo-50 text-indigo-600 px-3 py-2 rounded-lg font-bold hover:bg-indigo-600 hover:text-white transition-all"
                      >
                        직업상세 보기 🔗
                      </a>
                    </div>
                  </div>
                )) : <p className="text-slate-400">직업 검색 결과가 없습니다.</p>}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}