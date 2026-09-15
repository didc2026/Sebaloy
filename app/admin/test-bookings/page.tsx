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
        );

        const bookingData = snapshot.docs.map((doc) => ({
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
      <main className="p-4 md:p-6">
        <p className="text-sm text-slate-500">
          Loading test bookings...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 md:mb-5">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
            🧪 Diagnostic Test Bookings
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage all diagnostic test booking requests.
          </p>
        </div>

        {/* Booking container */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Summary */}
          <div className="px-3 sm:px-4 py-2.5 border-b bg-white">
            <p className="text-xs sm:text-sm font-semibold text-slate-700">
              Total Bookings:{" "}
              <span className="text-blue-600">
                {bookings.length}
              </span>
            </p>
          </div>

          {bookings.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              No test bookings found.
            </div>
          ) : (
            <>
              {/* =========================
                  DESKTOP / TABLET TABLE
              ========================== */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-xs md:text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="text-left px-3 py-2.5 font-semibold">
                        Patient
                      </th>

                      <th className="text-left px-3 py-2.5 font-semibold">
                        Mobile
                      </th>

                      <th className="text-left px-3 py-2.5 font-semibold">
                        Age / Gender
                      </th>

                      <th className="text-left px-3 py-2.5 font-semibold">
                        Test Date
                      </th>

                      <th className="text-left px-3 py-2.5 font-semibold">
                        Collection
                      </th>

                      <th className="text-left px-3 py-2.5 font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookings.map((booking) => (
                      <tr
                        key={booking.id}
                        className="border-t border-slate-100 hover:bg-slate-50 transition"
                      >
                        <td className="px-3 py-2">
                          <p className="font-semibold text-slate-800">
                            {booking.patientName}
                          </p>

                          <p className="text-[10px] text-slate-400">
                            ID: {booking.id.slice(0, 8)}
                          </p>
                        </td>

                        <td className="px-3 py-2 whitespace-nowrap">
                          {booking.mobile}
                        </td>

                        <td className="px-3 py-2 whitespace-nowrap">
                          {booking.age} / {booking.gender}
                        </td>

                        <td className="px-3 py-2 whitespace-nowrap">
                          {booking.bookingDate}
                        </td>

                        <td className="px-3 py-2 whitespace-nowrap">
                          {booking.homeCollection
                            ? "🏠 Home Collection"
                            : "🏥 Laboratory Visit"}
                        </td>

                        <td className="px-3 py-2">
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-yellow-100 text-yellow-700 whitespace-nowrap">
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* =========================
                  MOBILE COMPACT CARDS
              ========================== */}
              <div className="sm:hidden divide-y divide-slate-100">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="px-3 py-2.5 hover:bg-slate-50 transition"
                  >
                    {/* Patient + Status */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {booking.patientName}
                        </p>

                        <p className="text-[10px] text-slate-400">
                          ID: {booking.id.slice(0, 8)}
                        </p>
                      </div>

                      <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-yellow-100 text-yellow-700">
                        {booking.status}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-slate-600">
                      <div className="truncate">
                        <span className="text-slate-400">
                          📱
                        </span>{" "}
                        {booking.mobile || "N/A"}
                      </div>

                      <div>
                        <span className="text-slate-400">
                          👤
                        </span>{" "}
                        {booking.age} / {booking.gender}
                      </div>

                      <div className="truncate">
                        <span className="text-slate-400">
                          📅
                        </span>{" "}
                        {booking.bookingDate || "N/A"}
                      </div>

                      <div className="truncate">
                        {booking.homeCollection
                          ? "🏠 Home Collection"
                          : "🏥 Laboratory Visit"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
