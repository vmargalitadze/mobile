import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
interface Products {
  id: string;
  title: string;
  price: number;
  image: string;
}
const Product = () => {
  const [products, setProducts] = useState<Products[]>([]);

  const fetchProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const res = await response.json();
    setProducts(res);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleGoDetails = (id:string) => {
    router.push(`/products/${id}` as any);
  };

  return (
    <FlatList
      style={{ backgroundColor: "white" }}
      data={products}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        
          <View style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              <Button
                title="details"
                onPress={() => handleGoDetails(item.id)}
              />
            </View>
          </View>
       
      )}
    />
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    width: "100%",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardBody: {
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#10B981",
    marginTop: 6,
    textAlign: "center",
    marginBottom: 10,
  },
});
