import { cookies } from 'next/headers';
import { randomUUID } from 'node:crypto';
import { getSupabase } from '@/lib/supabase';

async function visitorKey() {
  const store = await cookies();
  let key = store.get('useinstead_visitor')?.value;
  const response = new Response();
  if (!key) { key = randomUUID(); response.headers.append('set-cookie', `useinstead_visitor=${key}; Path=/; Max-Age=31536000; HttpOnly; SameSite=Lax; Secure`); }
  return { key, response };
}

export async function POST(request: Request) { return changeLike(request, true); }
export async function DELETE(request: Request) { return changeLike(request, false); }

async function changeLike(request: Request, add: boolean) {
  let body: { pair_id?: string };
  try { body = await request.json(); } catch { return Response.json({ error: 'Requête invalide.' }, { status: 400 }); }
  if (!body.pair_id || body.pair_id.length > 80) return Response.json({ error: 'Comparaison invalide.' }, { status: 400 });
  const { key, response: cookieResponse } = await visitorKey();
  const supabase = getSupabase();
  const result = add
    ? await supabase.from('alternative_likes').insert({ pair_id: body.pair_id, visitor_key: key, user_id: null } as never)
    : await supabase.from('alternative_likes').delete().eq('pair_id', body.pair_id).eq('visitor_key', key);
  if (result.error && result.error.code !== '23505') return Response.json({ error: 'Like indisponible.' }, { status: 503 });
  const { data } = await supabase.from('alternative_like_counts').select('like_count').eq('pair_id', body.pair_id).maybeSingle();
  const output = Response.json({ ok: true, count: Number((data as { like_count?: number } | null)?.like_count ?? 0) });
  const cookie = cookieResponse.headers.get('set-cookie');
  if (cookie) output.headers.set('set-cookie', cookie);
  return output;
}
