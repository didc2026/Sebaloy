"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Home() {
  const categories = [
    "Medicine",
    "Healthcare",
    "Baby & Mom",
    "Lab Test",
    "Beauty",
    "Nutrition",
    "Pet Care",
    "Medical Devices",
  ];

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "products")
        );

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(data);
      } catch (error) {
        console.error("Firestore Error:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-teal-600">
            Sebaloy
          </h1>

          <div className="hidden md:flex gap-6 font-medium">
            <a href="#">Home</a>
            <a href="#">Medicines</a>
            <a href="#">Healthcare</a>
            <a href="#">Lab Tests</a>
            <a href="#">Cart</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to Sebaloy
          </h1>

          <p className="text-xl mb-8">
            Buy medicines, healthcare products and book lab tests online.
          </p>

          <button className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold">
            Shop Now
          </button>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <input
            type="text"
            placeholder="Search medicines, healthcare products..."
            className="w-full border border-gray-300 rounded-lg p-4"
          />
        </div>

        {/* Categories */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold mb-6">
            Categories
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {categories.map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition text-center"
              >
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6">
            Featured Products
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow p-5"
              >
                <div className="h-40 bg-slate-100 rounded-lg mb-4 flex items-center justify-center">
                  Product Image
                </div>

                <h3 className="font-bold text-lg">
                  {product.name}
                </h3>

                <p className="text-gray-600 mt-2">
                  {product.category}
                </p>

                <p className="text-teal-600 font-bold mt-3">
                  ৳ {product.PRICE}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Stock: {product.Stock}
                </p>

                <button className="mt-4 w-full bg-teal-600 text-white py-2 rounded-lg">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}