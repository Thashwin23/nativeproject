import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function FlatCards() {
  return (
    <View style={styles.container}>
      <View style={[styles.card, styles.card1]}>
        <Text style={styles.cardText}>Card 1</Text>
      </View>

      <View style={[styles.card, styles.card2]}>
        <Text style={styles.cardText}>Card 2</Text>
      </View>

      <View style={[styles.card, styles.card3]}>
        <Text style={styles.cardText}>Card 3</Text>
      </View>

      <View style={[styles.card, styles.card4]}>
        <Text style={styles.cardText}>Card 4</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },
  card: {
    flex: 1,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card1: {
    backgroundColor: '#E57373',
  },
  card2: {
    backgroundColor: '#64B5F6',
  },
  card3: {
    backgroundColor: '#81C784',
  },
  card4: {
    backgroundColor: '#FFD54F',
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
