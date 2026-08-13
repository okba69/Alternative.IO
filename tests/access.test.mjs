import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { isAdminRole, normalizeRole } from '../lib/access.ts';

test('un profil admin est reconnu sans dépendre de la casse', () => {
  assert.equal(normalizeRole('ADMIN'), 'admin');
  assert.equal(isAdminRole('admin'), true);
});

test('un profil utilisateur ne reçoit pas les droits admin', () => {
  assert.equal(normalizeRole(undefined), 'user');
  assert.equal(isAdminRole('user'), false);
  assert.equal(isAdminRole('owner'), false);
});

test('la promotion admin est protégée côté base et non par le navigateur', async () => {
  const schema = await readFile(new URL('../supabase/schema.sql', import.meta.url), 'utf8');
  assert.match(schema, /prevent_profile_role_escalation/);
  assert.match(schema, /role = public\.current_profile_role\(\)/);
  assert.match(schema, /existing admin/);
});
