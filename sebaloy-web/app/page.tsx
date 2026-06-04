"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Firestore Data:", data);
        setProducts(data);
      } catch (error) {
        console.error("Firestore Error:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-6">Sebaloy</h1>

      <p className="mb-4">
        Total Products: {products.length}
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg"
          >
            <h2 className="text-xl font-bold">
              {product.name}
            </h2>

            <p>Category: {product.category}</p>

            <p>Price: ৳ {product.price}</p>

            <p>Stock: {product.stock}</p>
          </div>
        ))}
      </div>
    </main>
  );
}