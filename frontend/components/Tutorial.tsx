export default function Tutorial() {
  return (
    <div className="space-y-3 text-sm text-zinc-700">
      <p className="font-medium text-zinc-900">Tutorial (assemblaggio A4)</p>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Scarica il PDF A4 e stampa al 100% (senza “adatta alla pagina”).</li>
        <li>Controlla il quadratino/test di scala (se presente nel PDF).</li>
        <li>Ritaglia i bordi dove indicato e allinea i marcatori tra i fogli.</li>
        <li>Unisci i fogli con nastro adesivo sul retro, formando la griglia.</li>
        <li>Ricalca il contorno del cartamodello su carta velina o carta modello.</li>
        <li>Aggiungi margini di cucitura se il tuo flusso lo richiede.</li>
      </ol>

      <p className="text-xs text-zinc-500">
        Nota: il contenuto finale e i dettagli dipendono dal backend che genera il pattern.
      </p>
    </div>
  );
}
