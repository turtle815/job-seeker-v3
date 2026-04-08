import { CertificateSection } from "@/components/certificate-section";
import { fetchCertificates } from "@/lib/certificates/fetch-certificates";

export async function CertificateSectionServer() {
  const certificates = await fetchCertificates();
  return <CertificateSection certificates={certificates} />;
}
