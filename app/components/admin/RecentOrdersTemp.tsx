"use client";

import { useRouter } from "next/navigation";
import Accordion from "@/app/components/Accordion";

type RecentOrdersProps = {
  orders: any[];
};

export default function RecentOrders({
  orders,
}: RecentOrdersProps) {
  const router = useRouter();

  return (
    <Accordion
      title={
        <div className="flex items-center justify-between w-full pr-2">
          <div className="flex items-center gap-2">
            <span>🆕</span>
            <span className="font-semibold text-sm">
              Recent Orders
            </span>
          </div>

          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
            {orders.length}
          </span>
        </div>
      }
    >
      <div className="bg-white rounded-lg border border-slate-200 p-2.5 shadow-sm">
        <div className="space-y-1.5">
          {orders.length === 0 ? (
            <p className="text-xs text-slate-500 px-1 py-1">
              No recent orders.
            </p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                onClick={() => router.push(`/admin/orders/${order.id}`)}
                className="
                  flex items-center justify-between
                  gap-2
                  rounded-lg
                  border border-slate-200
                  px-2.5 py-2
                  cursor-pointer
                  transition
                  hover:bg-slate-50
                  hover:border-blue-500
                "
              >
                {/* Customer information */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <p className="text-[11px] font-semibold text-blue-600 truncate">
                      {order.orderNumber || order.id}
                    </p>

                    <span className="text-slate-300">
                      •
                    </span>

                    <p className="text-xs font-semibold text-slate-800 truncate">
                      {order.customerName || "Unknown Customer"}
                    </p>
                  </div>

                  <p className="text-[10px] text-slate-500 truncate mt-0.5">
                    {order.phone || "No phone"}
                  </p>
                </div>

                {/* Amount + Status */}
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-slate-800">
                    ৳{order.total || 0}
                  </p>

                  <p className="text-[10px] capitalize text-slate-500 mt-0.5">
                    {order.status || "pending"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Accordion>
  );
}