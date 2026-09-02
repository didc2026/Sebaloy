"use client";

import { orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  sortOrder: number;
  status: boolean;
};

type CategoryMenuProps = {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

export default function CategoryMenu({
  selectedCategory,
  onSelectCategory,
}: CategoryMenuProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const q = query(
          collection(db, "categories"),
          where("status", "==", true),
          orderBy("sortOrder", "asc")
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Category, "id">),
        }));

        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="py-6 text-center text-sm text-gray-500">
        Loading categories...
      </div>
    );
  }

  return (
    <section className="mb-8 md:mb-10">
      {/* Section heading */}
      <div className="mb-4 md:mb-5 flex items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-lg">🛍️</span>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Shop By Category
            </h2>
          </div>

          <p className="hidden md:block mt-1 text-sm text-slate-500">
            Browse healthcare products by category
          </p>
        </div>

        {/* Small mobile shortcut */}
        <button
          type="button"
          onClick={() => onSelectCategory("")}
          className={`md:hidden shrink-0 rounded-full px-3 py-1 text-[10px] font-semibold transition-all ${
            selectedCategory === ""
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200"
          }`}
        >
          Explore
        </button>
      </div>

      {/* All products — desktop appearance retained */}
      <div className="flex justify-center mb-6">
        <button
          type="button"
          onClick={() => onSelectCategory("")}
          className={`px-5 py-2 rounded-xl font-medium transition
            ${
              selectedCategory === ""
                ? "bg-sky-600 text-white shadow-sm"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
        >
          All Products
        </button>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4 max-w-5xl mx-auto">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.name;

          return (
            <button
              type="button"
              key={category.id}
              onClick={() => onSelectCategory(category.name)}
              aria-pressed={isSelected}
              className={`group relative min-w-0
                p-3 md:p-5
                rounded-xl md:rounded-2xl
                border
                shadow-sm
                text-center
                cursor-pointer
                transition-all duration-300
                hover:shadow-xl hover:-translate-y-1
                focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500
                ${
                  isSelected
                    ? "bg-sky-600 text-white border-sky-600 scale-[1.02] md:scale-105"
                    : "bg-white border-slate-200 hover:border-sky-200"
                }`}
            >
              {/* Icon */}
              <div
                className={`text-2xl md:text-4xl mb-1.5 md:mb-2 transition-transform duration-300 group-hover:scale-110 ${
                  isSelected ? "" : "opacity-90"
                }`}
              >
                {category.icon}
              </div>

              {/* Category name */}
              <p
                className={`mt-1 md:mt-2 text-[11px] md:text-base font-semibold leading-tight break-words ${
                  isSelected ? "text-white" : "text-slate-800"
                }`}
              >
                {category.name}
              </p>

              {/* Subtle selected indicator */}
              {isSelected && (
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white/90" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
