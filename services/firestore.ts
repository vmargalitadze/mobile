import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Product interface
export interface Product {
  id?: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating?: number;
  stock?: number;
}

// Cart item interface
export interface CartItem {
  id?: string;
  productId: string;
  userId: string;
  quantity: number;
  product?: Product;
}

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
};

// Get a single product by ID


// Add a new product
export const addProduct = async (product: Omit<Product, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, 'products'), product);
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    return null;
  }
};

// Update a product
export const updateProduct = async (id: string, updates: Partial<Product>): Promise<boolean> => {
  try {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, updates);
    return true;
  } catch (error) {
    console.error('Error updating product:', error);
    return false;
  }
};

// Delete a product
export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(db, 'products', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
};

// Get user's cart items
export const getCartItems = async (userId: string): Promise<CartItem[]> => {
  try {
    const q = query(
      collection(db, 'cart'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as CartItem[];
  } catch (error) {
    console.error('Error getting cart items:', error);
    return [];
  }
};

// Add item to cart
export const addToCart = async (cartItem: Omit<CartItem, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, 'cart'), cartItem);
    return docRef.id;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return null;
  }
};

// Update cart item quantity
export const updateCartItemQuantity = async (id: string, quantity: number): Promise<boolean> => {
  try {
    const docRef = doc(db, 'cart', id);
    await updateDoc(docRef, { quantity });
    return true;
  } catch (error) {
    console.error('Error updating cart item:', error);
    return false;
  }
};

// Remove item from cart
export const removeFromCart = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(db, 'cart', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return false;
  }
}; 