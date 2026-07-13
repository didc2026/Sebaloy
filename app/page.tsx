"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useCart } from "./context/CartContext";
type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  imageUrl?: string;
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
  const { addToCart, cartCount } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));
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
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === ""
        ? true
        : product.category.toLowerCase() ===
        selectedCategory.toLowerCase();
    return matchSearch && matchCategory;
  });
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

        <input type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 my-6"
        />
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Shop By Category
          </h2>

          <button
            onClick={() => setSelectedCategory("")}
            className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            All Products
          </button>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 max-w-4xl">
            {/* Medicine */}
            <div
              onClick={() => setSelectedCategory("Medicine")}
              className={`p-3 rounded-xl shadow-sm text-center cursor-pointer hover:shadow-md transition-all duration-300 ${selectedCategory === "Medicine"
                  ? "bg-red-500 text-white scale-105"
                  : "bg-sky-50 border border-sky-100"}`}
            >
              <div className="text-xl">💊</div>
              <p className="mt-1 text-sm font-semibold">
                Medicine
              </p>
            </div>

            {/* Healthcare */}
            <div
              onClick={() => setSelectedCategory("Healthcare")}
              className={`p-3 rounded-xl shadow-sm text-center cursor-pointer hover:shadow-md transition-all duration-300 ${selectedCategory === "Healthcare"
                  ? "bg-sky-500 text-white scale-105"
                  : "bg-red-50 border border-red-100"}`}
            >
              <div className="text-xl">🏥</div>
              <p className="mt-1 text-sm font-semibold">
                Healthcare
              </p>
            </div>

            {/* Baby & Mom Care*/}
<div
  onClick={() => setSelectedCategory("Baby & Mom Care")}
  className={`p-3 rounded-xl shadow-sm text-center cursor-pointer hover:shadow-md transition-all duration-300 ${
    selectedCategory === "Baby & Mom Care"
      ? "bg-pink-500 text-white scale-105"
      : "bg-pink-50 border border-pink-100"
  }`}
>   <div className="text-xl">👶
   </div>
              <p className="mt-1 text-sm font-semibold">
                Baby &  Mom Care
              </p>
            </div>

            {/* Medical Device */}
            <div
              onClick={() => setSelectedCategory("Medical Device")}
              className={`p-3 rounded-xl shadow-sm text-center cursor-pointer hover:shadow-md transition-all duration-300 ${selectedCategory === "Medical Device"
                  ? "bg-emerald-500 text-white scale-105"
                  : "bg-emerald-50 border border-emerald-100"}`}
            >
              <div className="text-xl">
                🩺</div>
              <p className="mt-1 text-sm font-semibold">
                Medical Device
              </p>

            </div>
          </div>   {/* category grid close */}
        </div>   {/* mb-8 close */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
<div
  key={product.id}
  onClick={() => {
    console.log("CLICKED PRODUCT =", product);
    router.push(`/product/${product.id}`);
  }}
className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full">
<div className="relative aspect-square bg-slate-50 p-2 flex items-center justify-center">
  {product.imageUrl ? (
  <>
    <img
      src={product.imageUrl}
      alt={product.name}
      className="w-full h-full object-contain"
      />
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg">

  {product.category === "Medicine" && (
    <>
      <p className="text-sm font-bold text-slate-800">
        {product.strength}
      </p>
      <p className="text-xs text-slate-500">
        {product.stripsPerBox} × {product.tabletsPerStrip} Tablets
      </p>
    </>
  )}

  {(product.category === "Baby & Mom Care" ||
    product.category === "Healthcare") && (
    <p className="text-sm font-bold text-slate-800">
      {product.size}
    </p>
  )}

{product.category === "Medical Device" && (
  <p className="text-sm font-bold text-slate-800">
    {product.model}
  </p>
)}
</div>
</>
) : (
  <div className="h-full flex items-center justify-center text-gray-400">
    Product Image
  </div>
)}
</div>
<div className="p-4 flex flex-col flex-1">
<h2 className="text-base font-bold line-clamp-2 min-h-[48px]">
    {product.name}
</h2>
{product.category === "Medicine" && product.genericName && (
  <p className="text-gray-500 text-sm font-medium mt-1">
    {product.genericName}
    {product.strength && ` ${product.strength}`}
  </p>
)}
{product.company && (
<p className="text-gray-500 text-sm mt-1 min-h-[22px]">
      {product.company}
  </p>
)}
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <span 
        className="text-2xl font-extrabold text-green-600">
          ৳ {Math.round(
            product.price -
            (product.price * (product.discount || 0)) / 100
          )}
        </span>

        {(product.discount ?? 0) > 0 && (
          <span className="text-sm text-gray-400 line-through">
            ৳ {product.price}
          </span>
        )}
      </div>

{(product.discount ?? 0) > 0 && (
  <div className="flex items-center gap-2 mt-2">
    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
      {product.discount}% OFF
    </span>

    <span className="text-xs text-green-600 font-semibold">
You Save ৳ {Math.round(
  (product.price * (product.discount || 0)) / 100
)}    </span>
  </div>
)}
    </div>

    <div className="mt-3">
      {Number(product.stock) === 0 ? (
        <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
          Out of Stock
        </span>
      ) : Number(product.stock) <= 10 ? (
        <span className="inline-block bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          Low Stock
        </span>
      ) : (
        <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          In Stock
        </span>
      )}
    </div>

    <button
      disabled={Number(product.stock) === 0}
      onClick={(e) => {
        e.stopPropagation();

        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
        });

        router.push("/cart");
      }}
  className={`mt-auto w-full mt-4 py-3 rounded-xl font-semibold text-white ${
        Number(product.stock) === 0
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-teal-600 hover:bg-teal-700"
      }`}
    >
      {Number(product.stock) === 0
        ? "Out of Stock"
        : "Add to Cart"}
</button>
</div>
</div>

          ))}
        </div>
{!loading && filteredProducts.length === 0 && (
  <div className="text-center mt-10 text-red-500">
    No products found.
  </div>
)}

</div>
</main>
);
}