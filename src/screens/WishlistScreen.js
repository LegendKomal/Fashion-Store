import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const toINR = (usd) => `₹${(usd * 83).toFixed(0)}`;

export default function WishlistScreen({ navigation }) {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart, cartItems } = useCart();

  const handleRemove = (product) => {
    toggleWishlist(product);
    Toast.show("Removed from wishlist", {
      duration: 1500,
      backgroundColor: "#ef4444",
      textColor: "#fff",
      position: Toast.positions.BOTTOM,
    });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    Toast.show("Added to cart!", {
      duration: 1500,
      backgroundColor: "#6366f1",
      textColor: "#fff",
      position: Toast.positions.BOTTOM,
    });
  };

  if (wishlistItems.length === 0) {
    return (
      <View style={styles.empty}>
        <Ionicons name="heart-outline" size={72} color="#fca5a5" />
        <Text style={styles.emptyText}>Your wishlist is empty</Text>
        <Text style={styles.emptySubText}>Save items you love!</Text>
        <TouchableOpacity
          style={styles.shopBtn}
          onPress={() => navigation.navigate("Products")}
        >
          <Text style={styles.shopBtnText}>Start Browsing</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={wishlistItems}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => {
        const cartItem = cartItems.find((c) => c.id === item.id);
        const inCart = !!cartItem;

        return (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("ProductDetail", { product: item })
            }
            activeOpacity={0.85}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.price}>{toINR(item.price)}</Text>
              <View style={styles.actions}>
                {inCart ? (
                  <TouchableOpacity
                    style={styles.goToCartBtn}
                    onPress={() => navigation.navigate("Cart")}
                  >
                    <Ionicons name="cart" size={15} color="#6366f1" />
                    <Text style={styles.goToCartText}>Go to Cart</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.cartBtn}
                    onPress={() => handleAddToCart(item)}
                  >
                    <Ionicons name="cart-outline" size={15} color="#fff" />
                    <Text style={styles.cartBtnText}>Add to Cart</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => handleRemove(item)}
                >
                  <Ionicons
                    name="heart-dislike-outline"
                    size={18}
                    color="#ef4444"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, backgroundColor: "#f8f8ff" },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8ff",
    gap: 8,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    marginTop: 12,
  },
  emptySubText: { fontSize: 14, color: "#94a3b8" },
  shopBtn: {
    marginTop: 16,
    backgroundColor: "#6366f1",
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 14,
  },
  shopBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 12,
    padding: 12,
    elevation: 3,
    shadowColor: "#6366f1",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
  },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 13, color: "#0f172a", lineHeight: 18, marginBottom: 3 },
  category: {
    fontSize: 11,
    color: "#94a3b8",
    marginBottom: 4,
    textTransform: "capitalize",
  },
  price: {
    fontSize: 16,
    fontWeight: "800",
    color: "#6366f1",
    marginBottom: 10,
  },
  actions: { flexDirection: "row", alignItems: "center", gap: 10 },
  cartBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#6366f1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  cartBtnText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  goToCartBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#eef2ff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1.5,
    borderColor: "#6366f1",
  },
  goToCartText: { color: "#6366f1", fontSize: 12, fontWeight: "700" },
  removeBtn: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#fff5f5",
    borderWidth: 1,
    borderColor: "#fecaca",
  },
});
