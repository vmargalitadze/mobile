import { router } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Index() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/login');
      }
    }

  }, [user, loading]);

  if (loading) {
    return null;
  }

  return null;
} 