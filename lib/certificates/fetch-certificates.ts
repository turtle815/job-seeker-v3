import { CertificateItem } from "@/lib/certificates/types";
import { readCertificateCache, writeCertificateCache } from "@/lib/certificates/cache";

type RawRecord = Record<string, unknown>;

const CERT_API_ENDPOINT = process.env.CERT_API_ENDPOINT ?? "https://api.korea-qualification.or.kr/v1/certificates";
const CERT_API_TIMEOUT_MS = 6000;

const SAMPLE_CERTIFICATES: CertificateItem[] = [
  {
    id: "sample-1",
    name: "정보처리기사",
    jobType: "IT",
    examSchedule: "2026-06-15 필기 / 2026-07-20 실기",
    applicationPeriod: "2026-05-01 ~ 2026-05-10",
    agency: "한국자격증협회",
    description: "소프트웨어 개발, 데이터 처리, 시스템 운영 등 IT 직무 역량을 검증하는 국가기술자격.",
    source: "fallback"
  },
  {
    id: "sample-2",
    name: "전산회계",
    jobType: "회계/재무",
    examSchedule: "2026-06-22 필기 / 2026-07-05 실무",
    applicationPeriod: "2026-05-12 ~ 2026-05-19",
    agency: "한국자격증협회",
    description: "회계 기초, 전표 입력, 결산 처리 등 회계 실무 능력을 확인하는 자격 과정.",
    source: "fallback"
  },
  {
    id: "sample-3",
    name: "컴퓨터활용능력 1급",
    jobType: "사무/OA",
    examSchedule: "2026-06-28 필기 / 2026-07-18 실기",
    applicationPeriod: "2026-05-20 ~ 2026-05-28",
    agency: "한국자격증협회",
    description: "스프레드시트와 데이터베이스 활용 능력을 중심으로 사무 자동화 역량을 평가합니다.",
    source: "fallback"
  }
];

function valueOf(raw: RawRecord, keys: string[], fallback = "") {
  for (const key of keys) {
    const value = raw[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return fallback;
}

function normalize(raw: RawRecord, index: number): CertificateItem {
  const name = valueOf(raw, ["name", "cert_name", "qualification_name", "title"], "자격증명 미정");
  const jobType = valueOf(raw, ["jobType", "job_type", "category", "field"], "직종 정보 없음");
  const examSchedule = valueOf(raw, ["examSchedule", "exam_date", "test_date", "schedule"], "시험 일정 미정");
  const applicationPeriod = valueOf(raw, ["applicationPeriod", "apply_period", "registration_period"], "접수 기간 미정");
  const agency = valueOf(raw, ["agency", "organization", "host", "issuer"], "한국자격증협회");
  const description = valueOf(raw, ["description", "detail", "summary"], "상세 설명이 제공되지 않았습니다.");
  const id = valueOf(raw, ["id", "cert_id", "qualification_id"], `cert-${index + 1}`);

  return { id, name, jobType, examSchedule, applicationPeriod, agency, description, source: "api" };
}

function extractRecords(payload: unknown): RawRecord[] {
  if (Array.isArray(payload)) {
    return payload.filter((item): item is RawRecord => typeof item === "object" && item !== null);
  }

  if (typeof payload === "object" && payload !== null) {
    const source = payload as Record<string, unknown>;
    const candidates = [source.items, source.data, source.results, source.certificates];

    for (const candidate of candidates) {
      if (Array.isArray(candidate)) {
        return candidate.filter((item): item is RawRecord => typeof item === "object" && item !== null);
      }
    }
  }

  return [];
}

async function getCachedOrSample(reason: string): Promise<CertificateItem[]> {
  const cached = await readCertificateCache();
  if (cached.length > 0) {
    console.error(`[cert-api] ${reason} Using last successful cached data.`);
    return cached;
  }

  console.error(`[cert-api] ${reason} No cache found, using sample data.`);
  return SAMPLE_CERTIFICATES;
}

export async function fetchCertificates(): Promise<CertificateItem[]> {
  const apiKey = process.env.NEXT_PUBLIC_CERT_API_KEY;
  if (!apiKey) {
    return getCachedOrSample("NEXT_PUBLIC_CERT_API_KEY is missing.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CERT_API_TIMEOUT_MS);

  try {
    const url = new URL(CERT_API_ENDPOINT);
    url.searchParams.set("apiKey", apiKey);

    const response = await fetch(url.toString(), {
      headers: {
        "x-api-key": apiKey,
        Accept: "application/json"
      },
      next: { revalidate: 60 * 60 },
      signal: controller.signal
    });

    if (!response.ok) {
      return getCachedOrSample(`Request failed: ${response.status} ${response.statusText}.`);
    }

    const payload = (await response.json()) as unknown;
    const records = extractRecords(payload);

    if (records.length === 0) {
      return getCachedOrSample("Response parsed but no certificate records were found.");
    }

    const normalized = records.map(normalize);
    await writeCertificateCache(normalized);
    return normalized;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return getCachedOrSample(`Request timed out after ${CERT_API_TIMEOUT_MS}ms.`);
    }

    const message = error instanceof Error ? error.message : "Unknown error";
    return getCachedOrSample(`Unexpected error: ${message}.`);
  } finally {
    clearTimeout(timeout);
  }
}
