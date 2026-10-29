import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import FlatCards from './componets/project2/project3/FlatCards';
import ElevateCards from './componets/project2/project3/ElevateCards';
import FancyCard from './componets/project2/project3/FancyCard';
import ActionCard from './componets/project2/project3/ActionCard';
import ContactList from './componets/project2/project3/ContactList';
import PasswordGenerator from './componets/project2/project4/PasswordGenerator';

const App = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        {/* <Text>App</Text>
        <FlatCards />
        <ElevateCards />
        <FancyCard />
        <ActionCard />
        <ContactList /> */}s
        <PasswordGenerator />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
