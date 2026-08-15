'use client';

import { useState } from 'react';

type LikeButtonProps = { pairId: string; initialCount: number; initialLiked?: boolean; compact?: boolean };

export function LikeButton({ pairId, initialCount, initialLiked = false, compact = false }: LikeButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(initialLiked);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  async function toggleLike() {
    if (busy) return;
    setBusy(true); setMessage('');
    try {
      const response = await fetch('/api/likes', { method: liked ? 'DELETE' : 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ pair_id: pairId }) });
      const result = await response.json() as { count?: number; error?: string };
      if (!response.ok) throw new Error(result.error || 'Impossible d’enregistrer le like.');
      setCount(result.count ?? count); setLiked(!liked);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Impossible d’enregistrer ton like.');
    } finally { setBusy(false); }
  }

  return <span className={compact ? 'like-control compact' : 'like-control'}><button type="button" className={liked ? 'like-button liked' : 'like-button'} onClick={() => void toggleLike()} disabled={busy} aria-pressed={liked} aria-label={liked ? 'Retirer le like' : 'Aimer cette comparaison'}>{liked ? '♥' : '♡'} <span>{count}</span></button>{message && <small role="status">{message}</small>}</span>;
}
