import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function ElevateCards() {
  const cards = [
    { id: 1, title: 'Heart Rate', value: '72 bpm', color: '#D6EAF8' },
    { id: 2, title: 'Breathing', value: '16 / min', color: '#D5F5E3' },
    { id: 3, title: 'Oxygen Level', value: '98%', color: '#FADBD8' },
    { id: 4, title: 'Recovery', value: 'Good', color: '#FCF3CF' },
    { id: 5, title: 'Activity', value: 'Active', color: '#E8DAEF' },
    { id: 6, title: 'Sleep', value: '7.5 hrs', color: '#D6DBDF' },
    { id: 7, title: 'Wellness', value: 'Stable', color: '#F5CBA7' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Elevated Cards</Text>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {cards.map(card => (
          <View
            key={card.id}
            style={[styles.card, { backgroundColor: card.color }]}
          >
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardValue}>{card.value}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#F4F7F6',
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 20,
    color: '#173D35',
  },

  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 16,
  },

  card: {
    width: 180,
    height: 150,
    padding: 20,
    borderRadius: 16,

    // Android elevation
    elevation: 6,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,

    justifyContent: 'center',
  },

  cardTitle: {
    fontSize: 16,
    color: '#34495E',
    marginBottom: 12,
  },

  cardValue: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#173D35',
  },
});
