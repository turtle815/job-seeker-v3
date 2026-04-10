import React from 'react';

// 1. 서버에서 데이터를 가져오는 함수
async function getWelfareData(query: string) {
  const serviceKey = process.env.WELFARE_API_KEY; 
  const baseUrl = "http://apis.data.go.kr/B554287/NationalWelfareInformations/getNationalWelfarelist";
  
  // URL 조립: &_type=json을 붙여서 XML 에러를 방지합니다.
  const url = `${baseUrl}?serviceKey=${serviceKey}&callTp=L&pageNo=1&numOfRows=10&searchWrd=${encodeURIComponent(query)}&_type=json`;
  
  console.log("요청 URL 확인용:", url);

  try {
    const res = await fetch(url, { cache: 'no-store' });
    
    if (!res.ok) {
      console.error(`API 서버 응답 에러: ${res.status}`);
      return null;
    }

    const text = await res.text();

    // 혹시라도 서버가 JSON이 아닌 XML(< 시작)을 보냈는지 확인
    if (text.trim().startsWith('<')) {
      console.error("서버가 JSON 대신 XML을 보냈습니다. 키 설정을 확인하세요.");
      return null;
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("데이터 로딩 중 치명적 오류:", error);
    return null;
  }
}

export default async function WelfarePage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";
  const data = query ? await getWelfareData(query) : null;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">복지 서비스 검색</h1>
      
      {/* 검색창 구역 */}
      <form action="/welfare" method="GET" className="mb-10 flex gap-2">
        <input
          name="q"
          defaultValue={query}
          placeholder="어떤 복지 혜택을 찾으시나요? (예: 청년, 어르신)"
          className="flex-1 border-2 border-blue-200 p-3 rounded-lg focus:outline-none focus:border-blue-500 text-black"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
          검색하기
        </button>
      </form>

      {/* 결과 출력 구역 */}
      <div className="space-y-6">
        {!query && (
          <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed">
            <p className="text-gray-500">검색어를 입력하고 혜택을 확인해 보세요!</p>
          </div>
        )}
        
        {query && data && (
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              '{query}' 검색 결과
            </h2>
            {/* 데이터가 있는 경우 깔끔하게 보여주기 */}
            <div className="bg-gray-900 text-green-400 p-6 rounded-xl overflow-auto max-h-[500px] text-sm shadow-2xl">
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          </div>
        )}

        {query && !data && (
          <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-600">
            <p className="font-bold">데이터를 불러오지 못했습니다.</p>
            <ul className="list-disc ml-5 mt-2 text-sm">
              <li>Vercel 환경변수(WELFARE_API_KEY) 이름이 맞는지 확인해 주세요.</li>
              <li>공공데이터 포털의 키가 [인코딩] 버전인지 확인해 보세요.</li>
              <li>키가 방금 발급되었다면 1~2시간 뒤에 다시 시도해 보세요.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}