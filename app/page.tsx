import React from 'react';

async function getCareerData(query: string) {
  const apiKey = process.env.CAREERNET_API_KEY;
  if (!apiKey) return "API_KEY_MISSING"; // 키가 없으면 표시

  const url = `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${apiKey}&svcType=api&svcCode=JOB&gubun=job_dic_list&contentType=json&searchWord=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json();
    return data.dataSearch?.content || [];
  } catch (e) {
    return "FETCH_ERROR";
  }
}

export default async function HomePage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";
  const careerJobs = query ? await getCareerData(query) : [];

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">커리어 검색 테스트</h1>
      <form action="/" method="GET" className="mb-10">
        <input name="q" defaultValue={query} className="border p-2 text-black" placeholder="직업 입력" />
        <button type="submit" className="bg-blue-500 text-white p-2 ml-2">검색</button>
      </form>

      {/* 상태 확인용 디버그 문구 */}
      {query && (
        <div className="bg-gray-100 p-4 mb-5 text-sm">
          검색어: {query} | 
          결과 상태: {Array.isArray(careerJobs) ? `${careerJobs.length}건 검색됨` : careerJobs}
        </div>
      )}

      <div className="grid gap-4">
        {Array.isArray(careerJobs) && careerJobs.map((job: any) => (
          <div key={job.job_dic_list_no} className="border p-4 rounded shadow">
            <h3 className="font-bold">{job.job_nm}</h3>
            <p>{job.job_summary}</p>
            <a href={`https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${job.job_dic_list_no}`} target="_blank" className="text-blue-500 underline">상세보기</a>
          </div>
        ))}
      </div>
    </div>
  );
}