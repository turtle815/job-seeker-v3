-- 상담 신청 내역 테이블
create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  content text not null,
  status text not null default '대기중',
  created_at timestamptz not null default now(),
  constraint consultations_status_check check (status in ('대기중', '완료'))
);

alter table public.consultations enable row level security;

-- 본인 상담 신청 내역 조회
drop policy if exists "consultations_select_own" on public.consultations;
create policy "consultations_select_own"
on public.consultations
for select
to authenticated
using (auth.uid() = user_id);

-- 본인 상담 신청 등록
drop policy if exists "consultations_insert_own" on public.consultations;
create policy "consultations_insert_own"
on public.consultations
for insert
to authenticated
with check (auth.uid() = user_id);

-- 필요 시 운영자가 상태를 갱신하는 용도로 update 허용 정책을 추가하세요.
