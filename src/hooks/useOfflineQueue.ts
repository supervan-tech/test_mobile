/**
 * Hook useOfflineQueue
 *
 * Gère une file d'attente d'actions hors ligne avec :
 * - Détection de l'état réseau
 * - Mise en queue automatique quand offline
 * - Exécution directe quand online
 * - Replay automatique à la reconnexion (FIFO)
 * - Persistance locale (survit au redémarrage)
 * - Retry avec backoff exponentiel en cas d'erreur
 */

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import NetInfo from '@react-native-community/netinfo';
// import { mockApi } from '../services/mockApi';
// import { useNetwork } from '../context/NetworkContext';

import { UseOfflineQueueReturn, ActionType } from '../types';

const STORAGE_KEY = 'offline_queue';

export function useOfflineQueue(): UseOfflineQueueReturn {
  // ============================================================
  // TODO 1: État réseau
  // - Écouter NetInfo pour détecter les changements de connectivité
  // - Combiner avec useNetwork() pour le toggle simulé
  // - Mettre à jour un state `isOnline`
  // ============================================================

  // ============================================================
  // TODO 2: Gestion de la queue
  // - useState pour stocker la queue (QueueItem[])
  // - Fonction `enqueue` : si online → exécuter via mockApi,
  //   si offline → ajouter à la queue
  // - Générer un ID unique pour chaque item
  // ============================================================

  // ============================================================
  // TODO 3: Persistance
  // - Charger la queue depuis AsyncStorage au montage
  // - Sauvegarder la queue dans AsyncStorage à chaque modification
  // ============================================================

  // ============================================================
  // TODO 4: Replay à la reconnexion
  // - useEffect qui se déclenche quand isOnline passe à true
  // - Traiter la queue en FIFO (premier entré, premier sorti)
  // - Retirer chaque item après exécution réussie
  // ============================================================

  // ============================================================
  // TODO 5: Retry avec backoff exponentiel
  // - En cas d'erreur mockApi, incrémenter retryCount
  // - Attendre 2^retryCount secondes avant de réessayer
  // - Abandonner après MAX_RETRIES (ex: 3) et logger l'erreur
  // ============================================================

  // Valeurs par défaut — l'app compile immédiatement avec ce return
  return {
    isOnline: true,
    queueSize: 0,
    enqueue: async (_action: ActionType, _payload?: Record<string, unknown>) => {},
    queue: [],
    logs: [],
  };
}
