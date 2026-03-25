import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const toINR = (usd) => `₹${(usd * 83).toFixed(0)}`;

export default function ProductCard({ product, onPress }) {
  const { addToCart, removeFromCart, cartItems } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const wishlisted = isWishlisted(product.id);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <TouchableOpacity
        style={styles.heartBtn}
        onPress={() => toggleWishlist(product)}
      >
        <Ionicons
          name={wishlisted ? "heart" : "heart-outline"}
          size={20}
          color={wishlisted ? "#ef4444" : "#94a3b8"}
        />
      </TouchableOpacity>

      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>{toINR(product.price)}</Text>
        {quantity === 0 ? (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => addToCart(product)}
          >
            <Text style={styles.btnText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtyRow}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => removeFromCart(product.id)}
            >
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qtyCount}>{quantity}</Text>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => addToCart(product)}
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "48%",
    marginBottom: 14,
    overflow: "hidden",
    shadowColor: "#6366f1",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  heartBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: { width: "100%", height: 160, backgroundColor: "#f8f8ff" },
  info: { padding: 10 },
  name: { fontSize: 12, color: "#334155", marginBottom: 4, lineHeight: 17 },
  price: { fontSize: 15, fontWeight: "700", color: "#0f172a", marginBottom: 8 },
  btn: {
    backgroundColor: "#6366f1",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    overflow: "hidden",
  },
  qtyBtn: {
    backgroundColor: "#6366f1",
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  qtyBtnText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  qtyCount: { fontSize: 15, fontWeight: "700", color: "#0f172a" },
});
