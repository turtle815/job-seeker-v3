// 1. "use client"를 삭제하세요 (있다면)
// 2. 데이터를 가져오는 fetch 부분을 서버에서 실행되도록 합니다.

async function getWelfareData(query: string) {
  const serviceKey = process.env.WELFARE_API_KEY; // 서버 환경변수에 저장된 키
  const url = `http://apis.data.go.kr/...&keyword=${query}`;
  
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function WelfarePage({ searchParams }: { searchParams: { q: string } }) {
  const data = searchParams.q ? await getWelfareData(searchParams.q) : null;
  
  return (
    <div>
      {/* 검색 결과 렌더링 */}
    </div>
  )
}