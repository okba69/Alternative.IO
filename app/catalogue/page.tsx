import Link from 'next/link';
import { CatalogueExplorer } from '@/components/CatalogueExplorer';
import { GoogleAuthButton } from '@/components/GoogleAuthButton';

export default function CataloguePage() {
  return (
    <main className="catalogue-secondary">
      <header className="catalogue-header">
        <Link className="catalogue-brand" href="/" aria-label="UseInstead accueil"><span className="catalogue-brand-mark">U</span><span>use<span>instead</span></span></Link>
        <nav className="catalogue-nav" aria-label="Navigation principale"><Link href="/catalogue">Catalogue</Link><Link href="/requests">Requests</Link><Link href="/account">Mon espace</Link><GoogleAuthButton compact /></nav>
      </header>
      <div className="secondary-content">
        <div className="inner-page-header">
          <div><p className="eyebrow">UseInstead / Catalogue</p><h1>Compare avant de payer.</h1><p className="inner-lede">Recherche une alternative par outil, catégorie ou tag. Le catalogue public est consultable sans compte.</p></div>
        </div>
        <CatalogueExplorer />
        <section className="inner-cta"><div><p className="eyebrow">Tu ne trouves pas ta réponse ?</p><h2>Crée une request pour que la communauté cherche avec toi.</h2></div><Link className="button button-primary" href="/requests">Voir les requests <span>↗</span></Link></section>
      </div>
    </main>
  );
}
