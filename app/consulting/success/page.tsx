export default function SuccessPage() {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">상담 신청이 접수되었습니다!</h1>
        <p className="text-gray-600 mb-8">전문 상담사 배정은 유료 서비스입니다.</p>
        
        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 inline-block text-left">
          <h2 className="font-bold text-lg mb-2">💳 결제 안내</h2>
          <p>계좌번호: 신한은행 110-123-456789 (예금주: 구직자도우미)</p>
          <p>입금 금액: 33,000원 (1회 상담권)</p>
          <p className="text-sm text-red-500 mt-2">* 입금 확인 후 24시간 이내에 상담사가 배정됩니다.</p>
        </div>
  
        <div className="mt-10">
          <a href="/" className="text-blue-600 underline">메인으로 돌아가기</a>
        </div>
      </div>
    );
  }