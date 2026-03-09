import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { QueueItem } from '../types';

interface QueueInspectorProps {
  queue: QueueItem[];
}

export function QueueInspector({ queue }: QueueInspectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Queue Inspector</Text>
      {queue.length === 0 ? (
        <Text style={styles.empty}>Aucun item en queue</Text>
      ) : (
        <ScrollView style={styles.list}>
          {queue.map((item) => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.action}>{item.action}</Text>
              <Text style={styles.meta}>
                id: {item.id.slice(0, 8)}... | retries: {item.retryCount}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 14,
    maxHeight: 160,
  },
  title: {
    color: '#7c4dff',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  empty: {
    color: '#546e7a',
    fontSize: 13,
    fontStyle: 'italic',
  },
  list: {
    gap: 6,
  },
  item: {
    backgroundColor: '#0f3460',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  action: {
    color: '#e0e0e0',
    fontSize: 13,
    fontWeight: '600',
  },
  meta: {
    color: '#78909c',
    fontSize: 11,
    marginTop: 2,
  },
});
