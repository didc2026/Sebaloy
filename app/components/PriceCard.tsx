"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

type Props = {
  product: any;
};

export default function PriceCard({ product }: Props) {
  const router = useRouter();
  const { addToCart } = useCart();

  /*
   * IMPORTANT:
   * Some existing products store "Vial" in packType/form/sellingUnit
   * while unitType may still contain "Medicine".
   * Therefore all common vial fields are checked here.
   */
  const isVialProduct =
    String(product.unitType ?? "").toLowerCase() === "vial" ||
    String(product.selectedUnit ?? "").toLowerCase() === "vial" ||
    String(product.packType ?? "").toLowerCase() === "vial" ||
    String(product.dosageForm ?? "").toLowerCase() === "vial" ||
    String(product.form ?? "").toLowerCase() === "vial" ||
    String(product.sellingUnit ?? "").toLowerCase() === "vial" ||
    product.vialPrice !== undefined ||
    product.vialSize !== undefined ||
    product.unitOptions?.some(
      (unit: string) => String(unit).toLowerCase() === "vial"
    );

  const categoryKey = String(product.category ?? "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "");

  const isMedicine = categoryKey === "medicine";

  /*
   * CATEGORY-AWARE UNIT OPTIONS
   *
   * Medicine:
   * - Keep explicitly configured unitOptions.
   * - Automatically add Strip when strip data exists.
   * - Automatically add Box when box data/stripsPerBox exists.
   * - Keep Vial isolated for vial products.
   *
   * Medical Device:
   * - Always Piece; Medicine units must never leak here.
   *
   * Other categories:
   * - Do not inherit Medicine's Strip/Box units.
   */
  const getUnitOptions = (): string[] => {
    if (categoryKey === "medicaldevice" || categoryKey === "medicaldevices") {
      return ["Piece"];
    }

    if (
      categoryKey === "healthcare" ||
      categoryKey === "babymomcare" ||
      categoryKey === "babymom"
    ) {
      return product.unitType
        ? [String(product.unitType)]
        : ["Bottle"];
    }

    if (categoryKey === "personalcare") {
      return product.unitType
        ? [String(product.unitType)]
        : ["Piece"];
    }

    if (!isMedicine) {
      return product.unitType ? [String(product.unitType)] : [];
    }

    if (isVialProduct) {
      return ["Vial"];
    }

    const explicitOptions = Array.isArray(product.unitOptions)
      ? product.unitOptions
          .map((unit: unknown) => String(unit).trim())
          .filter(Boolean)
      : [];

    const options = [...explicitOptions];

    const hasStripData =
      product.stripPrice !== undefined ||
      product.tabletsPerStrip !== undefined ||
      String(product.unitType ?? "").toLowerCase() === "strip";

    const hasBoxData =
      product.boxPrice !== undefined ||
      Number(product.stripsPerBox ?? 0) > 0 ||
      String(product.unitType ?? "").toLowerCase() === "box";

    if (hasStripData) {
      options.push("Strip");
    }

    if (hasBoxData) {
      options.push("Box");
    }

    /*
     * Fallback for older Medicine records:
     * If no packaging fields exist but unitType is present, preserve it.
     */
    if (options.length === 0 && product.unitType) {
      options.push(String(product.unitType));
    }

    return Array.from(new Set(options));
  };

  const unitOptions = getUnitOptions();

  /*
   * Default selected unit:
   * - Medical Device -> Piece
   * - Vial -> Vial
   * - Medicine -> explicitly selected/unitType first, otherwise first
   *   valid option. This keeps existing products stable while allowing
   *   Box to appear automatically.
   */
  const getSelectedUnit = (): string | undefined => {
    if (categoryKey === "medicaldevice" || categoryKey === "medicaldevices") {
      return "Piece";
    }

    if (isVialProduct) {
      return "Vial";
    }

    if (isMedicine) {
      const current = String(product.selectedUnit ?? "").trim();

      if (
        current &&
        unitOptions.some(
          (unit) => unit.toLowerCase() === current.toLowerCase()
        )
      ) {
        return current;
      }

      const currentUnitType = String(product.unitType ?? "").trim();

      if (
        currentUnitType &&
        unitOptions.some(
          (unit) => unit.toLowerCase() === currentUnitType.toLowerCase()
        )
      ) {
        return currentUnitType;
      }

      return unitOptions[0] || undefined;
    }

    return product.unitType || unitOptions[0] || undefined;
  };

  const selectedUnit = getSelectedUnit();

  const vialPrice = Math.round(
    Number(product.vialPrice ?? product.price ?? 0)
  );

  const normalPrice = Math.round(Number(product.price ?? 0));

  const basePrice = isVialProduct ? vialPrice : normalPrice;

  const finalPrice = Math.round(
    basePrice - (basePrice * Number(product.discount || 0)) / 100
  );

  const vialSize =
    product.vialSize ||
    product.size ||
    product.packSize ||
    "1 Vial";

  /*
   * Keep existing product pricing fields intact.
   * Do not invent a Box price when boxPrice is not stored.
   * CartContext can use stripsPerBox/boxPrice according to its own
   * category-aware calculation.
   */
  const addItem = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price ?? 0),
      discount: Number(product.discount || 0),
      imageUrl: product.imageUrl,

      packSize: product.packSize,
      packType: isVialProduct ? "Vial" : product.packType,
      unitType: isVialProduct ? "Vial" : product.unitType,

      company: product.company,
      category: product.category,

      stripsPerBox:
        product.stripsPerBox !== undefined
          ? Number(product.stripsPerBox)
          : undefined,

      tabletsPerStrip:
        product.tabletsPerStrip !== undefined
          ? Number(product.tabletsPerStrip)
          : undefined,

      stripPrice:
        product.stripPrice !== undefined
          ? Number(product.stripPrice)
          : undefined,

      boxPrice:
        product.boxPrice !== undefined
          ? Number(product.boxPrice)
          : undefined,

      vialPrice: isVialProduct ? vialPrice : undefined,
      vialSize: isVialProduct ? vialSize : undefined,

      /*
       * THIS IS THE IMPORTANT FIX:
       * Medicine products with stripsPerBox/boxPrice now carry both
       * Strip and Box into the Cart instead of only product.unitType.
       */
      unitOptions,
      selectedUnit,

      quantity: 1,
    });
  };

  return (
    <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-4 space-y-3 overflow-hidden">

      {/* Product information */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-3">
          <span className="font-semibold text-slate-700 shrink-0">
            Category
          </span>
          <span className="text-slate-600 text-left sm:text-right break-words">
            {product.category || "—"}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-3">
          <span className="font-semibold text-slate-700 shrink-0">
            Company
          </span>
          <span className="text-slate-600 text-left sm:text-right break-words">
            {product.company || "—"}
          </span>
        </div>

        {product.brand && (
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-3">
            <span className="font-semibold text-slate-700 shrink-0">
              Brand
            </span>
            <span className="text-slate-600 text-left sm:text-right break-words">
              {product.brand}
            </span>
          </div>
        )}
      </div>

      {/* VIAL */}
      {isVialProduct && (
        <div className="space-y-2 border-t border-slate-200 pt-3">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-3">
            <span className="font-semibold text-slate-700">
              Pack Size
            </span>
            <span className="text-slate-600 text-left sm:text-right">
              {vialSize}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-3">
            <span className="font-semibold text-slate-700">
              Available Units
            </span>
            <span className="text-slate-600">Vial</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-3">
            <span className="font-semibold text-slate-700">
              Selling Unit
            </span>
            <span className="font-semibold text-blue-600">
              Vial
            </span>
          </div>
        </div>
      )}

      {/* STRIP / BOX MEDICINE */}
      {isMedicine && !isVialProduct && (
        <div className="space-y-2 border-t border-slate-200 pt-3">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-3">
            <span className="font-semibold text-slate-700">
              Pack Size
            </span>
            <span className="text-slate-600 text-left sm:text-right">
              {product.stripsPerBox ?? 1} ×{" "}
              {product.tabletsPerStrip ?? 1} Tablets
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-3">
            <span className="font-semibold text-slate-700">
              Available Units
            </span>
            <span className="text-slate-600">
              {unitOptions.length > 0 ? unitOptions.join(" / ") : "—"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-3">
            <span className="font-semibold text-slate-700">
              Selling Unit
            </span>
            <span className="text-slate-600">
              {selectedUnit || "—"}
            </span>
          </div>
        </div>
      )}

      {/* Price */}
      <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
        <span className="font-semibold text-slate-700">
          Price
        </span>
        <span className="text-lg sm:text-2xl font-bold text-green-600 shrink-0">
          ৳ {finalPrice}
        </span>
      </div>

      {/* Stock */}
      <div className="flex items-start justify-between gap-3">
        <span className="font-semibold text-slate-700 shrink-0">
          Stock
        </span>

        <div className="text-right break-words">
          {product.category === "Lab-Tests" ? (
            <span className="font-bold text-blue-600">
              ✓ Test Available
            </span>
          ) : Number(product.stock) > 10 ? (
            <span className="font-bold text-green-600">
              ▣ In Stock ({product.stock})
            </span>
          ) : Number(product.stock) > 0 ? (
            <span className="font-bold text-amber-600">
              Only {product.stock} Left
            </span>
          ) : (
            <span className="font-bold text-red-600">
              ✕ Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Mobile-first action buttons */}
      <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
        <button
          disabled={Number(product.stock) === 0}
          onClick={() => {
            addItem();
            router.push("/cart");
          }}
          className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2.5 sm:py-3 rounded-xl font-semibold transition"
        >
          Add to Cart
        </button>

        <button
          disabled={Number(product.stock) === 0}
          onClick={() => {
            addItem();
            router.push("/checkout");
          }}
          className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2.5 sm:py-3 rounded-xl font-semibold transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
