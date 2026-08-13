'use client';

import { useMemo, useState } from 'react';
import { WaitlistForm } from '@/components/WaitlistForm';

const CATEGORIES = ['Tous', 'Productivité', 'Création', 'Développement'];

const PREVIEW_ALTERNATIVES = [
  {
    name: 'Handy',
    replaces: 'Wispr Flow',
    category: 'Productivité',
    status: 'Gratuit',
    tone: 'mint',
    description: 'Une piste gratuite pour transformer la voix en texte au quotidien.',
    tags: ['Voix', 'Desktop'],
  },
  {
    name: 'Penpot',
    replaces: 'Figma',
    category: 'Création',
    status: 'Open source',
    tone: 'amber',
    description: 'Conception collaborative avec un modèle ouvert et auto hébergeable.',
    tags: ['Design', 'Web'],
  },
  {
    name: 'AppFlowy',
    replaces: 'Notion',
    category: 'Productivité',
    status: 'Open source',
    tone: 'blue',
    description: 'Un espace de travail flexible pour garder ses notes et projets sous contrôle.',
    tags: ['Notes', 'Open source'],
  },
  {
    name: 'Bruno',
    replaces: 'Postman',
    category: 'Développement',
    status: 'Gratuit',
    tone: 'coral',
    description: 'Un client API pensé pour rester local, rapide et versionnable.',
    tags: ['API', 'Local'],
  },
];

