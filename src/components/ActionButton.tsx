import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ActionButtonProps {
  emoji: string;
  label: string;
  onPress: () => void;
}

export function ActionButton({ emoji, label, onPress }: ActionButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: '#16213e',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    gap: 6,
  },
  emoji: {
    fontSize: 28,
  },
  label: {
    color: '#e0e0e0',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});
