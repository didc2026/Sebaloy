"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface TestBooking {
  id: string;
  patientName?: string;
  phone?: string;
  age?: number | string | null;
  gender?: string | null;
  appointmentDate?: string;
  appointmentTime?: string;
  collectionType?: string;
  address?: string | null;
  productId?: string;
  bookingType?: string;
  status?: string;
  createdAt?: Timestamp;
}

export default function TestBookingsPage() {
  const [bookings, setBookings] = useState<TestBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const bookingsQuery = query(
        collection(db, "testBookings"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(bookingsQuery);

      const bookingData = snapshot.docs.map((bookingDoc) => ({
        id: bookingDoc.id,
        ...bookingDoc.data(),
      })) as TestBooking[];

      setBookings(bookingData);
    } catch (error) {
      console.error("Error loading test bookings:", error);
      alert("Failed to load test bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateBookingStatus = async (
    bookingId: string,
    newStatus: string
  ) => {
    try {
      setUpdatingId(bookingId);

      await updateDoc(
        doc(db, "bookings", bookingId),
        {
          status: newStatus,
        }
      );

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: newStatus }
            : booking
        )
      );
    } catch (error) {
      console.error("Error updating booking status:", error);
      alert("Failed to update booking status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusStyle = (status?: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-700";

      case "completed":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-slate-500">
            Loading test bookings...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              🧪 Diagnostic Test Bookings
            </h1>

            <p className="text-slate-500 mt-2">
              Manage all diagnostic test booking requests.
            </p>
          </div>

          <button
            onClick={fetchBookings}
            className="px-5 py-3 bg-white border rounded-xl hover:bg-slate-50 font-medium"
          >
            ↻ Refresh Bookings
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white border rounded-xl p-4">
            <p className="text-sm text-slate-500">
              Total
            </p>
            <p className="text-2xl font-bold">
              {bookings.length}
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <p className="text-sm text-slate-500">
              Pending
            </p>
            <p className="text-2xl font-bold text-yellow-600">
              {bookings.filter(
                (booking) => booking.status === "pending"
              ).length}
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <p className="text-sm text-slate-500">
              Confirmed
            </p>
            <p className="text-2xl font-bold text-blue-600">
              {bookings.filter(
                (booking) => booking.status === "confirmed"
              ).length}
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <p className="text-sm text-slate-500">
              Completed
            </p>
            <p className="text-2xl font-bold text-green-600">
              {bookings.filter(
                (booking) => booking.status === "completed"
              ).length}
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <p className="text-sm text-slate-500">
              Cancelled
            </p>
            <p className="text-2xl font-bold text-red-600">
              {bookings.filter(
                (booking) => booking.status === "cancelled"
              ).length}
            </p>
          </div>
        </div>

        {/* Booking Table */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

          {bookings.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-slate-500">
                No test bookings found.
              </p>
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
                      Contact
                    </th>

                    <th className="text-left p-4">
                      Appointment
                    </th>

                    <th className="text-left p-4">
                      Collection
                    </th>

                    <th className="text-left p-4">
                      Address
                    </th>

                    <th className="text-left p-4">
                      Status
                    </th>

                    <th className="text-left p-4">
                      Action
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
                          {booking.patientName || "N/A"}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          {booking.age ?? "N/A"} /{" "}
                          {booking.gender || "N/A"}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          ID: {booking.id.slice(0, 8)}
                        </p>
                      </td>

                      <td className="p-4">
                        {booking.phone || "N/A"}
                      </td>

                      <td className="p-4">
                        <p>
                          {booking.appointmentDate || "N/A"}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          {booking.appointmentTime || "N/A"}
                        </p>
                      </td>

                      <td className="p-4">
                        {booking.collectionType || "N/A"}
                      </td>

                      <td className="p-4 max-w-xs">
                        <p className="truncate">
                          {booking.address || "—"}
                        </p>
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(
                            booking.status
                          )}`}
                        >
                          {booking.status || "pending"}
                        </span>
                      </td>

                      <td className="p-4">
                        <select
                          value={booking.status || "pending"}
                          disabled={updatingId === booking.id}
                          onChange={(e) =>
                            updateBookingStatus(
                              booking.id,
                              e.target.value
                            )
                          }
                          className="border rounded-lg px-3 py-2 text-sm bg-white"
                        >
                          <option value="pending">
                            Pending
                          </option>

                          <option value="confirmed">
                            Confirmed
                          </option>

                          <option value="completed">
                            Completed
                          </option>

                          <option value="cancelled">
                            Cancelled
                          </option>
                        </select>
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