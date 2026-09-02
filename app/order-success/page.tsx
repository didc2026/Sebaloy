"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function OrderSuccessContent() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("id");
  const orderNumber = searchParams.get("orderNumber");

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">

        <div className="text-6xl mb-4">
          ✅
        </div>

        <h1 className="text-3xl font-bold text-green-600">
          Order Placed Successfully
        </h1>

        <p className="text-gray-500 mt-3">
          Thank you for shopping with Sebaloy.
        </p>

        {/* Order Number */}

        <div className="mt-8 rounded-xl border bg-gray-50 p-5">

          <p className="text-sm text-gray-500">
            Order Number
          </p>

          <div className="flex items-center justify-center gap-3 mt-2">

            <p className="font-mono text-xl font-bold text-teal-600">
              {orderNumber}
            </p>
            <Link
              href={`/invoice/${orderId}`}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700"
            >
              View Invoice
            </Link>
            <button
              onClick={() => {
                navigator.clipboard.writeText(orderNumber || "");
                alert("Order Number Copied!");
              }}
              className="text-sm text-teal-600 hover:underline"
            >
              Copy
            </button>

          </div>

        </div>

        {/* Status */}

        <div className="mt-8">

          <span className="inline-flex items-center rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800">
            🟡 Pending
          </span>

        </div>

        {/* Buttons */}

        <div className="mt-10 flex flex-col gap-4">

          <Link
            href="/"
            className="w-full rounded-xl bg-teal-600 py-3 text-white font-semibold hover:bg-teal-700 transition"
          >
            Continue Shopping
          </Link>

          <Link
            href={`/order-track?orderNumber=${orderNumber}`}
            className="w-full rounded-xl border border-teal-600 py-3 text-teal-600 font-semibold hover:bg-teal-50 transition"
          >
            Track Your Order
          </Link>
          <Link
            href={`/invoice/${orderId}`}
            target="_blank"
            className="block w-full rounded-xl border border-blue-600 py-3 text-center text-blue-600 hover:bg-blue-50 transition"
          >
            Download Invoice
          </Link>
        </div>

      </div>

    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center">
          Loading...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}