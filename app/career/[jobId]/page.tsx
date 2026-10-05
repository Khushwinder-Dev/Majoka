import { redirect } from "next/navigation";

interface JobDetailPageProps {
  params: Promise<{ jobId: string }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { jobId } = await params;
  redirect(`/career?job=${jobId}`);
}
