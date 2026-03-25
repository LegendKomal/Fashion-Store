import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
  useRef,
} from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";

const PAGE_SIZE = 10;

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { cartCount } = useCart();

  useLayoutEffect(() => {
  navigation.setOptions({
    headerRight: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 14, gap: 16 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Wishlist')}>
          <Ionicons name="heart-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.cartBtn} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={26} color="#fff" />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    ),
  });
}, [navigation, cartCount]);

  const fetchProducts = async (pageNum = 1, replace = false) => {
    try {
      const res = await fetch(
        `https://fakestoreapi.com/products?limit=${PAGE_SIZE * pageNum}`,
      );
      const data = await res.json();
      const sliced = data.slice((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE);
      if (replace) {
        setProducts(data.slice(0, PAGE_SIZE));
        setPage(1);
        setHasMore(data.length >= PAGE_SIZE);
      } else {
        setProducts((prev) => [...prev, ...sliced]);
        setHasMore(sliced.length === PAGE_SIZE);
      }
    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts(1, true);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts(1, true);
  }, []);

  const onLoadMore = () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage);
  };

  const handleScrollBegin = async () => {
    await NavigationBar.setVisibilityAsync("hidden");
  };

  const handleScrollEnd = async () => {
    await NavigationBar.setVisibilityAsync("visible");
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() =>
            navigation.navigate("ProductDetail", { product: item })
          }
        />
      )}
      contentContainerStyle={styles.list}
      numColumns={2}
      columnWrapperStyle={styles.row}
      onScrollBeginDrag={handleScrollBegin}
      onScrollEndDrag={handleScrollEnd}
      onMomentumScrollEnd={handleScrollEnd}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#6366f1"]}
        />
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.4}
      ListFooterComponent={
        loadingMore ? (
          <View style={styles.footer}>
            <ActivityIndicator size="small" color="#6366f1" />
            <Text style={styles.footerText}>Loading more...</Text>
          </View>
        ) : !hasMore ? (
          <Text style={styles.endText}>You've seen it all ✓</Text>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 12, backgroundColor: "#f8f8ff" },
  row: { justifyContent: "space-between" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8ff",
  },
  loadingText: { marginTop: 10, color: "#999", fontSize: 14 },
  cartBtn: { marginRight: 14, position: "relative" },
  badge: {
    position: "absolute",
    top: -6,
    right: -8,
    backgroundColor: "#fff",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: { color: "#6366f1", fontSize: 11, fontWeight: "800" },
  footer: {
    alignItems: "center",
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  footerText: { color: "#999", fontSize: 13 },
  endText: {
    textAlign: "center",
    color: "#aaa",
    fontSize: 13,
    paddingVertical: 20,
  },
});
