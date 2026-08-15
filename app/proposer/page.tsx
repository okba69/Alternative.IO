import Link from 'next/link';
import { ContributionForm } from '@/components/ContributionForm';
import { SiteHeader } from '@/components/SiteHeader';

export default function ProposerPage() {
  return <main className="catalogue-secondary"><SiteHeader /><div className="secondary-content"><div className="inner-page-header"><div><p className="eyebrow">UseInstead / Proposition</p><h1>Proposer une alternative.</h1><p className="inner-lede">Renseigne un ou plusieurs outils payants, puis l’alternative qui peut les remplacer. La fiche apparaîtra dans le catalogue après publication.</p></div></div><section className="proposer-page-form"><ContributionForm /></section><div className="inner-cta"><div><p className="eyebrow">Tu cherches une alternative ?</p><h2>Fais une request et laisse la communauté t’aider.</h2></div><Link className="button button-primary" href="/requests">Faire une request <span>↗</span></Link></div></div></main>;
}
