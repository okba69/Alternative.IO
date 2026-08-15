'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GoogleAuthButton } from '@/components/GoogleAuthButton';
import type { CatalogueItem } from '@/lib/catalogue';
import { mapDatabasePair, type DatabasePair } from '@/lib/catalogue-db';
import { getBrowserSupabase } from '@/lib/supabase-browser';
import { LikeButton } from '@/components/LikeButton';

type CatalogueDetailProps = { id: string };

export function CatalogueDetail({ id }: CatalogueDetailProps) {
  const [item, setItem] = useState<CatalogueItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function loadRemoteItem() {
      try {
        const supabase = getBrowserSupabase();
        const { data, error } = await supabase.from('alternative_pairs').select('id,paid_name,paid_url,paid_description,paid_price,paid_products,alternative_name,alternative_url,alternative_description,alternative_type,category,tags,limits,platforms,created_at').eq('id', id).eq('status', 'approved').maybeSingle();
        if (active && !error && data) {
          const mapped = mapDatabasePair(data as DatabasePair);
          const { data: likes } = await supabase.from('alternative_like_counts').select('like_count').eq('pair_id', id).maybeSingle();
          mapped.likesCount = Number((likes as { like_count?: number } | null)?.like_count ?? 0);
          setItem(mapped);
        }
      } catch {
        // Le fallback local reste affiché si la base publique n’est pas configurée.
      } finally {
        if (active) setLoading(false);
      }
    }
    const timer = window.setTimeout(() => { void loadRemoteItem(); }, 0);
    return () => { active = false; window.clearTimeout(timer); };
  }, [id]);

  if (loading) return <main className="inner-page"><p className="empty-preview">Chargement de la fiche…</p></main>;
  if (!item) return <main className="inner-page"><p className="form-error dark-error">Cette fiche n’existe pas ou n’est pas encore disponible.</p><Link className="text-link" href="/catalogue">← Retour au catalogue</Link></main>;

  return <main className="inner-page detail-page">
    <div className="inner-page-header detail-header"><div><Link className="text-link" href="/catalogue">← Retour au catalogue</Link><p className="eyebrow detail-eyebrow">Comparaison / {item.category}</p><h1>{item.paidProduct.name} <em>→</em> {item.freeAlternative.name}</h1><p className="inner-lede">Une comparaison courte pour comprendre ce que l’alternative couvre et où se trouvent ses limites.</p></div><GoogleAuthButton compact /></div>
    <div className="detail-grid">
      <article className="detail-card paid-detail"><span className="detail-kicker">Outil(s) payant(s)</span>{(item.paidProducts?.length ? item.paidProducts : [item.paidProduct]).map((product) => <div className="paid-detail-product" key={`${product.name}-${product.url}`}><h2><img className="detail-logo" src={`https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(product.url)}&sz=64`} alt="" />{product.name}</h2><p>{product.description}</p><strong>{product.price}</strong><a href={product.url} target="_blank" rel="noreferrer">Voir le site officiel ↗</a></div>)}</article>
      <article className={`detail-card free-detail ${item.tone}`}><span className="detail-kicker">Alternative {item.freeAlternative.type}</span><h2><img className="detail-logo" src={`https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(item.freeAlternative.url)}&sz=64`} alt="" />{item.freeAlternative.name}</h2><p>{item.freeAlternative.description}</p><strong>{item.freeAlternative.type}</strong><a href={item.freeAlternative.url} target="_blank" rel="noreferrer">Voir l’alternative ↗</a></article>
    </div>
    <section className="detail-info-grid"><article><span className="detail-kicker">Ce qu’il faut savoir</span><h2>Les limites visibles</h2><ul>{item.limits.map((limit) => <li key={limit}>{limit}</li>)}</ul></article><article><span className="detail-kicker">Contexte</span><h2>Usage et accès</h2><p>Catégorie : <strong>{item.category}</strong></p><p>Plateformes : <strong>{item.platforms.join(' · ') || 'À préciser'}</strong></p><p>État : <strong>{item.verifiedAt}</strong></p></article></section>
    <div className="detail-footer"><LikeButton pairId={item.id} initialCount={item.likesCount} initialLiked={item.likedByCurrentUser} /><Link className="button button-primary" href="/requests">Demander une autre alternative <span>↗</span></Link></div>
  </main>;
}
