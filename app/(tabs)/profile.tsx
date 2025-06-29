import { router } from 'expo-router';
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';
import useLocation from '../../hooks/useLocation';
import { getUserProfile, UserProfile } from '../../services/userProfile';
import MapView, { Marker } from 'react-native-maps';
import profileStyles from './profile.style';
const Profile = () => {
  const { user, loading } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const { longitude, latitude, address, error, getUserLocation } = useLocation();

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

  const handleGetLocation = async () => {
    await getUserLocation();
  };

  if (loading) {
    return (
      <View style={profileStyles.container}>
        <ActivityIndicator size="large" color="red" />
        <Text style={profileStyles.loadingText}>Loading...</Text>
      </View>
    );
  }


  if (!user) {
    return (
      <View style={profileStyles.container}>
        <Text style={profileStyles.title}>Not Logged In</Text>
        <TouchableOpacity style={profileStyles.button} onPress={() => router.push('/login')}>
          <Text style={profileStyles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={profileStyles.container}>
      <View style={profileStyles.header}>
        <Text style={profileStyles.title}>Profile</Text>
      </View>

      <View style={profileStyles.profileSection}>
        <View style={profileStyles.avatar}>
          <Text style={profileStyles.avatarText}>
            {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
          </Text>
        </View>

        {profileLoading ? (
          <ActivityIndicator size="small" color="red" style={profileStyles.profileLoading} />
        ) : (
          <>
            <Text style={profileStyles.name}>
              {userProfile?.name || 'User'}
            </Text>
            <Text style={profileStyles.email}>{user.email}</Text>

            {userProfile?.createdAt && (
              <Text style={profileStyles.memberSince}>
                Member since {userProfile.createdAt.toLocaleDateString()}
              </Text>
            )}
          </>
        )}
      </View>

      <View style={profileStyles.actions}>
        <View style={profileStyles.locationSection}>
          <Text style={profileStyles.sectionTitle}>Location</Text>

          {error && (
            <Text style={profileStyles.errorText}>{error}</Text>
          )}

          {latitude && longitude && (
            <>
              <View style={profileStyles.mapContainer}>
                <MapView
                  style={profileStyles.map}
                  initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  showsUserLocation={true}
                >
                  <Marker
                    coordinate={{ latitude: latitude, longitude: longitude }}
                    title="თქვენ აქ ხართ"
                  />
                </MapView>
              </View>

              <View style={profileStyles.locationInfo}>
                <Text style={profileStyles.locationText}>Latitude: {latitude.toFixed(6)}</Text>
                <Text style={profileStyles.locationText}>Longitude: {longitude.toFixed(6)}</Text>
                {address && <Text style={profileStyles.addressText}>Address: {address}</Text>}
              </View>
            </>
          )}


          <TouchableOpacity style={profileStyles.locationButton} onPress={handleGetLocation}>
            <Text style={profileStyles.locationButtonText}>
              {latitude && longitude ? 'Update Location' : 'Get My Location'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={profileStyles.logoutButton} onPress={handleLogOut}>
          <Text style={profileStyles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
