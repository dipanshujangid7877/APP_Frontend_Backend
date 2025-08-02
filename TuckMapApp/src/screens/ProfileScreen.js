import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const userName = 'Dipanshu Jangid';
  const userPhoto = 'https://i.pravatar.cc/300'; // Replace with actual image URL or Firebase

  const handleEditProfile = () => {
    console.log('Edit Profile pressed');
    // navigation.navigate('EditProfile'); // if you have edit profile screen
  };

  const handleLogout = async () => {
    try {
      // Clear AsyncStorage (or only token if you prefer)
      await AsyncStorage.clear();

      // Navigate to Login screen
      navigation.replace('Login'); // use .replace() to prevent back button going to Profile
    } catch (error) {
      Alert.alert('Error', 'Something went wrong during logout.');
      console.error('Logout error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <View style={styles.container}>
        <Image source={{ uri: userPhoto }} style={styles.profileImage} />
        <Text style={styles.userName}>{userName}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: '#007bff',
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '80%',
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 15,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: '600',
  },
});
