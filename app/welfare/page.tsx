async function getWelfareData(query: string) {
  const serviceKey = process.env.WELFARE_API_KEY; 
  // 1. baseUrl을 본인의 API 상세페이지에 있는 주소로 꼭 확인하세요! (아래는 공통 주소)
  const baseUrl = "http://apis.data.go.kr/B554287/NationalWelfareInformations/getNationalWelfarelist";
  
  // 2. searchWrd를 사용하여 URL 조립
  const url = `${baseUrl}?serviceKey=${serviceKey}&callTp=L&pageNo=1&numOfRows=10&searchWrd=${encodeURIComponent(query)}`;
  
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;

    // 3. 데이터가 XML로 오는지 JSON으로 오는지 확인이 필요합니다.
    // 만약 API 설정이 XML 기본이라면 뒤에 &_type=json 을 붙이거나 아래처럼 처리합니다.
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    return null;
  }
}