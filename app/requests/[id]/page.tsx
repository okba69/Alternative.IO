import { RequestDetail } from '@/components/RequestDetail';

export default async function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <RequestDetail requestId={id} />;
}
