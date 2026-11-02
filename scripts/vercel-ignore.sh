#!/bin/bash
# Vercel, « Ignored Build Step » (vercel.json, ignoreCommand).
# Code 0 : ne pas construire. Code 1 : construire.
#
# Les commits quotidiens de la veille ne modifient que
# data/veille-feed.json, que le site relit seul toutes les heures :
# inutile de reconstruire. La comparaison se fait avec le dernier
# deploiement reussi (VERCEL_GIT_PREVIOUS_SHA), pas avec le commit
# precedent : sinon un push de plusieurs commits ou une fusion terminee
# par une collecte annulerait le deploiement des autres changements.
# Dans le doute (premier deploiement, historique trop court), on construit.

prev="$VERCEL_GIT_PREVIOUS_SHA"
if [ -n "$prev" ] && git cat-file -e "${prev}^{commit}" 2>/dev/null; then
  if git diff --quiet "$prev" HEAD -- . ':(exclude)data/veille-feed.json'; then
    echo "Seul data/veille-feed.json a change depuis $prev : build ignore."
    exit 0
  fi
fi
exit 1
