# Fashion Store

A simple fashion store app built with React Native and Expo. Browse products,
save your favorites, manage your cart, and place orders — all in a clean mobile UI.

---

## Screens

- **Product Listing** — Scrollable grid of products with add to cart and wishlist
- **Product Detail** — Full product info, ratings, and buy options
- **Cart** — Manage quantities, view total, and place order via Cash on Delivery
- **Wishlist** — Save products you like and add them to cart later

---

## Tech Used

- React Native + Expo
- React Navigation (Stack)
- Context API — cart and wishlist state
- FakeStore API — product data
- expo-navigation-bar — hides gesture bar on detail and cart screens
- react-native-root-toast — toast notifications
- @expo/vector-icons — all icons

---

## Getting Started

Make sure you have Node.js (v18+) and the Expo Go app installed on your phone.

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/FashionStore.git
cd FashionStore

# 2. Install dependencies
npm install
npx expo install expo-asset expo-font expo-navigation-bar

# 3. Start the app
npx expo start --clear
```

Scan the QR code with Expo Go on Android or the default Camera app on iPhone.

> Make sure your phone and laptop are on the same Wi-Fi network.

---

## Features

- Browse 10 products on load, scroll down to load more
- Add to cart with live quantity controls (+/-)
- Wishlist with heart icon on every product card
- Cart badge in header shows unique item count
- Cash on Delivery checkout with order confirmation
- Pull to refresh on product listing
- Gesture navigation bar hides on product detail and cart screens

---

## Notes

- Products are fetched from fakestoreapi.com so internet is required
- Prices are shown in INR (converted from USD at ₹83)
- Payment is Cash on Delivery only — online payment is marked as coming soon
- Cart and wishlist data resets when the app is closed (no local storage)
- Project runs on Expo SDK 54 — make sure your Expo Go app is up to date

---

## Test the App

If you don't want to set up the environment, a screen recording is included
in the repo showing the full flow from browsing to placing an order.


