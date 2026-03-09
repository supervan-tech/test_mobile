import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

interface NetworkToggleProps {
  isOnline: boolean;
  onToggle: () => void;
}

export function NetworkToggle({ isOnline, onToggle }: NetworkToggleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Simuler hors ligne</Text>
      <Switch
        value={!isOnline}
        onValueChange={onToggle}
        trackColor={{ false: '#37474f', true: '#ff1744' }}
        thumbColor={!isOnline ? '#ffffff' : '#b0bec5'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
  },
  label: {
    color: '#e0e0e0',
    fontSize: 15,
    fontWeight: '500',
  },
});
