'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { GoogleAuthButton } from '@/components/GoogleAuthButton';
import { CatalogueExplorer } from '@/components/CatalogueExplorer';

function DraggableMiloSpeech() {
  const [position, setPosition] = useState({ x: 50, y: 78 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ pointerX: number; pointerY: number; x: number; y: number } | null>(null);

  function moveSpeech(event: React.PointerEvent<HTMLDivElement>) {
    const frame = event.currentTarget.parentElement?.getBoundingClientRect();
    if (!frame || !dragStart.current) return;
    const nextX = dragStart.current.x + ((event.clientX - dragStart.current.pointerX) / frame.width) * 100;
    const nextY = dragStart.current.y + ((event.clientY - dragStart.current.pointerY) / frame.height) * 100;
    setPosition({ x: Math.min(78, Math.max(22, nextX)), y: Math.min(84, Math.max(16, nextY)) });
  }

  function startDragging(event: React.PointerEvent<HTMLDivElement>) {
    dragStart.current = { pointerX: event.clientX, pointerY: event.clientY, x: position.x, y: position.y };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function stopDragging(event: React.PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    dragStart.current = null;
    setDragging(false);
  }

  function moveWithKeyboard(event: React.KeyboardEvent<HTMLDivElement>) {
    const amount = event.shiftKey ? 5 : 2;
    const changes = { ArrowLeft: [-amount, 0], ArrowRight: [amount, 0], ArrowUp: [0, -amount], ArrowDown: [0, amount] }[event.key];
    if (!changes) return;
    event.preventDefault();
    setPosition(({ x, y }) => ({ x: Math.min(78, Math.max(22, x + changes[0])), y: Math.min(84, Math.max(16, y + changes[1])) }));
  }

  return <div
    className={`milo-speech${dragging ? ' is-dragging' : ''}`}
    style={{ left: `${position.x}%`, top: `${position.y}%` }}
    onPointerDown={startDragging}
    onPointerMove={moveSpeech}
    onPointerUp={stopDragging}
    onPointerCancel={stopDragging}
    onKeyDown={moveWithKeyboard}
    role="button"
    tabIndex={0}
    aria-label="Bulle Milo déplaçable"
    title="Déplace cette bulle"
  >Je t’aide à trouver<br /><strong>l’alternative qui te convient.</strong></div>;
}

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
            <DraggableMiloSpeech />
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
