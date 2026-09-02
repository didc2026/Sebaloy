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
            <span className="font-semibold">Recent Orders</span>
          </div>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            {orders.length}
          </span>
        </div>
      }
    >
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="space-y-3">
          {orders.length === 0 ? (
            <p className="text-sm text-slate-500">
              No recent orders.
            </p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                onClick={() => router.push(`/admin/orders/${order.id}`)}
                className="flex items-center justify-between rounded-lg border p-3 cursor-pointer transition hover:bg-slate-50 hover:border-blue-500"
              >
                <div>
                  <div>
                    <p className="text-xs font-semibold text-blue-600">
                      {order.orderNumber || order.id}
                    </p>

                    <p className="font-semibold">
                      {order.customerName || "Unknown Customer"}
                    </p>

                  </div>
                  <p className="text-sm text-slate-500">
                    {order.phone}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold">
                    ৳{order.total || 0}
                  </p>

                  <p className="text-xs capitalize text-slate-500">
                    {order.status}
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