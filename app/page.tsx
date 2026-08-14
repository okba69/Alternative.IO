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
        <section className="milo-hero">
          <div className="milo-hero-copy">
            <p className="milo-eyebrow">USEINSTEAD / LE BON CHOIX, PLUS VITE</p>
            <h1>Tu n’as pas besoin de payer pour <em>l’essentiel.</em></h1>
            <p className="milo-hero-lede">Milo garde le fil de tes outils. Compare ce que tu paies, ce que tu utilises vraiment et l’alternative qui peut prendre le relais.</p>
            <div className="milo-hero-actions"><a className="milo-primary-cta" href="#catalogue">Explorer le catalogue <span aria-hidden="true">↗</span></a><span className="milo-note">9 comparaisons pour commencer</span></div>
          </div>
          <div className="milo-hero-art" aria-label="Milo, le guide UseInstead">
            <div className="milo-art-label"><span>MILO</span><span>01 / 09</span></div>
            <div className="milo-hero-character" role="img" aria-label="Milo, personnage illustré de UseInstead" />
            <div className="milo-speech">Je garde le fil.<br /><strong>Tu gardes le contrôle.</strong></div>
          </div>
        </section>
        <section id="catalogue" className="milo-catalogue-intro"><div><p className="milo-eyebrow">MILO T’AIDE À TRANCHER</p><h2>Un choix simple,<br /><em>une alternative claire.</em></h2></div><p>Recherche une application. Compare son prix, son alternative et ce qu’elle permet vraiment.</p></section>
        <CatalogueExplorer />
        <section className="catalogue-footer-cta"><span>Tu ne trouves pas ton application ?</span><Link href="/requests">Proposer une alternative <span aria-hidden="true">↗</span></Link></section>
      </main>
      <footer className="catalogue-footer"><span>UseInstead</span><span>Des alternatives utiles, sans le bla bla.</span></footer>
    </div>
  );
}
