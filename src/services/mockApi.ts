/**
 * API simulée pour l'exercice.
 *
 * Simule des appels réseau avec latence aléatoire et taux d'erreur configurable.
 * NE PAS MODIFIER ce fichier.
 */

import { ActionType } from '../types';

let failureRate = 0.2; // 20% d'erreurs par défaut
let minLatency = 200;
let maxLatency = 800;

const ERROR_MESSAGES = [
  'Network timeout',
  'Server error (503)',
  'Rate limit exceeded (429)',
];

function randomLatency(): number {
  return Math.floor(Math.random() * (maxLatency - minLatency + 1)) + minLatency;
}

function shouldFail(): boolean {
  return Math.random() < failureRate;
}

export const mockApi = {
  /**
   * Exécute une action simulée.
   * @returns Promise qui résout avec un résultat ou rejette avec une erreur réseau simulée.
   */
  async execute(action: ActionType, payload?: Record<string, unknown>): Promise<{ success: true; action: ActionType; timestamp: number }> {
    const latency = randomLatency();

    console.log(`[mockApi] ${action} — latence: ${latency}ms`, payload ?? '');

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail()) {
          const error = ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)];
          console.log(`[mockApi] ${action} — ERREUR: ${error}`);
          reject(new Error(error));
        } else {
          console.log(`[mockApi] ${action} — OK`);
          resolve({ success: true, action, timestamp: Date.now() });
        }
      }, latency);
    });
  },

  /** Modifier le taux d'erreur (0 = jamais, 1 = toujours) */
  setFailureRate(rate: number): void {
    failureRate = Math.max(0, Math.min(1, rate));
    console.log(`[mockApi] Taux d'erreur: ${(failureRate * 100).toFixed(0)}%`);
  },

  /** Modifier la latence (en ms) */
  setLatency(min: number, max: number): void {
    minLatency = Math.max(0, min);
    maxLatency = Math.max(minLatency, max);
    console.log(`[mockApi] Latence: ${minLatency}-${maxLatency}ms`);
  },
};
