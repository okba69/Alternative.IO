'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GoogleAuthButton } from '@/components/GoogleAuthButton';
import { getBrowserSupabase } from '@/lib/supabase-browser';
import { isAdminRole } from '@/lib/access';

type AdminProfile = { id: string; display_name: string | null; role: string; created_at: string };
type AdminPair = { id: string; paid_name: string; alternative_name: string; category: string; status: 'pending' | 'approved' | 'rejected'; created_at: string };
type AdminRequest = { id: string; title: string; category: string; status: 'pending' | 'approved' | 'rejected'; created_at: string };

export function AdminPage() {
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState('');
  const [profiles, setProfiles] = useState<AdminProfile[]>([]);
  const [pairs, setPairs] = useState<AdminPair[]>([]);
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'signed-out' | 'forbidden' | 'unavailable'>('loading');
  const [message, setMessage] = useState('');

  async function loadAdmin() {
    try {
      const supabase = getBrowserSupabase();
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) { setState('signed-out'); return; }
      setUserId(userData.user.id);
      const { data: profileData, error: profileError } = await supabase.from('profiles').select('id,display_name,role,created_at').eq('id', userData.user.id).maybeSingle();
      if (profileError) throw profileError;
      const profile = profileData as AdminProfile | null;
      setRole(profile?.role ?? 'user');
      if (!isAdminRole(profile?.role)) { setState('forbidden'); return; }
      const [profilesResult, pairsResult, requestsResult] = await Promise.all([
        supabase.from('profiles').select('id,display_name,role,created_at').order('created_at', { ascending: false }),
        supabase.from('alternative_pairs').select('id,paid_name,alternative_name,category,status,created_at').order('created_at', { ascending: false }),
        supabase.from('requests').select('id,title,category,status,created_at').order('created_at', { ascending: false }),
      ]);
      if (profilesResult.error || pairsResult.error || requestsResult.error) throw profilesResult.error || pairsResult.error || requestsResult.error;
      setProfiles((profilesResult.data ?? []) as AdminProfile[]); setPairs((pairsResult.data ?? []) as AdminPair[]); setRequests((requestsResult.data ?? []) as AdminRequest[]); setState('ready');
    } catch { setState('unavailable'); }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadAdmin(); }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  async function deletePair(id: string) {
    if (!window.confirm('Supprimer cette comparaison du catalogue ?')) return;
    const { error } = await getBrowserSupabase().from('alternative_pairs').delete().eq('id', id);
    if (error) { setMessage('Suppression refusée ou indisponible.'); return; }
    setPairs((items) => items.filter((item) => item.id !== id));
  }

  async function updatePairStatus(id: string, status: 'approved' | 'rejected') {
    const { error } = await getBrowserSupabase().from('alternative_pairs').update({ status } as never).eq('id', id);
    if (error) { setMessage('Modification refusée par les règles de sécurité.'); return; }
    setPairs((items) => items.map((item) => item.id === id ? { ...item, status } : item));
    setMessage(status === 'approved' ? 'Alternative approuvée et visible dans le catalogue.' : 'Alternative refusée.');
  }

  async function deleteRequest(id: string) {
    if (!window.confirm('Supprimer cette request et ses réponses ?')) return;
    const { error } = await getBrowserSupabase().from('requests').delete().eq('id', id);
    if (error) { setMessage('Suppression refusée ou indisponible.'); return; }
    setRequests((items) => items.filter((item) => item.id !== id));
  }

  async function updateRequestStatus(id: string, status: 'approved' | 'rejected') {
    const { error } = await getBrowserSupabase().from('requests').update({ status } as never).eq('id', id);
    if (error) { setMessage('Modification refusée par les règles de sécurité.'); return; }
    setRequests((items) => items.map((item) => item.id === id ? { ...item, status } : item));
    setMessage(status === 'approved' ? 'Request approuvée et visible sur la page Request.' : 'Request refusée.');
  }

  if (state === 'loading') return <main className="admin-page"><p className="empty-preview">Vérification des droits admin…</p></main>;
  if (state === 'signed-out') return <main className="admin-page"><section className="account-empty"><p className="account-kicker">USEINSTEAD / ADMIN</p><h1>Connexion Google requise.</h1><p>Connecte-toi avec le compte Google qui doit gérer les validations.</p><GoogleAuthButton redirectPath="/admin" /><Link href="/">← Retour au catalogue</Link></section></main>;
  if (state === 'forbidden') return <main className="admin-page"><section className="account-empty"><p className="account-kicker">USEINSTEAD / ADMIN</p><h1>Compte connecté, rôle admin manquant.</h1><p>Ton compte possède actuellement le rôle : {role || 'user'}.</p><p>Dans Supabase, ouvre Authentication → Users, vérifie cet identifiant, puis attribue le rôle admin dans SQL Editor :</p><code className="admin-id">{userId}</code><pre className="admin-sql">{`update public.profiles\nset role = 'admin', updated_at = now()\nwhere id = '${userId}';`}</pre><p>Déconnecte-toi puis reconnecte-toi après l’exécution.</p><Link href="/">← Retour au catalogue</Link></section></main>;
  if (state === 'unavailable') return <main className="admin-page"><section className="account-empty"><p className="account-kicker">USEINSTEAD / ADMIN</p><h1>L’administration attend la configuration.</h1><p>La connexion Google, le schéma Supabase et le rôle admin doivent être confirmés avant l’ouverture de cet espace.</p><GoogleAuthButton redirectPath="/admin" /><Link className="account-link" href="/">← Retour au catalogue</Link></section></main>;

  return <main className="admin-page"><header className="admin-header"><div><Link className="account-back" href="/">← Catalogue</Link><p className="account-kicker">USEINSTEAD / ADMIN</p><h1>Pilotage du catalogue.</h1><p>Gestion réservée aux profils admin vérifiés par Supabase.</p></div><Link className="account-link" href="/account">Mon espace utilisateur ↗</Link></header><div className="account-stats"><div><strong>{pairs.filter((item) => item.status === 'pending').length + requests.filter((item) => item.status === 'pending').length}</strong><span>À valider</span></div><div><strong>{pairs.filter((item) => item.status === 'approved').length}</strong><span>Approuvées</span></div><div><strong>{profiles.length}</strong><span>Profils</span></div></div>{message && <p className="form-success dark-error">{message}</p>}<section className="admin-section"><div className="account-section-heading"><div><p className="account-kicker">01 / Modération</p><h2>Alternatives proposées</h2></div></div><div className="admin-table">{pairs.map((item) => <div className="admin-row" key={item.id}><span><strong>{item.paid_name} → {item.alternative_name}</strong><small>{item.category} · {item.status === 'pending' ? 'En attente' : item.status === 'approved' ? 'Approuvée' : 'Refusée'}</small></span>{item.status !== 'approved' && <button type="button" onClick={() => void updatePairStatus(item.id, 'approved')}>Approuver</button>}{item.status !== 'rejected' && <button type="button" onClick={() => void updatePairStatus(item.id, 'rejected')}>Refuser</button>}<Link href={`/catalogue/${item.id}`}>Voir</Link><button type="button" onClick={() => void deletePair(item.id)}>Supprimer</button></div>)}{pairs.length === 0 && <p className="account-empty-line">Aucune proposition à modérer.</p>}</div></section><section className="admin-section"><div className="account-section-heading"><div><p className="account-kicker">02 / Requests</p><h2>Requests à valider</h2></div></div><div className="admin-table">{requests.map((item) => <div className="admin-row" key={item.id}><span><strong>{item.title}</strong><small>{item.category} · {item.status === 'pending' ? 'En attente' : item.status === 'approved' ? 'Approuvée' : 'Refusée'}</small></span>{item.status !== 'approved' && <button type="button" onClick={() => void updateRequestStatus(item.id, 'approved')}>Approuver</button>}{item.status !== 'rejected' && <button type="button" onClick={() => void updateRequestStatus(item.id, 'rejected')}>Refuser</button>}<Link href={`/requests/${item.id}`}>Voir</Link><button type="button" onClick={() => void deleteRequest(item.id)}>Supprimer</button></div>)}{requests.length === 0 && <p className="account-empty-line">Aucune request persistée.</p>}</div></section><section className="admin-section"><div className="account-section-heading"><div><p className="account-kicker">03 / Profils</p><h2>Utilisateurs</h2></div></div><div className="admin-table">{profiles.map((item) => <div className="admin-row" key={item.id}><span><strong>{item.display_name || 'Profil sans nom'}</strong><small>{new Date(item.created_at).toLocaleDateString('fr-FR')}</small></span><b>{item.role}</b></div>)}</div></section></main>;
}
