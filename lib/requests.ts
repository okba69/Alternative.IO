export type RequestRecord = { id: string; title: string; description: string; category: string; created_at: string };
export type RequestComment = { id: string; request_id: string; body: string; created_at: string };
export type RequestProposal = { id: string; request_id: string; alternative_name: string; alternative_url: string; explanation: string; created_at: string };

type Nullable<T> = T | null | undefined;

export function normalizeRequest(row: { id: string; title: string; description: string; category: string; created_at?: Nullable<string> }): RequestRecord {
  return { id: row.id, title: row.title, description: row.description, category: row.category, created_at: row.created_at ?? '' };
}

export function normalizeRequestComment(row: { id: string; request_id: string; body: string; created_at?: Nullable<string> }): RequestComment {
  return { id: row.id, request_id: row.request_id, body: row.body, created_at: row.created_at ?? '' };
}

export function normalizeRequestProposal(row: { id: string; request_id: string; alternative_name: string; alternative_url: string; explanation: string; created_at?: Nullable<string> }): RequestProposal {
  return { id: row.id, request_id: row.request_id, alternative_name: row.alternative_name, alternative_url: row.alternative_url, explanation: row.explanation, created_at: row.created_at ?? '' };
}
