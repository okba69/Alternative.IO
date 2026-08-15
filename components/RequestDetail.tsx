'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { GoogleAuthButton } from '@/components/GoogleAuthButton';
import { getBrowserSupabase } from '@/lib/supabase-browser';
import { normalizeRequest, normalizeRequestComment, normalizeRequestProposal, type RequestComment, type RequestProposal, type RequestRecord } from '@/lib/requests';

type RequestDetailProps = { requestId: string };

export function RequestDetail({ requestId }: RequestDetailProps) {
  const [request, setRequest] = useState<RequestRecord | null>(null);
  const [comments, setComments] = useState<RequestComment[]>([]);
  const [proposals, setProposals] = useState<RequestProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [comment, setComment] = useState('');
  const [proposal, setProposal] = useState({ alternative_name: '', alternative_url: '', explanation: '' });
  const [submitting, setSubmitting] = useState(false);

  const loadRequest = useCallback(async () => {
    try {
      const supabase = getBrowserSupabase();
      const [requestResult, commentsResult, proposalsResult] = await Promise.all([
        supabase.from('requests').select('id,title,description,category,created_at').eq('id', requestId).maybeSingle(),
        supabase.from('request_comments').select('id,request_id,body,created_at').eq('request_id', requestId).order('created_at', { ascending: true }),
        supabase.from('request_proposals').select('id,request_id,alternative_name,alternative_url,explanation,created_at').eq('request_id', requestId).order('created_at', { ascending: true }),
      ]);
      if (requestResult.error) throw requestResult.error;
      if (!requestResult.data) throw new Error('Request introuvable.');
      setRequest(normalizeRequest(requestResult.data));
      if (!commentsResult.error) setComments((commentsResult.data ?? []).map(normalizeRequestComment));
      if (!proposalsResult.error) setProposals((proposalsResult.data ?? []).map(normalizeRequestProposal));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Cette request n’est pas disponible.');
    } finally {
      setLoading(false);
    }
  }, [requestId]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadRequest(); }, 0);
    return () => window.clearTimeout(timer);
  }, [loadRequest]);

  async function requireUser() {
    const { data } = await getBrowserSupabase().auth.getUser();
    if (!data.user) throw new Error('Connecte-toi avec Google avant de contribuer.');
    return data.user.id;
  }

  async function submitComment(event: React.FormEvent) {
    event.preventDefault();
    if (!comment.trim()) return;
    setSubmitting(true); setMessage('');
    try {
      const userId = await requireUser();
      const { error } = await getBrowserSupabase().from('request_comments').insert({ request_id: requestId, body: comment.trim(), created_by: userId } as never);
      if (error) throw error;
      setComment('');
      await loadRequest();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Commentaire impossible à publier.');
    } finally { setSubmitting(false); }
  }

  async function submitProposal(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true); setMessage('');
    try {
      const userId = await requireUser();
      const { error } = await getBrowserSupabase().from('request_proposals').insert({ ...proposal, request_id: requestId, created_by: userId } as never);
      if (error) throw error;
      setProposal({ alternative_name: '', alternative_url: '', explanation: '' });
      await loadRequest();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Proposition impossible à publier.');
    } finally { setSubmitting(false); }
  }

  if (loading) return <main className="inner-page"><p className="empty-preview">Chargement de la request…</p></main>;
  if (!request) return <main className="inner-page"><p className="form-error dark-error">{message || 'Request introuvable.'}</p><Link className="text-link" href="/requests">← Retour aux requests</Link></main>;

  return <main className="inner-page request-detail-page">
    <div className="inner-page-header detail-header"><div><Link className="text-link" href="/requests">← Retour aux requests</Link><p className="eyebrow detail-eyebrow">Request ouverte · {request.category}</p><h1>{request.title}</h1><p className="inner-lede">{request.description}</p></div><GoogleAuthButton compact /></div>
    <div className="request-detail-grid">
      <section><div className="detail-section-heading"><p className="eyebrow">Propositions · {proposals.length}</p><h2>Des alternatives à tester.</h2></div><div className="proposal-list">{proposals.length === 0 && <p className="empty-preview">Aucune proposition pour le moment.</p>}{proposals.map((item) => <article className="proposal-card" key={item.id}><span className="request-status">ALTERNATIVE PROPOSÉE</span><h3>{item.alternative_name}</h3><p>{item.explanation}</p><a href={item.alternative_url} target="_blank" rel="noreferrer">Voir le site ↗</a></article>)}</div><form className="contribution-inline-form" onSubmit={submitProposal}><h3>Proposer une alternative</h3><input required value={proposal.alternative_name} onChange={(event) => setProposal((current) => ({ ...current, alternative_name: event.target.value }))} placeholder="Nom de l’alternative" /><input required type="url" value={proposal.alternative_url} onChange={(event) => setProposal((current) => ({ ...current, alternative_url: event.target.value }))} placeholder="URL" /><textarea required value={proposal.explanation} onChange={(event) => setProposal((current) => ({ ...current, explanation: event.target.value }))} placeholder="Pourquoi elle répond au besoin ?" /><button className="button button-primary" disabled={submitting} type="submit">Publier la proposition <span>↗</span></button></form></section>
      <section><div className="detail-section-heading"><p className="eyebrow">Discussion · {comments.length}</p><h2>Les retours de la communauté.</h2></div><div className="comment-list">{comments.length === 0 && <p className="empty-preview">Aucun commentaire pour le moment.</p>}{comments.map((item) => <article className="comment-card" key={item.id}><p>{item.body}</p></article>)}</div><form className="contribution-inline-form" onSubmit={submitComment}><h3>Ajouter un commentaire</h3><textarea required value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Une piste, une précision, une expérience…" /><button className="button button-primary" disabled={submitting} type="submit">Publier le commentaire <span>↗</span></button></form></section>
    </div>
    {message && <p className="form-message dark-message">{message}</p>}
  </main>;
}
