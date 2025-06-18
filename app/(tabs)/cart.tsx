import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Cart = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>cart</Text>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    justifyContent: 'center', 
    alignItems: 'center',     
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
