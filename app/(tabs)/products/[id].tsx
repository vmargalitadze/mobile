import { Product } from "@/services/firestore";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        if (typeof id === 'string') {
          const productData = await fetch(`https://fakestoreapi.com/products/${id}`);
          const productDataJson = await productData.json();
          setProduct(productDataJson);
        }
      } catch (err) {
        setError('Failed to load product details');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity(prev => prev + 1);
    } else {
      setQuantity(prev => Math.max(1, prev - 1));
    }
  };

  const handleAddToCart = () => {
    if (!product || !product.id) return;
    
  
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart({
        id: parseInt(product.id.toString()),
        name: product.title,
        price: product.price,
        image: product.image
      }));
    }
    
    Alert.alert(
      'Added to Cart!',
      `${quantity} ${quantity === 1 ? 'item' : 'items'} added to your cart.`,
      [{ text: 'OK' }]
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="red" />
        <Text style={styles.loadingText}>Loading product details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.left}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            contentFit="contain"
          />
        </View>
        <View style={styles.right}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <View style={styles.quantityWrapper}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => handleQuantityChange(false)}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => handleQuantityChange(true)}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.cartBtn} 
            onPress={handleAddToCart}
          >
            <Text style={styles.cartText}>
              Add to cart ({quantity})
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    marginTop: 40,
    marginBottom: 40,
    paddingHorizontal: 20,
    gap: 24,
  },
  left: {
    height: 400,
    borderRadius: 12,
    overflow: "hidden",
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  quantity: {
    fontSize: 18,
  },
  right: {
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textTransform: "uppercase",
  },
  price: {
    fontSize: 20,
    marginBottom: 16,
    textTransform: "uppercase",
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
    textTransform: "uppercase",
  },
  cartBtn: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 6,
    marginTop: 20,
    alignItems: "center",
  },
  cartText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  quantityWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
    gap: 25,
  },
});
