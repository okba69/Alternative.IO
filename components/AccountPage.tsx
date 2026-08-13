'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GoogleAuthButton } from '@/components/GoogleAuthButton';
import { SessionPanel } from '@/components/SessionPanel';
import { getBrowserSupabase } from '@/lib/supabase-browser';

type Profile = { id: string; display_name: string | null; avatar_url: string | null; role: string };
type Contribution = { id: string; paid_name: string; alternative_name: string; category: string; created_at: string };
type UserRequest = { id: string; title: string; category: string; created_at: string };

export function AccountPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [requests, setRequests] = useState<UserRequest[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'signed-out' | 'unavailable'>('loading');

  useEffect(() => {
    let active = true;
    async function loadAccount() {
      try {
        const supabase = getBrowserSupabase();
        const { data: authData } = await supabase.auth.getUser();
        if (!authData.user) { if (active) setState('signed-out'); return; }
        const [profileResult, contributionResult, requestResult] = await Promise.all([
          supabase.from('profiles').select('id,display_name,avatar_url,role').eq('id', authData.user.id).maybeSingle(),
          supabase.from('alternative_pairs').select('id,paid_name,alternative_name,category,created_at').eq('created_by', authData.user.id).order('created_at', { ascending: false }),
          supabase.from('requests').select('id,title,category,created_at').eq('created_by', authData.user.id).order('created_at', { ascending: false }),
        ]);
        if (active) { setProfile(profileResult.data as Profile | null); setContributions((contributionResult.data ?? []) as Contribution[]); setRequests((requestResult.data ?? []) as UserRequest[]); setState('ready'); }
      } catch { if (active) setState('unavailable'); }
    }
    const timer = window.setTimeout(() => { void loadAccount(); }, 0);
    return () => { active = false; window.clearTimeout(timer); };
  }, []);

  if (state === 'loading') return <main className="account-page"><p className="empty-preview">Chargement de ton espace…</p></main>;
  if (state === 'signed-out') return <main className="account-page"><section className="account-empty"><p className="account-kicker">USEINSTEAD / ESPACE UTILISATEUR</p><h1>Connecte-toi pour retrouver tes contributions.</h1><GoogleAuthButton /><Link href="/">← Retour au catalogue</Link></section></main>;
  if (state === 'unavailable') return <main className="account-page"><section className="account-empty"><p className="account-kicker">USEINSTEAD / ESPACE UTILISATEUR</p><h1>Ton espace arrive juste après la connexion.</h1><p>La connexion Google ou la base Supabase n’est pas encore disponible sur cet environnement.</p><GoogleAuthButton /><Link className="account-link" href="/">← Retour au catalogue</Link></section></main>;

  return <main className="account-page">
    <header className="account-header"><div><Link className="account-back" href="/">← Catalogue</Link><p className="account-kicker">USEINSTEAD / ESPACE UTILISATEUR</p><h1>{profile?.display_name || 'Mon espace'}</h1><p>Gère tes contributions et les requests que tu as créées.</p></div><SessionPanel /></header>
    <div className="account-stats"><div><strong>{contributions.length}</strong><span>Comparaisons publiées</span></div><div><strong>{requests.length}</strong><span>Requests créées</span></div><div><strong>{profile?.role === 'admin' ? 'Admin' : 'Membre'}</strong><span>Rôle du compte</span></div></div>
    <section className="account-section"><div className="account-section-heading"><div><p className="account-kicker">01 / Contributions</p><h2>Mes comparaisons</h2></div><Link className="account-link" href="/requests">Ajouter une contribution ↗</Link></div>{contributions.length === 0 ? <p className="account-empty-line">Aucune comparaison publiée pour le moment.</p> : <div className="account-list">{contributions.map((item) => <Link href={`/catalogue/${item.id}`} className="account-row" key={item.id}><span><strong>{item.paid_name}</strong><small>{item.category}</small></span><b>→</b><span><strong>{item.alternative_name}</strong><small>Publié le {new Date(item.created_at).toLocaleDateString('fr-FR')}</small></span></Link>)}</div>}</section>
    <section className="account-section"><div className="account-section-heading"><div><p className="account-kicker">02 / Requests</p><h2>Mes demandes</h2></div><Link className="account-link" href="/requests">Créer une request ↗</Link></div>{requests.length === 0 ? <p className="account-empty-line">Aucune request créée pour le moment.</p> : <div className="account-list">{requests.map((item) => <Link href={`/requests/${item.id}`} className="account-row single" key={item.id}><span><strong>{item.title}</strong><small>{item.category} · Publiée le {new Date(item.created_at).toLocaleDateString('fr-FR')}</small></span><b>↗</b></Link>)}</div>}</section>
  </main>;
}
