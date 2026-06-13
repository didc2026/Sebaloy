"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useCart } from "@/app/context/CartContext";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
const id = decodeURIComponent(params.id as string);
  console.log("ID =", id);

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      console.log("SEARCHING DOC ID =", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct({
          id: docSnap.id,
          ...docSnap.data(),
        });
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  console.log("PARAM ID =", id);
console.log("PRODUCT =", product);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="p-8">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-64 mb-4"
      />

      <h1>{product.name}</h1>
      <p>Category: {product.category}</p>
      <p>Price: ৳{product.price}</p>
      <p>Stock: {product.stock}</p>
      <button
onClick={() => {
  console.log("Add To Cart Clicked");

  addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    quantity: 1,
  });
  router.push("/cart");
}}  className="bg-blue-600 text-white px-6 py-2 rounded mt-4 mr-2"
>
  Add to Cart
</button>
<button
  onClick={() => router.push("/cart")}
  className="bg-gray-700 text-white px-6 py-2 rounded mt-4 mr-2"
>
  🛒 Cart
</button>
<button
  onClick={() => router.push("/checkout")}
  className="bg-green-600 text-white px-6 py-2 rounded mt-4"
>
  Buy Now
</button>
    </div>
  );
}