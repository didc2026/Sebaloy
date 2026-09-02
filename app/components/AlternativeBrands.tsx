"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Product = {
  id: string;
  name?: string;
  genericName?: string;
  strength?: string;
  brand?: string;
  company?: string;
  price?: number;
  discount?: number;
  imageUrl?: string;
  imageUrls?: string[];
  category?: string;
};

type Props = {
  product: Product;
};

export default function AlternativeBrands({ product }: Props) {
  const [alternatives, setAlternatives] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlternativeBrands = async () => {
      if (!product?.genericName) {
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "products"),
          where("genericName", "==", product.genericName)
        );

        const snapshot = await getDocs(q);

        const results: Product[] = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Product, "id">),
          }))
          // Current product বাদ
          .filter((item) => item.id !== product.id)
          // Medicine products only
          .filter((item) => item.category === "Medicine");

        setAlternatives(results);
      } catch (error) {
        console.error("Error loading alternative brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlternativeBrands();
  }, [product]);

  // Generic name না থাকলে কিছু দেখাবে না
  if (!product?.genericName) {
    return null;
  }

  // Loading শেষ এবং কোনো alternative নেই
  if (!loading && alternatives.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800">
          Alternative Brands
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Other brands with the same generic name
        </p>
      </div>

      {loading ? (
        <div className="text-sm text-slate-500">
          Loading alternative brands...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {alternatives.map((item) => {
            const image =
              item.imageUrl ||
              item.imageUrls?.[0] ||
              "/placeholder-product.png";

            return (
              <Link
                key={item.id}
                href={`/product/${item.id}`}
                className="group border border-slate-200 rounded-xl bg-white p-4 hover:shadow-md transition"
              >
                {/* Product Image */}
                <div className="relative w-full h-40 mb-3 bg-slate-50 rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={item.name || "Alternative product"}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition"
                  />
                </div>

                {/* Product Name */}
                <h3 className="font-semibold text-slate-800 line-clamp-2">
                  {item.name}
                </h3>

                {/* Generic + Strength */}
                <p className="text-sm text-slate-500 mt-1">
                  {item.genericName}
                  {item.strength && ` ${item.strength}`}
                </p>

                {/* Company */}
                {item.company && (
                  <p className="text-xs text-slate-500 mt-2 line-clamp-1">
                    {item.company}
                  </p>
                )}

                {/* Brand */}
                {item.brand && (
                  <p className="text-sm text-slate-600 mt-1">
                    Brand:{" "}
                    <span className="font-medium">{item.brand}</span>
                  </p>
                )}

                {/* Price */}
                {item.price !== undefined && (
                  <div className="mt-3">
                    <span className="text-lg font-bold text-green-600">
                      ৳ {item.price}
                    </span>
                  </div>
                )}

                {/* View Product */}
                <div className="mt-3 text-sm font-medium text-blue-600">
                  View Product →
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}