export type CertificateItem = {
  id: string;
  name: string;
  jobType: string;
  examSchedule: string;
  applicationPeriod: string;
  agency: string;
  description: string;
  source?: "api" | "cache" | "fallback";
};
