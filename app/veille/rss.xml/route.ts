import { SITE } from "@/lib/site";
import { veilleE5 } from "@/lib/experience";
import { revues } from "@/lib/veille-method";

/**
 * Flux RSS de ma veille : mes revues hebdomadaires et mes synthèses, pas
 * les articles du robot. S'abonner à ce flux, c'est suivre le travail
 * personnel de veille (étape 9 de la méthode).
 */
export const revalidate = 3600;

const PAGE = `${SITE.url}/epreuves#veille`;

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Midi à Paris : une date AAAA-MM-JJ ne glisse pas au jour précédent. */
const rfc822 = (d: string) => new Date(`${d}T12:00:00+01:00`).toUTCString();

type Entry = { date: string; title: string; link: string; guid: string; html: string };

export function GET() {
  const entries: Entry[] = [
    ...veilleE5.syntheses.map((s) => ({
      date: s.date,
      title: `Synthèse — ${s.sujet}`,
      link: `${SITE.url}/epreuves#veille-syntheses`,
      guid: `${SITE.url}/veille/synthese/${s.date}/${encodeURIComponent(s.sujet)}`,
      html: [
        `<p><strong>Ce que je retiens.</strong> ${esc(s.retenu)}</p>`,
        `<p><strong>Ce que ça change.</strong> ${esc(s.impact)}</p>`,
        `<ul>${s.sources
          .map((src) => `<li><a href="${esc(src.url)}">${esc(src.media)} — ${esc(src.titre)}</a></li>`)
          .join("")}</ul>`,
      ].join(""),
    })),
    ...revues.map((r, i) => ({
      date: r.date,
      title: `Revue de veille du ${r.date} — ${r.vus} vus, ${r.retenus.length} retenu${r.retenus.length > 1 ? "s" : ""}`,
      link: `${SITE.url}/epreuves#veille-revues`,
      guid: `${SITE.url}/veille/revue/${r.date}/${i}`,
      html: [
        r.note ? `<p>${esc(r.note)}</p>` : "",
        `<p>${r.vus} articles passés en revue, ${r.lus} lus.</p>`,
        r.retenus.length
          ? `<ul>${r.retenus
              .map((a) => `<li><a href="${esc(a.link)}">${esc(a.title)}</a> — ${esc(a.source)}</li>`)
              .join("")}</ul>`
          : "",
      ].join(""),
    })),
  ].sort((a, b) => (a.date < b.date ? 1 : -1));

  const items = entries
    .map(
      (e) => `    <item>
      <title>${esc(e.title)}</title>
      <link>${esc(e.link)}</link>
      <guid isPermaLink="false">${esc(e.guid)}</guid>
      <pubDate>${rfc822(e.date)}</pubDate>
      <description>${esc(e.html)}</description>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Veille technologique — ${esc(SITE.name)}</title>
    <link>${PAGE}</link>
    <atom:link href="${SITE.url}/veille/rss.xml" rel="self" type="application/rss+xml"/>
    <description>Revues hebdomadaires et synthèses de veille : IA dans le support informatique de niveau 1, durcissement des accès (MFA, SSH, PKI).</description>
    <language>fr-FR</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
