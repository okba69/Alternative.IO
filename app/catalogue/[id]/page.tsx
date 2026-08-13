import { CatalogueDetail } from '@/components/CatalogueDetail';

export default async function CatalogueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CatalogueDetail id={id} />;
}
