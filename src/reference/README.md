# Code de référence

Ces fichiers sont des **extraits verbatim** du code actuel de l'application SUPERVAN Driver.

Ils illustrent les problèmes que le hook `useOfflineQueue` doit résoudre :

## OfflineScreen.js

L'écran affiché quand l'app perd la connexion. Problème : c'est un écran **bloquant**
qui empêche le chauffeur de travailler. Le bouton "RÉESSAYER" navigue simplement vers
le splash screen — aucune queue, aucun retry automatique.

## geolocation-sync.js

Le système de synchronisation GPS en arrière-plan (via transistorsoft).
Problème principal : le flag `isSyncing` n'est **jamais remis à false** en cas d'erreur,
ce qui bloque définitivement la synchronisation jusqu'au redémarrage de l'app.

Ces deux extraits montrent pourquoi une file d'attente offline robuste est nécessaire.
