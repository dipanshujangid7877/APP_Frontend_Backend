import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // or 'react-native-vector-icons/Ionicons'

const suggestedRoutes = [
  { id: '1', name: 'Home to Airport' },
  { id: '2', name: 'Office to Gym' },
  { id: '3', name: 'Station to Market' },
];

const SearchScreen = () => {
  const [query, setQuery] = useState('');

  const renderSuggestion = ({ item }) => (
    <TouchableOpacity style={styles.routeCard}>
      <Text style={styles.routeText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#555" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.input}
            placeholder="Search routes..."
            placeholderTextColor="#888"
            value={query}
            onChangeText={setQuery}
          />
        </View>

        <Text style={styles.suggestionsHeading}>Suggested Routes</Text>
        <FlatList
          data={suggestedRoutes}
          renderItem={renderSuggestion}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 25,
    marginTop: 20,

  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  suggestionsHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  list: {
    paddingBottom: 20,
  },
  routeCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  routeText: {
    fontSize: 16,
    color: '#555',
  },
});
