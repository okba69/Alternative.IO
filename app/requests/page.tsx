import Link from 'next/link';
import { RequestsBoard } from '@/components/RequestsBoard';
import { GoogleAuthButton } from '@/components/GoogleAuthButton';

export default function RequestsPage() {
  return <main className="catalogue-secondary"><header className="catalogue-header"><Link className="catalogue-brand" href="/" aria-label="UseInstead accueil"><span className="catalogue-brand-mark">U</span><span>use<span>instead</span></span></Link><nav className="catalogue-nav" aria-label="Navigation principale"><Link href="/catalogue">Catalogue</Link><Link href="/requests">Requests</Link><Link href="/account">Mon espace</Link><GoogleAuthButton compact /></nav></header><div className="secondary-content"><div className="inner-page-header"><div><p className="eyebrow">UseInstead / Requests</p><h1>Les alternatives qui manquent encore.</h1><p className="inner-lede">Publie une recherche. Les autres utilisateurs pourront commenter et proposer une solution.</p></div></div><RequestsBoard /></div></main>;
}
