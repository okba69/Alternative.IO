import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeRequest, normalizeRequestComment, normalizeRequestProposal } from '../lib/requests.ts';

test('une request distante est normalisée avec un identifiant stable', () => {
  const request = normalizeRequest({ id: 'r1', title: 'Alternative à Loom', description: 'Vidéo simple', category: 'Vidéo', created_at: '2026-08-13T00:00:00.000Z' });
  assert.deepEqual(request, { id: 'r1', title: 'Alternative à Loom', description: 'Vidéo simple', category: 'Vidéo', created_at: '2026-08-13T00:00:00.000Z' });
});

test('commentaires et propositions utilisent des valeurs sûres par défaut', () => {
  const comment = normalizeRequestComment({ id: 'c1', request_id: 'r1', body: 'Essaie CapCut', created_at: null });
  const proposal = normalizeRequestProposal({ id: 'p1', request_id: 'r1', alternative_name: 'CapCut', alternative_url: 'https://capcut.com', explanation: 'Montage rapide', created_at: undefined });
  assert.equal(comment.created_at, '');
  assert.equal(proposal.created_at, '');
  assert.equal(proposal.alternative_name, 'CapCut');
});
