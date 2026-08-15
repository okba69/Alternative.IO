export type CatalogueItem = {
  id: string;
  createdAt?: string;
  likesCount: number;
  likedByCurrentUser?: boolean;
  category: string;
  tags: string[];
  paidProduct: {
    name: string;
    price: string;
    description: string;
    url: string;
  };
  paidProducts?: Array<{ name: string; price: string; description: string; url: string }>;
  freeAlternative: {
    name: string;
    type: string;
    description: string;
    url: string;
  };
  limits: string[];
  platforms: string[];
  verifiedAt: string;
  confidence: 'Aperçu';
  tone: 'mint' | 'amber' | 'blue' | 'coral' | 'violet' | 'sand';
};

export const CATALOGUE_CATEGORIES = ['Tous', 'IA', 'Productivité', 'Design', 'Développement', 'Vidéo', 'Audio', 'Photo', 'Écriture', 'Automatisation', 'Marketing', 'Collaboration', 'Sécurité', 'Finance', 'No-code', 'Utilitaires'] as const;

/** Exemples éditoriaux permanents : ils restent visibles même avant les premières contributions validées. */
export const CATALOGUE_EXAMPLES: CatalogueItem[] = [
  {
    id: 'example-wispr-flow-handy', likesCount: 0, category: 'IA', tags: ['Voix', 'Transcription', 'Desktop'],
    paidProduct: { name: 'Wispr Flow', price: 'À partir de 12 $/mois', description: 'Dictée vocale rapide pour écrire dans toutes ses applications.', url: 'https://www.wispr.flow' },
    freeAlternative: { name: 'Handy', type: 'Gratuit', description: 'Une application open source de speech-to-text pour dicter et transcrire localement.', url: 'https://github.com/dkorniichuk/handy' },
    limits: ['Projet en évolution', 'Compatibilité à vérifier selon le système'], platforms: ['Desktop'], verifiedAt: 'Exemple UseInstead', confidence: 'Aperçu', tone: 'mint',
  },
  {
    id: 'example-claude-code-freebuff', likesCount: 0, category: 'Développement', tags: ['Coding', 'IA', 'Terminal'],
    paidProduct: { name: 'Claude Code / Codex', price: 'Abonnement ou crédits selon l’outil', description: 'Agents IA capables de lire un projet, modifier des fichiers et exécuter des tâches de développement.', url: 'https://www.anthropic.com/claude-code' },
    paidProducts: [
      { name: 'Claude Code', price: 'Abonnement selon le plan', description: 'Agent de développement en terminal.', url: 'https://www.anthropic.com/claude-code' },
      { name: 'Codex', price: 'Selon le plan OpenAI', description: 'Agent de développement pour construire et corriger du code.', url: 'https://openai.com/codex/' },
    ],
    freeAlternative: { name: 'Freebuff', type: 'Gratuit', description: 'Agent de coding gratuit qui donne accès à plusieurs modèles, dont DeepSeek V4 Pro et V4 Flash.', url: 'https://freebuff.ai' },
    limits: ['Offre susceptible d’évoluer', 'Vérifier les limites d’usage et la confidentialité avant un projet sensible'], platforms: ['Terminal'], verifiedAt: 'Exemple UseInstead', confidence: 'Aperçu', tone: 'blue',
  },
  {
    id: 'example-loom-tella', likesCount: 0, category: 'Vidéo', tags: ['Screencasting', 'Webcam', 'Partage'],
    paidProduct: { name: 'Loom', price: 'Plan gratuit limité puis abonnement', description: 'Enregistrement d’écran, webcam et partage par lien.', url: 'https://www.loom.com' },
    freeAlternative: { name: 'Tella', type: 'Essai gratuit', description: 'Alternative de screencasting avec un essai de 7 jours, annoncé sans carte bancaire.', url: 'https://www.tella.tv' },
    limits: ['L’essai dure 7 jours', 'Les fonctions et conditions peuvent changer'], platforms: ['Web', 'Desktop'], verifiedAt: 'Exemple UseInstead', confidence: 'Aperçu', tone: 'violet',
  },
  {
    id: 'example-camtasia-obs', likesCount: 0, category: 'Vidéo', tags: ['Screencasting', 'Open source', 'Audio'],
    paidProduct: { name: 'Camtasia', price: 'Licence ou abonnement', description: 'Capture d’écran et montage vidéo avec outils d’édition intégrés.', url: 'https://www.techsmith.com/camtasia.html' },
    freeAlternative: { name: 'OBS Studio', type: 'Gratuit / Open source', description: 'Enregistrement d’écran, webcam et audio sans filigrane ni limite imposée par le logiciel.', url: 'https://obsproject.com' },
    limits: ['Montage moins guidé que Camtasia', 'Configuration initiale plus technique'], platforms: ['Windows', 'macOS', 'Linux'], verifiedAt: 'Exemple UseInstead', confidence: 'Aperçu', tone: 'coral',
  },
  {
    id: 'example-hostinger-aws', likesCount: 0, category: 'Développement', tags: ['Cloud', 'Hébergement', 'Crédit gratuit'],
    paidProduct: { name: 'Hostinger', price: 'Abonnement d’hébergement', description: 'Hébergement web et infrastructure simplifiée pour publier un site.', url: 'https://www.hostinger.com' },
    freeAlternative: { name: 'AWS Free Tier', type: 'Crédit nouveau compte', description: 'Pour les nouveaux clients, AWS annonce jusqu’à 200 $ de crédits et un plan gratuit limité dans le temps.', url: 'https://aws.amazon.com/free/' },
    limits: ['Réservé aux nouveaux clients éligibles', 'Un moyen de paiement valide est demandé', 'Surveiller les limites et la date d’expiration'], platforms: ['Cloud'], verifiedAt: 'Exemple UseInstead', confidence: 'Aperçu', tone: 'amber',
  },
];

