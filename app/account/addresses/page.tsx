"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="w-7 h-7"
    >
      <path
        d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-5 h-5"
    >
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

type Address = {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  area: string;
};

export default function AddressesPage() {
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "Dhaka",
    area: "",
  });

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid ?? null);
    });
  }, []);

  useEffect(() => {
    if (!userId) return;

    const loadAddresses = async () => {
      try {
        const snapshot = await getDocs(
          query(collection(db, "addresses"), where("userId", "==", userId))
        );

        setAddresses(
          snapshot.docs.map((item) => ({
            id: item.id,
            ...(item.data() as Omit<Address, "id">),
          }))
        );
      } catch (error) {
        console.error("Address load error:", error);
      }
    };

    loadAddresses();
  }, [userId]);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      alert("Please login first.");
      return;
    }

    if (
      !form.fullName.trim() ||
      !form.phone.trim() ||
      !form.address.trim() ||
      !form.area.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const bdPhoneRegex = /^01[3-9][0-9]{8}$/;
    if (!bdPhoneRegex.test(form.phone.trim())) {
      alert("Please enter a valid 11-digit Bangladesh mobile number.");
      return;
    }

    if (saving) return;
    setSaving(true);

    try {
      const addressRef = await addDoc(collection(db, "addresses"), {
        userId,
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        area: form.area.trim(),
        createdAt: new Date(),
      });

      setAddresses((prev) => [
        ...prev,
        {
          id: addressRef.id,
          ...form,
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          area: form.area.trim(),
        },
      ]);

      setForm({
        fullName: "",
        phone: "",
        address: "",
        city: "Dhaka",
        area: "",
      });
      setShowForm(false);
      alert("Address saved successfully.");
    } catch (error) {
      console.error("Address save error:", error);
      alert("Could not save the address. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-700 via-cyan-600 to-teal-500 text-white shadow-lg">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 left-1/3 w-72 h-72 rounded-full bg-white/5" />

          <div className="relative z-10 flex items-center gap-4 px-6 sm:px-8 py-6 sm:py-7">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 border border-white/25 flex items-center justify-center">
              <LocationIcon />
            </div>

            <div>
              <p className="text-sm text-white/80 font-medium">
                Delivery information
              </p>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                My Addresses
              </h1>

              <p className="mt-1 text-sm text-white/85">
                Manage your delivery addresses
              </p>
            </div>
          </div>
        </section>

        {/* Addresses / Empty State */}
        <section className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {addresses.length === 0 && !showForm ? (
            <div className="text-center py-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <LocationIcon />
              </div>

              <h2 className="mt-5 text-xl sm:text-2xl font-bold text-slate-800">
                No address added yet
              </h2>

              <p className="mt-2 max-w-md mx-auto text-sm sm:text-base text-slate-500 leading-6">
                Add your delivery address to make your future healthcare orders
                faster and easier.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Saved Addresses
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Your delivery addresses
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {addresses.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <LocationIcon />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-800">
                          {item.fullName}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">
                          {item.phone}
                        </p>
                        <p className="text-sm text-slate-600 mt-1">
                          {item.address}, {item.area}, {item.city}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!showForm && (
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-white font-semibold shadow-md hover:bg-teal-700 hover:shadow-lg transition"
              >
                <PlusIcon />
                Add New Address
              </button>
            </div>
          )}

          {showForm && (
            <form onSubmit={handleSave} className="mt-2">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Add New Address
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Enter your delivery information
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-sm font-semibold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">
                    Full Name *
                  </span>
                  <input
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Your full name"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">
                    Mobile Number *
                  </span>
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="01XXXXXXXXX"
                    inputMode="numeric"
                    required
                  />
                </label>

                <label className="block sm:col-span-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Address *
                  </span>
                  <textarea
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 min-h-[100px]"
                    placeholder="House / Road / Building"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">
                    Area *
                  </span>
                  <input
                    value={form.area}
                    onChange={(e) =>
                      setForm({ ...form, area: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Area / Thana"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">
                    City
                  </span>
                  <input
                    value={form.city}
                    onChange={(e) =>
                      setForm({ ...form, city: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="City"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="mt-5 w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-teal-600 px-7 py-3 text-white font-semibold shadow-md hover:bg-teal-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save Address"}
              </button>
            </form>
          )}
        </section>

        {/* Back to Account */}
        <div className="mt-5 text-center">
          <Link
            href="/account"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800 transition"
          >
            ← Back to My Account
          </Link>
        </div>

      </div>
    </main>
  );
}
