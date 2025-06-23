import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface UserProfile {
  name: string;
  email: string;
  createdAt: Date;
  phone?: string;
  address?: string;
}


export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        name: data.name,
        email: data.email,
        createdAt: data.createdAt?.toDate() || new Date(),
        phone: data.phone,
        address: data.address,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};


