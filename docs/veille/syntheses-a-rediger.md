# Synthèses de veille à rédiger — E4

Deux articles repérés par la collecte automatique, choisis parce qu'ils
touchent **tes deux thèmes** et **ton stage à la DISI**.

**Règle :** la partie « Faits » vient de l'article. La partie « Mon
analyse » doit venir de toi — le jury te demandera de la justifier à
l'oral. Deux ou trois phrases par question suffisent.

> ⚠️ **Confidentialité du stage.** Ton rapport est confidentiel. Tu peux
> dire *ce que tu as fait* (« j'ai déployé le MFA sur les téléphones d'un
> groupe d'utilisateurs »), jamais *comment l'infrastructure de la DISI
> est organisée* ni ce qui y serait protégé ou non. Reste sur le général.

---

## 1. GLPI 11.0.9 et 10.0.27 : 12 failles patchées

**Source :** IT Connect, 24/09/2026
**Lien :** https://www.it-connect.fr/glpi-11-0-9-10-0-27-failles-securite-patch/
**Thèmes :** IA & support N1 · Accès & authentification

### Faits (d'après l'article)

- Versions publiées le **16 septembre 2026** : GLPI **11.0.9** et **10.0.27**
- **12 failles** dans GLPI 11.0.9 : **10 importantes, 2 modérées**
- 7 communes aux deux branches, dont une **injection SQL non authentifiée**
  et une **authentification X509 sans vérification du certificat**
- 5 propres à GLPI 11, dont un **contournement du MFA** et 4 failles XSS
- Rythme annoncé : **un patch toutes les deux semaines**, attribué à
  « l'essor des LLM et de la recherche de vulnérabilités pilotée par des
  agents IA »

### Mon analyse

**Q1 — Qu'est-ce que je retiens ?**

> _à rédiger_

**Q2 — Qu'est-ce que ça change concrètement pour un parc qui utilise GLPI ?**
*(piste : tu as utilisé GLPI en stage — qui doit appliquer ces mises à
jour, à quel rythme, et que risque-t-on à attendre ?)*

> _à rédiger_

**Q3 — Le lien avec mon thème principal**
*(piste : l'article dit que des agents IA accélèrent la découverte de
failles. Ton projet Soveris est lui-même un agent IA de support. Qu'est-ce
que ça t'inspire ?)*

> _à rédiger_

---

## 2. 97 % des victimes de ransomware avaient le MFA

**Source :** IT Connect, 24/09/2026, d'après le rapport *State of
Ransomware 2026* de Sophos
**Lien :** https://www.it-connect.fr/97-des-victimes-de-ransomware-avaient-le-mfa-ou-sont-les-angles-morts/
**Thème :** Accès & authentification

### Faits (d'après l'article)

- Étude Sophos : **2 158 responsables IT** interrogés, **17 pays**
- **79 %** des ransomwares démarrent par une attaque sur l'identité ;
  **23 %** viennent d'identifiants compromis
- **97 %** des victimes attaquées via des identifiants compromis
  **avaient le MFA activé**
- Le MFA manquait là où il aurait servi dans **59 %** des cas
  (*Active Adversary Report 2026*)
- Deux mécanismes : MFA **contourné** (phishing AiTM, fatigue MFA, vol de
  cookies) ou MFA **absent** sur le chemin utilisé
- Angles morts cités : **VPN, passerelle RDP, consoles d'administration
  (pare-feu, hyperviseur, NAS), comptes locaux, comptes prestataires,
  groupes d'exclusion jamais revus, SMS comme second facteur**
- Recommandations : cartographier chaque chemin d'authentification,
  prioriser selon l'exposition, **revoir les exceptions au moins une fois
  par an** (exigence du ReCyF / NIS 2)

### Mon analyse

**Q1 — Qu'est-ce que je retiens ?**

> _à rédiger_

**Q2 — Qu'est-ce que ça change concrètement ?**
*(piste : « avoir le MFA » ne veut pas dire « être protégé ». Quelle est
la vraie question à se poser quand on déploie le MFA ?)*

> _à rédiger_

**Q3 — Le lien avec mon stage**
*(piste : tu as déployé le MFA sur un groupe d'utilisateurs, avec un
fichier de suivi pour la traçabilité. À quoi sert ce suivi au regard de
cet article ? Reste général — voir l'avertissement en haut.)*

> _à rédiger_

---

## Quand c'est rédigé

Envoie tes réponses. Elles seront mises en forme dans
`veilleE4.syntheses` (`lib/experience.ts`) et apparaîtront sur le
portfolio et le Google Site.
