import test from 'node:test';
import assert from 'node:assert/strict';
import { CATALOGUE_PREVIEW, getComparisonDifference } from '../lib/catalogue.ts';

test('une comparaison expose une différence courte et lisible', () => {
  const item = CATALOGUE_PREVIEW.find((entry) => entry.id === 'wispr-flow-handy');
  assert.equal(getComparisonDifference(item), 'Projet en évolution · Compatibilité à vérifier selon le système');
});

test('une comparaison sans limite garde une différence honnête', () => {
  const item = { ...CATALOGUE_PREVIEW[0], limits: [] };
  assert.equal(getComparisonDifference(item), 'À vérifier selon le besoin');
});
