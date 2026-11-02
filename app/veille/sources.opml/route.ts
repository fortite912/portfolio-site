import { SITE } from "@/lib/site";
import { getVeilleFeed } from "@/lib/veille-feed";

/**
 * Liste des flux suivis au format OPML, généré depuis la collecte : le
 * même fichier s'importe dans Feedly, Inoreader ou Thunderbird pour lire
 * les sources à la main (étape 4 de la méthode).
 */
export const revalidate = 3600;

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const feed = await getVeilleFeed();

  const byType = new Map<string, typeof feed.sources>();
  for (const s of feed.sources) {
    const k = s.type ?? "Sources";
    byType.set(k, [...(byType.get(k) ?? []), s]);
  }

  const groups = [...byType.entries()]
    .map(
      ([type, list]) => `    <outline text="${esc(type)}" title="${esc(type)}">
${list
  .map(
    (s) =>
      `      <outline type="rss" text="${esc(`${s.name} — ${s.kind}`)}" title="${esc(`${s.name} — ${s.kind}`)}" xmlUrl="${esc(s.url)}"${s.site ? ` htmlUrl="${esc(s.site)}"` : ""}/>`,
  )
  .join("\n")}
    </outline>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
  <head>
    <title>Veille technologique — ${esc(SITE.name)}</title>
    <dateModified>${new Date(feed.collectedAt).toUTCString()}</dateModified>
    <docs>http://opml.org/spec2.opml</docs>
  </head>
  <body>
${groups}
  </body>
</opml>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "text/x-opml; charset=utf-8",
      "Content-Disposition": 'inline; filename="veille-sean-fritsch.opml"',
    },
  });
}
