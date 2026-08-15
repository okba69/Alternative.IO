'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { CATALOGUE_CATEGORIES, filterCatalogue, getComparisonDifference, type CatalogueItem } from '@/lib/catalogue';
import { mapDatabasePair, type DatabasePair } from '@/lib/catalogue-db';
import { getBrowserSupabase } from '@/lib/supabase-browser';
import { LikeButton } from '@/components/LikeButton';

export function CatalogueExplorer() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tous');
  const [tag, setTag] = useState('Tous les tags');
  const [sort, setSort] = useState<'recent' | 'popular'>('popular');
  const [items, setItems] = useState<CatalogueItem[]>([]);
  const [source, setSource] = useState<'preview' | 'database'>('preview');
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    async function loadCatalogue() {
      try {
        const supabase = getBrowserSupabase();
        const { data, error } = await supabase
          .from('alternative_pairs')
          .select('id,paid_name,paid_url,paid_description,paid_price,paid_products,alternative_name,alternative_url,alternative_description,alternative_type,category,tags,limits,platforms,created_at')
          .order('created_at', { ascending: false });
        if (!active || error || !data?.length) return;
        const mapped = (data as DatabasePair[]).map((row, index) => mapDatabasePair(row, index));
        const { data: likes } = await supabase.from('alternative_like_counts').select('pair_id,like_count');
        if (likes) {
          const counts = new Map<string, number>((likes as { pair_id: string; like_count: number }[]).map((like) => [like.pair_id, Number(like.like_count)]));
          for (const item of mapped) item.likesCount = counts.get(item.id) ?? 0;
        }
        const tags = [...new Set(mapped.flatMap((item) => item.tags))].sort((a, b) => a.localeCompare(b, 'fr'));
        setItems(mapped);
        setAvailableTags(tags);
        setSource('database');
      } catch {
        // Le catalogue de démonstration reste visible si Supabase n’est pas configuré.
      }
    }
    const timer = window.setTimeout(() => { void loadCatalogue(); }, 0);
    return () => { active = false; window.clearTimeout(timer); };
  }, []);

  const results = useMemo(() => {
    const filtered = filterCatalogue(items, query, category).filter((item) => tag === 'Tous les tags' || item.tags.includes(tag));
    return [...filtered].sort((a, b) => sort === 'popular'
      ? b.likesCount - a.likesCount
      : (b.createdAt ?? '').localeCompare(a.createdAt ?? ''));
  }, [category, items, query, sort, tag]);

  return (
    <section className="comparison-list-shell" aria-label="Catalogue des alternatives">
      <div className="comparison-controls">
        <label className="comparison-search">
          <span aria-hidden="true">⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher une application…" aria-label="Rechercher une application" />
        </label>
        <label className="catalogue-category-select">Catégorie <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filtrer par catégorie">{CATALOGUE_CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>

      <div className="catalogue-toolbar">
        <div className="catalogue-tags" aria-label="Filtrer par tag">
          {['Tous les tags', ...availableTags].map((item) => <button key={item} className={tag === item ? 'catalogue-tag active' : 'catalogue-tag'} onClick={() => setTag(item)} type="button">#{item}</button>)}
        </div>
        <label className="catalogue-sort">Trier par <select value={sort} onChange={(event) => setSort(event.target.value as 'recent' | 'popular')}><option value="popular">Les plus aimées</option><option value="recent">Les plus récentes</option></select></label>
      </div>

      <div className="comparison-list-meta"><span>{results.length} alternative{results.length > 1 ? 's' : ''}</span><span>{source === 'database' ? 'Catalogue à jour' : 'Catalogue de démonstration'}</span></div>

      <div className="comparison-table" role="table" aria-label="Comparaison des outils payants et alternatives">
        <div className="comparison-row comparison-head" role="row">
            <span aria-hidden="true" /><span>Application</span><span>Prix</span><span>Alternative</span><span>Ce qu’elle permet</span><span>Différence</span>
        </div>
        {results.map((item) => (
          <div className="comparison-row comparison-item" key={item.id} role="row">
            <LikeButton compact pairId={item.id} initialCount={item.likesCount} initialLiked={item.likedByCurrentUser} />
            <span className="comparison-app" role="cell">{item.paidProduct.url ? <img className="comparison-logo" src={`https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(item.paidProduct.url)}&sz=64`} alt="" /> : <i className={`comparison-logo ${item.tone}`}>{item.paidProduct.name.slice(0, 1)}</i>}<strong><Link href={`/catalogue/${item.id}`}>{item.paidProduct.name}</Link></strong><small>{item.category}</small></span>
            <span className="comparison-price-cell" role="cell">{item.paidProduct.price}</span>
            <span className="comparison-alt" role="cell">{item.freeAlternative.url ? <img className="comparison-logo" src={`https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(item.freeAlternative.url)}&sz=64`} alt="" /> : <i className={`comparison-logo ${item.tone}`}>{item.freeAlternative.name.slice(0, 1)}</i>}<strong>{item.freeAlternative.url ? <a href={item.freeAlternative.url} target="_blank" rel="noreferrer">{item.freeAlternative.name} ↗</a> : item.freeAlternative.name}</strong><small>{item.freeAlternative.type}</small></span>
            <span className="comparison-capability" role="cell">{item.freeAlternative.description}</span>
            <span className="comparison-difference" role="cell">{getComparisonDifference(item)}<small className="comparison-likes">♡ {item.likesCount}</small></span>
          </div>
        ))}
      </div>
      {results.length === 0 && <p className="empty-preview">Aucune application trouvée. Essaie un autre nom.</p>}
    </section>
  );
}
