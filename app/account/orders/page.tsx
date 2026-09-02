"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
type Order = {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: any;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);

      const ordersData: Order[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Order, "id">),
      }));

      setOrders(ordersData);
      setLoading(false);
    });

    return () => unsubscribe();

  }, []);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="bg-white rounded-xl shadow p-8">
        {loading ? (
          <p className="text-gray-500">Loading orders...</p>
        ) : orders.length > 0 ? (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id}>
                <Link href={`/invoice/${order.id}`}>
                  <div className="border rounded-xl p-5 mb-4 hover:shadow-lg transition cursor-pointer">

                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-lg">
                          {order.orderNumber}
                        </h3>

                        <p className="text-gray-500">
                          ৳ {order.total}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                          {order.status}
                        </span>

                        <p className="text-blue-600 mt-2">
                          View Details →
                        </p>
                      </div>
                    </div>

                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            You have no orders yet.
          </p>
        )}
      </div>
    </main>
  );
}
