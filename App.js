import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootSiblingParent } from "react-native-root-siblings";
import { CartProvider } from "./src/context/CartContext";
import { WishlistProvider } from "./src/context/WishlistContext";
import ProductListScreen from "./src/screens/ProductListScreen";
import ProductDetailScreen from "./src/screens/ProductDetailScreen";
import CartScreen from "./src/screens/CartScreen";
import WishlistScreen from "./src/screens/WishlistScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <CartProvider>
        <WishlistProvider>
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
                options={{ title: "FASHION STORE" }}
              />
              <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={{ title: "Product Details" }}
                getId={({ params }) => String(params?.product?.id)}
              />
              <Stack.Screen
                name="Cart"
                component={CartScreen}
                options={{ title: "My Cart" }}
                getId={() => "cart"}
              />
              <Stack.Screen
                name="Wishlist"
                component={WishlistScreen}
                options={{ title: "My Wishlist" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </WishlistProvider>
      </CartProvider>
    </RootSiblingParent>
  );
}
