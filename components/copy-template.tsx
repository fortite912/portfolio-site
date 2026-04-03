"use client";

import { useState } from "react";

const TEMPLATE = `Objet : Candidature CDD Technicien IT — [Votre entreprise]

Bonjour,

Je suis actuellement en BTS SIO option SISR et je recherche un CDD pour juillet — août 2026 dans le domaine suivant :

- Stack / environnement : [Windows Server / Cisco / Azure / ...]
- Mission visée : [Support / Infra / Réseau / Cybersécurité]
- Disponibilité : Juillet — Août 2026

Mon portfolio avec preuves vérifiables : https://portfolio-site-ten-pearl-61.vercel.app

Cordialement,
Sean Fritsch`;

export function CopyTemplate() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(TEMPLATE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = TEMPLATE;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="btn btn-primary w-full text-sm mt-3"
    >
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Template copié !
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copier le template email
        </>
      )}
    </button>
  );
}
