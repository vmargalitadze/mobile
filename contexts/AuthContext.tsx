import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';


import { auth } from '@/config/firebase'; 
import { router } from 'expo-router';
import { Alert } from 'react-native';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  handleLogout: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe; 
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('Attempting to sign out...');
              await signOut(auth);
              console.log('Sign out successful');
              
              router.replace('/login');
            } catch (error) {
              console.log('Error', 'Failed to logout');
              console.error('Logout error:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
