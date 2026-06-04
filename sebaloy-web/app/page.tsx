"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));

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

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-teal-600">
          Sebaloy
        </h1>

        <p className="text-gray-600 mb-6">
          Total Products: {filteredProducts.length}
        </p>

        <input
          type="text"
          placeholder="Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 border rounded-lg mb-8"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md p-5"
            >
              <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                Product Image
              </div>

              <h2 className="text-xl font-bold mb-2">
                {product.name}
              </h2>

              <p className="text-gray-600">
                Category: {product.category}
              </p>

              <p className="text-green-600 font-bold mt-2">
                ৳ {product.price}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Stock: {product.stock}
              </p>

              <button className="w-full mt-4 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700">
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center mt-10 text-red-500">
            No products found.
          </div>
        )}
      </div>
    </main>
  );
}