const PRINCIPLES = [
  {
    number: '01',
    title: 'Le statut réel',
    text: 'Gratuit, freemium, open source ou essai. Le modèle tarifaire est nommé sans raccourci.',
  },
  {
    number: '02',
    title: 'Les limites visibles',
    text: 'Quotas, fonctions manquantes, hébergement et coûts cachés restent au premier plan.',
  },
  {
    number: '03',
    title: 'La vérification humaine',
    text: 'La communauté propose. Une revue précède la publication et conserve une trace de la décision.',
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [query, setQuery] = useState('');

  const filteredAlternatives = useMemo(() => {
    return PREVIEW_ALTERNATIVES.filter((alternative) => {
      const matchesCategory = activeCategory === 'Tous' || alternative.category === activeCategory;
      const normalizedQuery = query.trim().toLowerCase();
      const matchesQuery =
        !normalizedQuery ||
        alternative.name.toLowerCase().includes(normalizedQuery) ||
        alternative.replaces.toLowerCase().includes(normalizedQuery) ||
        alternative.description.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Alternative.IO accueil">
          <span className="brand-mark">A</span>
          <span>Alternative<span className="brand-dot">.</span>IO</span>
        </a>
        <nav className="desktop-nav" aria-label="Navigation principale">
          <a href="#catalogue">Le catalogue</a>
          <a href="#methode">Notre méthode</a>
          <a href="#contribuer">Contribuer</a>
        </nav>
        <a className="header-cta" href="#rejoindre">Rejoindre la liste</a>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> Le catalogue qui remet la clarté au centre</p>
            <h1>Arrête de payer pour un outil que tu peux <em>remplacer.</em></h1>
            <p className="hero-lede">
              Alternative.IO t’aide à trouver des solutions gratuites, open source ou simplement plus justes pour ton usage. Avec les vraies limites, les sources et les retours de ceux qui les utilisent.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#rejoindre">Découvrir le catalogue <span>↗</span></a>
              <a className="text-link" href="#catalogue">Voir un aperçu <span>↓</span></a>
            </div>
            <div className="hero-note"><span className="note-icon">✦</span> Pas de classement sponsorisé. Pas de promesse floue.</div>
          </div>
          <div className="hero-art" aria-label="Aperçu d'une recherche Alternative.IO">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="hero-card hero-card-main">
              <div className="card-topline"><span className="status-live"><span /> Aperçu du produit</span><span className="card-menu">•••</span></div>
              <div className="search-preview"><span>⌕</span><span>Je cherche une alternative à...</span><b>⌘ K</b></div>
              <div className="preview-result-label">Résultats pour <strong>Wispr Flow</strong></div>
              <div className="mini-result">
                <span className="mini-logo mini-logo-mint">H</span>
                <span className="mini-result-copy"><strong>Handy</strong><small>Gratuit · Voix · Desktop</small></span>
                <span className="confidence">Vérifié</span>
              </div>
              <div className="mini-result">
                <span className="mini-logo mini-logo-blue">V</span>
                <span className="mini-result-copy"><strong>VoiceInk</strong><small>Open source · macOS</small></span>
                <span className="confidence confidence-muted">À revoir</span>
              </div>
              <div className="preview-footer"><span>Comparer les limites</span><span>→</span></div>
            </div>
            <div className="floating-tag floating-tag-top"><span className="tag-check">✓</span> Limites visibles</div>
            <div className="floating-tag floating-tag-bottom"><span className="tag-spark">✦</span> Vérifié par la communauté</div>
          </div>
        </section>

        <section className="signal-strip" aria-label="Promesse du produit">
          <span>Moins de dépenses inutiles</span><i />
          <span>Plus de décisions éclairées</span><i />
          <span>Une communauté qui partage vraiment</span>
        </section>

        <section className="catalogue-section section-wrap" id="catalogue">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">01 / Le catalogue</p>
              <h2>Une meilleure option commence par une meilleure comparaison.</h2>
            </div>
            <p>Un aperçu de l’expérience que nous construisons. Chaque fiche donne le contexte nécessaire pour choisir, pas seulement un lien à cliquer.</p>
          </div>
          <div className="catalogue-window">
            <div className="window-bar"><span className="window-dots"><i /><i /><i /></span><span className="window-title">alternative.io / explorer</span><span className="window-lock">⌁ privé par défaut</span></div>
            <div className="catalogue-toolbar">
              <label className="catalogue-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Chercher un outil ou un besoin" aria-label="Chercher un outil ou un besoin" /></label>
              <div className="category-tabs" role="tablist" aria-label="Catégories">
                {CATEGORIES.map((category) => (
                  <button key={category} className={activeCategory === category ? 'category-tab active' : 'category-tab'} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category}>{category}</button>
                ))}
              </div>
            </div>
            <div className="result-grid">
              {filteredAlternatives.map((alternative) => (
                <article className="alternative-card" key={alternative.name}>
                  <div className="alternative-card-top"><span className={`alternative-logo ${alternative.tone}`}>{alternative.name.slice(0, 1)}</span><span className="verified-label">✓ Vérifié</span></div>
                  <p className="replaces-label">Remplace <strong>{alternative.replaces}</strong></p>
                  <h3>{alternative.name}</h3>
                  <p className="alternative-description">{alternative.description}</p>
                  <div className="alternative-meta"><span className="pricing-label">{alternative.status}</span>{alternative.tags.map((tag) => <span className="meta-tag" key={tag}>{tag}</span>)}</div>
                </article>
              ))}
            </div>
            {filteredAlternatives.length === 0 && <p className="empty-preview">Aucune fiche dans cet aperçu. Essaie une autre recherche.</p>}
            <div className="catalogue-bottom"><span><b>{filteredAlternatives.length}</b> fiches dans cet aperçu</span><span className="preview-disclaimer">Données de démonstration</span></div>
          </div>
        </section>

        <section className="method-section section-wrap" id="methode">
          <div className="section-heading narrow-heading"><p className="eyebrow">02 / Notre méthode</p><h2>Le gratuit n’est pas un argument. C’est une information à expliquer.</h2></div>
          <div className="principles-grid">
            {PRINCIPLES.map((principle) => <article className="principle" key={principle.number}><span className="principle-number">{principle.number}</span><h3>{principle.title}</h3><p>{principle.text}</p></article>)}
          </div>
        </section>

        <section className="contribute-section section-wrap" id="contribuer">
          <div className="contribute-panel">
            <div className="contribute-copy"><p className="eyebrow">03 / La communauté</p><h2>Tu connais une pépite ? Ne la garde pas pour toi.</h2><p>Les meilleures alternatives sont souvent découvertes par l’usage. Partage une solution, une limite ou une astuce. La communauté propose, la modération vérifie.</p><a className="button button-light" href="#rejoindre">Être informé du lancement <span>↗</span></a></div>
            <div className="contribute-stack" aria-hidden="true"><div className="stack-card stack-card-back" /><div className="stack-card stack-card-middle" /><div className="stack-card stack-card-front"><span className="stack-plus">＋</span><strong>Ajouter une astuce</strong><small>Une contribution utile commence ici</small></div></div>
          </div>
        </section>

        <section className="join-section section-wrap" id="rejoindre">
          <div className="join-content"><p className="eyebrow">Bientôt disponible</p><h2>Les bons outils ne devraient pas être réservés à ceux qui peuvent tout payer.</h2><p>Inscris-toi pour suivre le lancement et nous aider à choisir les premières catégories du catalogue.</p><WaitlistForm /><small>Un seul email au lancement. Aucun spam.</small></div>
        </section>
      </main>

      <footer className="site-footer"><a className="brand" href="#top"><span className="brand-mark">A</span><span>Alternative<span className="brand-dot">.</span>IO</span></a><span>Le catalogue communautaire des alternatives qui ont du sens.</span><span>© {new Date().getFullYear()} Alternative.IO</span></footer>
    </div>
  );
}
