import { Tabs } from "expo-router";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, animation: "fade" }}>
      <Tabs.Screen
        name="products"
        options={{
          headerShown: false,
          tabBarInactiveTintColor: "white",
          headerTitleAlign: "center",
          tabBarActiveTintColor: "red",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pricetags-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          tabBarInactiveTintColor: "white",
          tabBarActiveTintColor: "red",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          tabBarInactiveTintColor: "white",
          tabBarActiveTintColor: "red",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
