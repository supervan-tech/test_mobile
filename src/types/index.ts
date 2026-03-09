/**
 * Types partagés pour l'exercice useOfflineQueue
 */

export type ActionType = 'UPDATE_STATUS' | 'SYNC_GPS' | 'UPLOAD_PHOTO';

export interface QueueItem {
  id: string;
  action: ActionType;
  payload: Record<string, unknown>;
  createdAt: number;
  retryCount: number;
}

export interface UseOfflineQueueReturn {
  /** true si l'appareil est connecté */
  isOnline: boolean;
  /** nombre d'items en attente dans la queue */
  queueSize: number;
  /** ajouter une action à la queue (ou l'exécuter immédiatement si online) */
  enqueue: (action: ActionType, payload?: Record<string, unknown>) => Promise<void>;
  /** contenu actuel de la queue (pour debug/affichage) */
  queue: QueueItem[];
  /** logs d'événements pour le debug */
  logs: LogEntry[];
}

export interface LogEntry {
  timestamp: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}
