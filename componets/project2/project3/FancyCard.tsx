import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

export default function FancyCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Trending for You</Text>
      <Text style={styles.subtitle}>
        Explore the latest in respiratory wellness
      </Text>

      <View style={styles.card}>
        <View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900',
            }}
            style={styles.image}
          />

          <View style={styles.badge}>
            <Text style={styles.badgeText}>🔥 TRENDING</Text>
          </View>
        </View>

        <View style={styles.details}>
          <Text style={styles.category}>FITNESS & WELLNESS</Text>

          <Text style={styles.title}>Improve Your Breathing Performance</Text>

          <Text style={styles.description}>
            Discover simple breathing techniques to support your workouts,
            recovery, and everyday wellness.
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.info}>5 min read</Text>
            <Text style={styles.info}>Beginner friendly</Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => console.log('Explore article pressed')}
          >
            <Text style={styles.buttonText}>Explore Article →</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#F4F7F6',
  },

  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#173D35',
  },

  subtitle: {
    fontSize: 14,
    color: '#687873',
    marginTop: 6,
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#173D35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },

  image: {
    width: '100%',
    height: 210,
    resizeMode: 'cover',
    backgroundColor: '#DCE8E3',
  },

  badge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#176B5B',
  },

  details: {
    padding: 18,
  },

  category: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    color: '#27866F',
    marginBottom: 9,
  },

  title: {
    fontSize: 21,
    lineHeight: 28,
    fontWeight: 'bold',
    color: '#173D35',
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#687873',
    marginTop: 10,
  },

  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
    marginBottom: 18,
  },

  info: {
    fontSize: 12,
    color: '#52615D',
  },

  button: {
    backgroundColor: '#176B5B',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonPressed: {
    opacity: 0.75,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
