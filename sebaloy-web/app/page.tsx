"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
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
  const [cart, setCart] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");
const [showCheckout, setShowCheckout] = useState(false);
  useEffect(() => {
  const savedCart = localStorage.getItem("cart");

  if (savedCart) {
    setCart(JSON.parse(savedCart));
  }
}, []);
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));

        setProducts(data);
      } catch (error) {
        console.error("Firestore Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
  );
const placeOrder = async () => {
  try {
    console.log("ORDER CART:", cart);
    console.log(
      "ORDER TOTAL:",
      cart.reduce((sum, item) => sum + item.price, 0)
    );

    await addDoc(collection(db, "orders"), {
      name,
      phone,
      address,
      cart,
      total: cart.reduce((sum, item) => sum + item.price, 0),
      createdAt: new Date(),
    });

    alert("Order Submitted!");

    setName("");
    setPhone("");
    setAddress("");
    setCart([]);
    localStorage.removeItem("cart");
    setShowCheckout(false);

  } catch (error) {
    console.error("Order Error:", error);
  }
};  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-teal-600 mb-2">
            Sebaloy
          </div>
          <p className="text-gray-500">Loading products...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
<h1 className="text-4xl font-bold mb-2 text-red-600">      
    Sebaloy
        </h1>

        <p className="text-gray-600 mb-6">
          Total Products: {filteredProducts.length}
        </p>
        <p className="text-green-600">Cart Items: {cart.length}</p>
        <p className="text-red-600">
  Total: ৳{cart.reduce((sum, item) => sum + item.price, 0)}
</p>
<button
  onClick={() => setShowCheckout(!showCheckout)}
  className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
>
  Checkout
</button>
{showCheckout && (
  <div className="border p-4 mb-4 bg-white rounded">
    <h3>Customer Information</h3>

    <input
      placeholder="Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="border p-2 rounded w-full mb-2"
    />

    <input
      placeholder="Phone"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      className="border p-2 rounded w-full mb-2"
    />

    <input
      placeholder="Address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      className="border p-2 rounded w-full mb-2"
    />

    <button
      onClick={placeOrder}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Place Order
    </button>
  </div>
)}
{cart.map((item, index) => (
  <div key={index}>
    {item.name} - ৳{item.price}

    <button
      onClick={() =>
        setCart(cart.filter((_, i) => i !== index))
      }
      style={{ marginLeft: "10px" }}
    >
      Remove
    </button>
  </div>
))}
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
  onClick={() => router.push(`/product/${product.id}`)}
  className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition p-5 cursor-pointer"
>
  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
      {product.imageUrl ? (
    <img
      src={product.imageUrl}
      alt={product.name}
className="w-full h-full object-contain" />
) : (
    <div className="h-full flex items-center justify-center">
      Product Image
    </div>
  )}
</div>
<h2 className="text-lg font-semibold mb-2">
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

<button
onClick={() => setCart([...cart, product])}
  className="w-full mt-4 bg-teal-600 text-white py-2 rounded-lg"
>  Add to Cart
</button>
 </div> ))}
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