"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

return (
  <div className="max-w-xl mx-auto py-20 px-4 text-center">
    <h1 className="text-3xl font-bold text-green-600">
      ✅ Order Placed Successfully
    </h1>

    <p className="mt-4 text-gray-600">
      Thank you for shopping with Sebaloy.
    </p>

    <div className="mt-6 border rounded-lg p-4">
      <p className="text-sm text-gray-500">
        Order ID
      </p>

<div className="flex items-center justify-center gap-3">
  <p className="font-mono break-all">
    {orderId}
  </p>

  <button
    onClick={() => {
      navigator.clipboard.writeText(orderId || "");
      alert("Order ID Copied!");
    }}
    className="text-xs text-gray-400 hover:text-teal-600"
  >
    Copy Now
  </button>
</div>    </div>

    <div className="mt-6">
      <Link
        href="/"
        className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700"
      >
        Continue Shopping
      </Link>
    </div>

    <div className="mt-4">
      <Link
        href={`/order-track?id=${orderId}`}
        className="inline-block border border-teal-600 text-teal-600 px-6 py-3 rounded-lg hover:bg-teal-50"
      >
        Track Your Order
      </Link>
    </div>
  </div>
);
}