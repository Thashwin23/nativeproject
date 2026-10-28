
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [connected, setConnected] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>PRAANA</Text>
      <Text style={styles.subtitle}>
        Cardiorespiratory Wellness
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Heart Rate</Text>
        <Text style={styles.metric}>72 bpm</Text>
        <Text style={styles.note}>
          Example data — not a live sensor reading
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Respiratory Rate</Text>
        <Text style={styles.metric}>16 breaths/min</Text>
        <Text style={styles.note}>
          Example data — not a live sensor reading
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Bluetooth Device</Text>
        <Text style={styles.status}>
          {connected ? 'Connected' : 'Disconnected'}
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => setConnected(!connected)}
        >
          <Text style={styles.buttonText}>
            {connected ? 'Disconnect' : 'Connect Device'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F4F7F6',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#176B5B',
  },
  subtitle: {
    fontSize: 15,
    color: '#52615D',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    color: '#52615D',
  },
  metric: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#173D35',
  },
  note: {
    fontSize: 11,
    color: '#687873',
    marginTop: 8,
  },
  status: {
    fontSize: 18,
    marginVertical: 12,
  },
  button: {
    backgroundColor: '#176B5B',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
