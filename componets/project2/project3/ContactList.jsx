import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

const contacts = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Rahul Sharma',
    status: 'Hey there! I am using WhatsApp.',
    image: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Priya Nair',
    status: 'Available',
    image: 'https://i.pravatar.cc/150?img=47',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Arjun Kumar',
    status: 'Busy at work 💻',
    image: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    name: 'Sneha Reddy',
    status: 'At the gym 🏋️',
    image: 'https://i.pravatar.cc/150?img=44',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    name: 'Vikram Singh',
    status: 'Available for a call',
    image: 'https://i.pravatar.cc/150?img=13',
  },
];
 
export default function ContactList() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Chats</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {contacts.map(({ id, name, status, image }) => (
          <View key={id} style={styles.contactItem}>
            <Image source={{ uri: image }} style={styles.profileImage} />

            <View style={styles.contactInfo}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.status} numberOfLines={1}>
                {status}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#075E54',
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  profileImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#E5E7EB',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 12,
    paddingTop: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 5,
  },
  status: {
    fontSize: 13,
    color: '#6B7280',
  },
});
