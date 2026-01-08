import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl border bg-white p-8 shadow-sm">
        <div className="space-y-4">
          <p className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
            SewAI • Next.js + Tailwind
          </p>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Genera cartamodelli da foto + misure, in pochi click.
          </h1>

          <p className="max-w-2xl text-zinc-600">
            Carica le immagini front/back del capo (o del riferimento), inserisci
            misure base e ottieni PDF pronti per stampa: formato plotter e A4.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/create"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Crea un nuovo progetto
            </Link>

            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              Tailwind Docs
            </a>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold">1) Upload</h3>
          <p className="mt-2 text-sm text-zinc-600">
            Carica due immagini: fronte e retro.
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold">2) Misure</h3>
          <p className="mt-2 text-sm text-zinc-600">
            Torace, vita, fianchi, lunghezza.
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold">3) PDF</h3>
          <p className="mt-2 text-sm text-zinc-600">
            Scarica plotter e A4 + tutorial di assemblaggio.
          </p>
        </div>
      </section>
    </div>
  );
}
