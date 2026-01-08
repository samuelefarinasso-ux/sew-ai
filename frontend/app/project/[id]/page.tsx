import Tutorial from "@/components/Tutorial";
import { getProject } from "@/lib/api";

export default async function ProjectPage({
  params
}: {
  params: { id: string };
}) {
  const { id } = params;

  let project: Awaited<ReturnType<typeof getProject>> | null = null;
  let error: string | null = null;

  try {
    project = await getProject(id);
  } catch (e) {
    error = e instanceof Error ? e.message : "Errore imprevisto.";
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Project</h1>
        <p className="text-sm text-zinc-600">
          ID: <span className="font-mono">{id}</span>
        </p>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
          <p className="font-medium">Impossibile caricare il progetto</p>
          <p className="mt-2">{error}</p>
          <p className="mt-3 text-xs text-red-700">
            Verifica che <span className="font-mono">NEXT_PUBLIC_BACKEND_URL</span> sia corretto
            e che l’endpoint <span className="font-mono">GET /api/projects/:id</span> esista.
          </p>
        </div>
      ) : null}

      {project ? (
        <div className="grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Downloads</h2>
              <p className="mt-1 text-sm text-zinc-600">
                Scarica i PDF generati dal backend.
              </p>

              <div className="mt-5 space-y-3">
                <DownloadRow
                  label="PDF Plotter"
                  url={project.pdf_plotter_url ?? undefined}
                />
                <DownloadRow label="PDF A4" url={project.pdf_a4_url ?? undefined} />
              </div>

              <div className="mt-6 rounded-xl border bg-zinc-50 p-4 text-xs text-zinc-600">
                <p className="font-medium text-zinc-900">Nota</p>
                <p className="mt-1">
                  Se i link risultano vuoti, il backend potrebbe generare i PDF in modo asincrono:
                  ricarica la pagina dopo qualche secondo.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Raw project payload</h2>
              <p className="mt-1 text-sm text-zinc-600">
                Utile per debug veloce.
              </p>
              <pre className="mt-4 overflow-auto rounded-xl bg-zinc-900 p-4 text-xs text-zinc-100">
{JSON.stringify(project, null, 2)}
              </pre>
            </div>
          </section>

          <aside className="rounded-2xl border bg-white p-6 shadow-sm">
            <Tutorial />
          </aside>
        </div>
      ) : null}
    </div>
  );
}

function DownloadRow({ label, url }: { label: string; url?: string }) {
  return (
    <div className="flex flex-col justify-between gap-2 rounded-xl border bg-white p-4 sm:flex-row sm:items-center">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="mt-1 text-xs text-zinc-500">
          {url ? "Link disponibile" : "Non disponibile"}
        </p>
      </div>

      {url ? (
        <a
          href={url}
          className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Download
        </a>
      ) : (
        <button
          type="button"
          disabled
          className="inline-flex cursor-not-allowed items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium text-zinc-400"
        >
          Download
        </button>
      )}
    </div>
  );
}
