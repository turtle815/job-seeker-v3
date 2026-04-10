import React from 'react';

async function getWelfareData(query: string) {
  const serviceKey = process.env.WELFARE_API_KEY; 
  // 사진에서 확인한 정확한 End Point 주소입니다.
  const baseUrl = "https://apis.data.go.kr/B554287/LocalGovernmentWelfareInformations/LcgvWelfarelist";
  
  // XML 데이터를 JSON처럼 부드럽게 받기 위해 &_type=json 을 강제로 붙입니다.
  const url = `${baseUrl}?serviceKey=${serviceKey}&pageNo=1&numOfRows=10&searchWrd=${encodeURIComponent(query)}&_type=json`;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    const text = await res.text();

    // 만약 서버에서 JSON 변환을 지원 안 해서 XML(<...)이 날아오면 에러로 처리
    if (text.trim().startsWith('<')) {
      return { error: "API 서버가 JSON 형식을 지원하지 않습니다. (XML 응답)" };
    }

    return JSON.parse(text);
  } catch (error) {
    return null;
  }
}

export default async function WelfarePage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";
  const data = query ? await getWelfareData(query) : null;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">지자체 복지 서비스 검색</h1>
      
      <form action="/welfare" method="GET" className="mb-10 flex gap-2">
        <input
          name="q"
          defaultValue={query}
          placeholder="지역명이나 혜택을 입력하세요 (예: 서울, 청년)"
          className="flex-1 border-2 border-blue-200 p-3 rounded-lg text-black focus:border-blue-500 outline-none"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold">검색</button>
      </form>

      <div className="bg-gray-900 text-green-400 p-6 rounded-xl overflow-auto shadow-2xl">
        {query ? (
          data ? (
            <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
          ) : (
            <p className="text-red-400">데이터를 가져오지 못했습니다. API 키 승인 상태를 확인하세요.</p>
          )
        ) : (
          <p className="text-gray-400">검색어를 입력하고 버튼을 눌러주세요.</p>
        )}
      </div>
    </div>
  );
}