"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
export interface CartItem {
  id: string;
  name: string;
  price: number;
  discount?: number;
  imageUrl?: string;
  quantity: number;
  packSize?: string;
  packType?: string;
  unitType?: string;
}
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  cartCount: number;
}
const CartContext = createContext<
  CartContextType | undefined
>(undefined);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");

      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch {
      localStorage.removeItem("cart");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const addToCart = (item: CartItem) => {
    console.log("NEW ITEM =", item);
    setCartItems((prev) => {
      const existing = prev.find(
        (p) => p.id === item.id
      );

      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? {
              ...p,
              quantity: p.quantity + 1,
            }
            : p
        );
      }
      return [
        ...prev,
        {
          ...item,
          quantity: item.quantity || 1,
        },
      ];
    });
  };
  const removeFromCart = (id: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };
  const increaseQuantity = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  const clearCart = () => {
    setCartItems([]);

    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        cartCount,
      }}    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used within CartProvider"
    );
  }

  return context;
}