import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as NavigationBar from "expo-navigation-bar";
import Toast from "react-native-root-toast";
import { useCart } from "../context/CartContext";

const toINR = (usd) => (usd * 83).toFixed(0);

export default function CartScreen({ navigation }) {
  const { cartItems, addToCart, removeFromCart, cartTotal, clearCart } =
    useCart();

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    return () => NavigationBar.setVisibilityAsync("visible");
  }, []);

  const handlePlaceOrder = () => {
    Toast.show("Order placed successfully!", {
      duration: 3000,
      backgroundColor: "#22c55e",
      textColor: "#fff",
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
    });
    setTimeout(() => {
      clearCart();
      navigation.reset({
        index: 0,
        routes: [{ name: "Products" }],
      });
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.empty}>
        <Ionicons name="cart-outline" size={72} color="#c7d2fe" />
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <Text style={styles.emptySubText}>Go add something you love!</Text>
        <TouchableOpacity
          style={styles.shopBtn}
          onPress={() => navigation.navigate("Products")}
        >
          <Text style={styles.shopBtnText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.replace("ProductDetail", { product: item })
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
              <Text style={styles.price}>
                ₹{toINR(item.price * item.quantity)}
              </Text>
              <Text style={styles.unitPrice}>
                ₹{toINR(item.price)} × {item.quantity}
              </Text>
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={(e) => {
                    e.stopPropagation();
                    removeFromCart(item.id);
                  }}
                >
                  <Ionicons name="remove" size={16} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.qtyCount}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                >
                  <Ionicons name="add" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color="#c7d2fe"
              style={styles.arrow}
            />
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <View>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>
                  Items ({cartItems.length})
                </Text>
                <Text style={styles.summaryValue}>₹{toINR(cartTotal)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery</Text>
                <Text style={styles.freeText}>FREE</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalPrice}>₹{toINR(cartTotal)}</Text>
              </View>
            </View>

            <View style={styles.paymentBox}>
              <Text style={styles.summaryTitle}>Payment Method</Text>

              <View style={styles.paymentOption}>
                <View style={styles.radioActive}>
                  <View style={styles.radioDot} />
                </View>
                <MaterialCommunityIcons name="cash" size={22} color="#22c55e" />
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentName}>Cash on Delivery</Text>
                  <Text style={styles.paymentSub}>
                    Pay when your order arrives
                  </Text>
                </View>
                <View style={styles.availableBadge}>
                  <Text style={styles.availableText}>Available</Text>
                </View>
              </View>

              <View style={[styles.paymentOption, styles.paymentDisabled]}>
                <View style={styles.radioInactive} />
                <MaterialCommunityIcons
                  name="credit-card-outline"
                  size={22}
                  color="#cbd5e1"
                />
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentNameDisabled}>Online Payment</Text>
                  <Text style={styles.paymentSub}>UPI, Card, Net Banking</Text>
                </View>
                <View style={styles.unavailableBadge}>
                  <Text style={styles.unavailableText}>Coming Soon</Text>
                </View>
              </View>
            </View>
          </View>
        }
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handlePlaceOrder}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={20}
            color="#fff"
          />
          <Text style={styles.checkoutText}>
            Place Order · ₹{toINR(cartTotal)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8ff" },

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
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
  },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 13, color: "#0f172a", lineHeight: 18, marginBottom: 4 },
  price: { fontSize: 16, fontWeight: "800", color: "#6366f1", marginBottom: 2 },
  unitPrice: { fontSize: 11, color: "#94a3b8", marginBottom: 8 },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  qtyBtn: { backgroundColor: "#6366f1", borderRadius: 8, padding: 6 },
  qtyCount: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0f172a",
    minWidth: 20,
    textAlign: "center",
  },
  arrow: { marginLeft: 6 },

  summaryBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#6366f1",
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: { fontSize: 14, color: "#64748b" },
  summaryValue: { fontSize: 14, color: "#0f172a", fontWeight: "500" },
  freeText: { fontSize: 14, color: "#22c55e", fontWeight: "700" },
  divider: { height: 1, backgroundColor: "#f1f5f9", marginVertical: 10 },
  totalLabel: { fontSize: 15, fontWeight: "700", color: "#0f172a" },
  totalPrice: { fontSize: 18, fontWeight: "800", color: "#6366f1" },

  paymentBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#6366f1",
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  paymentOption: {
  flexDirection: 'row', alignItems: 'center',
  gap: 12, padding: 14,
  borderRadius: 12, borderWidth: 1.5,
  borderColor: '#4f46e5', backgroundColor: '#eef2ff',
  marginBottom: 10,
},
  paymentDisabled: {
    borderColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
    opacity: 0.6,
  },
  radioActive: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#6366f1",
  },
  radioInactive: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#cbd5e1",
  },
  paymentInfo: { flex: 1 },
  paymentName: { fontSize: 14, fontWeight: "700", color: "#0f172a" },
  paymentNameDisabled: { fontSize: 14, fontWeight: "700", color: "#94a3b8" },
  paymentSub: { fontSize: 11, color: "#94a3b8", marginTop: 2 },
  availableBadge: {
    backgroundColor: "#dcfce7",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  availableText: { fontSize: 10, color: "#16a34a", fontWeight: "700" },
  unavailableBadge: {
    backgroundColor: "#f1f5f9",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  unavailableText: { fontSize: 10, color: "#94a3b8", fontWeight: "700" },

  footer: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    elevation: 10,
  },
  checkoutBtn: {
    backgroundColor: "#6366f1",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
