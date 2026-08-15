'use client';

import { useState } from 'react';

const CATEGORIES = ['IA', 'Productivité', 'Design', 'Développement', 'Vidéo', 'Audio', 'Photo', 'Écriture', 'Automatisation', 'Marketing', 'Collaboration', 'Sécurité', 'Finance', 'No-code', 'Utilitaires'];
type PaidProduct = { name: string; url: string; amount: string; currency: 'EUR' | 'USD' | 'GBP'; billing: 'monthly' | 'annual'; description: string };
const EMPTY_PRODUCT: PaidProduct = { name: '', url: '', amount: '', currency: 'EUR', billing: 'monthly', description: '' };
function formatPrice(product: PaidProduct) { return `${product.amount} ${product.currency === 'EUR' ? '€' : product.currency === 'GBP' ? '£' : '$'}${product.billing === 'annual' ? '/an' : '/mois'}`; }

export function ContributionForm() {
  const [products, setProducts] = useState<PaidProduct[]>([{ ...EMPTY_PRODUCT }]);
  const [form, setForm] = useState({ alternative_name: '', alternative_url: '', alternative_description: '', alternative_type: 'Gratuit', category: CATEGORIES[0], tags: '' });
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  function updateProduct(index: number, key: keyof PaidProduct, value: string) { setProducts((current) => current.map((product, productIndex) => productIndex === index ? { ...product, [key]: value } : product)); }
  function updateAlternative(key: keyof typeof form, value: string) { setForm((current) => ({ ...current, [key]: value })); }
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setState('loading'); setMessage('');
    try {
      const paidProducts = products.map((product) => ({ name: product.name.trim(), url: product.url.trim(), description: product.description.trim(), price: formatPrice(product), amount: Number(product.amount), currency: product.currency, billing: product.billing }));
      const response = await fetch('/api/proposals', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ paid_products: paidProducts, ...form, tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean) }) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || 'Impossible de publier cette proposition.');
      setState('success'); setMessage('Proposition reçue. Elle apparaîtra après validation.');
    } catch (error) { setState('error'); setMessage(error instanceof Error ? error.message : 'Impossible de publier cette proposition.'); }
  }
  if (state === 'success') return <p className="form-success">{message}</p>;
  return <form className="contribution-form" onSubmit={submit}>
    <div className="form-section-title"><span>01</span><div><h2>Outil(s) payant(s)</h2><p>Ajoute plusieurs outils qui répondent au même besoin.</p></div></div>
    {products.map((product, index) => <div className="paid-product-editor" key={index}><div className="form-product-heading"><strong>Outil {index + 1}</strong>{products.length > 1 && <button className="text-button" type="button" onClick={() => setProducts((current) => current.filter((_, productIndex) => productIndex !== index))}>Supprimer</button>}</div><div className="form-grid"><label>Nom du produit<input required value={product.name} onChange={(event) => updateProduct(index, 'name', event.target.value)} placeholder="Ex. Wispr Flow" /></label><label>URL officielle <span className="field-note">facultatif</span><input type="url" value={product.url} onChange={(event) => updateProduct(index, 'url', event.target.value)} placeholder="https://…" /></label><label>Prix minimum<input required min="0" step="0.01" inputMode="decimal" type="number" value={product.amount} onChange={(event) => updateProduct(index, 'amount', event.target.value)} placeholder="10" /></label><label>Devise<select value={product.currency} onChange={(event) => updateProduct(index, 'currency', event.target.value)}><option value="EUR">Euro (€)</option><option value="USD">Dollar ($)</option><option value="GBP">Livre (£)</option></select></label><label>Facturation<select value={product.billing} onChange={(event) => updateProduct(index, 'billing', event.target.value)}><option value="monthly">Par mois</option><option value="annual">Par an</option></select></label><label className="form-field-wide">À quoi sert-il ?<textarea required value={product.description} onChange={(event) => updateProduct(index, 'description', event.target.value)} placeholder="Décris le besoin couvert en une phrase" /></label></div></div>)}
    <button className="button button-light add-product-button" type="button" onClick={() => setProducts((current) => [...current, { ...EMPTY_PRODUCT }])}>+ Ajouter un autre outil payant</button>
    <div className="form-section-title"><span>02</span><div><h2>Alternative proposée</h2><p>Une seule alternative peut remplacer plusieurs outils.</p></div></div>
    <div className="form-grid"><label>Nom de l’alternative<input required value={form.alternative_name} onChange={(event) => updateAlternative('alternative_name', event.target.value)} placeholder="Ex. Handy" /></label><label>URL de l’alternative <span className="field-note">facultatif</span><input type="url" value={form.alternative_url} onChange={(event) => updateAlternative('alternative_url', event.target.value)} placeholder="https://…" /></label><label>Modèle<select value={form.alternative_type} onChange={(event) => updateAlternative('alternative_type', event.target.value)}><option>Gratuit</option><option>Freemium</option><option>Open source</option><option>Source available</option></select></label><label>Catégorie<select value={form.category} onChange={(event) => updateAlternative('category', event.target.value)}>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></label><label className="form-field-wide">Ce que l’alternative permet de faire<textarea required value={form.alternative_description} onChange={(event) => updateAlternative('alternative_description', event.target.value)} placeholder="Ex. Speech-to-text rapide pour écrire à la voix" /></label><label className="form-field-wide">Tags<input value={form.tags} onChange={(event) => updateAlternative('tags', event.target.value)} placeholder="voix, transcription, desktop" /></label></div>
    <button className="button button-primary" disabled={state === 'loading'} type="submit">{state === 'loading' ? 'Publication…' : 'Publier la proposition'} <span>↗</span></button>
    {state === 'error' && <p className="form-error" role="alert">{message}</p>}
  </form>;
}
