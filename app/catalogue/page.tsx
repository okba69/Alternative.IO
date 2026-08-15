import { CatalogueExplorer } from '@/components/CatalogueExplorer';
import { SiteHeader } from '@/components/SiteHeader';

export default function CataloguePage() {
  return (
    <main className="catalogue-secondary catalogue-page">
      <SiteHeader />
      <div className="secondary-content">
        <div className="inner-page-header">
          <div><p className="eyebrow">UseInstead / Catalogue</p><h1>Catalogue</h1></div>
        </div>
        <CatalogueExplorer />
      </div>
    </main>
  );
}
