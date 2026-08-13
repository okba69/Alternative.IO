'use client';

import Link from 'next/link';
import { GoogleAuthButton } from '@/components/GoogleAuthButton';
import { CatalogueExplorer } from '@/components/CatalogueExplorer';

export default function Home() {
  return (
    <div className="catalogue-home">
      <header className="catalogue-header">
        <Link className="catalogue-brand" href="/" aria-label="UseInstead accueil"><span className="catalogue-brand-mark">U</span><span>use<span>instead</span></span></Link>
        <nav className="catalogue-nav" aria-label="Navigation principale"><Link href="/catalogue">Catalogue</Link><Link href="/requests">Requests</Link><Link href="/account">Mon espace</Link><GoogleAuthButton compact /></nav>
      </header>
      <main>
        <section className="catalogue-intro">
          <p className="catalogue-kicker">USEINSTEAD / ALTERNATIVES</p>
          <h1>Ne paie plus pour une application quand tu peux avoir l’essentiel gratuitement.</h1>
          <p>Recherche une application. Compare son prix, son alternative et ce qu’elle permet vraiment.</p>
        </section>
        <CatalogueExplorer />
        <section className="catalogue-footer-cta"><span>Tu ne trouves pas ton application ?</span><Link href="/requests">Proposer une alternative <span aria-hidden="true">↗</span></Link></section>
      </main>
      <footer className="catalogue-footer"><span>UseInstead</span><span>Des alternatives utiles, sans le bla bla.</span></footer>
    </div>
  );
}
