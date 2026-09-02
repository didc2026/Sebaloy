"use client";

import { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface TestBooking {
    id: string;
    patientName: string;
    mobile: string;
    age: number;
    gender: string;
    bookingDate: string;
    homeCollection: boolean;
    productId: string;
    bookingType: string;
    status: string;
    createdAt?: Timestamp;
}

export default function TestBookingsPage() {
    const [bookings, setBookings] = useState<TestBooking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const snapshot = await getDocs(
                    collection(db, "testBookings")
                ); const bookingData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as TestBooking[];

                setBookings(bookingData);
            } catch (error) {
                console.error("Error loading test bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return (
            <main className="p-6">
                <p className="text-slate-500">Loading test bookings...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                        🧪 Diagnostic Test Bookings
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Manage all diagnostic test booking requests.
                    </p>
                </div>

                <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

                    <div className="p-5 border-b">
                        <p className="font-semibold text-slate-700">
                            Total Bookings: {bookings.length}
                        </p>
                    </div>

                    {bookings.length === 0 ? (
                        <div className="p-10 text-center text-slate-500">
                            No test bookings found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">

                            <table className="w-full text-sm">

                                <thead className="bg-slate-100 text-slate-600">
                                    <tr>
                                        <th className="text-left p-4">
                                            Patient
                                        </th>

                                        <th className="text-left p-4">
                                            Mobile
                                        </th>

                                        <th className="text-left p-4">
                                            Age / Gender
                                        </th>

                                        <th className="text-left p-4">
                                            Test Date
                                        </th>

                                        <th className="text-left p-4">
                                            Collection
                                        </th>

                                        <th className="text-left p-4">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {bookings.map((booking) => (
                                        <tr
                                            key={booking.id}
                                            className="border-t hover:bg-slate-50"
                                        >

                                            <td className="p-4">
                                                <p className="font-semibold text-slate-800">
                                                    {booking.patientName}
                                                </p>

                                                <p className="text-xs text-slate-400">
                                                    ID: {booking.id.slice(0, 8)}
                                                </p>
                                            </td>

                                            <td className="p-4">
                                                {booking.mobile}
                                            </td>

                                            <td className="p-4">
                                                {booking.age} / {booking.gender}
                                            </td>

                                            <td className="p-4">
                                                {booking.bookingDate}
                                            </td>

                                            <td className="p-4">
                                                {booking.homeCollection
                                                    ? "🏠 Home Collection"
                                                    : "🏥 Laboratory Visit"}
                                            </td>

                                            <td className="p-4">
                                                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                                                    {booking.status}
                                                </span>
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>
                    )}

                </div>

            </div>
        </main>
    );
}