import test from 'node:test';
import assert from 'node:assert/strict';
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
