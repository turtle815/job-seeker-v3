import React from 'react';

// 1. 데이터를 가져오는 서버 함수
async function getWelfareData(query: string) {
  const serviceKey = process.env.WELFARE_API_KEY;
  const baseUrl = "https://apis.data.go.kr/B554287/LocalGovernmentWelfareInformations/LcgvWelfarelist";
  const url = `${baseUrl}?serviceKey=${serviceKey}&pageNo=1&numOfRows=10&searchWrd=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    const xmlText = await res.text();
    return xmlText;
  } catch (error) {
    return null;
  }
}

// 2. XML 텍스트에서 특정 태그 안의 내용을 추출하는 도우미 함수
function extractTag(xml: string, tagName: string): string[] {
  const regex = new RegExp(`<${tagName}>(.*?)<\/${tagName}>`, 'g');
  const matches = xml.match(regex);
  return matches ? matches.map(m => m.replace(/<[^>]*>/g, '')) : [];
}

export default async function WelfarePage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";
  const xmlData = query ? await getWelfareData(query) : null;

  // XML에서 필요한 데이터 추출
  const titles = xmlData ? extractTag(xmlData, 'servNm') : []; // 서비스명
  const orgs = xmlData ? extractTag(xmlData, 'jurOrgNm') : []; // 담당기관
  const details = xmlData ? extractTag(xmlData, 'servDtl') : []; // 상세내용

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-blue-600 mb-4">복지 혜택 찾기</h1>
          <p className="text-slate-500 text-lg">지자체에서 제공하는 다양한 복지 서비스를 한눈에 확인하세요.</p>
        </header>

        {/* 검색창 */}
        <form action="/welfare" method="GET" className="mb-12 relative">
          <input
            name="q"
            defaultValue={query}
            placeholder="지역명이나 키워드를 입력하세요 (예: 서울, 청년, 어르신)"
            className="w-full border-0 bg-white p-5 pl-6 pr-32 rounded-2xl shadow-xl text-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          <button type="submit" className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-8 rounded-xl font-bold hover:bg-blue-700 transition-colors">
            검색
          </button>
        </form>

        {/* 검색 결과 리스트 */}
        <div className="grid gap-6">
          {!query && (
            <div className="text-center py-20 opacity-60">
              <span className="text-5xl mb-4 block">🔍</span>
              <p>도움이 필요한 키워드를 검색해 보세요.</p>
            </div>
          )}

          {query && titles.length > 0 ? (
            titles.map((title, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                    {orgs[index] || "지자체 공통"}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-800">{title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
                  {details[index] || "상세 정보는 해당 기관에 문의해 주세요."}
                </p>
                <button className="text-blue-600 font-semibold flex items-center gap-1 hover:underline">
                  자세히 보기 <span>→</span>
                </button>
              </div>
            ))
          ) : query ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
              <p className="text-slate-400">'{query}'에 대한 검색 결과가 없습니다.</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}