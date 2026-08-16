'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { AuthRequired } from '@/components/AuthRequired';
import { GoogleAuthButton } from '@/components/GoogleAuthButton';
import { getBrowserSupabase } from '@/lib/supabase-browser';
import { normalizeRequest, normalizeRequestProposal, type RequestProposal, type RequestRecord } from '@/lib/requests';

type RequestDetailProps = { requestId: string };

export function RequestDetail({ requestId }: RequestDetailProps) {
  const [request, setRequest] = useState<RequestRecord | null>(null);
  const [proposals, setProposals] = useState<RequestProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [proposal, setProposal] = useState({ alternative_name: '', alternative_url: '', explanation: '' });
  const [submitting, setSubmitting] = useState(false);

  const loadRequest = useCallback(async () => {
    try {
      const supabase = getBrowserSupabase();
      const [requestResult, proposalsResult] = await Promise.all([
        supabase.from('requests').select('id,title,description,category,created_at').eq('id', requestId).maybeSingle(),
        supabase.from('request_proposals').select('id,request_id,alternative_name,alternative_url,explanation,created_at').eq('request_id', requestId).eq('status', 'approved').order('created_at', { ascending: true }),
      ]);
      if (requestResult.error) throw requestResult.error;
      if (!requestResult.data) throw new Error('Request introuvable.');
      setRequest(normalizeRequest(requestResult.data));
      if (!proposalsResult.error) setProposals((proposalsResult.data ?? []).map(normalizeRequestProposal));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Cette request n’est pas disponible.');
    } finally { setLoading(false); }
  }, [requestId]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadRequest(); }, 0);
    return () => window.clearTimeout(timer);
  }, [loadRequest]);

  async function submitProposal(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true); setMessage('');
    try {
      const supabase = getBrowserSupabase();
      const { data } = await supabase.auth.getUser();
      if (!data.user) throw new Error('Connecte-toi avec Google avant de proposer une alternative.');
      const { error } = await supabase.from('request_proposals').insert({ ...proposal, alternative_url: proposal.alternative_url.trim() || null, request_id: requestId, created_by: data.user.id, status: 'pending' } as never);
      if (error) throw error;
      setProposal({ alternative_name: '', alternative_url: '', explanation: '' });
      setMessage('Ta réponse est envoyée pour validation.');
      await loadRequest();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Proposition impossible à publier.');
    } finally { setSubmitting(false); }
  }

  if (loading) return <main className="inner-page"><p className="empty-preview">Chargement de la request…</p></main>;
  if (!request) return <main className="inner-page"><p className="form-error dark-error">{message || 'Request introuvable.'}</p><Link className="text-link" href="/requests">← Retour aux requests</Link></main>;

  return <main className="inner-page request-detail-page">
    <div className="inner-page-header detail-header"><div><Link className="text-link" href="/requests">← Retour aux requests</Link><p className="eyebrow detail-eyebrow">Request ouverte · {request.category}</p><h1>{request.title}</h1><p className="inner-lede">Propose une alternative gratuite ou freemium à cet outil.</p></div><GoogleAuthButton compact /></div>
    <div className="request-detail-grid request-response-layout">
      <section className="request-proposals-section"><div className="detail-section-heading"><p className="eyebrow">Alternatives validées · {proposals.length}</p><h2>Les réponses de la communauté.</h2></div><div className="proposal-list">{proposals.length === 0 && <p className="empty-preview">Aucune alternative validée pour le moment.</p>}{proposals.map((item) => <article className="proposal-card" key={item.id}><span className="request-status">ALTERNATIVE VALIDÉE</span><h3>{item.alternative_name}</h3><p>{item.explanation}</p>{item.alternative_url && <a href={item.alternative_url} target="_blank" rel="noreferrer">Voir le site ↗</a>}</article>)}</div></section>
      <section className="request-response-form"><div className="form-section-title"><span>01</span><div><h2>Proposer une alternative</h2><p>L’outil demandé est déjà renseigné. Ajoute seulement ta solution.</p></div></div><AuthRequired title="Connecte-toi pour répondre à cette request." description="Ta réponse sera envoyée à l’équipe UseInstead avant d’être publiée." redirectPath={`/requests/${requestId}`}><form className="contribution-form" onSubmit={submitProposal}><div className="form-section-title"><span>02</span><div><h2>Outil demandé</h2><p>Cette information vient de la request et ne peut pas être modifiée.</p></div></div><div className="form-grid"><label>Produit payant<input readOnly value={request.title} /></label><label className="form-field-wide">Besoin décrit par l’auteur<textarea readOnly value={request.description} /></label></div><div className="form-section-title"><span>03</span><div><h2>Alternative proposée</h2><p>Une alternative gratuite, freemium ou open source.</p></div></div><div className="form-grid"><label>Nom de l’alternative<input required value={proposal.alternative_name} onChange={(event) => setProposal((current) => ({ ...current, alternative_name: event.target.value }))} placeholder="Ex. Handy" /></label><label>URL de l’alternative <span className="field-note">facultatif</span><input type="url" value={proposal.alternative_url} onChange={(event) => setProposal((current) => ({ ...current, alternative_url: event.target.value }))} placeholder="https://…" /></label><label className="form-field-wide">Pourquoi elle répond au besoin ?<textarea required value={proposal.explanation} onChange={(event) => setProposal((current) => ({ ...current, explanation: event.target.value }))} placeholder="Décris rapidement ce que l’alternative permet de faire." /></label></div><button className="button button-primary" disabled={submitting} type="submit">{submitting ? 'Envoi…' : 'Envoyer la réponse'} <span>↗</span></button></form></AuthRequired>{message && <p className="form-message dark-message">{message}</p>}</section>
    </div>
  </main>;
}
