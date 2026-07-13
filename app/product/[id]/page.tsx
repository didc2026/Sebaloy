"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useCart } from "@/app/context/CartContext";
import Accordion from "../../components/Accordion";

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();

  const id = decodeURIComponent(params.id as string);

  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [alternativeProducts, setAlternativeProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setLoading(false);
          return;
        }

        const data: any = {
          id: docSnap.id,
          ...docSnap.data(),
        };

        setProduct(data);

        if (data.genericName) {
          const q = query(
            collection(db, "products"),
            where("genericName", "==", data.genericName)
          );

          const snapshot = await getDocs(q);

          const alternatives = snapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter((item: any) => item.id !== data.id);

          setAlternativeProducts(alternatives);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!product) return <div>Product not found</div>;
  return (
  <main className="min-h-screen bg-slate-100 py-6 px-2">
    <div className="max-w-5xl mx-auto bg-white rounded-1xl shadow-lg p-6">

<div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 items-start">
        {/* Left Side */}
        <div>
          <div className="border rounded-2xl p-6 bg-white">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-[420px] object-contain"
            />
        </div>

          <div className="flex gap-3 mt-4">
            <div className="w-20 h-20 border rounded-lg p-2">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          {/* Product Information */}

          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-6">
              Product Information
            </h2>
                      {product.description && (
            <Accordion title="📄 Description" defaultOpen>
              {product.description}
            </Accordion>
          )}

          {product.features && (
            <Accordion title="✨ Features">
              {product.features}
            </Accordion>
          )}

          {product.specifications && (
            <Accordion title="📋 Specifications">
              {product.specifications}
            </Accordion>
          )}

          {product.category === "Medicine" && (
            <>
              {product.pharmacology && (
                <Accordion title="💊 Pharmacology">
                  {product.pharmacology}
                </Accordion>
              )}

              {product.indication && (
                <Accordion title="🩺 Indication">
                  {product.indication}
                </Accordion>
              )}

              {product.dosage && (
                <Accordion title="💜 Dosage">
                  {product.dosage}
                </Accordion>
              )}

              {product.administration && (
                <Accordion title="💉 Administration">
                  {product.administration}
                </Accordion>
              )}

              {product.sideEffects && (
                <Accordion title="⚠️ Side Effects">
                  {product.sideEffects}
                </Accordion>
              )}

              {product.precautions && (
                <Accordion title="🛡️ Precautions">
                  {product.precautions}
                </Accordion>
              )}

              {product.pregnancyLactation && (
                <Accordion title="🤰 Pregnancy & Lactation">
                  {product.pregnancyLactation}
                </Accordion>
              )}

              {product.drugInteraction && (
                <Accordion title="🔄 Drug Interaction">
                  {product.drugInteraction}
                </Accordion>
              )}

              {product.storageInfo && (
                <Accordion title="📦 Storage">
                  {product.storageInfo}
                </Accordion>
              )}
            </>
          )}
          </div>
        {/* Right Side */}
        <div className="space-y-6">

        </div>
          {alternativeProducts.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-5">
                Alternative Brands
              </h2>

              <div className="space-y-4">
                {alternativeProducts.map((item) => {
                  const finalPrice = Math.round(
                    item.price -
                      (item.price * (item.discount || 0)) / 100
                  );

                  return (
                    <div
                      key={item.id}
                      onClick={() =>
                        router.push(`/product/${item.id}`)
                      }
                      className="flex items-center justify-between border rounded-xl p-4 hover:bg-slate-50 cursor-pointer transition"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-20 h-20 object-contain border rounded-lg p-1"
                        />

                        <div>
                          <h3 className="font-bold">
                            {item.name}
                          </h3>

                          <p className="text-gray-500">
                            {item.company}
                          </p>

                          <p className="text-sm text-gray-400">
                            {item.genericName} {item.strength}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">
                          ৳ {finalPrice}
                        </p>

                        <p className="text-gray-500 text-sm">
                          {item.unitType}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold leading-tight">
              {product.name}
          </h1>

          <p className="text-xl text-gray-600">
            {product.genericName} {product.strength}
          </p>

          <div className="flex items-center gap-3">
            <span className="text-yellow-500">★★★★★</span>
            <span className="text-gray-500">
              4.8 (128 Reviews)
            </span>
          </div>
          <div className="rounded-xl border bg-slate-50 p-3 space-y-1">

            <div className="flex justify-between items-center py-1">
              <span className="font-semibold">Category</span>
              <span>{product.category}</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="font-semibold">Company</span>
              <span>{product.company}</span>
            </div>

            {product.category === "Medicine" && (
              <>
                <div className="flex justify-between items-center py-1">
                  <span className="font-semibold">Pack Size</span>
                  <span>
                    {product.stripsPerBox} × {product.tabletsPerStrip} Tablets
                  </span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="font-semibold">Selling Unit</span>
                  <span>{product.unitType}</span>
                </div>
              </>
            )}

            <div className="flex justify-between items-center py-1">
              <span className="font-semibold">Price</span>

              <span className="text-2xl font-bold text-green-600">
                ৳{" "}
                {Math.round(
                  product.price -
                    (product.price * (product.discount || 0)) / 100
                )}
              </span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="font-semibold">Stock</span>

              <span className="text-green-600 font-bold">
                {product.stock} Available
              </span>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => {
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    discount: product.discount || 0,
                    imageUrl: product.imageUrl,
                    packSize: product.packSize,
                    packType: product.packType,
                    unitType: product.unitType,
                    quantity: 1,
                  });

                  router.push("/cart");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl font-semibold transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => router.push("/checkout")}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-xl font-semibold transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
</div>
</div>
  </main>
);
}