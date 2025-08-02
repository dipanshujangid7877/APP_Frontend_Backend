import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const savedRoutes = [
  { id: '1', name: 'Home to Office', time: '35 mins', distance: '12 km' },
  { id: '2', name: 'College to Hostel', time: '15 mins', distance: '5.5 km' },
  { id: '3', name: 'Market Route', time: '20 mins', distance: '7 km' },
];

const SavedScreen = () => {
  const renderRoute = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.routeName}>{item.name}</Text>
      <Text style={styles.routeInfo}>Time: {item.time} | Distance: {item.distance}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <View style={styles.container}>
        <Text style={styles.heading}>Saved Routes</Text>
        <FlatList
          data={savedRoutes}
          renderItem={renderRoute}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  routeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007bff',
    marginBottom: 8,
  },
  routeInfo: {
    fontSize: 14,
    color: '#666',
  },
});
