"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import Image from "next/image";
type Order = {
    orderNumber: string;
    customerName: string;
    phone: string;
    address: string;
    items: {
        id: string;
        name: string;
        price: number;
        salePrice: number;
        quantity: number;
        discount: number;
    }[];
    subtotal: number;
    discountAmount: number;
    deliveryCharge: number;
    total: number;
    deliveryZone: string;
    status: string;
    createdAt: any;

    // Dynamic payment information
    paymentMethod?: "cod" | "bkash" | "nagad" | "bank" | string;
    paymentStatus?: "pending" | "paid" | "failed" | string;
    paymentNumber?: string;
    transactionId?: string;
    bankName?: string;
    accountName?: string;
    bankReference?: string;
};

const numberToWords = (num: number): string => {
    const ones = [
        "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven",
        "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen",
        "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen",
    ];

    const tens = [
        "", "", "Twenty", "Thirty", "Forty", "Fifty",
        "Sixty", "Seventy", "Eighty", "Ninety",
    ];

    const belowThousand = (n: number): string => {
        let words = "";

        if (n >= 100) {
            words += `${ones[Math.floor(n / 100)]} Hundred`;
            n %= 100;
            if (n > 0) words += " ";
        }

        if (n >= 20) {
            words += tens[Math.floor(n / 10)];
            n %= 10;
            if (n > 0) words += `-${ones[n]}`;
        } else if (n > 0) {
            words += ones[n];
        }

        return words;
    };

    const integer = Math.max(0, Math.round(num));
    if (integer === 0) return "Zero";

    const parts: string[] = [];
    const billions = Math.floor(integer / 1_000_000_000);
    const millions = Math.floor((integer % 1_000_000_000) / 1_000_000);
    const thousands = Math.floor((integer % 1_000_000) / 1_000);
    const remainder = integer % 1_000;

    if (billions > 0) parts.push(`${belowThousand(billions)} Billion`);
    if (millions > 0) parts.push(`${belowThousand(millions)} Million`);
    if (thousands > 0) parts.push(`${belowThousand(thousands)} Thousand`);
    if (remainder > 0) parts.push(belowThousand(remainder));

    return parts.join(" ");
};

