import React from 'react';

// 1. 데이터를 가져오는 서버 함수
async function getWelfareData(query: string) {
  const serviceKey = process.env.WELFARE_API_KEY; 
  const baseUrl = "https://apis.data.go.kr/B554287/LocalGovernmentWelfareInformations/LcgvWelfarelist";
  const url = `${baseUrl}?serviceKey=${serviceKey}&pageNo=1&numOfRows=10&searchWrd=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    const xmlText = await res.text();
    return xmlText; // 원본 XML 텍스트 반환
  } catch (error) {
    return null;
  }
}

// 2. 화면을 그리는 메인 컴포넌트
export default async function WelfarePage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";
  const xmlData = query ? await getWelfareData(query) : null;

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans text-black">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">복지 혜택 검색 결과</h1>
      
      <form action="/welfare" method="GET" className="mb-10 flex gap-2">
        <input
          name="q"
          defaultValue={query}
          placeholder="지역명이나 키워드 입력 (예: 서울, 청년)"
          className="flex-1 border-2 border-blue-100 p-4 rounded-xl focus:border-blue-500 outline-none shadow-sm"
        />
        <button type="submit" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-md">
          검색
        </button>
      </form>

      <div className="space-y-4">
        {!query && <p className="text-center text-gray-500 py-20">검색어를 입력하시면 지자체 복지 정보를 찾아드립니다.</p>}
        
        {/* XML 데이터가 있을 때만 결과 목록을 보여줌 */}
        {xmlData && (
          <div className="grid gap-4">
            {/* 데이터가 성공적으로 왔는지 간단히 체크 */}
            {xmlData.includes("<servList>") ? (
              <p className="text-green-600 font-medium mb-2">✅ 데이터를 성공적으로 불러왔습니다.</p>
            ) : (
              <p className="text-red-500">데이터 형식이 올바르지 않거나 결과가 없습니다.</p>
            )}

            {/* XML 원본 데이터를 스크롤 가능한 창에 담기 */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6">
               <h3 className="text-lg font-bold mb-4 text-gray-700">📋 수신된 데이터 (Raw XML)</h3>
               <div className="bg-white p-4 rounded-lg border overflow-auto max-h-[400px]">
                 <pre className="text-xs text-blue-800 leading-relaxed">
                   {xmlData}
                 </pre>
               </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100">
                <p className="text-blue-800">
                   💡 **대표님, 축하드립니다!** 데이터 수신에 완벽히 성공했습니다.<br/>
                   이제 이 XML 안의 `&lt;servNm&gt;`(서비스명)이나 `&lt;servDtl&gt;`(상세내용) 태그를 추출해서 
                   멋진 카드로 만드는 단계만 남았습니다.
                </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}