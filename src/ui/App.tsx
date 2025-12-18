/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  Button,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import React, { useState } from 'react';

import { CatInstance } from '../domain/stores/Cat';
import CatStore from '../domain/stores/CatStore';
import { getAverageCatAge } from '../service/PetUseCases';

function App(): React.JSX.Element {
  //const [cats] = useState(CatStore.cats);
  const [newItemText, setNewItemText] = useState('');
  const [averageAge, setAverageAge] = useState(getAverageCatAge());

  const addItem = () => {
    CatStore.addCat(newItemText);
    setAverageAge(getAverageCatAge());
  };
  const deleteItem = (id : string) => {
    CatStore.deleteCat(id);
    setAverageAge(getAverageCatAge());
  };

  const renderCatItem = (cat: ListRenderItemInfo<CatInstance>) => (
    <View style={styles.catItem}>
      <View style={styles.catInfo}> {/* Added a container for text info */}
        <Text style={styles.catName}>{cat.item.name}</Text>
        <Text>{cat.item.age}</Text>
        <Button title="Delete" onPress={() => deleteItem(cat.item.id)} color="red"/>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={Colors.lighter}>
 <View style={styles.container}>
 <Text style={styles.averageAgeText}>Average Cat Age: {averageAge.toFixed(2)}</Text>
 <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={newItemText}
        onChangeText={setNewItemText}
      />
 <Button title="Add Item" onPress={addItem} />
      <FlatList
        data={CatStore.cats}
        renderItem={renderCatItem}
        keyExtractor={(item) => item.name + item.type} // Important for performance
      />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0', // Light background for better visibility
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  catItem: {
    flexDirection: 'row', // Arrange image and text horizontally
    alignItems: 'center', // Vertically align items
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  catInfo: { // Style the container for text information
    flex: 1, // Allow text to take up available space
  },
  catName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  averageAgeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default App;
