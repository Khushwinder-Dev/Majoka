import { Metadata } from "next";
import DownloadPageContent from "@/components/DownloadPageContent";

export const metadata: Metadata = {
  title: "Downloads & Resources | Taj Al Rahmah Technical Services",
  description:
    "Download official brochures, corporate profiles, technical data sheets, and municipal approvals from Taj Al Rahmah Technical Services in Dubai, UAE.",
};

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-white">
      <DownloadPageContent />
    </main>
  );
}
