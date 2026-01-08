"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Field from "@/components/Field";
import { createProject } from "@/lib/api";
import type { GarmentType } from "@/lib/types";

type FormState = {
  garment_type: GarmentType;
  chest: string; // torace
  waist: string; // vita
  hips: string; // fianchi
  length: string; // lunghezza
  frontFile: File | null;
  backFile: File | null;
};

export default function CreatePage() {
  const router = useRouter();

  const [state, setState] = useState<FormState>({
    garment_type: "tshirt",
    chest: "",
    waist: "",
    hips: "",
    length: "",
    frontFile: null,
    backFile: null
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return (
      !!state.frontFile &&
      !!state.backFile &&
      state.chest.trim() !== "" &&
      state.waist.trim() !== "" &&
      state.hips.trim() !== "" &&
      state.length.trim() !== "" &&
      !submitting
    );
  }, [state, submitting]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!state.frontFile || !state.backFile) {
      setError("Carica entrambe le immagini (front/back).");
      return;
    }

    try {
      setSubmitting(true);

      const fd = new FormData();

      // immagini
      fd.append("front", state.frontFile);
      fd.append("back", state.backFile);

      // campi (nomi semplici; adegua al backend se serve)
      fd.append("garment_type", state.garment_type);
      fd.append("chest", state.chest);
      fd.append("waist", state.waist);
      fd.append("hips", state.hips);
      fd.append("length", state.length);

      const project = await createProject(fd);

      if (!project?.id) {
        throw new Error("Risposta backend senza id progetto.");
      }

      router.push(`/project/${encodeURIComponent(project.id)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore imprevisto.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Create Project</h1>
        <p className="text-sm text-zinc-600">
          Carica immagini e misure, poi genera il pattern.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-2xl border bg-white p-6 shadow-sm"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Immagine Front" hint="PNG/JPG">
            <input
              type="file"
              accept="image/*"
              className="block w-full cursor-pointer rounded-xl border bg-white px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-900 file:px-3 file:py-2 file:text-xs file:font-medium file:text-white hover:bg-zinc-50"
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  frontFile: e.target.files?.[0] ?? null
                }))
              }
            />
            {state.frontFile ? (
              <p className="mt-1 text-xs text-zinc-500">
                Selezionato: {state.frontFile.name}
              </p>
            ) : null}
          </Field>

          <Field label="Immagine Back" hint="PNG/JPG">
            <input
              type="file"
              accept="image/*"
              className="block w-full cursor-pointer rounded-xl border bg-white px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-900 file:px-3 file:py-2 file:text-xs file:font-medium file:text-white hover:bg-zinc-50"
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  backFile: e.target.files?.[0] ?? null
                }))
              }
            />
            {state.backFile ? (
              <p className="mt-1 text-xs text-zinc-500">
                Selezionato: {state.backFile.name}
              </p>
            ) : null}
          </Field>

          <Field label="Garment type">
            <select
              className="w-full rounded-xl border bg-white px-3 py-2 text-sm"
              value={state.garment_type}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  garment_type: e.target.value as GarmentType
                }))
              }
            >
              <option value="tshirt">tshirt</option>
              <option value="pants">pants</option>
            </select>
          </Field>

          <div className="rounded-2xl border bg-zinc-50 p-4 text-sm text-zinc-600">
            <p className="font-medium text-zinc-900">Misure</p>
            <p className="mt-1 text-xs">
              Inserisci numeri (es. cm). I nomi dei campi inviati al backend sono:
              <span className="font-mono"> chest, waist, hips, length</span>.
            </p>
          </div>

          <Field label="Torace (chest)">
            <input
              type="number"
              inputMode="decimal"
              className="w-full rounded-xl border bg-white px-3 py-2 text-sm"
              value={state.chest}
              onChange={(e) => setState((s) => ({ ...s, chest: e.target.value }))}
              placeholder="es. 96"
              min="0"
              step="0.1"
            />
          </Field>

          <Field label="Vita (waist)">
            <input
              type="number"
              inputMode="decimal"
              className="w-full rounded-xl border bg-white px-3 py-2 text-sm"
              value={state.waist}
              onChange={(e) => setState((s) => ({ ...s, waist: e.target.value }))}
              placeholder="es. 78"
              min="0"
              step="0.1"
            />
          </Field>

          <Field label="Fianchi (hips)">
            <input
              type="number"
              inputMode="decimal"
              className="w-full rounded-xl border bg-white px-3 py-2 text-sm"
              value={state.hips}
              onChange={(e) => setState((s) => ({ ...s, hips: e.target.value }))}
              placeholder="es. 100"
              min="0"
              step="0.1"
            />
          </Field>

          <Field label="Lunghezza (length)">
            <input
              type="number"
              inputMode="decimal"
              className="w-full rounded-xl border bg-white px-3 py-2 text-sm"
              value={state.length}
              onChange={(e) => setState((s) => ({ ...s, length: e.target.value }))}
              placeholder="es. 65"
              min="0"
              step="0.1"
            />
          </Field>
        </div>

        {error ? (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-500">
            Endpoint: <span className="font-mono">POST /api/projects</span>
          </p>

          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Generating..." : "Generate Pattern"}
          </button>
        </div>
      </form>
    </div>
  );
}
