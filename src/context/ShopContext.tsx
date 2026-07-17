"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, INITIAL_PRODUCTS, Review } from "@/data/initialData";

export interface CartItem {
  product: Product;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  customerPhone: string;
  address: string;
  city: string;
  zipCode: string;
  status: "Pending" | "Shipped" | "Delivered";
  date: string;
}

export interface User {
  name: string;
  email: string;
  wishlist: string[]; // product IDs
}

interface ShopContextProps {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  currentUser: User | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  placeOrder: (shippingInfo: { firstName: string; lastName: string; phone: string; address: string }) => Order;
  updateOrderStatus: (orderId: string, status: "Pending" | "Shipped" | "Delivered") => void;
  addProduct: (product: Omit<Product, "id" | "reviews" | "rating" | "inStock">) => void;
  editProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  login: (email: string) => boolean;
  register: (name: string, email: string) => boolean;
  logout: () => void;
  addReview: (productId: string, rating: number, comment: string) => void;
}

const ShopContext = createContext<ShopContextProps | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hydration-safe initial state loading
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem("kc_products");
      const storedCart = localStorage.getItem("kc_cart");
      const storedWishlist = localStorage.getItem("kc_wishlist");
      const storedOrders = localStorage.getItem("kc_orders");
      const storedUser = localStorage.getItem("kc_user");

      if (storedProducts) setProducts(JSON.parse(storedProducts));
      if (storedCart) setCart(JSON.parse(storedCart));
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
      if (storedOrders) setOrders(JSON.parse(storedOrders));
      if (storedUser) setCurrentUser(JSON.parse(storedUser));
    } catch (e) {
      console.error("Could not load from localStorage:", e);
    }
    setIsLoaded(true);
  }, []);

  // Save changes to localStorage whenever state changes
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("kc_products", JSON.stringify(products));
  }, [products, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("kc_cart", JSON.stringify(cart));
  }, [cart, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("kc_wishlist", JSON.stringify(wishlist));
  }, [wishlist, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("kc_orders", JSON.stringify(orders));
  }, [orders, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    if (currentUser) {
      localStorage.setItem("kc_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("kc_user");
    }
  }, [currentUser, isLoaded]);

  // Auth Operations
  const login = (email: string) => {
    // For high-fidelity simulation, we allow logging in with any email.
    // If user existed in order history or we just seed a basic name:
    const name = email.split("@")[0];
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    const newUser: User = {
      name: capitalizedName,
      email: email,
      wishlist: wishlist
    };
    setCurrentUser(newUser);
    return true;
  };

  const register = (name: string, email: string) => {
    const newUser: User = {
      name: name,
      email: email,
      wishlist: []
    };
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setCart([]);
    setWishlist([]);
  };

  // Cart Operations
  const addToCart = (product: Product) => {
    if (!product.inStock) return;
    setCart((prev) => {
      // Check if product is already in cart.
      // Since it is unique pre-loved clothes (1-of-1), max quantity is always 1.
      const exists = prev.some((item) => item.product.id === product.id);
      if (exists) return prev;
      return [...prev, { product }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const updated = exists
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];

      if (currentUser) {
        setCurrentUser({ ...currentUser, wishlist: updated });
      }
      return updated;
    });
  };

  const isWishlisted = (productId: string) => {
    return wishlist.includes(productId);
  };

  // Shopper checkout order placement
  const placeOrder = (shippingInfo: { firstName: string; lastName: string; phone: string; address: string }) => {
    const total = cart.reduce((sum, item) => sum + item.product.price, 0);
    const newOrder: Order = {
      id: "ord-" + Math.floor(100000 + Math.random() * 900000),
      items: [...cart],
      total,
      customerName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
      customerPhone: shippingInfo.phone,
      address: shippingInfo.address,
      city: "Dakar",
      zipCode: "",
      status: "Pending",
      date: new Date().toISOString().split("T")[0]
    };

    // 1-of-1 clothing inventory model: mark all purchased products as out of stock
    const cartIds = cart.map((item) => item.product.id);
    setProducts((prevProducts) =>
      prevProducts.map((p) => (cartIds.includes(p.id) ? { ...p, inStock: false } : p))
    );

    // Record order
    setOrders((prev) => [newOrder, ...prev]);
    // Clear shopper cart
    setCart([]);
    return newOrder;
  };

  // Review Operations
  const addReview = (productId: string, rating: number, comment: string) => {
    const newReview: Review = {
      id: "rev-" + Math.floor(1000 + Math.random() * 9000),
      user: currentUser ? currentUser.name : "Anonymous Buyer",
      rating,
      date: new Date().toISOString().split("T")[0],
      comment
    };

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        const updatedReviews = [...p.reviews, newReview];
        const avgRating = parseFloat(
          (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
        );
        return {
          ...p,
          reviews: updatedReviews,
          rating: avgRating
        };
      })
    );
  };

  // Administrative actions
  const updateOrderStatus = (orderId: string, status: "Pending" | "Shipped" | "Delivered") => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  const addProduct = (pInfo: Omit<Product, "id" | "reviews" | "rating" | "inStock">) => {
    const newProduct: Product = {
      ...pInfo,
      id: "p-" + Math.floor(100000 + Math.random() * 900000),
      reviews: [],
      rating: 5.0,
      inStock: true
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const editProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        currentUser,
        addToCart,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isWishlisted,
        placeOrder,
        updateOrderStatus,
        addProduct,
        editProduct,
        deleteProduct,
        login,
        register,
        logout,
        addReview
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
