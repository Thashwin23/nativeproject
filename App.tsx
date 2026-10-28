import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import FlatCards from './componets/project2/project3/FlatCards';
import ElevateCards from './componets/project2/project3/ElevateCards';

const App = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>App</Text>
        <FlatCards />
        <ElevateCards />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