export const CATALOGUE_PREVIEW: CatalogueItem[] = [
  /* Fixtures historiques conservées pour les tests ; l’interface ne les affiche plus. */
  {
    id: 'wispr-flow-handy',
    likesCount: 0,
    category: 'IA',
    tags: ['Voix', 'Desktop'],
    paidProduct: {
      name: 'Wispr Flow',
      price: 'À partir de 12 $/mois',
      description: 'Dictée vocale rapide pour écrire dans toutes ses applications.',
      url: 'https://wispr.flow',
    },
    freeAlternative: {
      name: 'Handy',
      type: 'Gratuit',
      description: 'Une piste gratuite pour transformer la voix en texte au quotidien.',
      url: 'https://github.com/dkorniichuk/handy',
    },
    limits: ['Projet en évolution', 'Compatibilité à vérifier selon le système'],
    platforms: ['Desktop'],
    verifiedAt: 'Aperçu produit',
    confidence: 'Aperçu',
    tone: 'mint',
  },
  {
    id: 'figma-penpot',
    likesCount: 0,
    category: 'Design',
    tags: ['Design', 'Web'],
    paidProduct: {
      name: 'Figma',
      price: 'À partir de 15 $/éditeur/mois',
      description: 'Design d’interfaces et collaboration en équipe.',
      url: 'https://www.figma.com',
    },
    freeAlternative: {
      name: 'Penpot',
      type: 'Open source',
      description: 'Conception collaborative avec un modèle ouvert et auto hébergeable.',
      url: 'https://penpot.app',
    },
    limits: ['Écosystème plus jeune', 'Certaines intégrations diffèrent'],
    platforms: ['Web', 'Self hosted'],
    verifiedAt: 'Aperçu produit',
    confidence: 'Aperçu',
    tone: 'amber',
  },
  {
    id: 'notion-appflowy',
    likesCount: 0,
    category: 'Productivité',
    tags: ['Notes', 'Open source'],
    paidProduct: {
      name: 'Notion',
      price: 'À partir de 10 $/utilisateur/mois',
      description: 'Notes, bases de données et espaces de travail partagés.',
      url: 'https://www.notion.so',
    },
    freeAlternative: {
      name: 'AppFlowy',
      type: 'Open source',
      description: 'Un espace de travail flexible pour garder ses notes et projets sous contrôle.',
      url: 'https://appflowy.io',
    },
    limits: ['Fonctions collaboratives variables', 'Synchronisation à configurer selon le mode choisi'],
    platforms: ['Web', 'Desktop', 'Mobile'],
    verifiedAt: 'Aperçu produit',
    confidence: 'Aperçu',
    tone: 'blue',
  },
  {
    id: 'postman-bruno',
    likesCount: 0,
    category: 'Développement',
    tags: ['API', 'Local'],
    paidProduct: {
      name: 'Postman',
      price: 'À partir de 14 $/utilisateur/mois',
      description: 'Tests, documentation et collaboration autour des API.',
      url: 'https://www.postman.com',
    },
    freeAlternative: {
      name: 'Bruno',
      type: 'Gratuit',
      description: 'Un client API pensé pour rester local, rapide et versionnable.',
      url: 'https://www.usebruno.com',
    },
    limits: ['Collaboration cloud moins centrale', 'Certaines fonctions avancées restent différentes'],
    platforms: ['Desktop'],
    verifiedAt: 'Aperçu produit',
    confidence: 'Aperçu',
    tone: 'coral',
  },
  {
    id: 'descript-kapwing',
    likesCount: 0,
    category: 'Vidéo',
    tags: ['Vidéo', 'Sous titres'],
    paidProduct: {
      name: 'Descript',
      price: 'À partir de 12 $/mois',
      description: 'Montage vidéo et audio piloté par le texte.',
      url: 'https://www.descript.com',
    },
    freeAlternative: {
      name: 'CapCut',
      type: 'Freemium',
      description: 'Montage vidéo accessible avec sous titres et outils rapides.',
      url: 'https://www.capcut.com',
    },
    limits: ['Fonctions gratuites variables', 'Export et actifs soumis aux conditions du service'],
    platforms: ['Web', 'Desktop', 'Mobile'],
    verifiedAt: 'Aperçu produit',
    confidence: 'Aperçu',
    tone: 'violet',
  },
  {
    id: 'zapier-n8n',
    likesCount: 0,
    category: 'Productivité',
    tags: ['Automatisation', 'Self hosted'],
    paidProduct: {
      name: 'Zapier',
      price: 'À partir de 19,99 $/mois',
      description: 'Automatisations entre applications sans code.',
      url: 'https://zapier.com',
    },
    freeAlternative: {
      name: 'n8n',
      type: 'Source available',
      description: 'Automatisation visuelle avec possibilité d’auto hébergement.',
      url: 'https://n8n.io',
    },
    limits: ['Auto hébergement à administrer', 'Le coût réel dépend de l’infrastructure'],
    platforms: ['Web', 'Self hosted'],
    verifiedAt: 'Aperçu produit',
    confidence: 'Aperçu',
    tone: 'sand',
  },
];

export function getComparisonDifference(item: CatalogueItem | undefined) {
  if (!item?.limits.length) return 'À vérifier selon le besoin';
  return item.limits.join(' · ');
}

export function filterCatalogue(items: CatalogueItem[], query: string, category: string) {
  const normalizedQuery = query.trim().toLowerCase();
  return items.filter((item) => {
    const matchesCategory = category === 'Tous' || item.category === category;
    const haystack = [
      item.paidProduct.name,
      item.paidProduct.description,
      item.freeAlternative.name,
      item.freeAlternative.description,
      item.category,
      ...item.tags,
    ]
      .join(' ')
      .toLowerCase();
    return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
  });
}
