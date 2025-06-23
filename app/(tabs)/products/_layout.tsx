import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack 
      screenOptions={{ 
        headerShown: false, 
        animation: 'slide_from_right',
        presentation: 'card'
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{
          title: "Products"
        }}
      />
      <Stack.Screen 
        name="[id]" 
        options={{
          title: "Product Details"
        }}
      />
    </Stack>
  );
};

export default _layout;