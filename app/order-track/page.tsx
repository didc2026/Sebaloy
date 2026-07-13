"use client";

import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function OrderTrackPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<any>(null);
const [error, setError] = useState("");
const checkOrder = async () => {
  setError("");
  setOrder(null);

  const snapshot = await getDocs(
    collection(db, "orders")
  );

  const foundOrder = snapshot.docs.find((doc) => {
    const data: any = doc.data();

    return (
      doc.id === orderId &&
      data.phone === phone
    );
  });

  if (!foundOrder) {
    setError("Order not found");
    return;
  }

  setOrder({
    id: foundOrder.id,
    ...foundOrder.data(),
  });
};
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-6">
          Track Your Order
        </h1>

        <input
          type="text"
          placeholder="Order ID"
          className="w-full border p-3 rounded-lg mb-4"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full border p-3 rounded-lg mb-4"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          className="w-full bg-teal-600 text-white py-3 rounded-lg"
          onClick={checkOrder}
        >
          Check Order
        </button>
{error && (
  <p className="text-red-500 mt-4">
    {error}
  </p>
)}

{order && (
  <div className="mt-6 p-4 border rounded-lg bg-slate-50">
    <h2 className="font-bold text-lg mb-3">
      Order Details
    </h2>

    <p>
      <strong>Name:</strong>{" "}
      {order.customerName}
    </p>

    <p>
      <strong>Phone:</strong>{" "}
      {order.phone}
    </p>

<p>
  <strong>Status:</strong>{" "}

  <span
    className={`px-3 py-1 rounded-full text-white text-sm ${
      order.status === "pending"
        ? "bg-yellow-500"
        : order.status === "processing"
        ? "bg-blue-500"
        : "bg-green-500"
    }`}
  >
    {order.status}
  </span>
</p>
    <p>
      <strong>Total:</strong> ৳
      {order.total}
    </p>
    <p className="mt-3 text-gray-500 text-sm">
  Last Updated: {new Date().toLocaleDateString()}
</p>
  </div>
)}
      </div>
    </main>
  );
}