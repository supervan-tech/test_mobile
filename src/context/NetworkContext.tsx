/**
 * Contexte réseau simulé.
 *
 * Fournit un toggle pour simuler le mode hors ligne,
 * indépendamment de l'état réseau réel de l'appareil.
 *
 * Le candidat peut combiner ce contexte avec NetInfo pour
 * une détection réseau réelle (bonus).
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NetworkContextType {
  /** true = simulé online, false = simulé offline */
  isSimulatedOnline: boolean;
  /** toggle l'état simulé */
  toggleSimulatedNetwork: () => void;
}

const NetworkContext = createContext<NetworkContextType>({
  isSimulatedOnline: true,
  toggleSimulatedNetwork: () => {},
});

export function NetworkProvider({ children }: { children: ReactNode }) {
  const [isSimulatedOnline, setIsSimulatedOnline] = useState(true);

  const toggleSimulatedNetwork = () => {
    setIsSimulatedOnline(prev => !prev);
  };

  return (
    <NetworkContext.Provider value={{ isSimulatedOnline, toggleSimulatedNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  return useContext(NetworkContext);
}
