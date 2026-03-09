import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatusBarProps {
  isOnline: boolean;
  queueSize: number;
}

export function StatusBar({ isOnline, queueSize }: StatusBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.statusRow}>
        <View style={[styles.dot, isOnline ? styles.online : styles.offline]} />
        <Text style={styles.statusText}>
          {isOnline ? 'En ligne' : 'Hors ligne'}
        </Text>
      </View>
      <Text style={styles.queueText}>
        Queue: {queueSize}
      </Text>
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
    paddingVertical: 12,
    borderRadius: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  online: {
    backgroundColor: '#00c853',
  },
  offline: {
    backgroundColor: '#ff1744',
  },
  statusText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  queueText: {
    color: '#b0bec5',
    fontSize: 14,
    fontWeight: '500',
  },
});
