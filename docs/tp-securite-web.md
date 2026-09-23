# TP — Audit de la surface HTTP d'une application web et durcissement

**Auteur :** Sean Fritsch — BTS SIO SISR 2e année
**Cible :** portfolio-site-ten-pearl-61.vercel.app (mon propre déploiement)
**Nature :** test autorisé, sur mon propre actif, non intrusif
**Durée estimée :** 1 h 30

---

## 1. Contexte et objectif

Mon portfolio est hébergé sur **Vercel**, une plateforme *serverless* (PaaS).
Objectif du TP : évaluer sa **surface d'exposition** et la durcir, en
distinguant ce qui est pertinent de ce qui ne l'est pas sur ce type
d'hébergement.

**Résultat attendu :** une liste d'en-têtes de sécurité manquants, leur
correction, et une vérification avant/après.

---

## 2. Le piège à éviter — pourquoi ne PAS lancer nmap sur Vercel

Réflexe courant : `nmap portfolio-site-ten-pearl-61.vercel.app` depuis Kali.
**C'est une erreur d'analyse**, pour trois raisons.

### 2.1 La cible n'est pas mon serveur

```bash
nslookup portfolio-site-ten-pearl-61.vercel.app
```

Résultat (observé) :

```
Addresses:  216.198.79.3
            64.29.17.3
            64:ff9b::d8c6:4f83   (IPv6)
```

Ces adresses sont des **IP anycast partagées** de l'edge Vercel. Des
milliers de sites répondent sur les mêmes IP. Scanner ces ports, c'est
scanner **l'infrastructure de Vercel**, pas mon application.

### 2.2 Le résultat n'apprend rien

Sur une plateforme serverless, **il n'y a pas de serveur à moi avec des
ports ouverts**. Un scan renverrait au mieux 80/443 ouverts (le proxy
Vercel), 22 filtré, et zéro information sur mon déploiement. Toute la
surface d'attaque est à la **couche applicative HTTP**.

### 2.3 C'est contraire aux conditions d'utilisation

Scanner activement une infrastructure mutualisée que je ne possède pas
sort du cadre « test sur mon propre actif ». L'*Acceptable Use Policy* de
Vercel interdit les scans et tests d'intrusion sur son infrastructure.

> **Conclusion de méthode :** sur un hébergement PaaS/serverless, on
> n'audite pas des ports, on audite la **réponse HTTP**. C'est là qu'est
> ma responsabilité et ma marge d'action.

---

## 3. Prérequis

| Élément | Détail |
|---|---|
| Poste d'analyse | Kali Linux (ou toute distrib. avec `curl`) |
| Outils | `curl`, `nslookup`/`dig`, `openssl` |
| Cible | Mon déploiement Vercel (actif que je possède) |
| Optionnel | Extension navigateur *headers*, ou scanner en ligne type Mozilla Observatory |

---

## 4. Manipulations

### 4.1 Relever les en-têtes de réponse

```bash
curl -sSI https://portfolio-site-ten-pearl-61.vercel.app/
```

### 4.2 Vérifier la présence des en-têtes de sécurité

```bash
H=$(curl -sSI https://portfolio-site-ten-pearl-61.vercel.app/ | tr 'A-Z' 'a-z')
for h in strict-transport-security content-security-policy \
         x-content-type-options x-frame-options \
         referrer-policy permissions-policy; do
  echo "$H" | grep -q "^$h:" && echo "[PRESENT] $h" || echo "[ABSENT ] $h"
done
```

### 4.3 Contrôler la configuration TLS

```bash
openssl s_client -connect portfolio-site-ten-pearl-61.vercel.app:443 \
  -servername portfolio-site-ten-pearl-61.vercel.app </dev/null 2>/dev/null \
  | grep -E "Protocol|Cipher"
```

---

## 5. Résultats — attendu / observé

| En-tête | Rôle | Attendu | Observé (avant) |
|---|---|---|---|
| `Strict-Transport-Security` | Force HTTPS | Présent | **Présent** ✓ (max-age 2 ans, preload) |
| `X-Content-Type-Options` | Bloque le MIME-sniffing | `nosniff` | **Absent** ✗ |
| `Referrer-Policy` | Limite la fuite d'URL | Présent | **Absent** ✗ |
| `Permissions-Policy` | Coupe caméra/micro/géoloc | Présent | **Absent** ✗ |
| `Content-Security-Policy` | Limite les sources de scripts | Présent | **Absent** ✗ |
| `X-Frame-Options` | Anti-clickjacking | *voir §7* | **Absent** (volontaire) |
| TLS | Chiffrement | ≥ TLS 1.2 | **OK**, certificat valide |

**Analyse :** le socle transport est bon (HTTPS forcé, TLS valide), mais
la couche applicative n'envoie presque aucun en-tête de sécurité. Un
site statique est peu sensible, mais ces en-têtes sont des bonnes
pratiques attendues et gratuites à mettre en place.

---

## 6. Remédiation

Sur Next.js, les en-têtes se déclarent dans `next.config.ts`, fonction
`headers()`. Vercel les applique à chaque réponse.

```ts
// next.config.ts
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};
```

**Vérification après déploiement :** relancer la commande du §4.2. Les
trois en-têtes doivent passer de `[ABSENT]` à `[PRESENT]`.

---

## 7. Le vrai arbitrage — sécurité contre fonctionnalité

`X-Frame-Options: DENY` empêcherait tout site tiers d'afficher mon
portfolio dans une `<iframe>`. **Mais mon portfolio EST intégré dans mon
Google Sites via iframe** (routes `/embed/*`). Ajouter cet en-tête en
aveugle **casserait la consultation par le professeur**.

C'est le cœur du raisonnement de sécurité : un en-tête n'est pas « bon »
dans l'absolu, il dépend de l'usage. La bonne réponse ici n'est pas
`X-Frame-Options: DENY` mais une politique `Content-Security-Policy` avec
`frame-ancestors` **autorisant précisément Google Sites** et refusant le
reste — à tester contre l'intégration réelle avant de la publier.

> **Ce que le jury retient :** je ne colle pas une recette. J'identifie
> l'en-tête manquant, je connais son rôle, et je sais pourquoi je ne peux
> pas l'appliquer tel quel dans mon cas. Sécurité et fonctionnement sont
> arbitrés, pas opposés.

---

## 8. Conclusion

- **Constat :** transport solide, couche applicative à durcir.
- **Action :** 3 en-têtes ajoutés sans risque fonctionnel.
- **Arbitrage :** framing laissé ouvert, à restreindre via CSP après test.
- **Compétence E5 mobilisée :** exploiter, sécuriser et documenter une
  solution — avec preuve avant/après reproductible.
