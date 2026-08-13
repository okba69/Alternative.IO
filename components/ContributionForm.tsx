'use client';

import { useState } from 'react';
import { getBrowserSupabase } from '@/lib/supabase-browser';

const CATEGORIES = ['IA', 'Productivité', 'Design', 'Développement', 'Vidéo', 'Automatisation', 'Marketing'];

export function ContributionForm() {
  const [form, setForm] = useState({ paid_name: '', paid_url: '', paid_description: '', paid_price: '', alternative_name: '', alternative_url: '', alternative_description: '', alternative_type: 'Gratuit', category: CATEGORIES[0], tags: '' });
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  function update(key: keyof typeof form, value: string) { setForm((current) => ({ ...current, [key]: value })); }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setState('loading'); setMessage('');
    try {
      const supabase = getBrowserSupabase();
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Connecte-toi avec Google avant de contribuer.');
      const payload = {
        ...form,
        tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        limits: [] as string[],
        platforms: [] as string[],
        created_by: userData.user.id,
      };
      const { error } = await supabase.from('alternative_pairs').insert(payload as never);
      if (error) throw error;
      setState('success'); setMessage('La comparaison est publiée dans le catalogue.');
    } catch { setState('error'); setMessage('Impossible de publier pour le moment. Vérifie ta connexion Google et réessaie.'); }
  }

  if (state === 'success') return <p className="form-success">{message}</p>;
  return <form className="contribution-form" onSubmit={submit}>
    <div className="form-section-title"><span>01</span><h2>Produit payant</h2></div>
    <div className="form-grid"><input required value={form.paid_name} onChange={(event) => update('paid_name', event.target.value)} placeholder="Nom du produit" /><input required type="url" value={form.paid_url} onChange={(event) => update('paid_url', event.target.value)} placeholder="URL officielle" /><input required value={form.paid_price} onChange={(event) => update('paid_price', event.target.value)} placeholder="Prix ou plan de départ" /><textarea required value={form.paid_description} onChange={(event) => update('paid_description', event.target.value)} placeholder="À quoi sert-il ?" /></div>
    <div className="form-section-title"><span>02</span><h2>Alternative</h2></div>
    <div className="form-grid"><input required value={form.alternative_name} onChange={(event) => update('alternative_name', event.target.value)} placeholder="Nom de l’alternative" /><input required type="url" value={form.alternative_url} onChange={(event) => update('alternative_url', event.target.value)} placeholder="URL de l’alternative" /><select value={form.alternative_type} onChange={(event) => update('alternative_type', event.target.value)}><option>Gratuit</option><option>Freemium</option><option>Open source</option><option>Source available</option></select><select value={form.category} onChange={(event) => update('category', event.target.value)}>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select><textarea required value={form.alternative_description} onChange={(event) => update('alternative_description', event.target.value)} placeholder="Ce que l’alternative permet de faire" /><input value={form.tags} onChange={(event) => update('tags', event.target.value)} placeholder="Tags séparés par des virgules" /></div>
    <button className="button button-primary" disabled={state === 'loading'} type="submit">{state === 'loading' ? 'Publication…' : 'Publier la comparaison'} <span>↗</span></button>
    {state === 'error' && <p className="form-error" role="alert">{message}</p>}
  </form>;
}
