import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { CertificateItem } from "@/lib/certificates/types";

const CACHE_DIR = path.join(process.cwd(), ".cache");
const CACHE_FILE = path.join(CACHE_DIR, "certificates-last-success.json");

function isCertificateItem(value: unknown): value is CertificateItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;
  return (
    typeof record.id === "string" &&
    typeof record.name === "string" &&
    typeof record.jobType === "string" &&
    typeof record.examSchedule === "string" &&
    typeof record.applicationPeriod === "string" &&
    typeof record.agency === "string" &&
    typeof record.description === "string"
  );
}

export async function readCertificateCache(): Promise<CertificateItem[]> {
  try {
    const raw = await readFile(CACHE_FILE, "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(isCertificateItem)
      .map((item) => ({
        ...item,
        source: "cache" as const
      }));
  } catch {
    return [];
  }
}

export async function writeCertificateCache(items: CertificateItem[]): Promise<void> {
  if (items.length === 0) {
    return;
  }

  try {
    await mkdir(CACHE_DIR, { recursive: true });
    const payload = items.map((item) => ({
      ...item,
      source: "cache" as const
    }));
    await writeFile(CACHE_FILE, JSON.stringify(payload, null, 2), "utf-8");
  } catch {
    // Cache write failure should never block rendering.
  }
}
