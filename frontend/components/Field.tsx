import * as React from "react";

type Props = {
  label: string;
  children: React.ReactNode;
  hint?: string;
};

export default function Field({ label, children, hint }: Props) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-end justify-between gap-3">
        <label className="text-sm font-medium text-zinc-800">{label}</label>
        {hint ? <span className="text-xs text-zinc-500">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}
