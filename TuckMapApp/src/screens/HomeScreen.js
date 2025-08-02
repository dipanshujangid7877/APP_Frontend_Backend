import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Speech from 'expo-speech';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  // 🔊 Mic icon press handler
  const handleMicPress = () => {
    Speech.speak("Please say your destination");
  };

  // 👤 Profile icon press handler
  const handleProfilePress = () => {
    navigation.navigate('Profile'); // 👈 Make sure you created a Profile screen
  };

  // 🗺️ Map icon press handler
  const handleMapIconPress = () => {
    Alert.alert('Map Icon Pressed', 'You clicked the map icon.');
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 28.6139,
          longitude: 77.2090,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      />

      {/* Floating Search Bar */}
      <View style={styles.searchContainer}>
        {/* Map Icon */}
        <TouchableOpacity style={styles.iconWrapper} onPress={handleMapIconPress}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/50/map.png' }}
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* Text Input */}
        <TextInput
          placeholder="Search for location..."
          placeholderTextColor="#999"
          style={styles.input}
        />

        {/* Mic Icon */}
        <TouchableOpacity style={styles.iconWrapper} onPress={handleMicPress}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/50/microphone.png' }}
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* Profile Icon */}
        <TouchableOpacity style={styles.profileWrapper} onPress={handleProfilePress}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/50/user-male-circle.png' }}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: '#000',
    
  },
  iconWrapper: {
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 25,
    marginHorizontal: 4,
  },
  icon: {
    width: 18,
    height: 18,
    tintColor: '#555',
  },
  profileWrapper: {
    padding: 6,
    borderRadius: 25,
    marginLeft: 4,
  },
  profileIcon: {
    width: 26,
    height: 26,
    tintColor: '#333',
  },
});

export default HomeScreen;
