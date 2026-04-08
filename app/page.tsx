import Link from "next/link";
export default function Home() {
  const menus = [
    { title: "복지 혜택 찾기", desc: "나에게 맞는 정부 지원 사업 확인", icon: "🏛️", link: "/welfare", color: "hover:border-blue-500" },
    { title: "직업 백과사전", desc: "다양한 직업의 연봉과 상세 정보", icon: "💼", link: "/jobs", color: "hover:border-indigo-500" },
    { title: "대학 학과 가이드", desc: "전국 대학 학과 커리큘럼 안내", img: "/major_icon.png", link: "/major", color: "hover:border-emerald-500" },
    { title: "자격증 정보", desc: "직무별 필수 및 우대 자격증 안내", icon: "📜", link: "/certificate", color: "hover:border-orange-500" },
    { title: "기업/채용 매칭", desc: "내 역량에 딱 맞는 기업 추천", icon: "🤝", link: "/matching", color: "hover:border-purple-500" },
    { title: "상담 및 커뮤니티", desc: "AI 챗봇 상담 및 전문가 연결", icon: "💬", link: "/consulting", color: "hover:border-pink-500" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* 상단 헤더 영역 */}
        <div className="text-center mb-16">
          <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold">내일을 위한 커리어 파트너</span>
          <h1 className="text-5xl font-black text-slate-900 mt-6 mb-4 tracking-tight">
            성공적인 구직을 위한 <br/>
            <span className="text-blue-600">스마트 솔루션</span>
          </h1>
          <p className="text-slate-500 text-lg">기획하신 6가지 핵심 서비스를 한곳에 모았습니다.</p>
        </div>

        {/* 6구 카드 그리드 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menus.map((menu, idx) => (
            <Link 
              key={idx}
              href={menu.link} 
              className={`group p-8 bg-white border-2 border-transparent rounded-[32px] ${menu.color} transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-2 flex flex-col items-center text-center`}
            >
              <div className="w-20 h-20 mb-6 flex items-center justify-center bg-slate-50 rounded-2xl group-hover:bg-white transition-colors overflow-hidden">
                {menu.img ? (
                  <img 
                    src={menu.img} 
                    alt={menu.title} 
                    className="w-full h-full object-contain p-2" // 찌그러짐 방지: object-contain
                  />
                ) : (
                  <span className="text-4xl">{menu.icon}</span>
                )}
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">{menu.title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{menu.desc}</p>
            </Link>
          ))}
        </div>

        {/* 하단 마이페이지 퀵 메뉴 */}
<div className="mt-16 p-8 bg-indigo-900 rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between shadow-2xl">
  <div>
    <h3 className="text-2xl font-bold mb-1">마이페이지 관리</h3>
    <p className="opacity-70 text-sm">상담 현황, 지원 현황, 검색 현황을 한눈에 관리하세요.</p>
  </div>
  {/* 👇 주소를 /mypage가 아닌 /login으로 보냅니다! */}
  <Link href="/login" className="mt-6 md:mt-0 bg-white text-indigo-900 px-8 py-4 rounded-2xl font-black hover:bg-indigo-50 transition-colors">
    로그인 / 회원가입
  </Link>
</div>
      </div>
    </div>
  );
}