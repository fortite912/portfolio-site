import type { Metadata } from "next";
import { CertificationsContent } from "@/components/certifications-content";

/** Route d'integration : meme contenu que /certifications, sans decor de site. */
export const metadata: Metadata = {
  title: "Certifications — Sean Fritsch",
  robots: { index: false, follow: false },
};

export default function EmbedCertificationsPage() {
  return <CertificationsContent />;
}
