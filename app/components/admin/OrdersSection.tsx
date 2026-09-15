"use client";

import { useRouter } from "next/navigation";

type Props = {
  showOrders: boolean;
  setShowOrders: (value: boolean) => void;
  searchOrder: string;
  setSearchOrder: (value: string) => void;
  filteredOrders: any[];
  updateOrderStatus: (id: string, status: string) => void;
  deleteOrder: (id: string) => void;
};

export default function OrdersSection({
  showOrders,
  setShowOrders,
  searchOrder,
  setSearchOrder,
  filteredOrders,
  updateOrderStatus,
  deleteOrder,
}: Props) {
  const router = useRouter();

  const visibleOrders = filteredOrders.filter((order: any) => {
    const search = searchOrder.trim().toLowerCase();

    if (!search) return true;

    return (
      String(order.orderNumber || order.id || "")
        .toLowerCase()
        .includes(search) ||
      String(order.customerName || "")
        .toLowerCase()
        .includes(search) ||
      String(order.phone || "")
        .toLowerCase()
        .includes(search)
    );
  });

  return (
    <>
      {/* =========================
          ORDERS HEADER
      ========================== */}
      <div
        onClick={() => setShowOrders(!showOrders)}
        className="
          bg-teal-600 hover:bg-teal-700
          text-white rounded-xl
          px-3 sm:px-4 py-2.5
          mb-3
          flex items-center justify-between
          cursor-pointer
          transition-all duration-200
          shadow-sm
        "
      >
        <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
          📦 Orders
        </h2>

        <span className="text-xl sm:text-2xl font-bold leading-none">
          {showOrders ? "−" : "+"}
        </span>
      </div>

      {showOrders && (
        <>
          {/* =========================
              SEARCH ORDERS
          ========================== */}
          <div className="mb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="🔎 Order ID, customer name or phone..."
                value={searchOrder}
                onChange={(e) => setSearchOrder(e.target.value)}
                className="
                  w-full
                  border border-slate-300
                  bg-white
                  px-3 py-2
                  pr-9
                  rounded-lg
                  text-sm
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                  shadow-sm
                  transition
                "
              />

              {searchOrder && (
                <button
                  type="button"
                  onClick={() => setSearchOrder("")}
                  className="
                    absolute
                    right-2
                    top-1/2
                    -translate-y-1/2
                    w-6 h-6
                    flex items-center justify-center
                    rounded-full
                    text-slate-400
                    hover:text-red-500
                    hover:bg-red-50
                    text-lg
                    font-bold
                    transition
                  "
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <p className="mt-1 text-[11px] text-slate-500">
              Search by Order ID, customer name or phone number
            </p>
          </div>

          {/* =========================
              COMPACT ORDER LIST
          ========================== */}
          <div className="space-y-2 mb-5">
            {visibleOrders.map((order: any) => {
              const status = String(order.status || "pending").toLowerCase();

              const statusClass =
                status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : status === "processing"
                  ? "bg-blue-100 text-blue-800"
                  : status === "shipped"
                  ? "bg-purple-100 text-purple-800"
                  : status === "delivered"
                  ? "bg-green-100 text-green-800"
                  : "bg-slate-100 text-slate-700";

              const formattedStatus =
                status.charAt(0).toUpperCase() + status.slice(1);

              return (
                <div
                  key={order.id}
                  className="
                    bg-white
                    border border-slate-200
                    rounded-xl
                    px-3 py-2.5
                    shadow-sm
                    hover:shadow-md
                    transition-all duration-200
                  "
                >
                  {/* Top row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-slate-800 break-all">
                          #{order.orderNumber || order.id}
                        </h3>

                        <span
                          className={`
                            inline-flex
                            items-center
                            px-2 py-0.5
                            rounded-full
                            text-[10px]
                            font-bold
                            ${statusClass}
                          `}
                        >
                          {formattedStatus}
                        </span>
                      </div>

                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-slate-600">
                        <span>👤 {order.customerName || "N/A"}</span>
                        <span>📞 {order.phone || "N/A"}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-slate-500">Total</p>
                      <p className="text-sm font-bold text-teal-700">
                        ৳{order.total ?? 0}
                      </p>
                    </div>
                  </div>

                  {/* Address + products */}
                  <div className="mt-1.5 text-[11px] text-slate-600">
                    <span className="font-medium">📍 </span>
                    {order.address || "N/A"}
                  </div>

                  {order.items?.length > 0 && (
                    <div className="mt-1.5 text-[11px] text-slate-700">
                      <span className="font-semibold">🛍️ </span>
                      {order.items
                        .map(
                          (item: any) =>
                            `${item.name || "Product"} × ${item.quantity ?? 1}`
                        )
                        .join(", ")}
                    </div>
                  )}

                  {/* Bottom controls */}
                  <div
                    className="
                      mt-2 pt-2
                      border-t border-slate-100
                      flex flex-col sm:flex-row
                      sm:items-center
                      gap-2
                    "
                  >
                    <select
                      value={status}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value)
                      }
                      className="
                        border border-slate-300
                        bg-white
                        px-2 py-1.5
                        rounded-lg
                        text-xs
                        font-semibold
                        text-slate-700
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        sm:w-36
                      "
                      aria-label="Update order status"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>

                    <div className="flex gap-2 sm:ml-auto">
                      <button
                        type="button"
                        onClick={() => router.push(`/invoice/${order.id}`)}
                        className="
                          bg-blue-600
                          hover:bg-blue-700
                          text-white
                          px-3 py-1.5
                          rounded-lg
                          text-xs
                          font-bold
                          transition
                        "
                      >
                        🖨️ Invoice
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteOrder(order.id)}
                        className="
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          px-3 py-1.5
                          rounded-lg
                          text-xs
                          font-bold
                          transition
                        "
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>

                  {/* Order date */}
                  <div className="mt-1 text-[10px] text-slate-400">
                    {order.createdAt?.toDate
                      ? order.createdAt.toDate().toLocaleString()
                      : "N/A"}
                  </div>
                </div>
              );
            })}

            {/* NO RESULTS */}
            {visibleOrders.length === 0 && (
              <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                <div className="text-3xl mb-2">🔍</div>

                <h3 className="text-sm font-bold text-slate-700">
                  No Orders Found
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Try searching with another Order ID, name or phone number.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
