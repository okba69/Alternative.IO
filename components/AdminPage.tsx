'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GoogleAuthButton } from '@/components/GoogleAuthButton';
import { getBrowserSupabase } from '@/lib/supabase-browser';
import { isAdminRole } from '@/lib/access';

type Status = 'pending' | 'approved' | 'rejected';
type AdminProfile = { id: string; display_name: string | null; role: string; created_at: string };
type AdminPair = { id: string; paid_name: string; alternative_name: string; category: string; status: Status; created_at: string };
type AdminRequest = { id: string; title: string; category: string; status: Status; created_at: string };
type AdminProposal = { id: string; request_id: string; alternative_name: string; explanation: string; status: Status; created_at: string };
type AdminTab = 'alternatives' | 'requests' | 'responses' | 'catalogue' | 'profiles';

const TABS: Array<{ id: AdminTab; label: string; kicker: string }> = [
  { id: 'alternatives', label: 'Validation alternatives', kicker: '01' },
  { id: 'requests', label: 'Validation requests', kicker: '02' },
  { id: 'responses', label: 'Validation réponses', kicker: '03' },
  { id: 'catalogue', label: 'Gestion des alternatives', kicker: '04' },
  { id: 'profiles', label: 'Utilisateurs', kicker: '05' },
];

function statusLabel(status: Status) {
  return status === 'pending' ? 'En attente' : status === 'approved' ? 'Approuvée' : 'Refusée';
}

