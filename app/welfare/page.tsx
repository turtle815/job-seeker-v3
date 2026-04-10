import React from 'react';

// 1. 데이터 가져오는 함수 (서버에서 실행)
async function getWelfareData(query: string) {
  const serviceKey = process.env.WELFARE_API_KEY; 
  // 실제 공공데이터 포털의 '서비스별 상세 기능' URL로 확인이 필요합니다. 
  // 아래는 대표적인 예시 주소입니다.
  const url = `http://apis.data.go.kr/B554287/NationalWelfareInformations/getNationalWelfarelist?serviceKey=${serviceKey}&callTp=L&pageNo=1&numOfRows=10&searchWrd=${encodeURIComponent(query)}`;
  
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("데이터 로딩 에러:", error);
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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">복지 서비스 검색</h1>
      
      {/* 2. 검색창 (Form 전송 방식) */}
      <form action="/welfare" method="GET" className="mb-8 flex gap-2">
        <input
          name="q"
          defaultValue={query}
          placeholder="검색어를 입력하세요 (예: 청년)"
          className="border p-2 rounded w-full max-w-sm text-black"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          검색
        </button>
      </form>

      {/* 3. 검색 결과 출력 구역 */}
      <div className="space-y-4">
        {!query && <p>검색어를 입력하고 검색 버튼을 눌러주세요.</p>}
        
        {query && data && (
          <div>
            <h2 className="text-xl mb-4">'{query}' 검색 결과</h2>
            {/* API 구조에 따라 data.servList 또는 data.items 등으로 바뀔 수 있습니다 */}
            <pre className="bg-gray-100 p-4 rounded text-black overflow-auto max-h-96">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}

        {query && !data && <p>검색 결과가 없거나 에러가 발생했습니다.</p>}
      </div>
    </div>
  );
}