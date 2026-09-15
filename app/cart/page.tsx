 "use client";

import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const router = useRouter();

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    updateCartItemUnit,
  } = useCart();

  const normalizeUnit = (value: unknown) =>
    String(value ?? "").trim();

  const normalizeCategory = (value: unknown) =>
    String(value ?? "")
      .trim()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "");

  const isMedicine = (item: any) =>
    normalizeCategory(item.category) === "medicine";

  const getUnitOptions = (item: any): string[] => {
    const explicit = Array.isArray(item.unitOptions)
      ? item.unitOptions.map(normalizeUnit).filter(Boolean)
      : [];

    // Product View is the source of truth.
    if (explicit.length > 0) {
      return Array.from(new Set(explicit));
    }

    const category = normalizeCategory(item.category);

    if (category === "medicaldevice" || category === "medicaldevices") {
      return ["Piece"];
    }

    if (isMedicine(item)) {
      const options: string[] = [];
      const unitType = normalizeUnit(item.unitType).toLowerCase();
      const selected = normalizeUnit(item.selectedUnit).toLowerCase();

      if (
        normalizeUnit(item.vialSize) ||
        item.vialPrice !== undefined ||
        unitType === "vial" ||
        selected === "vial"
      ) {
        options.push("Vial");
      }

      if (
        item.stripPrice !== undefined ||
        item.tabletsPerStrip !== undefined ||
        unitType === "strip" ||
        selected === "strip"
      ) {
        options.push("Strip");
      }

      if (
        item.boxPrice !== undefined ||
        item.stripsPerBox !== undefined ||
        unitType === "box" ||
        selected === "box"
      ) {
        options.push("Box");
      }

      if (options.length === 0) {
        const fallback = normalizeUnit(item.unitType) || normalizeUnit(item.selectedUnit);
        if (fallback) options.push(fallback);
      }

      return Array.from(new Set(options));
    }

    const unitType = normalizeUnit(item.unitType);
    if (unitType) return [unitType];

    const selected = normalizeUnit(item.selectedUnit);
    if (selected) return [selected];

    return [];
  };

  const getSelectedUnit = (item: any, options: string[]) => {
    const current = normalizeUnit(item.selectedUnit);
    const currentMatch = options.find(
      (u) => u.toLowerCase() === current.toLowerCase()
    );
    if (currentMatch) return currentMatch;

    const type = normalizeUnit(item.unitType);
    const typeMatch = options.find(
      (u) => u.toLowerCase() === type.toLowerCase()
    );
    if (typeMatch) return typeMatch;

    return options[0] || "";
  };

  const getUnitPrice = (item: any) => {
    const selected = normalizeUnit(item.selectedUnit).toLowerCase();
    let price = Number(item.price ?? 0);

    if (isMedicine(item) && selected === "vial") {
      price = Number(item.vialPrice ?? item.price ?? 0);
    } else if (isMedicine(item) && selected === "box") {
      price = Number(
        item.boxPrice ??
          Number(item.stripPrice ?? item.price ?? 0) *
            Number(item.stripsPerBox || 1)
      );
    } else if (isMedicine(item) && selected === "strip") {
      price = Number(item.stripPrice ?? item.price ?? 0);
    }

    return Math.round(
      price - (price * Number(item.discount || 0)) / 100
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + getUnitPrice(item) * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-md text-center max-w-md w-full">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 mb-6">
            Add some products to start shopping.
          </p>

          <button
            onClick={() => router.push("/")}
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-3 py-4 sm:px-5 sm:py-6 md:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Shopping Cart
          </h1>

          <span className="text-sm sm:text-base text-gray-500">
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {cartItems.map((item: any) => {
            const unitOptions = getUnitOptions(item);
            const selectedUnit = getSelectedUnit(item, unitOptions);
            const medicineProduct = isMedicine(item);
            const vialProduct =
              medicineProduct && selectedUnit.toLowerCase() === "vial";

            const unitPrice = getUnitPrice(item);

            const vialSize =
              item.vialSize ||
              item.size ||
              item.packSize ||
              "";

            const tabletsPerStrip =
              Number(item.tabletsPerStrip || 0);

            const stripsPerBox =
              Number(item.stripsPerBox || 0);

            const stripBasePrice =
              Number(item.stripPrice ?? item.price ?? 0);

            const boxBasePrice =
              Number(
                item.boxPrice ??
                  stripBasePrice * (stripsPerBox || 1)
              );

            return (
              <div
                key={`${item.id}-${selectedUnit}`}
                className="bg-white rounded-2xl shadow-md p-3 sm:p-5 overflow-hidden min-w-0"
              >
                {/* Product header */}
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <div className="w-full xs:w-24 h-28 xs:h-24 md:w-28 md:h-28 bg-slate-50 rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center flex-shrink-0">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">
                        No Image
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 w-full">
                    <h2 className="text-lg sm:text-xl font-bold break-words">
                      {item.name}
                    </h2>

                    {item.company && (
                      <p className="text-gray-500 text-sm mt-1 break-words">
                        {item.company}
                      </p>
                    )}

                    {vialProduct && (
                      <p className="text-gray-500 text-sm mt-1">
                        Pack Size: {vialSize || "1 Vial"}
                      </p>
                    )}
                  </div>
                </div>

                {/* CATEGORY-AWARE UNIT */}
                {unitOptions.length > 0 && (
                  <div className="mt-4 sm:mt-5">
                    <h3 className="font-semibold mb-2.5 sm:mb-3">
                      Select Unit
                    </h3>

                    <div className="space-y-2.5 sm:space-y-3">
                      {unitOptions.map((unit) => {
                        const lower = unit.toLowerCase();
                        let optionPrice = Number(item.price ?? 0);

                        if (medicineProduct && lower === "vial") {
                          optionPrice = Number(item.vialPrice ?? item.price ?? 0);
                        } else if (medicineProduct && lower === "box") {
                          optionPrice = Number(
                            item.boxPrice ??
                              Number(item.stripPrice ?? item.price ?? 0) *
                                Number(item.stripsPerBox || 1)
                          );
                        } else if (medicineProduct && lower === "strip") {
                          optionPrice = Number(item.stripPrice ?? item.price ?? 0);
                        }

                        optionPrice = Math.round(
                          optionPrice -
                            (optionPrice * Number(item.discount || 0)) / 100
                        );

                        const detail =
                          medicineProduct && lower === "vial"
                            ? (item.vialSize || item.size || item.packSize || "")
                            : medicineProduct && lower === "strip"
                              ? (Number(item.tabletsPerStrip || 0) > 0
                                  ? `${Number(item.tabletsPerStrip)} Tablets`
                                  : "")
                              : medicineProduct && lower === "box"
                                ? (Number(item.stripsPerBox || 0) > 0
                                    ? `${Number(item.stripsPerBox)} Strips`
                                    : "")
                                : "";

                        const active =
                          selectedUnit.toLowerCase() === lower;

                        return (
                          <button
                            key={unit}
                            type="button"
                            onClick={() => updateCartItemUnit(item.id, selectedUnit, unit)}
                            className={`w-full flex items-center justify-between gap-3 border rounded-xl px-3 sm:px-4 py-3 transition ${
                              active
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300 bg-white hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                              <span
                                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                                  active
                                    ? "border-blue-600"
                                    : "border-gray-400"
                                }`}
                              >
                                {active && (
                                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                                )}
                              </span>

                              <div className="text-left min-w-0">
                                <p className="font-semibold break-words">
                                  1 {unit}
                                </p>
                                {detail && (
                                  <p className="text-sm text-gray-500 break-words">
                                    {detail}
                                  </p>
                                )}
                              </div>
                            </div>

                            <span className="font-bold text-green-600 shrink-0">
                              ৳ {optionPrice}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2.5 sm:gap-4">
                  <span className="font-semibold">
                    Quantity:
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(item.id, selectedUnit)}
                      aria-label={`Decrease ${item.name} quantity`}
                      className="w-9 h-9 rounded-full bg-slate-100 border border-slate-300 font-bold text-xl hover:bg-slate-200"
                    >
                      -
                    </button>

                    <span className="font-bold text-lg min-w-6 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id, selectedUnit)}
                      aria-label={`Increase ${item.name} quantity`}
                      className="w-9 h-9 rounded-full bg-slate-100 border border-slate-300 font-bold text-xl hover:bg-slate-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mt-4 border-t pt-4 space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="text-gray-600">
                      Unit
                    </span>
                    <span className="font-bold text-gray-900">
                      {selectedUnit}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="text-gray-600">
                      Unit Price
                    </span>
                    <span className="font-bold text-green-600">
                      ৳ {unitPrice}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="text-gray-600">
                      Item Total
                    </span>
                    <span className="text-xl font-bold text-green-600">
                      ৳ {unitPrice * item.quantity}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id, selectedUnit)}
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-semibold"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mt-5 sm:mt-8">
          <h2 className="text-xl sm:text-2xl font-bold">
            Order Summary
          </h2>

          <p className="mt-2.5 sm:mt-3">
            Total Items: {totalItems}
          </p>

          <div className="space-y-3 mt-4 sm:mt-5">
            <div className="flex justify-between gap-4">
              <span>Subtotal</span>
              <span className="font-medium">৳ {total}</span>
            </div>

            <hr />

            <div className="flex justify-between gap-4 font-bold text-lg sm:text-xl text-teal-600">
              <span>Grand Total</span>
              <span>৳ {total}</span>
            </div>
          </div>

          <button
            onClick={() => router.push("/checkout")}
            className="w-full mt-5 sm:mt-6 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-bold"
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </main>
  );
}
