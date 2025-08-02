import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const ProfileScreen = () => {
  const userName = "Dipanshu Jangid";
  const userPhoto = 'https://i.pravatar.cc/300'; // Replace with actual image URL or Firebase

  const handleEditProfile = () => {
    console.log('Edit Profile pressed');
  };

  const handleLogout = () => {
    console.log('Logout pressed');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <View style={styles.container}>
        {/* Profile Photo */}
        <Image source={{ uri: userPhoto }} style={styles.profileImage} />

        {/* User Name */}
        <Text style={styles.userName}>{userName}</Text>

        {/* Buttons */}
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
