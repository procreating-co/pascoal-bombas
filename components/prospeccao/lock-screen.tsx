"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { isValidProspeccaoCode } from "@/lib/prospeccao";

export type ProspeccaoLockScreenProps = {
  onUnlock: () => void;
  accessCode: string;
  title: string;
  logo: string;
  brandName: string;
};

export function LockScreen({ onUnlock, accessCode, title, logo, brandName }: ProspeccaoLockScreenProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isValidProspeccaoCode(code, accessCode)) {
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-white">
      <div className="relative h-40 w-40 overflow-hidden sm:h-48 sm:w-48">
        <Image src={logo} alt={brandName} fill sizes="192px" className="scale-[1.8] object-cover" />
      </div>
      <span className="mt-2 inline-flex items-center gap-3 font-mono text-sm text-white/45">
        <span className="h-px w-12 bg-[var(--client-accent)]" />Acesso restrito<span className="h-px w-12 bg-[var(--client-accent)]" />
      </span>
      <h1 className="mt-6 text-balance text-center font-display text-4xl leading-[0.95] tracking-tight sm:text-5xl">{title}</h1>

      <form onSubmit={handleSubmit} className="mt-10 flex w-full max-w-sm flex-col items-center gap-4">
        <div className="relative w-full">
          <input
            type={showCode ? "text" : "password"}
            autoFocus
            autoComplete="off"
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
              setError(false);
            }}
            placeholder="Código de acesso"
            className={`h-14 w-full border bg-white/[0.03] pl-5 pr-12 font-mono text-lg tracking-widest text-white placeholder:text-white/30 focus:outline-none ${
              error ? "border-red-500/60" : "border-white/15 focus:border-[var(--client-accent)]"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowCode((value) => !value)}
            aria-label={showCode ? "Ocultar código" : "Mostrar código"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white"
          >
            {showCode ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        </div>
        {error && <span className="font-mono text-xs uppercase tracking-wide text-red-400">Código incorreto. Tente novamente.</span>}
        <button
          type="submit"
          className="inline-flex h-14 w-full items-center justify-center rounded-full bg-[var(--client-accent)] text-base font-medium text-black transition-transform hover:scale-[1.02]"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
