import { RequestsBoard } from '@/components/RequestsBoard';
import { SiteHeader } from '@/components/SiteHeader';

export default function RequestsPage() {
  return <main className="catalogue-secondary"><SiteHeader /><div className="secondary-content"><div className="inner-page-header"><div><p className="eyebrow">UseInstead / Request</p><h1>Les alternatives qui manquent encore.</h1><p className="inner-lede">Décris un logiciel payant que tu veux remplacer. Les autres utilisateurs pourront commenter et proposer une solution.</p></div></div><RequestsBoard /></div></main>;
}
