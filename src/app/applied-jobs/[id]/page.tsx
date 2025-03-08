import { AppliedJobDetail } from "@/components/applied-job-detail"

export default function AppliedJobDetailPage({ params }: { params: { id: string } }) {
  return <AppliedJobDetail jobId={Number.parseInt(params.id)} />
}

