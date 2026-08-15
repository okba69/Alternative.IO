'use client';

import { useState } from 'react';
import { getBrowserSupabase } from '@/lib/supabase-browser';

type LikeButtonProps = { pairId: string; initialCount: number; initialLiked?: boolean };

export function LikeButton({ pairId, initialCount, initialLiked = false }: LikeButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(initialLiked);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  async function toggleLike() {
    if (busy) return;
    setBusy(true); setMessage('');
    try {
      const supabase = getBrowserSupabase();
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Connecte-toi pour enregistrer ton like.');
      if (liked) {
        const { error } = await supabase.from('alternative_likes').delete().eq('pair_id', pairId).eq('user_id', userData.user.id);
        if (error) throw error;
        setCount((value) => Math.max(0, value - 1)); setLiked(false);
      } else {
        const { error } = await supabase.from('alternative_likes').insert({ pair_id: pairId, user_id: userData.user.id } as never);
        if (error) throw error;
        setCount((value) => value + 1); setLiked(true);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Impossible d’enregistrer ton like.');
    } finally { setBusy(false); }
  }

  return <span className="like-control"><button type="button" className={liked ? 'like-button liked' : 'like-button'} onClick={() => void toggleLike()} disabled={busy} aria-pressed={liked} aria-label={liked ? 'Retirer le like' : 'Aimer cette comparaison'}>{liked ? '♥' : '♡'} <span>{count}</span></button>{message && <small role="status">{message}</small>}</span>;
}
