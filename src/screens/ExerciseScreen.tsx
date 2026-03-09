import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar as AppStatusBar } from '../components/StatusBar';
import { NetworkToggle } from '../components/NetworkToggle';
import { ActionButton } from '../components/ActionButton';
import { QueueInspector } from '../components/QueueInspector';
import { useOfflineQueue } from '../hooks/useOfflineQueue';
import { useNetwork } from '../context/NetworkContext';
import { LogEntry } from '../types';

export function ExerciseScreen() {
  const { isSimulatedOnline, toggleSimulatedNetwork } = useNetwork();
  const { isOnline, queueSize, enqueue, queue, logs } = useOfflineQueue();
  const scrollRef = useRef<ScrollView>(null);

  const handleAction = async (action: 'UPDATE_STATUS' | 'SYNC_GPS' | 'UPLOAD_PHOTO', label: string) => {
    const payload: Record<string, unknown> = {
      timestamp: Date.now(),
      label,
    };

    if (action === 'SYNC_GPS') {
      payload.latitude = 48.8566 + (Math.random() - 0.5) * 0.01;
      payload.longitude = 2.3522 + (Math.random() - 0.5) * 0.01;
    }

    await enqueue(action, payload);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Offline Queue Exercise</Text>

        {/* Status */}
        <AppStatusBar isOnline={isOnline} queueSize={queueSize} />

        {/* Network Toggle */}
        <NetworkToggle isOnline={isSimulatedOnline} onToggle={toggleSimulatedNetwork} />

        {/* Action Buttons */}
        <View style={styles.actions}>
          <ActionButton
            emoji="🚛"
            label="Statut mission"
            onPress={() => handleAction('UPDATE_STATUS', 'Mission en cours')}
          />
          <ActionButton
            emoji="📍"
            label="Sync GPS"
            onPress={() => handleAction('SYNC_GPS', 'Position chauffeur')}
          />
          <ActionButton
            emoji="📸"
            label="Upload photo"
            onPress={() => handleAction('UPLOAD_PHOTO', 'Photo livraison')}
          />
        </View>

        {/* Queue Inspector */}
        <QueueInspector queue={queue} />

        {/* Logs */}
        <View style={styles.logsContainer}>
          <Text style={styles.logsTitle}>Logs</Text>
          <ScrollView
            ref={scrollRef}
            style={styles.logsList}
            onContentSizeChange={() => scrollRef.current?.scrollToEnd()}
          >
            {logs.length === 0 ? (
              <Text style={styles.logsEmpty}>
                Appuyez sur un bouton pour commencer...
              </Text>
            ) : (
              logs.map((log: LogEntry, index: number) => (
                <Text
                  key={index}
                  style={[
                    styles.logLine,
                    log.type === 'error' && styles.logError,
                    log.type === 'success' && styles.logSuccess,
                    log.type === 'warning' && styles.logWarning,
                  ]}
                >
                  {new Date(log.timestamp).toLocaleTimeString()} — {log.message}
                </Text>
              ))
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 14,
    paddingBottom: 40,
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  logsContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 14,
    maxHeight: 220,
  },
  logsTitle: {
    color: '#00e676',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  logsList: {
    maxHeight: 180,
  },
  logsEmpty: {
    color: '#546e7a',
    fontSize: 13,
    fontStyle: 'italic',
  },
  logLine: {
    color: '#b0bec5',
    fontSize: 12,
    fontFamily: 'monospace',
    marginBottom: 3,
  },
  logError: {
    color: '#ff1744',
  },
  logSuccess: {
    color: '#00e676',
  },
  logWarning: {
    color: '#ffab00',
  },
});
