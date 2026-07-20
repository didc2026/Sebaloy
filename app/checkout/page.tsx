"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";import { db } from "@/lib/firebase";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryZone, setDeliveryZone] =
  useState("dhaka");

const total = cartItems.reduce(
  (sum, item) =>
    sum +
    (item.price -
      (item.price * (item.discount || 0)) / 100) *
      item.quantity,
  0
);
const totalItems = cartItems.reduce(
  (sum, item) => sum + item.quantity,
  0
);
const deliveryCharge =
  total >= 2000
    ? 0
    : deliveryZone === "dhaka"
    ? 60
    : 120;

const grandTotal = total + deliveryCharge;
  const placeOrder = async () => {
    if (!name || !phone || !address) {
      alert("সব তথ্য পূরণ করুন");
      return;
    }

    try {
      console.log({
  name,
  phone,
  address,
  cartItems,
  total,
  grandTotal,
  deliveryCharge,
  deliveryZone,
});
console.log({
  name,
  phone,
  address,
  cartItems,
  total,
  grandTotal,
  deliveryCharge,
  deliveryZone,
});
const orderRef = 
await addDoc(collection(db, "orders"),
 { customerName: name,
  phone,
  address,
items: cartItems.map((item) => ({
  id: item.id,
  name: item.name,
  price: item.price,
  quantity: item.quantity,
})),
  total: grandTotal,
  subtotal: total,
  deliveryCharge,
  deliveryZone,

  status: "pending",
  createdAt: new Date(),
});
clearCart();
for (const item of cartItems) {
  const productRef = doc(db, "products", item.id);

  const productSnap = await getDoc(productRef);
  if (productSnap.exists()) {
    const currentStock =
      Number(productSnap.data().stock) || 0;

    await updateDoc(productRef, {
      stock: currentStock - (item.quantity || 1),
    });
  }
}
localStorage.removeItem("cart");
router.push(`/order-success?id=${orderRef.id}`);
return;
    } catch (error) {
      console.error(error);
      alert("অর্ডার সেভ হয়নি");
    }
  };

  return (
<main className="max-w-xl mx-auto px-4 py-1">
  <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-4">
  <h1 className="text-2xl font-bold mb-2">
        Checkout
        </h1>

<div className="space-y-2">    
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

<select
  value={deliveryZone}
  onChange={(e) => setDeliveryZone(e.target.value)}
  className="w-full border p-2 rounded-lg mt-2"
>
  <option value="dhaka">Dhaka City</option>
  <option value="outside">Outside Dhaka</option>
</select>

</div>
        </div>

<div className="mt-4 border-t pt-3">
  <h2 className="text-lg font-bold mb-3">
              Order Summary
          </h2>
          <p className="text-gray-600 mb-3">
  Total Items: {totalItems}
</p>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between mb-2"
            >
              <span>
                {item.name} × {item.quantity}
              </span>

<span>
  ৳{" "}
  {Math.round(
    (item.price -
      (item.price * (item.discount || 0)) / 100) *
      item.quantity
  )}
</span>         
   </div>
          ))}

<div className="mt-4 space-y-2">
  <div className="flex justify-between">
    <span>Subtotal</span>
    <span>৳ {Math.round(total)}</span>
  </div>

  <div className="flex justify-between">
    <span>Delivery Charge</span>
    <span>৳ {deliveryCharge}</span>
  </div>

  <hr />

    <div className="flex justify-between text-xl font-bold text-teal-600">
    <span>Grand Total</span>
    <span>৳ {Math.round(grandTotal)}</span>
  </div>

<button
  onClick={placeOrder}
  className="w-full mt-4 bg-teal-600 text-white py-2 rounded-xl"
>
  Place Order
</button>
        </div>
      </div>
    </main>
  );
}