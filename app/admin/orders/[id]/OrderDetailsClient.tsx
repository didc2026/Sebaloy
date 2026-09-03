"use client";

console.log("=== ORDER DETAILS CLIENT FILE LOADED ===");

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

type Props = {
    orderId: string;
};

export default function OrderDetailsClient({ orderId }: Props) {
    const router = useRouter();

    console.log("Order ID from useParams:", orderId);

    useEffect(() => {
        console.log("useEffect orderId:", orderId);
    }, [orderId]);

    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        if (!orderId) {
            console.log("orderId is empty");
            return;
        }

        async function loadOrder() {
            try {
                console.log("loadOrder started");
                console.log("Using ID:", orderId);

                const docRef = doc(db, "orders", orderId);
                const docSnap = await getDoc(docRef);

                console.log("Exists:", docSnap.exists());

                if (!docSnap.exists()) {
                    console.log("Document NOT FOUND");
                    return;
                }

                const data = docSnap.data();

                console.log(JSON.stringify(data, null, 2));

                setOrder({
                    id: docSnap.id,
                    ...data,
                });
            } catch (error) {
                console.error("Firestore Error:", error);
            }
        }

        loadOrder();
    }, [orderId]);

    if (!order) {
        return (
            <div className="p-8">
                <div className="mb-6 border-b pb-4">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Order Details
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        View customer information, ordered products and payment details.
                    </p>
                </div>

                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="p-8">

            {/* =========================
                PAGE HEADER
            ========================== */}
            <div className="mb-6 border-b pb-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">
                            Order Details
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            View customer information, ordered products and payment details.
                        </p>
                    </div>

                    {/* PRINT INVOICE BUTTON */}
                    <button
                        type="button"
                        onClick={() => router.push(`/invoice/${order.id}`)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                    >
                        🖨️ Print Invoice
                    </button>

                </div>
            </div>

            {/* =========================
                ORDER INFORMATION
            ========================== */}
            <div className="space-y-4 rounded-xl border p-6 bg-white shadow">

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    <div>
                        <p className="text-sm text-slate-500">
                            Order No
                        </p>

                        <p className="font-semibold">
                            {order.orderNumber || order.id}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Customer Name
                        </p>

                        <p className="font-semibold">
                            {order.customerName}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Phone Number
                        </p>

                        <p className="font-semibold">
                            {order.phone}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Delivery Zone
                        </p>

                        <p className="font-semibold">
                            {order.deliveryZone}
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <p className="text-sm text-slate-500">
                            Delivery Address
                        </p>

                        <p className="font-semibold">
                            {order.address}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Order Status
                        </p>

                        <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                            {order.status}
                        </span>
                    </div>

                </div>

                {/* =========================
                    ORDERED ITEMS
                ========================== */}

                <h3 className="mt-6 mb-2 text-lg font-semibold">
                    Ordered Items
                </h3>

                <div className="space-y-3">

                    {order.items?.map((item: any, index: number) => (

                        <div
                            key={index}
                            className="rounded-lg border p-3"
                        >

                            <p>
                                <strong>Product:</strong>{" "}
                                {item.name}
                            </p>

                            <p>
                                <strong>Quantity:</strong>{" "}
                                {item.quantity}
                            </p>

                            <p>
                                <strong>Original Price:</strong>{" "}
                                ৳{Math.round(item.price)}
                            </p>

                            {item.discount > 0 && (
                                <p className="text-red-600">
                                    <strong>Discount:</strong>{" "}
                                    {item.discount}%
                                </p>
                            )}

                            <p>
                                <strong>Selling Price:</strong>{" "}
                                ৳
                                {Math.round(
                                    item.price -
                                    (item.price * (item.discount || 0)) / 100
                                )}
                            </p>

                            <p>
                                <strong>Total:</strong>{" "}
                                ৳
                                {Math.round(
                                    item.price -
                                    (item.price * (item.discount || 0)) / 100
                                ) * item.quantity}
                            </p>

                        </div>

                    ))}

                </div>

                <hr className="my-4 border-gray-300" />

                {/* =========================
                    PAYMENT SUMMARY
                ========================== */}

                <h3 className="mt-6 mb-2 text-lg font-semibold">
                    Payment Summary
                </h3>

                <div className="rounded-lg border p-4 space-y-2">

                    <div className="flex justify-between">
                        <span>Subtotal</span>

                        <span>
                            ৳{Math.round(order.subtotal || 0)}
                        </span>
                    </div>

                    {(order.discountAmount ?? 0) > 0 && (

                        <div className="flex justify-between text-red-600">

                            <span>
                                Discount
                            </span>

                            <span>
                                -৳{Math.round(order.discountAmount)}
                            </span>

                        </div>

                    )}

                    <div className="flex justify-between">

                        <span>
                            Delivery Charge
                        </span>

                        <span>
                            ৳{Math.round(order.deliveryCharge || 0)}
                        </span>

                    </div>

                    <hr className="my-2 border-gray-300" />

                    <div className="flex justify-between font-bold text-lg">

                        <span>
                            Grand Total
                        </span>

                        <span>
                            ৳{Math.round(order.total || 0)}
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
}