import test from 'node:test';
import assert from 'node:assert/strict';
import { CATALOGUE_PREVIEW, filterCatalogue } from '../lib/catalogue.ts';

test('le catalogue public présente six comparaisons d’aperçu', () => {
  assert.equal(CATALOGUE_PREVIEW.length, 6);
  assert.ok(CATALOGUE_PREVIEW.every((item) => item.paidProduct && item.freeAlternative));
});

test('la recherche retrouve un produit payant ou son alternative', () => {
  const results = filterCatalogue(CATALOGUE_PREVIEW, 'figma', 'Tous');
  assert.equal(results.length, 1);
  assert.equal(results[0].freeAlternative.name, 'Penpot');
});

test('le filtre par catégorie reste déterministe', () => {
  const results = filterCatalogue(CATALOGUE_PREVIEW, '', 'Développement');
  assert.ok(results.length > 0);
  assert.ok(results.every((item) => item.category === 'Développement'));
});
