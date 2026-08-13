'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { CATALOGUE_CATEGORIES, CATALOGUE_PREVIEW, filterCatalogue, getComparisonDifference, type CatalogueItem } from '@/lib/catalogue';
import { mapDatabasePair, type DatabasePair } from '@/lib/catalogue-db';
import { getBrowserSupabase } from '@/lib/supabase-browser';

export function CatalogueExplorer() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tous');
  const [items, setItems] = useState<CatalogueItem[]>(CATALOGUE_PREVIEW);
  const [source, setSource] = useState<'preview' | 'database'>('preview');

  useEffect(() => {
    let active = true;
    async function loadCatalogue() {
      try {
        const { data, error } = await getBrowserSupabase()
          .from('alternative_pairs')
          .select('id,paid_name,paid_url,paid_description,paid_price,alternative_name,alternative_url,alternative_description,alternative_type,category,tags,limits,platforms,created_at')
          .order('created_at', { ascending: false });
        if (!active || error || !data?.length) return;
        setItems((data as DatabasePair[]).map((row, index) => mapDatabasePair(row, index)));
        setSource('database');
      } catch {
        // Le catalogue de démonstration reste visible si Supabase n’est pas configuré.
      }
    }
    const timer = window.setTimeout(() => { void loadCatalogue(); }, 0);
    return () => { active = false; window.clearTimeout(timer); };
  }, []);

  const results = useMemo(() => filterCatalogue(items, query, category), [category, items, query]);

  return (
    <section className="comparison-list-shell" aria-label="Catalogue des alternatives">
      <div className="comparison-controls">
        <label className="comparison-search">
          <span aria-hidden="true">⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher une application…" aria-label="Rechercher une application" />
        </label>
        <div className="comparison-filters" aria-label="Filtrer par catégorie">
          {CATALOGUE_CATEGORIES.map((item) => <button key={item} className={category === item ? 'comparison-filter active' : 'comparison-filter'} onClick={() => setCategory(item)} type="button">{item}</button>)}
        </div>
      </div>

      <div className="comparison-list-meta"><span>{results.length} alternative{results.length > 1 ? 's' : ''}</span><span>{source === 'database' ? 'Catalogue à jour' : 'Catalogue de démonstration'}</span></div>

      <div className="comparison-table" role="table" aria-label="Comparaison des outils payants et alternatives">
        <div className="comparison-row comparison-head" role="row">
          <span>Application</span><span>Prix</span><span>Alternative</span><span>Ce qu’elle permet</span><span>Différence</span>
        </div>
        {results.map((item) => (
          <Link className="comparison-row comparison-item" href={`/catalogue/${item.id}`} key={item.id} role="row">
            <span className="comparison-app" role="cell"><i className={`comparison-logo ${item.tone}`}>{item.paidProduct.name.slice(0, 1)}</i><strong>{item.paidProduct.name}</strong><small>{item.category}</small></span>
            <span className="comparison-price-cell" role="cell">{item.paidProduct.price}</span>
            <span className="comparison-alt" role="cell"><i className={`comparison-logo ${item.tone}`}>{item.freeAlternative.name.slice(0, 1)}</i><strong>{item.freeAlternative.name}</strong><small>{item.freeAlternative.type}</small></span>
            <span className="comparison-capability" role="cell">{item.freeAlternative.description}</span>
            <span className="comparison-difference" role="cell">{getComparisonDifference(item)}</span>
          </Link>
        ))}
      </div>
      {results.length === 0 && <p className="empty-preview">Aucune application trouvée. Essaie un autre nom.</p>}
    </section>
  );
}
