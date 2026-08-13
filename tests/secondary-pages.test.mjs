import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('les pages secondaires utilisent la structure de la charte catalogue', async () => {
  const catalogue = await readFile(new URL('../app/catalogue/page.tsx', import.meta.url), 'utf8');
  const requests = await readFile(new URL('../app/requests/page.tsx', import.meta.url), 'utf8');
  assert.match(catalogue, /catalogue-secondary/);
  assert.match(requests, /catalogue-secondary/);
});

test('les styles secondaires couvrent les conteneurs et formulaires principaux', async () => {
  const css = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');
  for (const selector of ['.catalogue-secondary', '.inner-page-header', '.request-layout', '.request-form', '.contribution-form']) {
    assert.match(css, new RegExp(selector.replace('.', '\\.'), 'm'));
  }
});
