'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GoogleAuthButton } from '@/components/GoogleAuthButton';
import { SessionPanel } from '@/components/SessionPanel';
import { getBrowserSupabase } from '@/lib/supabase-browser';

type RequestItem = { id: string; title: string; description: string; category: string; created_at: string };

const CATEGORIES = ['IA', 'Productivité', 'Design', 'Développement', 'Vidéo', 'Automatisation', 'Marketing'];

export function RequestsBoard() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '', category: CATEGORIES[0] });
  const [message, setMessage] = useState('');

  async function loadRequests() {
    try {
      const { data, error } = await getBrowserSupabase().from('requests').select('id,title,description,category,created_at').eq('status', 'approved').order('created_at', { ascending: false });
      if (error) throw error;
      setRequests(data ?? []);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Les demandes distantes ne sont pas encore configurées.'); }
    finally { setLoading(false); }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadRequests(); }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  async function createRequest(event: React.FormEvent) {
    event.preventDefault(); setMessage('');
    try {
      const supabase = getBrowserSupabase();
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Connecte-toi avec Google pour publier une request.');
      const { error } = await supabase.from('requests').insert({ ...form, created_by: userData.user.id, status: 'pending' } as never);
      if (error) throw error;
      setForm({ title: '', description: '', category: CATEGORIES[0] });
      await loadRequests();
      setMessage('Request envoyée pour validation.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Connecte-toi avec Google pour publier une demande.'); }
  }

  return <>
    <section className="request-board-head"><div><p className="eyebrow">Requests validées</p><h2>Les demandes du catalogue.</h2><p>Les requests sont publiées après validation.</p></div></section>
    <div className="request-layout">
      <div className="request-list">{loading && <p className="empty-preview">Chargement des requests…</p>}{!loading && requests.length === 0 && <p className="empty-preview">Aucune request distante pour le moment. Sois le premier à en créer une.</p>}{requests.map((item) => <Link className="request-card" href={`/requests/${item.id}`} key={item.id}><span className="request-status">REQUEST OUVERTE · {item.category}</span><h3>{item.title}</h3><p>{item.description}</p><small>Ouvrir la discussion ↗</small></Link>)}</div>
      <aside className="request-side"><SessionPanel /><p className="request-side-note">Les requests sont visibles après validation. L’espace admin est réservé à l’équipe UseInstead.</p><GoogleAuthButton compact /></aside>
    </div>
    <section className="request-create"><p className="eyebrow">Nouvelle demande</p><h2>Quel outil payant veux-tu remplacer ?</h2><form onSubmit={createRequest} className="request-form"><input required value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Une alternative à…" /><textarea required value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} placeholder="Décris rapidement ton besoin" /><select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select><button className="button button-light" type="submit">Publier la demande <span>↗</span></button></form>{message && <p className="form-message">{message}</p>}</section>
  </>;
}