export function AdminPage() {
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState('');
  const [profiles, setProfiles] = useState<AdminProfile[]>([]);
  const [pairs, setPairs] = useState<AdminPair[]>([]);
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [proposals, setProposals] = useState<AdminProposal[]>([]);
  const [tab, setTab] = useState<AdminTab>('alternatives');
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
      const [profilesResult, pairsResult, requestsResult, proposalsResult] = await Promise.all([
        supabase.from('profiles').select('id,display_name,role,created_at').order('created_at', { ascending: false }),
        supabase.from('alternative_pairs').select('id,paid_name,alternative_name,category,status,created_at').order('created_at', { ascending: false }),
        supabase.from('requests').select('id,title,category,status,created_at').order('created_at', { ascending: false }),
        supabase.from('request_proposals').select('id,request_id,alternative_name,explanation,status,created_at').order('created_at', { ascending: false }),
      ]);
      if (profilesResult.error || pairsResult.error || requestsResult.error || proposalsResult.error) throw profilesResult.error || pairsResult.error || requestsResult.error || proposalsResult.error;
      setProfiles((profilesResult.data ?? []) as AdminProfile[]);
      setPairs((pairsResult.data ?? []) as AdminPair[]);
      setRequests((requestsResult.data ?? []) as AdminRequest[]);
      setProposals((proposalsResult.data ?? []) as AdminProposal[]);
      setState('ready');
    } catch { setState('unavailable'); }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadAdmin(); }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  async function deletePair(id: string) {
    if (!window.confirm('Supprimer cette alternative du catalogue ?')) return;
    const { error } = await getBrowserSupabase().from('alternative_pairs').delete().eq('id', id);
    if (error) { setMessage('Suppression refusée ou indisponible.'); return; }
    setPairs((items) => items.filter((item) => item.id !== id));
    setMessage('Alternative supprimée.');
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
    setMessage('Request supprimée.');
  }

  async function updateRequestStatus(id: string, status: 'approved' | 'rejected') {
    const { error } = await getBrowserSupabase().from('requests').update({ status } as never).eq('id', id);
    if (error) { setMessage('Modification refusée par les règles de sécurité.'); return; }
    setRequests((items) => items.map((item) => item.id === id ? { ...item, status } : item));
    setMessage(status === 'approved' ? 'Request approuvée et visible publiquement.' : 'Request refusée.');
  }

  async function deleteProposal(id: string) {
    if (!window.confirm('Supprimer cette réponse ?')) return;
    const { error } = await getBrowserSupabase().from('request_proposals').delete().eq('id', id);
    if (error) { setMessage('Suppression refusée ou indisponible.'); return; }
    setProposals((items) => items.filter((item) => item.id !== id));
    setMessage('Réponse supprimée.');
  }

  async function updateProposalStatus(id: string, status: 'approved' | 'rejected') {
    const { error } = await getBrowserSupabase().from('request_proposals').update({ status } as never).eq('id', id);
    if (error) { setMessage('Modification refusée par les règles de sécurité.'); return; }
    setProposals((items) => items.map((item) => item.id === id ? { ...item, status } : item));
    setMessage(status === 'approved' ? 'Réponse approuvée et visible dans la request.' : 'Réponse refusée.');
  }

  if (state === 'loading') return <main className="admin-page"><p className="empty-preview">Vérification des droits admin…</p></main>;
  if (state === 'signed-out') return <main className="admin-page"><section className="account-empty"><p className="account-kicker">USEINSTEAD / ADMIN</p><h1>Connexion Google requise.</h1><p>Connecte-toi avec le compte Google qui doit gérer les validations.</p><GoogleAuthButton redirectPath="/admin" /><Link href="/">← Retour au catalogue</Link></section></main>;
  if (state === 'forbidden') return <main className="admin-page"><section className="account-empty"><p className="account-kicker">USEINSTEAD / ADMIN</p><h1>Compte connecté, rôle admin manquant.</h1><p>Ton compte possède actuellement le rôle : {role || 'user'}.</p><p>Attribue le rôle admin dans Supabase → SQL Editor :</p><code className="admin-id">{userId}</code><pre className="admin-sql">{`update public.profiles\nset role = 'admin', updated_at = now()\nwhere id = '${userId}';`}</pre><p>Déconnecte-toi puis reconnecte-toi après l’exécution.</p><Link href="/">← Retour au catalogue</Link></section></main>;
  if (state === 'unavailable') return <main className="admin-page"><section className="account-empty"><p className="account-kicker">USEINSTEAD / ADMIN</p><h1>L’administration attend la configuration.</h1><p>La connexion Google, le schéma Supabase et le rôle admin doivent être confirmés avant l’ouverture de cet espace.</p><GoogleAuthButton redirectPath="/admin" /><Link className="account-link" href="/">← Retour au catalogue</Link></section></main>;

  const pendingCount = pairs.filter((item) => item.status === 'pending').length + requests.filter((item) => item.status === 'pending').length + proposals.filter((item) => item.status === 'pending').length;

  return <main className="admin-page">
    <header className="admin-header"><div><Link className="account-back" href="/">← Catalogue</Link><p className="account-kicker">USEINSTEAD / ADMIN</p><h1>Pilotage du catalogue.</h1><p>Gestion réservée aux profils admin vérifiés par Supabase.</p></div><Link className="account-link" href="/account">Mon espace utilisateur ↗</Link></header>
    <div className="admin-layout">
      <aside className="admin-sidebar" aria-label="Navigation admin"><p className="admin-sidebar-title">ADMIN MENU</p>{TABS.map((item) => <button className={tab === item.id ? 'admin-tab is-active' : 'admin-tab'} key={item.id} type="button" onClick={() => { setTab(item.id); setMessage(''); }}><span>{item.kicker}</span>{item.label}{item.id === 'alternatives' && pairs.filter((pair) => pair.status === 'pending').length > 0 && <b>{pairs.filter((pair) => pair.status === 'pending').length}</b>}{item.id === 'requests' && requests.filter((request) => request.status === 'pending').length > 0 && <b>{requests.filter((request) => request.status === 'pending').length}</b>}{item.id === 'responses' && proposals.filter((proposal) => proposal.status === 'pending').length > 0 && <b>{proposals.filter((proposal) => proposal.status === 'pending').length}</b>}</button>)}</aside>
      <div className="admin-content">
        <div className="account-stats"><div><strong>{pendingCount}</strong><span>À valider</span></div><div><strong>{pairs.filter((item) => item.status === 'approved').length}</strong><span>Alternatives publiées</span></div><div><strong>{profiles.length}</strong><span>Profils</span></div></div>
        {message && <p className="form-success dark-error">{message}</p>}

        {tab === 'alternatives' && <section className="admin-section"><div className="account-section-heading"><div><p className="account-kicker">01 / Modération</p><h2>Validation des alternatives</h2><p>Les nouvelles propositions restent invisibles jusqu’à ton approbation.</p></div></div><div className="admin-table">{pairs.filter((item) => item.status === 'pending').map((item) => <div className="admin-row" key={item.id}><span><strong>{item.paid_name} → {item.alternative_name}</strong><small>{item.category} · {statusLabel(item.status)}</small></span><button type="button" onClick={() => void updatePairStatus(item.id, 'approved')}>Approuver</button><button type="button" onClick={() => void updatePairStatus(item.id, 'rejected')}>Refuser</button><Link href={`/catalogue/${item.id}`}>Voir</Link></div>)}{pairs.filter((item) => item.status === 'pending').length === 0 && <p className="account-empty-line">Aucune alternative en attente.</p>}</div></section>}

        {tab === 'requests' && <section className="admin-section"><div className="account-section-heading"><div><p className="account-kicker">02 / Requests</p><h2>Validation des requests</h2><p>Une request approuvée devient visible dans l’espace public.</p></div></div><div className="admin-table">{requests.filter((item) => item.status === 'pending').map((item) => <div className="admin-row" key={item.id}><span><strong>{item.title}</strong><small>{item.category} · {statusLabel(item.status)}</small></span><button type="button" onClick={() => void updateRequestStatus(item.id, 'approved')}>Approuver</button><button type="button" onClick={() => void updateRequestStatus(item.id, 'rejected')}>Refuser</button><button type="button" onClick={() => void deleteRequest(item.id)}>Supprimer</button></div>)}{requests.filter((item) => item.status === 'pending').length === 0 && <p className="account-empty-line">Aucune request en attente.</p>}</div></section>}

        {tab === 'responses' && <section className="admin-section"><div className="account-section-heading"><div><p className="account-kicker">03 / Réponses</p><h2>Validation des réponses</h2><p>Une réponse approuvée devient visible dans la request concernée.</p></div></div><div className="admin-table">{proposals.filter((item) => item.status === 'pending').map((item) => <div className="admin-row" key={item.id}><span><strong>{item.alternative_name}</strong><small>{item.explanation} · {statusLabel(item.status)}</small></span><button type="button" onClick={() => void updateProposalStatus(item.id, 'approved')}>Approuver</button><button type="button" onClick={() => void updateProposalStatus(item.id, 'rejected')}>Refuser</button><Link href={`/requests/${item.request_id}`}>Voir la request</Link><button type="button" onClick={() => void deleteProposal(item.id)}>Supprimer</button></div>)}{proposals.filter((item) => item.status === 'pending').length === 0 && <p className="account-empty-line">Aucune réponse en attente.</p>}</div></section>}

        {tab === 'catalogue' && <section className="admin-section"><div className="account-section-heading"><div><p className="account-kicker">04 / Catalogue</p><h2>Gestion des alternatives</h2><p>Voici toutes les alternatives enregistrées, quel que soit leur statut.</p></div></div><div className="admin-table">{pairs.map((item) => <div className="admin-row" key={item.id}><span><strong>{item.paid_name} → {item.alternative_name}</strong><small>{item.category} · {statusLabel(item.status)}</small></span>{item.status !== 'approved' && <button type="button" onClick={() => void updatePairStatus(item.id, 'approved')}>Publier</button>}<Link href={`/catalogue/${item.id}`}>Voir</Link><button type="button" onClick={() => void deletePair(item.id)}>Supprimer</button></div>)}{pairs.length === 0 && <p className="account-empty-line">Aucune alternative enregistrée.</p>}</div></section>}

        {tab === 'profiles' && <section className="admin-section"><div className="account-section-heading"><div><p className="account-kicker">05 / Profils</p><h2>Utilisateurs</h2></div></div><div className="admin-table">{profiles.map((item) => <div className="admin-row" key={item.id}><span><strong>{item.display_name || 'Profil sans nom'}</strong><small>{new Date(item.created_at).toLocaleDateString('fr-FR')}</small></span><b>{item.role}</b></div>)}</div></section>}
      </div>
    </div>
  </main>;
}
