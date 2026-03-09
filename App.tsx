import React from 'react';
import { NetworkProvider } from './src/context/NetworkContext';
import { ExerciseScreen } from './src/screens/ExerciseScreen';

export default function App() {
  return (
    <NetworkProvider>
      <ExerciseScreen />
    </NetworkProvider>
  );
}
