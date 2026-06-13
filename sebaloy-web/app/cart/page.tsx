"use client";

import { useCart } from "@/app/context/CartContext";

export default function CheckoutPage() {
  const { cartItems } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cartItems.length === 0 ? (
        <p>No products in cart.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded mb-4"
            >
              <h2>{item.name}</h2>
              <p>Price: ৳{item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Subtotal: ৳{item.price * item.quantity}</p>
            </div>
          ))}

          <h2 className="text-xl font-bold mt-4">
            Total: ৳{total}
          </h2>

          <button
            className="bg-green-600 text-white px-6 py-3 rounded mt-4"
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  );
}