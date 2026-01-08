import { Project } from "./types";

function getBackendBaseUrl() {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!base) {
    throw new Error(
      "NEXT_PUBLIC_BACKEND_URL non è impostata. Crea .env.local e definisci NEXT_PUBLIC_BACKEND_URL."
    );
  }
  return base.replace(/\/+$/, "");
}

export async function createProject(formData: FormData): Promise<Project> {
  const base = getBackendBaseUrl();

  const res = await fetch(`${base}/api/projects`, {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Errore creazione progetto (${res.status}). ${text ? `Dettagli: ${text}` : ""}`
    );
  }

  // ci aspettiamo JSON con almeno { id, pdf_plotter_url, pdf_a4_url, ... }
  return (await res.json()) as Project;
}

export async function getProject(id: string): Promise<Project> {
  const base = getBackendBaseUrl();

  const res = await fetch(`${base}/api/projects/${encodeURIComponent(id)}`, {
    method: "GET",
    // In App Router la fetch è cache-ata di default lato server.
    // Qui forziamo dati freschi (utile se il backend aggiorna dopo processing).
    cache: "no-store"
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Errore caricamento progetto (${res.status}). ${text ? `Dettagli: ${text}` : ""}`
    );
  }

  return (await res.json()) as Project;
}
