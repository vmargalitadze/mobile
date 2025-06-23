import { router } from 'expo-router';
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { getUserProfile, UserProfile } from '../../services/userProfile';

const Profile = () => {
  const { user, loading } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);



  const fetchUserProfile = async () => {
    if (!user) return;
    
    setProfileLoading(true);
    try {
      const profile = await getUserProfile(user.uid);
      setUserProfile(profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

const handleLogOut = async () => {
  signOut(auth)
  .then(() => {

    console.log("User signed out successfully!");
  })
.catch((error) => {

  console.error("Sign out error:", error);
});
};

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="red" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
 

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Not Logged In</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
          </Text>
        </View>

        {profileLoading ? (
          <ActivityIndicator size="small" color="red" style={styles.profileLoading} />
        ) : (
          <>
            <Text style={styles.name}>
              {userProfile?.name || 'User'}
            </Text>
            <Text style={styles.email}>{user.email}</Text>
            
            {userProfile?.createdAt && (
              <Text style={styles.memberSince}>
                Member since {userProfile.createdAt.toLocaleDateString()}
              </Text>
            )}
          </>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  memberSince: {
    fontSize: 14,
    color: '#999',
  },
  profileLoading: {
    marginTop: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  actions: {
    flex: 1,
  },
  actionButton: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});