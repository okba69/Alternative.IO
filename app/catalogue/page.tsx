import Link from 'next/link';
import { CatalogueExplorer } from '@/components/CatalogueExplorer';
import { SiteHeader } from '@/components/SiteHeader';

export default function CataloguePage() {
  return (
    <main className="catalogue-secondary">
      <SiteHeader />
      <div className="secondary-content">
        <div className="inner-page-header">
          <div><p className="eyebrow">UseInstead / Catalogue</p><h1>Compare avant de payer.</h1><p className="inner-lede">Recherche une alternative par outil, catégorie ou tag. Le catalogue public est consultable sans compte.</p></div>
        </div>
        <CatalogueExplorer />
        <section className="inner-cta"><div><p className="eyebrow">Tu ne trouves pas ta réponse ?</p><h2>Crée une request pour que la communauté cherche avec toi.</h2></div><Link className="button button-primary" href="/requests">Faire une request <span>↗</span></Link></section>
      </div>
    </main>
  );
}
