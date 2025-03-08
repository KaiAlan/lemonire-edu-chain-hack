import { TestDetail } from "@/components/test-detail"

export default function TestDetailPage({ params }: { params: { id: string } }) {
  return <TestDetail testId={Number.parseInt(params.id)} />
}

