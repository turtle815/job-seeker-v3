# Job Seeker Platform

Next.js + Tailwind CSS 기반의 구직자 플랫폼 초기 프로젝트입니다.

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

## Supabase 연동 기본 설정

1. `.env.example` 파일을 참고해 `.env.local` 파일을 생성합니다.
2. 아래 환경 변수를 입력합니다.

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_CERT_API_KEY=your-cert-api-key
CERT_API_ENDPOINT=your-cert-api-endpoint
```

회원가입 폼(` /signup `)은 Supabase Auth `signUp`을 호출하도록 기본 구성되어 있습니다.

## profiles 테이블/정책 적용

Supabase SQL Editor에서 `supabase/sql/create_profiles.sql` 내용을 실행하세요.

- `profiles` 테이블 생성
- RLS 정책(본인 조회/수정) 설정
- `auth.users` 생성 시 `profiles` 자동 생성 트리거 설정

## 상담 신청(consultations) 테이블/정책 적용

Supabase SQL Editor에서 `supabase/sql/create_consultations.sql` 내용을 실행하세요.

- `consultations` 테이블 생성
- RLS 정책(본인 신청 조회/등록) 설정
- `updated_at` 자동 갱신 트리거 설정

## 한국자격증협회 API 연동

메인 페이지는 `NEXT_PUBLIC_CERT_API_KEY`를 사용해 자격증 API를 호출하고 카드 데이터를 렌더링합니다.

- 자격증명, 직종, 시험 일정 등 기본 정보를 카드에 표시
- 카드 클릭 시 접수 기간/상세 정보가 펼쳐짐
- API 주소는 `CERT_API_ENDPOINT`에서 관리 (기본값 포함)
