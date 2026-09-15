 "use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type ProductUnit = string;

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

  company?: string;
  category?: string;

  // Tablet/strip medicine fields
  stripsPerBox?: number;
  tabletsPerStrip?: number;
  stripPrice?: number;
  boxPrice?: number;

  // Vial fields
  vialPrice?: number;
  vialSize?: string;

  unitOptions?: string[];
  selectedUnit?: ProductUnit;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, unit?: ProductUnit) => void;
  clearCart: () => void;
  increaseQuantity: (id: string, unit?: ProductUnit) => void;
  decreaseQuantity: (id: string, unit?: ProductUnit) => void;
  updateCartItemUnit: (
    id: string,
    currentUnit: ProductUnit,
    unit: ProductUnit
  ) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function normalizeUnit(value: unknown): string {
  return String(value ?? "").trim();
}

function normalizeCategory(value: unknown): string {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "");
}

function getUnitOptions(item: CartItem): string[] {
  const explicitOptions = Array.isArray(item.unitOptions)
    ? item.unitOptions.map(normalizeUnit).filter(Boolean)
    : [];

  // Product View is the source of truth whenever it supplied explicit units.
  if (explicitOptions.length > 0) {
    return Array.from(new Set(explicitOptions));
  }

  /*
   * Legacy/single-unit cart items keep only their actual unit.
   * Never invent Bottle/Piece from the category.
   */
  const selectedUnit = normalizeUnit(item.selectedUnit);
  if (selectedUnit) return [selectedUnit];

  const unitType = normalizeUnit(item.unitType);
  if (unitType) {
    const category = normalizeCategory(item.category);
    const normalizedUnitType = unitType
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "");

    if (
      normalizedUnitType !== category &&
      normalizedUnitType !== "medicine" &&
      normalizedUnitType !== "personalcare" &&
      normalizedUnitType !== "healthcare" &&
      normalizedUnitType !== "babymomcare" &&
      normalizedUnitType !== "medicaldevice" &&
      normalizedUnitType !== "medicaldevices"
    ) {
      return [unitType];
    }
  }

  return [];
}

function getDefaultUnit(item: CartItem): ProductUnit | undefined {
  const options = getUnitOptions(item);
  const selected = normalizeUnit(item.selectedUnit);

  if (selected && options.some((unit) => unit.toLowerCase() === selected.toLowerCase())) {
    return options.find((unit) => unit.toLowerCase() === selected.toLowerCase());
  }

  const current = normalizeUnit(item.unitType);
  if (current && options.some((unit) => unit.toLowerCase() === current.toLowerCase())) {
    return options.find((unit) => unit.toLowerCase() === current.toLowerCase());
  }

  return options[0];
}

function normalizeCartItem(item: CartItem): CartItem {
  const unitOptions = getUnitOptions(item);
  const selectedUnit = getDefaultUnit(item);

  const normalizedUnitType = normalizeUnit(item.unitType);
  const category = normalizeCategory(item.category);
  const normalizedUnitTypeKey = normalizedUnitType
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");

  const safeUnitType =
    normalizedUnitType &&
    normalizedUnitTypeKey !== category &&
    normalizedUnitTypeKey !== "medicine" &&
    normalizedUnitTypeKey !== "personalcare" &&
    normalizedUnitTypeKey !== "healthcare" &&
    normalizedUnitTypeKey !== "babymomcare" &&
    normalizedUnitTypeKey !== "medicaldevice" &&
    normalizedUnitTypeKey !== "medicaldevices"
      ? normalizedUnitType
      : undefined;

  return {
    ...item,
    unitOptions: unitOptions.length > 0 ? unitOptions : undefined,
    quantity: Math.max(1, Number(item.quantity) || 1),
    selectedUnit,
    unitType: selectedUnit ?? safeUnitType,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (!savedCart) return;

      const parsedCart = JSON.parse(savedCart);

      if (Array.isArray(parsedCart)) {
        setCartItems(parsedCart.map(normalizeCartItem));
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

  const addToCart = (rawItem: CartItem) => {
    const item = normalizeCartItem(rawItem);

    setCartItems((prev) => {
      const existing = prev.find(
        (p) =>
          p.id === item.id &&
          (p.selectedUnit ?? p.unitType) ===
            (item.selectedUnit ?? item.unitType)
      );

      if (existing) {
        return prev.map((p) =>
          p.id === existing.id &&
          (p.selectedUnit ?? p.unitType) ===
            (item.selectedUnit ?? item.unitType)
            ? {
                ...p,
                quantity: p.quantity + item.quantity,
              }
            : p
        );
      }

      return [...prev, item];
    });
  };

  const matchesCartItem = (
    item: CartItem,
    id: string,
    unit?: ProductUnit
  ) => {
    if (item.id !== id) return false;

    if (unit === undefined) return true;

    const itemUnit = normalizeUnit(item.selectedUnit ?? item.unitType);
    return itemUnit.toLowerCase() === normalizeUnit(unit).toLowerCase();
  };

  const removeFromCart = (id: string, unit?: ProductUnit) => {
    setCartItems((prev) =>
      prev.filter((item) => !matchesCartItem(item, id, unit))
    );
  };

  const increaseQuantity = (id: string, unit?: ProductUnit) => {
    setCartItems((prev) =>
      prev.map((item) =>
        matchesCartItem(item, id, unit)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id: string, unit?: ProductUnit) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          matchesCartItem(item, id, unit)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const updateCartItemUnit = (
    id: string,
    currentUnit: ProductUnit,
    unit: ProductUnit
  ) => {
    const targetUnit = normalizeUnit(unit);

    setCartItems((prev) => {
      const currentIndex = prev.findIndex((item) =>
        matchesCartItem(item, id, currentUnit)
      );

      if (currentIndex === -1) return prev;

      const existingTargetIndex = prev.findIndex(
        (item, index) =>
          index !== currentIndex &&
          item.id === id &&
          normalizeUnit(item.selectedUnit ?? item.unitType).toLowerCase() ===
            targetUnit.toLowerCase()
      );

      if (existingTargetIndex !== -1) {
        return prev
          .map((item, index) =>
            index === existingTargetIndex
              ? {
                  ...item,
                  quantity:
                    item.quantity + prev[currentIndex].quantity,
                }
              : item
          )
          .filter((_, index) => index !== currentIndex);
      }

      return prev.map((item, index) =>
        index === currentIndex
          ? {
              ...item,
              selectedUnit: targetUnit,
              unitType: targetUnit,
            }
          : item
      );
    });
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
        updateCartItemUnit,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
