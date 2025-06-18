import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,

} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found</Text>
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
              <Text style={styles.buttonText}>-</Text>
         
            <Text style={styles.quantity}>0</Text>
              <Text style={styles.buttonText}>+</Text>
      
          </View>
          <View style={styles.cartBtn}>
            <Text style={styles.cartText}>Add to cart</Text>
          </View>
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
  },
  quantityWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    textAlign:"center",
    justifyContent:"center",
    gap:25,
    fontSize:25
  },
});
