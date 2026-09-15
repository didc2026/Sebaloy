"use client";

import { useEffect, useState } from "react";
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
   * UNIT SOURCE OF TRUTH
   *
   * Product View decides which units are actually available.
   * - Explicit product.unitOptions are authoritative.
   * - Otherwise use product.unitType / selectedUnit.
   * - Medicine keeps its existing Strip / Box / Vial detection.
   * - No generic category may invent Bottle / Piece when the product
   *   itself does not provide that unit.
   */
  const getUnitOptions = (): string[] => {
    const explicitOptions = Array.isArray(product.unitOptions)
      ? product.unitOptions
          .map((unit: unknown) => String(unit).trim())
          .filter(Boolean)
      : [];

    // Explicit units saved on the product are always authoritative.
    if (explicitOptions.length > 0) {
      return Array.from(new Set(explicitOptions));
    }

    if (isVialProduct) {
      return ["Vial"];
    }

    if (isMedicine) {
      const options: string[] = [];
      const unitType = String(product.unitType ?? "").trim().toLowerCase();
      const selected = String(product.selectedUnit ?? "").trim().toLowerCase();

      if (
        product.vialPrice !== undefined ||
        product.vialSize !== undefined ||
        unitType === "vial" ||
        selected === "vial"
      ) {
        options.push("Vial");
      }

      if (
        product.stripPrice !== undefined ||
        product.tabletsPerStrip !== undefined ||
        unitType === "strip" ||
        selected === "strip"
      ) {
        options.push("Strip");
      }

      if (
        product.boxPrice !== undefined ||
        product.stripsPerBox !== undefined ||
        unitType === "box" ||
        selected === "box"
      ) {
        options.push("Box");
      }

      if (options.length === 0) {
        const fallback =
          String(product.selectedUnit ?? "").trim() ||
          String(product.unitType ?? "").trim();

        if (fallback && fallback.toLowerCase() !== "medicine") {
          options.push(fallback);
        }
      }

      return Array.from(new Set(options));
    }

    /*
     * Non-medicine products use the product's actual unit.
     * Do NOT create Bottle/Piece from the category.
     */
    const categoryValue = String(product.category ?? "").trim().toLowerCase();
    const categoryNormalized = categoryValue.replace(/[^a-z0-9]+/g, "");

    const candidates = [
      product.selectedUnit,
      product.unitType,
      product.sellingUnit,
      product.packType,
      product.packagingUnit,
    ];

    for (const candidate of candidates) {
      const value = String(candidate ?? "").trim();
      const normalized = value.toLowerCase().replace(/[^a-z0-9]+/g, "");

      if (
        value &&
        normalized !== categoryNormalized &&
        normalized !== "medicine" &&
        normalized !== "personalcare" &&
        normalized !== "healthcare" &&
        normalized !== "babymomcare" &&
        normalized !== "medicaldevice" &&
        normalized !== "medicaldevices"
      ) {
        return [value];
      }
    }

    return [];
  };

  const unitOptions = getUnitOptions();

  const getSelectedUnit = (): string | undefined => {
    const current = String(product.selectedUnit ?? "").trim();

    if (
      current &&
      unitOptions.some(
        (unit) => unit.toLowerCase() === current.toLowerCase()
      )
    ) {
      return unitOptions.find(
        (unit) => unit.toLowerCase() === current.toLowerCase()
      );
    }

    const currentUnitType = String(product.unitType ?? "").trim();

    if (
      currentUnitType &&
      unitOptions.some(
        (unit) => unit.toLowerCase() === currentUnitType.toLowerCase()
      )
    ) {
      return unitOptions.find(
        (unit) => unit.toLowerCase() === currentUnitType.toLowerCase()
      );
    }

    return unitOptions[0] || undefined;
  };

  const [selectedUnit, setSelectedUnit] = useState<string | undefined>(
    () => getSelectedUnit()
  );

  useEffect(() => {
    setSelectedUnit(getSelectedUnit());
    // Reset only when the actual product changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  const getUnitBasePrice = (unit?: string) => {
    const lower = String(unit ?? "").trim().toLowerCase();

    if (isMedicine && lower === "vial") {
      return Math.round(Number(product.vialPrice ?? product.price ?? 0));
    }

    if (isMedicine && lower === "box") {
      return Math.round(
        Number(
          product.boxPrice ??
            Number(product.stripPrice ?? product.price ?? 0) *
              Number(product.stripsPerBox || 1)
        )
      );
    }

    if (isMedicine && lower === "strip") {
      return Math.round(Number(product.stripPrice ?? product.price ?? 0));
    }

    if (isVialProduct) {
      return Math.round(Number(product.vialPrice ?? product.price ?? 0));
    }

    return Math.round(Number(product.price ?? 0));
  };

  const basePrice = getUnitBasePrice(selectedUnit);

  const finalPrice = Math.round(
    basePrice - (basePrice * Number(product.discount || 0)) / 100
  );

  const getOptionPrice = (unit: string) => {
    const unitPrice = getUnitBasePrice(unit);

    return Math.round(
      unitPrice - (unitPrice * Number(product.discount || 0)) / 100
    );
  };

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
      unitType: selectedUnit ?? product.unitType,

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

      vialPrice: isVialProduct ? Number(product.vialPrice ?? product.price ?? 0) : undefined,
      vialSize: isVialProduct ? vialSize : undefined,

      /*
       * Product View is the source of truth for Unit.
       * Cart receives exactly the units shown here and the selected one.
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

      {/* PRODUCT UNIT */}
      {(isVialProduct || isMedicine) && (
        <div className="space-y-2 border-t border-slate-200 pt-3">
          {isVialProduct && (
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-3">
              <span className="font-semibold text-slate-700">
                Pack Size
              </span>
              <span className="text-slate-600 text-left sm:text-right">
                {vialSize}
              </span>
            </div>
          )}

          {isMedicine && !isVialProduct && (
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-3">
              <span className="font-semibold text-slate-700">
                Pack Size
              </span>
              <span className="text-slate-600 text-left sm:text-right">
                {product.stripsPerBox ?? 1} ×{" "}
                {product.tabletsPerStrip ?? 1} Tablets
              </span>
            </div>
          )}
        </div>
      )}

      {unitOptions.length > 0 && (
        <div className="space-y-2.5 border-t border-slate-200 pt-3">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-3">
            <span className="font-semibold text-slate-700">
              Available Units
            </span>
            <span className="text-slate-600 text-left sm:text-right break-words">
              {unitOptions.join(" / ")}
            </span>
          </div>

          <div>
            <p className="font-semibold text-slate-700 mb-2.5">
              Select Unit
            </p>

            <div className="space-y-2.5">
              {unitOptions.map((unit) => {
                const lower = unit.toLowerCase();
                const active =
                  String(selectedUnit ?? "").toLowerCase() === lower;

                const detail =
                  isMedicine && lower === "vial"
                    ? (product.vialSize || product.size || product.packSize || "")
                    : isMedicine && lower === "strip"
                      ? Number(product.tabletsPerStrip || 0) > 0
                        ? `${Number(product.tabletsPerStrip)} Tablets`
                        : ""
                      : isMedicine && lower === "box"
                        ? Number(product.stripsPerBox || 0) > 0
                          ? `${Number(product.stripsPerBox)} Strips`
                          : ""
                        : "";

                return (
                  <button
                    key={unit}
                    type="button"
                    onClick={() => setSelectedUnit(unit)}
                    className={`w-full flex items-center justify-between gap-3 border rounded-xl px-3 sm:px-4 py-3 transition ${
                      active
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <span
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          active ? "border-blue-600" : "border-gray-400"
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
                      ৳ {getOptionPrice(unit)}
                    </span>
                  </button>
                );
              })}
            </div>
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