export default function InvoicePage() {
    const params = useParams<{ id: string }>();
    const id = params.id;
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const invoiceRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Prevent the site's fixed/sticky header from covering the invoice.
        document.body.classList.add("invoice-page");

        return () => {
            document.body.classList.remove("invoice-page");
        };
    }, []);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const docRef = doc(db, "orders", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setOrder(docSnap.data() as Order);
                }
            } catch (error) {
                console.error("Error fetching order:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    const paymentMethodLabel = (method?: string) => {
        switch (method) {
            case "cod":
                return "Cash on Delivery";
            case "bkash":
                return "bKash";
            case "nagad":
                return "Nagad";
            case "bank":
                return "Bank Transfer";
            default:
                return method || "Not specified";
        }
    };

    const paymentStatusLabel = (status?: string) => {
        switch (status) {
            case "paid":
                return "Paid";
            case "failed":
                return "Failed";
            case "pending":
                return "Pending";
            default:
                return status || "Pending";
        }
    };


    const downloadInvoice = async () => {
        if (!invoiceRef.current || !order) return;

        const canvas = await html2canvas(invoiceRef.current, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/jpeg", 1.0);

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save(`Invoice-${order.orderNumber}.pdf`);
    };

    if (loading) {
        return (
            <div className="p-10 text-center text-lg">
                Loading Invoice...
            </div>
        );
    }

    if (!order) {
        return (
            <div className="p-10 text-center text-red-600">
                Invoice Not Found
            </div>
        );
    }

    // Always derive invoice totals from the line items so the invoice
    // remains dynamic and consistent with the checkout calculation.
    const originalPriceTotal = order.items.reduce(
        (sum, item) => sum + Math.round(item.price) * item.quantity,
        0
    );

    const subtotal = order.items.reduce(
        (sum, item) => sum + Math.round(item.salePrice) * item.quantity,
        0
    );

    const discountTotal = originalPriceTotal - subtotal;
    const deliveryCharge = Math.round(order.deliveryCharge || 0);
    const grandTotal = subtotal + deliveryCharge;

    return (
        <>
            {/* 
              Invoice page CSS:
              1. Removes the website header from this route so it cannot
                 overlap the invoice while scrolling.
              2. Keeps the invoice clean for screen and PDF.
            */}
            <style jsx global>{`
                body.invoice-page {
                    background: #f4f7f6 !important;
                    padding-top: 0 !important;
                }

                body.invoice-page header,
                body.invoice-page nav {
                    position: static !important;
                    transform: none !important;
                }

                body.invoice-page .invoice-container {
                    margin-top: 24px !important;
                }

                @media print {
                    body.invoice-page {
                        background: #ffffff !important;
                    }

                    body.invoice-page header,
                    body.invoice-page nav,
                    body.invoice-page .invoice-download-button {
                        display: none !important;
                    }

                    body.invoice-page .invoice-container {
                        margin: 0 !important;
                        max-width: none !important;
                        padding: 0 !important;
                    }

                    body.invoice-page .invoice-card {
                        box-shadow: none !important;
                        border-radius: 0 !important;
                    }
                }
            `}</style>

            <main className="invoice-container max-w-5xl mx-auto mt-6 mb-10 px-3 sm:px-4">
                <div
                    ref={invoiceRef}
                    className="invoice-card bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200"
                >
                    {/* Invoice header */}
                    <div className="bg-white px-5 sm:px-8 py-6 border-b border-slate-300">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="px-1 py-1">
                                <Image
                                    src="/logo/sebaloy-logo.png"
                                    alt="Sebaloy"
                                    width={260}
                                    height={80}
                                    className="w-40 sm:w-52 md:w-60 h-auto"
                                />
                            </div>

                            <div className="w-full md:w-auto md:text-right">
                                <p className="text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold text-slate-500">
                                    Healthcare Marketplace
                                </p>
                                <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-wide text-slate-800">
                                    TAX INVOICE
                                </h2>
                                <div className="mt-3 flex flex-wrap md:justify-end gap-2">
                                    <span className="rounded-md border border-slate-300 bg-slate-50 px-3 py-1 text-sm text-slate-700">
                                        Order No: {order.orderNumber}
                                    </span>
                                    <span
                                        className={`rounded-md px-3 py-1 text-sm font-bold ${
                                            order.status === "pending"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : order.status === "cancelled"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-green-100 text-green-700"
                                        }`}
                                    >
                                        {order.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Invoice meta */}
                    <div className="p-5 sm:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                                <p className="text-xs font-bold uppercase tracking-wider text-teal-700">
                                    Bill To
                                </p>
                                <h3 className="mt-2 text-lg font-bold text-slate-800">
                                    {order.customerName}
                                </h3>
                                <p className="mt-1 text-sm text-slate-600">{order.phone}</p>
                                <p className="mt-1 text-sm leading-6 text-slate-600">
                                    {order.address}
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                                <p className="text-xs font-bold uppercase tracking-wider text-teal-700">
                                    Invoice Details
                                </p>
                                <div className="mt-3 space-y-2 text-sm">
                                    <div className="flex justify-between gap-4">
                                        <span className="text-slate-500">Invoice No.</span>
                                        <span className="font-semibold text-slate-800">
                                            INV-{order.orderNumber}
                                        </span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <span className="text-slate-500">Order No.</span>
                                        <span className="font-semibold text-slate-800">
                                            {order.orderNumber}
                                        </span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <span className="text-slate-500">Date</span>
                                        <span className="font-semibold text-slate-800">
                                            {order.createdAt?.toDate
                                                ? order.createdAt.toDate().toLocaleDateString()
                                                : ""}
                                        </span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <span className="text-slate-500">Delivery Zone</span>
                                        <span className="font-semibold text-slate-800">
                                            {order.deliveryZone}
                                        </span>
                                    </div>
                                    {order.paymentMethod && (
                                        <div className="flex justify-between gap-4">
                                            <span className="text-slate-500">Payment Method</span>
                                            <span className="font-semibold text-slate-800 text-right">
                                                {paymentMethodLabel(order.paymentMethod)}
                                            </span>
                                        </div>
                                    )}
                                    {order.paymentStatus && (
                                        <div className="flex justify-between gap-4">
                                            <span className="text-slate-500">Payment Status</span>
                                            <span className="font-semibold text-slate-800">
                                                {paymentStatusLabel(order.paymentStatus)}
                                            </span>
                                        </div>
                                    )}
                                    {order.transactionId && (
                                        <div className="flex justify-between gap-4">
                                            <span className="text-slate-500">Transaction ID</span>
                                            <span className="font-semibold text-slate-800 text-right break-all">
                                                {order.transactionId}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>

                        {/* Product details */}
                        <div className="mt-7">
                            <div className="mb-3 flex items-center justify-between">
                                <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                                    Product Details
                                </h3>
                                <span className="text-xs sm:text-sm text-slate-500">
                                    {order.items.length} Item{order.items.length !== 1 ? "s" : ""}
                                </span>
                            </div>

                            <div className="w-full overflow-hidden rounded-xl border border-slate-200">
                                <table className="w-full table-fixed text-xs sm:text-sm">
                                    <colgroup>
                                        <col className="w-[7%]" />
                                        <col className="w-[33%]" />
                                        <col className="w-[11%]" />
                                        <col className="w-[16%]" />
                                        <col className="w-[14%]" />
                                        <col className="w-[19%]" />
                                    </colgroup>

                                    <thead className="bg-slate-700 text-white">
                                        <tr>
                                            <th className="p-2.5 sm:p-3 text-center font-semibold">#</th>
                                            <th className="p-2.5 sm:p-3 text-left font-semibold">Product</th>
                                            <th className="p-2.5 sm:p-3 text-center font-semibold">Qty</th>
                                            <th className="p-2.5 sm:p-3 text-right font-semibold">Price</th>
                                            <th className="p-2.5 sm:p-3 text-right font-semibold">Discount</th>
                                            <th className="p-2.5 sm:p-3 text-right font-semibold">Total</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {order.items.map((item, index) => (
                                            <tr
                                                key={item.id}
                                                className="border-t border-slate-200 even:bg-slate-50"
                                            >
                                                <td className="p-2.5 sm:p-3 text-center text-slate-600">
                                                    {index + 1}
                                                </td>
                                                <td className="p-2.5 sm:p-3 text-left font-medium text-slate-800 break-words">
                                                    {item.name}
                                                </td>
                                                <td className="p-2.5 sm:p-3 text-center text-slate-700">
                                                    {item.quantity}
                                                </td>
                                                <td className="p-2.5 sm:p-3 text-right whitespace-nowrap text-slate-700">
                                                    ৳{Math.round(item.price).toLocaleString()}
                                                </td>
                                                <td className="p-2.5 sm:p-3 text-right whitespace-nowrap text-slate-700">
                                                    {item.discount}%
                                                </td>
                                                <td className="p-2.5 sm:p-3 text-right whitespace-nowrap font-semibold text-slate-800">
                                                    ৳{(Math.round(item.salePrice) * item.quantity).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="mt-7 flex justify-end">
                            <div className="w-full md:w-[430px] overflow-hidden border border-slate-200">
                                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 sm:px-5 py-3">
                                    <span className="font-medium text-slate-600">Original Price</span>
                                    <span className="font-semibold text-slate-800">
                                        ৳{originalPriceTotal.toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between border-b border-slate-200 px-4 sm:px-5 py-3">
                                    <span className="font-medium text-slate-600">Discount</span>
                                    <span className="font-semibold text-red-600">
                                        - ৳{discountTotal.toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between border-b border-slate-200 px-4 sm:px-5 py-3">
                                    <span className="font-medium text-slate-600">Subtotal</span>
                                    <span className="font-semibold text-slate-800">
                                        ৳{subtotal.toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 sm:px-5 py-3">
                                    <span className="font-medium text-slate-600">Delivery Charge</span>
                                    <span className="font-semibold text-slate-800">
                                        ৳{deliveryCharge.toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between bg-sky-600 px-4 sm:px-5 py-4 text-white">
                                    <span className="text-base sm:text-lg font-bold">Grand Total</span>
                                    <span className="text-xl sm:text-2xl font-extrabold">
                                        ৳{grandTotal.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Amount in words */}
                        <div className="mt-5 rounded-xl border border-teal-100 bg-teal-50 px-4 sm:px-5 py-3">
                            <p className="text-xs sm:text-sm text-slate-700 whitespace-nowrap overflow-hidden">
                                <span className="font-bold text-teal-800">Amount in Words:</span>{" "}
                                <span className="text-[11px] sm:text-sm">
                                    {numberToWords(grandTotal)} Taka Only
                                </span>
                            </p>
                        </div>

                        {/* Signatures */}
                        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                            <div className="pt-6 sm:pt-7">
                                <div className="border-t border-slate-400 pt-2 text-center text-sm text-slate-600">
                                    Customer Signature
                                </div>
                            </div>
                            <div className="pt-6 sm:pt-7">
                                <div className="border-t border-slate-400 pt-2 text-center text-sm text-slate-600">
                                    Authorized Signature
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 border-t border-slate-200 pt-5 text-center">
                            <p className="font-bold text-teal-700">
                                Thank you for shopping with Sebaloy.
                            </p>
                            <p className="mt-1 text-xs sm:text-sm text-slate-500">
                                Trusted Online Healthcare Marketplace
                            </p>
                            <p className="text-xs sm:text-sm text-slate-500">
                                Dhaka, Bangladesh · Email: adminsebaloy@gmail.com
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-5 invoice-download-button">
                    <button
                        onClick={downloadInvoice}
                        className="rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 px-7 shadow-md transition"
                    >
                        Download Invoice PDF
                    </button>
                </div>
            </main>
        </>
    );
}
