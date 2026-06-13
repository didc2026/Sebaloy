"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
export default function CartPage() {
  const router = useRouter();

  const {
    cartItems,
    removeFromCart,
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Shopping Cart
        </h1>

        <div className="space-y-4">

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-4 flex gap-4"
            >
              <div className="w-32 h-32 bg-slate-100 rounded-xl overflow-hidden">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-bold">
                  {item.name}
                </h2>

                <p>
                  Quantity: {item.quantity}
                </p>

                <p className="text-green-600 font-bold mt-2">
                  ৳ {item.price}
                </p>

                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

          <h2 className="text-2xl font-bold">
            Order Summary
          </h2>

          <p className="mt-3">
            Total Items: {cartItems.length}
          </p>

          <p className="text-2xl font-bold text-teal-600 mt-3">
            ৳ {total}
          </p>

          <button
            onClick={() =>
              router.push("/checkout")
            }
            className="w-full mt-6 bg-teal-600 text-white py-3 rounded-xl"
          >
            Proceed To Checkout
          </button>

        </div>

      </div>
    </main>
  );
}