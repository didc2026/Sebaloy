"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
export default function CartPage() {
  const router = useRouter();

  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

const total = cartItems.reduce(
  (sum, item) =>
    sum +
    Math.round(
      item.price -
      (item.price * (item.discount || 0)) / 100
    ) * item.quantity,
  0
);const totalItems = cartItems.reduce(
  (sum, item) => sum + item.quantity,
  0
);
const grandTotal = total;  // Empty Cart State
  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
        <div className="bg-white p-10 rounded-2xl shadow-md text-center max-w-md">
          <h1 className="text-3xl font-bold mb-4">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 mb-6">
            Add some products to start shopping.
          </p>

          <button
            onClick={() => router.push("/")}
            className="bg-teal-600 text-white px-6 py-3 rounded-xl"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

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
  className="bg-white rounded-2xl shadow-md p-4 flex items-start gap-4 max-w-3xl mx-auto"
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
                <p className="text-gray-500 text-sm">
  Pack: {item.packSize} {item.packType}
</p>

<p className="text-gray-500 text-sm">
  Unit: {item.unitType}
</p>

<div className="flex items-center gap-3 mt-2">
  <button
    onClick={() => decreaseQuantity(item.id)}
    className="bg-gray-200 px-3 py-1 rounded-lg"
  >
    -
  </button>

  <span className="font-bold text-lg">
    {item.quantity}
  </span>

  <button
    onClick={() => increaseQuantity(item.id)}
    className="bg-gray-200 px-3 py-1 rounded-lg"
  >
    +
  </button>
</div>
{item.discount && item.discount > 0 ? (
  <>
    <p className="text-gray-400 line-through">
      ৳ {item.price}
    </p>

    <p className="text-green-600 font-bold">
      ৳{" "}
      {Math.round(
        item.price -
          (item.price * item.discount) / 100
      )}
    </p>

    <p className="text-red-500 text-sm">
      {item.discount}% OFF
    </p>
  </>
) : (
  <p className="text-green-600 font-bold">
    ৳ {item.price}
  </p>
)}
                <button
                  onClick={() => removeFromCart(item.id)}
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
Total Items: {totalItems}
          </p>
          <div className="space-y-2 mt-4">
  <div className="flex justify-between">
    <span>Subtotal</span>
    <span>৳ {total}</span>
  </div>

  <hr />

  <div className="flex justify-between font-bold text-xl text-teal-600">
    <span>Grand Total</span>
    <span>৳ {grandTotal}</span>
  </div>
</div>          <button
            onClick={() => router.push("/checkout")}
            className="w-full mt-6 bg-teal-600 text-white py-3 rounded-xl"
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </main>
  );
}