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
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  updateCartItemUnit: (id: string, unit: ProductUnit) => void;
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

function getAuthoritativeCategoryUnits(item: CartItem): string[] | null {
  const category = normalizeCategory(item.category);

  if (category === "medicaldevice" || category === "medicaldevices") {
    return ["Piece"];
  }

  if (
    category === "healthcare" ||
    category === "babymomcare" ||
    category === "babymom" ||
    category === "personalcare"
  ) {
    return ["Bottle", "Piece"];
  }

  return null;
}

function getUnitOptions(item: CartItem): string[] {
  const authoritative = getAuthoritativeCategoryUnits(item);

  // Non-medicine categories are never allowed to inherit Medicine units.
  if (authoritative) return authoritative;

  const category = normalizeCategory(item.category);
  const explicitOptions = Array.isArray(item.unitOptions)
    ? item.unitOptions.map(normalizeUnit).filter(Boolean)
    : [];

  if (category === "medicine") {
    if (explicitOptions.length > 0) {
      return Array.from(new Set(explicitOptions));
    }

    const unitType = normalizeUnit(item.unitType).toLowerCase();
    const selectedUnit = normalizeUnit(item.selectedUnit).toLowerCase();
    const options: string[] = [];

    if (
      normalizeUnit(item.vialSize) ||
      item.vialPrice !== undefined ||
      unitType === "vial" ||
      selectedUnit === "vial"
    ) options.push("Vial");

    if (
      item.stripPrice !== undefined ||
      item.tabletsPerStrip !== undefined ||
      unitType === "strip" ||
      selectedUnit === "strip"
    ) options.push("Strip");

    if (
      item.boxPrice !== undefined ||
      item.stripsPerBox !== undefined ||
      unitType === "box" ||
      selectedUnit === "box"
    ) options.push("Box");

    return Array.from(new Set(options));
  }

  const unitType = normalizeUnit(item.unitType);
  if (
    unitType &&
    !["medicine", "strip", "box", "vial"].includes(unitType.toLowerCase())
  ) {
    return [unitType];
  }

  const selectedUnit = normalizeUnit(item.selectedUnit);
  if (
    selectedUnit &&
    !["strip", "box", "vial"].includes(selectedUnit.toLowerCase())
  ) {
    return [selectedUnit];
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

  return {
    ...item,
    unitOptions: unitOptions.length > 0 ? unitOptions : item.unitOptions,
    quantity: Math.max(1, Number(item.quantity) || 1),
    selectedUnit,
    unitType: selectedUnit ?? item.unitType,
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

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
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

  const updateCartItemUnit = (id: string, unit: ProductUnit) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              selectedUnit: unit,
              unitType: unit,
            }
          : item
      )
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
