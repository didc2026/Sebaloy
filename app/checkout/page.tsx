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
  runTransaction,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type PaymentMethod = "cod" | "bkash" | "nagad" | "bank";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryZone, setDeliveryZone] = useState("dhaka");

  // Dynamic payment fields
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cod");
  const [paymentNumber, setPaymentNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bankReference, setBankReference] = useState("");

  const [loading, setLoading] = useState(false);

  const originalTotal = cartItems.reduce(
    (sum, item) =>
      sum + Math.round(item.price) * item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (sum, item) => {
      const discount = item.discount || 0;

      const discountPerUnit = Math.round(
        (item.price * discount) / 100
      );

      const salePrice =
        Math.round(item.price) - discountPerUnit;

      return sum + salePrice * item.quantity;
    },
    0
  );

  const discountAmount = originalTotal - subtotal;

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const deliveryCharge =
    subtotal >= 2000
      ? 0
      : deliveryZone === "dhaka"
        ? 60
        : 120;

  const grandTotal = subtotal + deliveryCharge;

  function handlePaymentMethodChange(method: PaymentMethod) {
    setPaymentMethod(method);

    // Clear method-specific fields when switching payment method.
    setPaymentNumber("");
    setTransactionId("");
    setBankName("");
    setAccountName("");
    setBankReference("");
  }

  const placeOrder = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    if (loading) return;

    setLoading(true);

    if (!name || !phone || !address) {
      alert("সব তথ্য পূরণ করুন");
      setLoading(false);
      return;
    }

    const bdPhoneRegex = /^01[3-9]\d{8}$/;

    if (!bdPhoneRegex.test(phone.trim())) {
      alert("সঠিক ১১ সংখ্যার বাংলাদেশি মোবাইল নম্বর দিন।");
      setLoading(false);
      return;
    }

    // Validate dynamic payment information.
    if (paymentMethod === "bkash" || paymentMethod === "nagad") {
      const paymentNumberRegex = /^01[3-9]\d{8}$/;

      if (!paymentNumberRegex.test(paymentNumber.trim())) {
        alert("সঠিক ১১ সংখ্যার বাংলাদেশি পেমেন্ট নম্বর দিন।");
        setLoading(false);
        return;
      }

      if (!transactionId.trim()) {
        alert("Transaction ID দিন।");
        setLoading(false);
        return;
      }
    }

    if (paymentMethod === "bank") {
      if (!bankName.trim() || !accountName.trim() || !bankReference.trim()) {
        alert("Bank Name, Account Name এবং Reference পূরণ করুন।");
        setLoading(false);
        return;
      }
    }

    try {
      console.log({
        name,
        phone,
        address,
        cartItems,
        subtotal,
        grandTotal,
        deliveryCharge,
        deliveryZone,
        paymentMethod,
        paymentNumber,
        transactionId,
        bankName,
        accountName,
        bankReference,
      });

      const counterRef = doc(db, "system", "orderCounter");

      const orderNumber = await runTransaction(
        db,
        async (transaction) => {
          const counterSnap = await transaction.get(counterRef);

          let lastNumber = 0;

          if (counterSnap.exists()) {
            lastNumber =
              counterSnap.data().lastNumber || 0;
          }

          const newNumber = lastNumber + 1;

          transaction.set(
            counterRef,
            {
              lastNumber: newNumber,
            },
            { merge: true }
          );

          return `SBL-${String(newNumber).padStart(6, "0")}`;
        }
      );

      const orderRef = await addDoc(collection(db, "orders"), {
        orderNumber,
        userId: user.uid,
        email: user.email,
        customerName: name,
        phone,
        address,

        items: cartItems.map((item) => {
          const discount = item.discount || 0;

          const discountPerUnit = Math.round(
            (item.price * discount) / 100
          );

          const salePrice =
            Math.round(item.price) - discountPerUnit;

          return {
            id: item.id,
            name: item.name,

            // Original Price
            price: Math.round(item.price),

            // Discount %
            discount,

            // Selling Price - whole number
            salePrice,

            quantity: item.quantity,
          };
        }),

        subtotal,
        discountAmount,
        deliveryCharge,
        total: grandTotal,
        deliveryZone,

        // Dynamic payment information
        paymentMethod,
        paymentStatus:
          paymentMethod === "cod" ? "pending" : "pending",

        ...(paymentMethod === "bkash" || paymentMethod === "nagad"
          ? {
              paymentNumber: paymentNumber.trim(),
              transactionId: transactionId.trim(),
            }
          : {}),

        ...(paymentMethod === "bank"
          ? {
              bankName: bankName.trim(),
              accountName: accountName.trim(),
              bankReference: bankReference.trim(),
            }
          : {}),

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
            stock:
              currentStock - (item.quantity || 1),
          });
        }
      }

      localStorage.removeItem("cart");

      setLoading(false);

      router.push(
        `/order-success?id=${orderRef.id}&orderNumber=${orderNumber}`
      );
      return;
    } catch (error) {
      console.error(error);
      alert("অর্ডার সেভ হয়নি");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-3 py-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Checkout
        </h1>

        <p className="text-sm text-gray-500 mt-1 mb-5">
          Please enter your delivery information.
        </p>

        <h2 className="text-lg font-semibold text-slate-700 mb-3">
          Customer Information
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Mobile Number
            </label>

            <input
              type="text"
              placeholder="01XXXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Delivery Address
            </label>

            <textarea
              placeholder="House, Road, Area, District"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Delivery Zone
            </label>

            <select
              value={deliveryZone}
              onChange={(e) =>
                setDeliveryZone(e.target.value)
              }
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="dhaka">Dhaka City</option>
              <option value="outside">Outside Dhaka</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="max-w-3xl mx-auto mt-5 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">
          Payment Method
        </h2>

        <div className="space-y-3">
          <label
            className={`block cursor-pointer rounded-xl border p-4 transition ${
              paymentMethod === "cod"
                ? "border-teal-500 bg-teal-50"
                : "border-gray-200 hover:border-teal-300"
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() =>
                  handlePaymentMethodChange("cod")
                }
                className="mt-1"
              />
              <div>
                <p className="font-semibold text-slate-800">
                  Cash on Delivery
                </p>
                <p className="text-sm text-gray-500">
                  Pay when your order is delivered.
                </p>
              </div>
            </div>
          </label>

          <label
            className={`block cursor-pointer rounded-xl border p-4 transition ${
              paymentMethod === "bkash"
                ? "border-pink-500 bg-pink-50"
                : "border-gray-200 hover:border-pink-300"
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="bkash"
                checked={paymentMethod === "bkash"}
                onChange={() =>
                  handlePaymentMethodChange("bkash")
                }
                className="mt-1"
              />
              <div className="flex-1">
                <p className="font-semibold text-slate-800">
                  bKash
                </p>
                <p className="text-sm text-gray-500">
                  Mobile payment.
                </p>
              </div>
            </div>

            {paymentMethod === "bkash" && (
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  placeholder="bKash Number (01XXXXXXXXX)"
                  value={paymentNumber}
                  onChange={(e) =>
                    setPaymentNumber(e.target.value)
                  }
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-pink-500 outline-none"
                />

                <input
                  type="text"
                  placeholder="Transaction ID"
                  value={transactionId}
                  onChange={(e) =>
                    setTransactionId(e.target.value)
                  }
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
            )}
          </label>

          <label
            className={`block cursor-pointer rounded-xl border p-4 transition ${
              paymentMethod === "nagad"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200 hover:border-orange-300"
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="nagad"
                checked={paymentMethod === "nagad"}
                onChange={() =>
                  handlePaymentMethodChange("nagad")
                }
                className="mt-1"
              />
              <div className="flex-1">
                <p className="font-semibold text-slate-800">
                  Nagad
                </p>
                <p className="text-sm text-gray-500">
                  Mobile payment.
                </p>
              </div>
            </div>

            {paymentMethod === "nagad" && (
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  placeholder="Nagad Number (01XXXXXXXXX)"
                  value={paymentNumber}
                  onChange={(e) =>
                    setPaymentNumber(e.target.value)
                  }
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none"
                />

                <input
                  type="text"
                  placeholder="Transaction ID"
                  value={transactionId}
                  onChange={(e) =>
                    setTransactionId(e.target.value)
                  }
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            )}
          </label>

          <label
            className={`block cursor-pointer rounded-xl border p-4 transition ${
              paymentMethod === "bank"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={() =>
                  handlePaymentMethodChange("bank")
                }
                className="mt-1"
              />
              <div className="flex-1">
                <p className="font-semibold text-slate-800">
                  Bank Transfer
                </p>
                <p className="text-sm text-gray-500">
                  Pay by bank transfer.
                </p>
              </div>
            </div>

            {paymentMethod === "bank" && (
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  placeholder="Bank Name"
                  value={bankName}
                  onChange={(e) =>
                    setBankName(e.target.value)
                  }
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <input
                  type="text"
                  placeholder="Account Name"
                  value={accountName}
                  onChange={(e) =>
                    setAccountName(e.target.value)
                  }
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <input
                  type="text"
                  placeholder="Transaction / Reference Number"
                  value={bankReference}
                  onChange={(e) =>
                    setBankReference(e.target.value)
                  }
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Order Summary */}
      <div className="max-w-3xl mx-auto mt-5 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
        <h2 className="text-lg font-bold mb-3">
          Order Summary
        </h2>

        <p className="text-gray-600 mb-3">
          Total Items: {totalItems}
        </p>

        <p className="mt-3 mb-2 font-semibold text-gray-700">
          Items
        </p>

        {cartItems.map((item) => (
          <div key={item.id} className="mb-2">
            <span>
              • {item.name} × {item.quantity}
            </span>
          </div>
        ))}

        <div className="mt-4 space-y-2">
          {discountAmount > 0 && (
            <div className="flex justify-between text-gray-500">
              <span>Original Price</span>
              <span>৳ {Math.round(originalTotal)}</span>
            </div>
          )}

          {discountAmount > 0 && (
            <>
              <div className="flex justify-between text-red-600 font-medium">
                <span>Discount</span>
                <span>-৳ {Math.round(discountAmount)}</span>
              </div>

              <hr className="my-2 border-gray-300" />
            </>
          )}

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>৳ {Math.round(subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery Charge</span>
            <span>৳ {deliveryCharge}</span>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between text-xl font-bold text-teal-600">
            <span>Grand Total</span>
            <span>৳ {Math.round(grandTotal)}</span>
          </div>

          <button
            onClick={placeOrder}
            disabled={loading}
            className={`w-full mt-4 py-3 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {loading
              ? "Processing Order..."
              : "Place Order"}
          </button>
        </div>
      </div>
    </main>
  );
}
