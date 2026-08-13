export type AppRole = 'user' | 'admin';

export function normalizeRole(value: unknown): AppRole {
  return String(value ?? '').toLowerCase() === 'admin' ? 'admin' : 'user';
}

export function isAdminRole(value: unknown): boolean {
  return normalizeRole(value) === 'admin';
}
