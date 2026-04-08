"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type ChatMessage = {
  id: string;
  role: "user" | "bot";
  text: string;
  showConsultButton?: boolean;
};

// 키워드 감지를 더 넓게 잡습니다.
const CONSULT_KEYWORDS = ["상담", "신청", "직업상담사", "연결", "유료"];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "init-1",
    role: "bot",
    text: "안녕하세요! 챗봇입니다. 서비스 이용 안내와 자격증 관련 질문에 답변해드릴 수 있어요."
  },
  {
    id: "init-2",
    role: "bot",
    text: "예: 회원가입 방법, 자격증 시험 일정 확인 방법, 카드 상세 정보 보는 법 등을 물어보세요."
  }
];

function includesConsultKeyword(input: string) {
  const normalized = input.toLowerCase().replace(/\s+/g, "");
  // 사용자의 입력에 '상담' 또는 '신청'이 포함되어 있는지 확인합니다.
  return CONSULT_KEYWORDS.some((keyword) => normalized.includes(keyword));
}

function getBotReply(input: string): ChatMessage {
  if (includesConsultKeyword(input)) {
    return {
      id: `bot-${Date.now()}`,
      role: "bot",
      text: "전문 상담사 연결은 유료 서비스입니다. 상담 신청 페이지로 이동하여 상세 내용을 확인하시겠습니까?",
      showConsultButton: true
    };
  }

  if (input.includes("서비스") || input.includes("이용")) {
    return {
      id: `bot-${Date.now()}`,
      role: "bot",
      text: "서비스 이용은 회원가입 후 가능합니다. 메인 페이지의 회원가입 버튼을 눌러 계정을 만든 뒤 자격증 카드와 상세 정보를 확인해보세요."
    };
  }

  if (input.includes("자격증") || input.includes("시험") || input.includes("일정")) {
    return {
      id: `bot-${Date.now()}`,
      role: "bot",
      text: "자격증 카드를 클릭하면 시험 일정, 직종, 접수 기간, 상세 설명을 확인할 수 있습니다."
    };
  }

  return {
    id: `bot-${Date.now()}`,
    role: "bot",
    text: "궁금하신 내용을 '상담', '자격증', '이용방법' 등의 키워드와 함께 질문해주시면 더 정확히 안내드릴게요."
  };
}

export function ChatbotWidget() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isApplied, setIsApplied] = useState(false);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSend) return;

    const userText = input.trim();
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: userText
    };

    const botReply = getBotReply(userText);
    setMessages((prev) => [...prev, userMessage, botReply]);
    setInput("");
  }

  function handleApplyConsult() {
    // 버튼 클릭 시 즉시 상담 신청 페이지로 이동합니다.
    router.push("/consulting");
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <section className="mb-3 flex h-[30rem] w-[22rem] flex-col overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-2xl shadow-sky-200/40">
          <header className="bg-gradient-to-r from-sky-600 to-indigo-600 px-4 py-3 text-white">
            <h3 className="text-sm font-semibold">구직자 도우미 챗봇</h3>
            <p className="mt-1 text-xs text-white/90">유료 상담 및 서비스 이용 안내</p>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message) => (
              <div key={message.id} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    message.role === "user"
                      ? "max-w-[80%] rounded-xl bg-indigo-600 px-3 py-2 text-sm text-white"
                      : "max-w-[88%] rounded-xl border border-sky-100 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm"
                  }
                >
                  <p className="leading-relaxed">{message.text}</p>
                  
                  {/* 버튼이 표시되어야 하는 메시지일 경우 */}
                  {message.showConsultButton && (
                    <button
                      type="button"
                      onClick={handleApplyConsult}
                      className="mt-3 w-full rounded-lg bg-orange-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-orange-600 animate-bounce"
                    >
                      🚀 유료 상담 신청하기
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder=" '상담'이라고 입력해보세요"
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-400"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                전송
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 text-2xl text-white shadow-lg transition hover:scale-110"
      >
        💬
      </button>
    </div>
  );
}