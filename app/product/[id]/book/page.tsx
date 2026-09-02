"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    serverTimestamp,
    runTransaction,
} from "firebase/firestore"; import { db } from "@/lib/firebase";

export default function BookTestPage() {
    const router = useRouter();
    const params = useParams();
    const [patientName, setPatientName] = useState("");
    const [mobile, setMobile] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [homeCollection, setHomeCollection] = useState(false);
    const [loading, setLoading] = useState(false);
    const [test, setTest] = useState<any>(null);
    const [testLoading, setTestLoading] = useState(true);
    const [testError, setTestError] = useState("");
    useEffect(() => {
        const fetchTest = async () => {
            try {
                if (!params.id) return;

                const testDoc = await getDoc(
                    doc(db, "products", String(params.id))
                );

                if (!testDoc.exists()) {
                    setTestError("Diagnostic test not found.");
                    return;
                }

                setTest({
                    id: testDoc.id,
                    ...testDoc.data(),
                });
            } catch (error) {
                console.error("Error loading diagnostic test:", error);
                setTestError("Failed to load diagnostic test information.");
            } finally {
                setTestLoading(false);
            }
        };

        fetchTest();
    }, [params.id]);
    const handleBooking = async () => {
        if (!patientName || !mobile || !age || !gender || !bookingDate) {
            alert("Please complete all required information.");
            return;
        }

        try {
            setLoading(true);
            const counterRef = doc(db, "counters", "diagnosticBookings");

            const nextNumber = await runTransaction(db, async (transaction) => {
                const counterSnap = await transaction.get(counterRef);

                const currentNumber = counterSnap.exists()
                    ? Number(counterSnap.data().lastNumber || 0)
                    : 0;

                const newNumber = currentNumber + 1;

                transaction.set(
                    counterRef,
                    { lastNumber: newNumber },
                    { merge: true }
                );

                return newNumber;
            });
            const bookingRef = await addDoc(collection(db, "testBookings"), {
                patientName,
                mobile,
                age: Number(age),
                gender,
                bookingDate,
                homeCollection,
                sebaloyBookingId: `SB DIA ${nextNumber}`,
                productId: params.id,

                bookingType: "Diagnostic Test",
                status: "pending",

                createdAt: serverTimestamp(),
            });

            alert(
                `Test booking submitted successfully!\nBooking ID: ${bookingRef.id}`
            );

            router.push(`/product/${params.id}`);
        } catch (error) {
            console.error("Booking error:", error);

            alert("Booking submission failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <main className="min-h-screen bg-slate-50 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="mb-5 text-blue-600 font-medium"
                >
                    ← Back to Test
                </button>

                <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                        🧪 Book Diagnostic Test
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Complete the information below to book your diagnostic test.
                    </p>

                    <div className="mt-8 space-y-5">
                        {/* Patient Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Patient Name *
                            </label>
                            <input
                                type="text"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                placeholder="Enter patient name"
                                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Mobile Number */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Mobile Number *
                            </label>
                            <input
                                type="tel"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="01XXXXXXXXX"
                                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Age and Gender */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Age *
                                </label>
                                <input
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    placeholder="Age"
                                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Gender *
                                </label>

                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Booking Date */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Preferred Test Date *
                            </label>

                            <input
                                type="date"
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Home Collection */}
                        <div className="border rounded-xl p-4 bg-slate-50">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={homeCollection}
                                    onChange={(e) => setHomeCollection(e.target.checked)}
                                    className="w-5 h-5"
                                />

                                <div>
                                    <p className="font-semibold">
                                        🏠 Home Sample Collection
                                    </p>

                                    <p className="text-sm text-slate-500">
                                        Select this option if you want sample collection from home.
                                    </p>
                                </div>
                            </label>
                        </div>

                        {/* Booking Summary */}
                        <div className="border border-blue-100 bg-blue-50 rounded-xl p-5">
                            <h2 className="font-bold text-slate-800 mb-3">
                                Booking Summary
                            </h2>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Booking Type</span>
                                    <span className="font-medium">
                                        Diagnostic Test
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-slate-500">
                                        Collection
                                    </span>
                                    <span className="font-medium">
                                        {homeCollection ? "Home Collection" : "Laboratory Visit"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Confirm Booking */}
                        <button
                            onClick={handleBooking}
                            disabled={loading}
                            className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-lg transition"
                        >
                            {loading ? "Submitting Booking..." : "✓ Confirm Booking"}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}