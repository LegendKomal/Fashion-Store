import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootSiblingParent } from "react-native-root-siblings";
import { CartProvider } from "./src/context/CartContext";
import ProductListScreen from "./src/screens/ProductListScreen";
import ProductDetailScreen from "./src/screens/ProductDetailScreen";
import WishlistScreen from "./src/screens/WishlistScreen";
import CartScreen from "./src/screens/CartScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#6366f1" },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "700",
                fontSize: 18,
                letterSpacing: 0.5,
              },
            }}
          >
            <Stack.Screen
              name="Products"
              component={ProductListScreen}
              options={{ title: "Welcome Back" }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
              options={{ title: "Product Details" }}
            />

            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{ title: "My Cart" }}
            />
            <Stack.Screen
              name="Wishlist"
              component={WishlistScreen}
              options={{ title: "My Wishlist" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </RootSiblingParent>
  );
}
