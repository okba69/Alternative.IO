import { WaitlistForm } from '@/components/WaitlistForm';

const FEATURES = [
  {
    icon: '🔍',
    title: 'Le mot « gratuit » enfin expliqué',
    description:
      'Free, freemium, open source, auto-hébergé, essai temporaire… chaque fiche précise le statut tarifaire exact et ce qui te coûtera quelque chose plus tard.',
  },
  {
    icon: '✅',
    title: 'Vérifié, pas juste posté',
    description:
      'Chaque fiche affiche un niveau de confiance et une date de vérification. Les informations obsolètes sont signalées, jamais cachées.',
  },
  {
    icon: '⚖️',
    title: 'Comparaison honnête',
    description:
      'Compare deux ou trois alternatives côte à côte sur les mêmes critères. Aucun classement sponsorisé, aucun gagnant déclaré automatiquement.',
  },
];

const STEPS = [
  {
    number: '1',
    title: 'Cherche ton outil payant',
    description: 'Par nom, catégorie ou besoin — Notion, Figma, Airtable, et bien d’autres.',
  },
  {
    number: '2',
    title: 'Compare les alternatives vérifiées',
    description: 'Fonctions couvertes, limites, plateformes, mode d’installation, tout au même endroit.',
  },
  {
    number: '3',
    title: 'Contribue si tu connais une pépite',
    description: 'Ta suggestion est revue avant publication — la communauté propose, la modération valide.',
  },
];

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
        <span className="text-lg font-bold">Alternative.IO</span>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-16 text-center sm:py-24">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            🚧 Bientôt disponible
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Trouve la bonne alternative gratuite, sans le flou.
          </h1>
          <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
            Alternative.IO est le catalogue communautaire des vraies alternatives gratuites,
            freemium, open source ou auto-hébergées aux outils payants — avec le statut
            tarifaire exact, les limites connues et une date de vérification. Pas de blabla
            marketing, pas de classement sponsorisé.
          </p>
          <WaitlistForm />
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Pas de spam. Un email quand c’est prêt, rien d’autre.
          </p>
        </section>

        {/* Features */}
        <section className="mx-auto grid max-w-5xl gap-8 px-6 py-16 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex flex-col gap-2">
              <span className="text-2xl">{f.icon}</span>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{f.description}</p>
            </div>
          ))}
        </section>

        {/* Comment ça marche */}
        <section className="border-t border-zinc-200 px-6 py-16 dark:border-zinc-800">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-2xl font-bold">Comment ça marche</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {STEPS.map((s) => (
                <div key={s.number} className="flex flex-col gap-2 text-center sm:text-left">
                  <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white sm:mx-0">
                    {s.number}
                  </span>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-16 text-center">
          <h2 className="text-2xl font-bold">Rejoins la liste d’attente</h2>
          <p className="max-w-md text-zinc-600 dark:text-zinc-400">
            Sois prévenu dès l’ouverture du catalogue, et aide-nous à choisir les premières
            catégories à couvrir.
          </p>
          <WaitlistForm />
        </section>
      </main>

      <footer className="border-t border-zinc-200 px-6 py-8 text-center text-xs text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
        © {new Date().getFullYear()} Alternative.IO. Tous droits réservés.
      </footer>
    </div>
  );
}
