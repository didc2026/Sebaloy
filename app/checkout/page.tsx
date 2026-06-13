"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function CheckoutPage() {
  const router = useRouter();

  const { cartItems, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!name || !phone || !address) {
      alert("সব তথ্য পূরণ করুন");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        customerName: name,
        phone: phone,
        address: address,
        items: cartItems,
        total: total,
        status: "pending",
        createdAt: new Date(),
      });

      alert("অর্ডার সফল হয়েছে");

      clearCart();

      router.push("/");
    } catch (error) {
      console.error(error);
      alert("অর্ডার সেভ হয়নি");
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">
          Checkout
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-bold mb-4">
            Order Summary
          </h2>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between mb-2"
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                ৳ {item.price * item.quantity}
              </span>
            </div>
          ))}

          <div className="mt-4 text-2xl font-bold text-teal-600">
            Total: ৳ {total}
          </div>

          <button
            onClick={placeOrder}
            className="w-full mt-6 bg-teal-600 text-white py-3 rounded-xl"
          >
            Place Order
          </button>
        </div>
      </div>
    </main>
  );
}