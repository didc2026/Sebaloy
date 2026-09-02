"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CategoryMenu from "./components/CategoryMenu";
import Navbar from "./components/Navbar";
import { useSearch } from "./context/SearchContext";
import HeroBanner from "./components/HeroBanner";
import ProductCard from "./components/ProductCard";
type Product = {
  id: string;
  name: string;
  category: string;
  categorySlug?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  featured?: boolean;
  company?: string;
  genericName?: string;
  strength?: string;
  size?: string;
  pharmacology: string;
  indication: string;
  dosage: string;
  administration: string;
  sideEffects: string;
  precautions: string;
  pregnancyLactation: string;
  drugInteraction: string;
  storage: string;
  brand?: string;
  model?: string;
  warranty?: string;

  stripsPerBox?: string;
  tabletsPerStrip?: string;

  unitType?: string;

  discount?: number;
};
export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const { search } = useSearch();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));
        console.log(
          "ALL PRODUCTS:",
          data.map((p) => ({
            id: p.id,
            name: p.name,
            category: p.category,
          }))
        );
        console.log(data);
        console.log("PRODUCTS =", data);
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const filteredProducts = products.filter((product) => {
    console.log(
      "Category Check:",
      product.name,
      product.category,
      selectedCategory
    );
    const keyword = search.trim().toLowerCase();
    console.log("Search =", keyword);
    console.log("Product =", product);
    const matchSearch =
      keyword === "" ||
      product.name?.toLowerCase().includes(keyword) ||
      product.genericName?.toLowerCase().includes(keyword) ||
      product.company?.toLowerCase().includes(keyword) ||
      product.category?.toLowerCase().includes(keyword) ||
      product.strength?.toLowerCase().includes(keyword) ||
      product.model?.toLowerCase().includes(keyword) ||
      product.size?.toLowerCase().includes(keyword);
    const matchCategory =
      selectedCategory === ""
        ? true
        : product.category.toLowerCase() ===
        selectedCategory.toLowerCase();
    return matchSearch && matchCategory;
  });

  const dealProducts = filteredProducts.filter(
    (product) =>
      (product.discount ?? 0) >= 50 &&
      !product.featured
  );
  const featuredProducts = filteredProducts.filter(
    (product) => product.featured
  );
  const regularProducts = filteredProducts.filter(
    (product) =>
      !product.featured &&
      (product.discount ?? 0) < 50
  );

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading products...
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-100 px-3 py-4 sm:px-4 sm:py-6 md:p-8">
        <div className="max-w-7xl mx-auto">

          {/* =========================
    PREMIUM HERO SECTION
========================= */}
          <div className="mb-7 md:mb-10 overflow-hidden rounded-[1.35rem] md:rounded-[2rem] bg-gradient-to-br from-sky-700 via-cyan-600 to-teal-600 shadow-lg md:shadow-2xl ring-1 ring-white/20">

            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5 md:gap-8 lg:gap-12 px-4 py-6 sm:px-8 sm:py-8 md:px-10 md:py-12 lg:py-14">

              {/* LEFT CONTENT */}
              <div className="text-white text-center lg:text-left">

                {/* Trust Badge */}
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-sm font-semibold tracking-wide backdrop-blur-md">
                  🏥 Trusted Healthcare Marketplace
                </span>

                {/* Heading */}
                <h1 className="mt-3 md:mt-5 text-[1.65rem] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.12] tracking-tight">
                  Welcome to{" "}
                  <span className="text-yellow-300">
                    Sebaloy
                  </span>
                </h1>

                {/* Description */}
                <p className="mt-3 md:mt-5 max-w-xl mx-auto lg:mx-0 text-[11px] sm:text-base md:text-xl text-white/90 leading-[1.55] md:leading-8">
                  Buy Medicines, Healthcare Products, Baby Care,
                  Personal Care and Medical Devices with confidence
                  from Bangladesh's trusted healthcare marketplace.
                </p>

                {/* CTA Buttons */}
                <div className="mt-5 md:mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 md:gap-3">

                  <button
                    onClick={() =>
                      document.getElementById("products")?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                    className="w-full sm:w-auto rounded-xl bg-white px-5 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-bold text-sky-700 shadow-md hover:bg-slate-100 hover:-translate-y-0.5 transition"
                  >
                    Shop Now
                  </button>

                  <button
                    onClick={() =>
                      document.getElementById("about")?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                    className="w-full sm:w-auto rounded-xl border border-white/80 md:border-2 px-5 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-bold text-white hover:bg-white hover:text-sky-700 transition"
                  >
                    Learn More
                  </button>

                </div>

                {/* Trust Features */}
                <div className="mt-4 md:mt-8 flex flex-wrap justify-center lg:justify-start gap-1.5 md:gap-2">

                  <span className="rounded-full bg-white/15 border border-white/10 px-2.5 py-1.5 text-[9px] md:text-sm backdrop-blur-sm">
                    💊 Genuine Products
                  </span>

                  <span className="rounded-full bg-white/15 border border-white/10 px-2.5 py-1.5 text-[9px] md:text-sm backdrop-blur-sm">
                    🚚 Fast Delivery
                  </span>

                  <span className="rounded-full bg-white/15 border border-white/10 px-2.5 py-1.5 text-[9px] md:text-sm backdrop-blur-sm">
                    📞 Expert Support
                  </span>

                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="flex justify-center mt-0 md:mt-6 lg:mt-0">

                <div className="relative w-full max-w-[245px] sm:max-w-lg lg:max-w-2xl">

                  <Image
                    src="/images/hero-banner.png"
                    alt="Sebaloy Healthcare Marketplace"
                    width={900}
                    height={700}
                    priority
                    className="w-full h-auto object-contain drop-shadow-xl md:drop-shadow-2xl"
                  />

                </div>

              </div>

            </div>

            {/* CATEGORY AREA */}
            <div className="bg-white/10 border-t border-white/10 px-1 pb-1">
              <CategoryMenu
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

          </div>
          {dealProducts.length > 0 && (
            <section className="mb-7 md:mb-10">
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 tracking-tight text-slate-800 text-center md:text-left">
                💸 Today's Deals
              </h2>

              <ProductCard products={dealProducts} />
            </section>
          )}

          {featuredProducts.length > 0 && (
            <section className="mb-7 md:mb-10">
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 tracking-tight text-slate-800 text-center md:text-left">
                ⭐ Featured Products
              </h2>

              <ProductCard products={featuredProducts} />
            </section>
          )}
          {regularProducts.length > 0 && (
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 tracking-tight text-slate-800 text-center md:text-left">
                All Products
              </h2>

              <ProductCard products={regularProducts} />
            </section>
          )}             </div>
        <section
          id="about"
          className="mb-7 md:mb-10 rounded-[1.35rem] md:rounded-3xl bg-white p-5 sm:p-6 md:p-8 shadow-md md:shadow-lg border border-slate-200"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
              About Sebaloy
            </h2>

            <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-slate-600 leading-6 md:leading-8">
              Sebaloy is Bangladesh's trusted online healthcare marketplace.
              We provide genuine medicines, healthcare products, baby & mom care,
              personal care, wellness products and medical devices from trusted
              manufacturers and suppliers.
            </p>

            <div className="grid md:grid-cols-3 gap-3 md:gap-6 mt-6 md:mt-10">
              <div className="rounded-2xl bg-sky-50 p-4 md:p-6">
                <div className="text-4xl">💊</div>
                <h3 className="mt-3 font-bold">
                  Genuine Products
                </h3>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-4 md:p-6">
                <div className="text-4xl">🚚</div>
                <h3 className="mt-3 font-bold">
                  Fast Delivery
                </h3>
              </div>

              <div className="rounded-2xl bg-orange-50 p-4 md:p-6">
                <div className="text-4xl">📞</div>
                <h3 className="mt-3 font-bold">
                  Customer Support
                </h3>
              </div>
            </div>
          </div>
        </section>

      </main >
    </>
  );
}