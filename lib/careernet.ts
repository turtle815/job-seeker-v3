// lib/careernet.ts

// 버셀에 저장한 인증키를 가져옵니다. 
// 없으면 빌드 에러 방지를 위해 공백('')을 넣어줍니다.
const CAREERNET_KEY = process.env.NEXT_PUBLIC_CAREERNET_API_KEY || '';

export const fetchCareerData = async (query: string) => {
  if (!CAREERNET_KEY) {
    console.error("커리어넷 API 키가 없습니다!");
    return null;
  }

  const url = `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${CAREERNET_KEY}&svcMeta=api&svcId=jobCan&contentType=json&searchJobNm=${query}`;
  
  const response = await fetch(url);
  return response.json();
};