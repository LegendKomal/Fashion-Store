import React, { useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import * as NavigationBar from "expo-navigation-bar";
import Toast from "react-native-root-toast";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const toINR = (usd) => `₹${(usd * 83).toFixed(0)}`;

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart, cartItems } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const wishlisted = isWishlisted(product.id);

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    return () => NavigationBar.setVisibilityAsync("visible");
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 16 }}
          onPress={() => toggleWishlist(product)}
        >
          <Ionicons
            name={wishlisted ? "heart" : "heart-outline"}
            size={24}
            color={wishlisted ? "#fca5a5" : "#fff"}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, wishlisted]);

  const handleAddToCart = () => {
    addToCart(product);
    Toast.show("Added to cart!", {
      duration: 1500,
      backgroundColor: "#6366f1",
      textColor: "#fff",
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
    });
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigation.navigate("Cart");
  };

  const renderStars = (rate) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <FontAwesome
        key={star}
        name={star <= Math.round(rate) ? "star" : "star-o"}
        size={14}
        color="#f59e0b"
        style={{ marginRight: 2 }}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.imageBox}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.categoryPill}>
            <Text style={styles.categoryText}>
              {product.category.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          
          <Text style={styles.title}>{product.title}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{toINR(product.price)}</Text>
            <View style={styles.ratingBox}>
              <View style={styles.starsRow}>
                {renderStars(product.rating?.rate)}
              </View>
              <Text style={styles.ratingCount}>
                {product.rating?.rate} · {product.rating?.count} reviews
              </Text>
            </View>
          </View>

          <View style={styles.tagRow}>
            <View style={styles.tag}>
              <Ionicons
                name="shield-checkmark-outline"
                size={13}
                color="#4f46e5"
              />
              <Text style={styles.tagText}>Authentic</Text>
            </View>
            <View style={styles.tag}>
              <Ionicons name="car-outline" size={13} color="#4f46e5" />
              <Text style={styles.tagText}>Free Delivery</Text>
            </View>
            <View style={styles.tag}>
              <Ionicons name="refresh-outline" size={13} color="#4f46e5" />
              <Text style={styles.tagText}>Easy Returns</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>About this item</Text>
          <Text style={styles.desc}>{product.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {quantity === 0 ? (
          <TouchableOpacity
            style={styles.cartFooterBtn}
            onPress={handleAddToCart}
          >
            <Ionicons name="cart-outline" size={20} color="#6366f1" />
            <Text style={styles.cartFooterText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.goToCartBtn}
            onPress={() => navigation.navigate("Cart")}
          >
            <Ionicons name="cart" size={20} color="#6366f1" />
            <Text style={styles.cartFooterText}>Go to Cart ({quantity})</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.buyBtn} onPress={handleBuyNow}>
          <MaterialCommunityIcons
            name="shopping-outline"
            size={20}
            color="#fff"
          />
          <Text style={styles.buyBtnText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#f8f8ff" },
  scrollContent: { paddingBottom: 20 },

  imageBox: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    elevation: 4,
    shadowColor: "#6366f1",
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  image: { width: 240, height: 250 },
  categoryPill: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#4f46e5",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  categoryText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },

  body: { padding: 20 },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0f172a",
    lineHeight: 25,
    marginBottom: 14,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  price: { fontSize: 28, fontWeight: "800", color: "#6366f1" },
  ratingBox: { alignItems: "flex-end" },
  starsRow: { flexDirection: "row", marginBottom: 3 },
  ratingCount: { fontSize: 11, color: "#94a3b8" },

  tagRow: { flexDirection: "row", gap: 8, marginBottom: 4, flexWrap: "wrap" },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#eef2ff",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },
  tagText: { fontSize: 11, color: "#4f46e5", fontWeight: "600" },

  divider: { height: 1, backgroundColor: "#e2e8f0", marginVertical: 16 },

  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  desc: { fontSize: 14, color: "#64748b", lineHeight: 22 },

  footer: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    elevation: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  cartFooterBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 2,
    borderColor: "#6366f1",
    borderRadius: 14,
    paddingVertical: 14,
    backgroundColor: "#fff",
  },
  goToCartBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 2,
    borderColor: "#6366f1",
    borderRadius: 14,
    paddingVertical: 14,
    backgroundColor: "#eef2ff",
  },
  cartFooterText: { color: "#6366f1", fontSize: 15, fontWeight: "700" },
  buyBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#6366f1",
    borderRadius: 14,
    paddingVertical: 14,
  },
  buyBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },
});
