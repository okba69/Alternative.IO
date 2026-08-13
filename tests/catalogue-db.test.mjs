import test from 'node:test';
import assert from 'node:assert/strict';
import { mapDatabasePair } from '../lib/catalogue-db.ts';

test('une ligne Supabase devient une fiche de comparaison exploitable', () => {
  const item = mapDatabasePair({
    id: 'pair-1',
    paid_name: 'Figma',
    paid_url: 'https://www.figma.com',
    paid_description: 'Design collaboratif',
    paid_price: 'À partir de 15 $',
    alternative_name: 'Penpot',
    alternative_url: 'https://penpot.app',
    alternative_description: 'Design ouvert',
    alternative_type: 'Open source',
    category: 'Design',
    tags: ['Web'],
    limits: ['Écosystème différent'],
    platforms: ['Web'],
    created_at: '2026-08-13T00:00:00.000Z',
  });

  assert.equal(item.id, 'pair-1');
  assert.equal(item.paidProduct.name, 'Figma');
  assert.equal(item.freeAlternative.name, 'Penpot');
  assert.equal(item.verifiedAt, 'Contribution communautaire');
  assert.deepEqual(item.limits, ['Écosystème différent']);
});

test('une fiche distante sans tableaux optionnels reste sûre', () => {
  const item = mapDatabasePair({
    id: 'pair-2', paid_name: 'Paid', paid_url: 'https://paid.example', paid_description: 'desc', paid_price: '10 €',
    alternative_name: 'Free', alternative_url: 'https://free.example', alternative_description: 'desc', alternative_type: 'Gratuit', category: 'IA',
  });
  assert.deepEqual(item.tags, []);
  assert.deepEqual(item.limits, []);
  assert.deepEqual(item.platforms, []);
});
