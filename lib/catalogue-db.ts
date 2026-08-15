import type { CatalogueItem } from './catalogue';

export type DatabasePair = {
  id: string;
  paid_name: string;
  paid_url: string;
  paid_description: string;
  paid_price: string;
  alternative_name: string;
  alternative_url: string;
  alternative_description: string;
  alternative_type: string;
  category: string;
  tags?: string[] | null;
  limits?: string[] | null;
  platforms?: string[] | null;
  created_at?: string;
  status?: 'pending' | 'approved' | 'rejected' | null;
  paid_products?: Array<{ name: string; url: string; description: string; price: string }> | null;
  likes_count?: number;
  liked_by_current_user?: boolean;
};

const TONES: CatalogueItem['tone'][] = ['mint', 'amber', 'blue', 'coral', 'violet', 'sand'];

export function mapDatabasePair(row: DatabasePair, index = 0): CatalogueItem {
  return {
    id: row.id,
    createdAt: row.created_at,
    likesCount: row.likes_count ?? 0,
    likedByCurrentUser: row.liked_by_current_user ?? false,
    category: row.category,
    tags: row.tags ?? [],
    paidProduct: {
      name: row.paid_name,
      price: row.paid_price,
      description: row.paid_description,
      url: row.paid_url,
    },
    paidProducts: row.paid_products ?? undefined,
    freeAlternative: {
      name: row.alternative_name,
      type: row.alternative_type,
      description: row.alternative_description,
      url: row.alternative_url,
    },
    limits: row.limits ?? [],
    platforms: row.platforms ?? [],
    verifiedAt: 'Contribution communautaire',
    confidence: 'Aperçu',
    tone: TONES[index % TONES.length],
  };
}
