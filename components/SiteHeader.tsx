import Link from 'next/link';
import { GoogleAuthButton } from '@/components/GoogleAuthButton';

export function SiteHeader() {
  return <header className="catalogue-header"><Link className="catalogue-brand" href="/" aria-label="UseInstead accueil"><span className="catalogue-brand-mark">U</span><span>use<span>instead</span></span></Link><nav className="catalogue-nav" aria-label="Navigation principale"><Link href="/catalogue">Catalogue</Link><Link href="/proposer">Proposer une alternative</Link><Link href="/requests">Faire une request</Link><Link href="/account">Mon espace</Link><GoogleAuthButton compact /></nav></header>;
}
