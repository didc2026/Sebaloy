"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  imageUrl?: string;
};

export default function Home() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));

        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading products...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
<div className="bg-white rounded-2xl shadow-md p-6 mb-8">
  <div className="flex justify-between items-center">
    <div>
      <h1 className="text-4xl font-bold text-teal-600">
        Sebaloy
      </h1>

      <p className="text-gray-500 mt-1">
        Online Medicine Store
      </p>
    </div>

    <div className="text-right">
      <p className="font-semibold">
        Products: {filteredProducts.length}
      </p>

<button
  onClick={() => router.push("/cart")}
  className="bg-teal-600 text-white px-4 py-2 rounded-lg"
>
  Cart ({cart.length})
</button>
    </div>
  </div>
</div>
<input
  type="text"
  placeholder="🔍 Search products..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full p-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 my-6"
/>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
{filteredProducts.map((product) => (
  <div
    key={product.id}
    onClick={() => router.push(`/product/${product.id}`)}
    className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer border"
  >
    <div className="aspect-square bg-slate-50 p-4 flex items-center justify-center">
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="h-full flex items-center justify-center">
          Product Image
        </div>
      )}
    </div>

    <div className="p-4">
      <h2 className="text-lg font-semibold">{product.name}</h2>

      <p className="text-gray-500">
        Category: {product.category}
      </p>

      <p className="text-green-600 font-bold">
        ৳ {product.price}
      </p>

      <p>Stock: {product.stock}</p>

<button
  onClick={(e) => {
    e.stopPropagation();

    const updatedCart = [...cart, product];

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert("Added to cart");
  }}
  className="w-full mt-4 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
>
  Add to Cart
</button>
    </div>
  </div>
))}       
{!loading && filteredProducts.length === 0 && (
  <div className="text-center mt-10 text-red-500">
    No products found.
  </div>
)}

    </div>
  </div>
</main>  );
}