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
          px-4 sm:px-5 py-4
          mb-4
          flex items-center justify-between
          cursor-pointer
          transition-all duration-200
          shadow-sm
        "
      >
        <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
          📦 Orders
        </h2>

        <span className="text-2xl sm:text-3xl font-bold leading-none">
          {showOrders ? "−" : "+"}
        </span>
      </div>

      {showOrders && (
        <>
          {/* =========================
              SEARCH ORDERS
          ========================== */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              🔎 Search Orders
            </label>

            <div className="relative">
              <input
                type="text"
                placeholder="Order ID, customer name or phone..."
                value={searchOrder}
                onChange={(e) => setSearchOrder(e.target.value)}
                className="
                  w-full
                  border border-slate-300
                  bg-white
                  px-4 py-3
                  pr-11
                  rounded-xl
                  text-sm sm:text-base
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
                    right-3
                    top-1/2
                    -translate-y-1/2
                    w-7 h-7
                    flex items-center justify-center
                    rounded-full
                    text-slate-400
                    hover:text-red-500
                    hover:bg-red-50
                    text-xl
                    font-bold
                    transition
                  "
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Search by Order ID, customer name or phone number
            </p>
          </div>

          {/* =========================
              ORDER LIST
          ========================== */}
          <div className="space-y-4 mb-8">
            {filteredOrders
              .filter((order: any) => {
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
              })
              .map((order: any) => {
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
                      rounded-2xl
                      p-4 sm:p-5
                      shadow-sm
                      hover:shadow-md
                      transition-all duration-200
                    "
                  >
                    {/* =========================
                        ORDER TOP
                    ========================== */}
                    <div
                      className="
                        flex flex-col
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        gap-3
                        pb-4
                        border-b border-slate-100
                      "
                    >
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                          Order Number
                        </p>

                        <h3 className="mt-1 text-base sm:text-lg font-bold text-slate-800 break-all">
                          #{order.orderNumber || order.id}
                        </h3>
                      </div>

                      <span
                        className={`
                          inline-flex
                          items-center
                          justify-center
                          w-fit
                          px-3 py-1.5
                          rounded-full
                          text-xs sm:text-sm
                          font-bold
                          ${statusClass}
                        `}
                      >
                        {formattedStatus}
                      </span>
                    </div>

                    {/* =========================
                        CUSTOMER INFORMATION
                    ========================== */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          👤 Customer Name
                        </p>

                        <p className="mt-1 text-sm sm:text-base font-semibold text-slate-800 break-words">
                          {order.customerName || "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          📞 Phone
                        </p>

                        <p className="mt-1 text-sm sm:text-base font-semibold text-slate-800 break-all">
                          {order.phone || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* =========================
                        ADDRESS
                    ========================== */}
                    <div className="mt-4">
                      <p className="text-xs font-medium text-slate-500">
                        📍 Delivery Address
                      </p>

                      <p className="mt-1 text-sm text-slate-700 leading-6 break-words">
                        {order.address || "N/A"}
                      </p>
                    </div>

                    {/* =========================
                        ORDER SUMMARY
                    ========================== */}
                    <div
                      className="
                        grid grid-cols-1
                        sm:grid-cols-2
                        gap-3
                        mt-4
                        p-3 sm:p-4
                        rounded-xl
                        bg-slate-50
                        border border-slate-100
                      "
                    >
                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          Total Amount
                        </p>

                        <p className="mt-1 text-lg font-bold text-teal-700">
                          ৳{order.total ?? 0}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          Order Date
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {order.createdAt?.toDate
                            ? order.createdAt.toDate().toLocaleString()
                            : "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* =========================
                        PRODUCTS
                    ========================== */}
                    <div className="mt-4">
                      <p className="text-sm font-bold text-slate-800">
                        🛍️ Products
                      </p>

                      {order.items?.length > 0 ? (
                        <ul className="mt-2 space-y-2">
                          {order.items.map(
                            (item: any, index: number) => (
                              <li
                                key={index}
                                className="
                                  flex
                                  items-start
                                  gap-2
                                  text-sm
                                  text-slate-700
                                  bg-slate-50
                                  rounded-lg
                                  px-3 py-2
                                  break-words
                                "
                              >
                                <span className="text-slate-400">
                                  •
                                </span>

                                <span className="flex-1 break-words">
                                  {item.name || "Product"}
                                  <span className="font-semibold text-slate-900">
                                    {" "}× {item.quantity ?? 1}
                                  </span>
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p className="mt-2 text-sm text-slate-500">
                          No product information available.
                        </p>
                      )}
                    </div>

                    {/* =========================
                        ACTIONS
                    ========================== */}
                    <div
                      className="
                        mt-5
                        pt-4
                        border-t border-slate-100
                        grid grid-cols-1
                        sm:grid-cols-3
                        gap-3
                      "
                    >
                      {/* Status */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                          Update Status
                        </label>

                        <select
                          value={status}
                          onChange={(e) =>
                            updateOrderStatus(
                              order.id,
                              e.target.value
                            )
                          }
                          className="
                            w-full
                            border border-slate-300
                            bg-white
                            px-3 py-3
                            rounded-xl
                            text-sm
                            font-semibold
                            text-slate-700
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                            transition
                          "
                        >
                          <option value="pending">
                            Pending
                          </option>

                          <option value="processing">
                            Processing
                          </option>

                          <option value="shipped">
                            Shipped
                          </option>

                          <option value="delivered">
                            Delivered
                          </option>
                        </select>
                      </div>

                      {/* Print Invoice */}
                      <div className="flex flex-col">
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                          Invoice
                        </label>

                        <button
                          type="button"
                          onClick={() =>
                            router.push(`/invoice/${order.id}`)
                          }
                          className="
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            active:bg-blue-800
                            text-white
                            px-3 py-3
                            rounded-xl
                            text-sm
                            font-bold
                            transition-all duration-200
                            shadow-sm
                          "
                        >
                          🖨️ Print Invoice
                        </button>
                      </div>

                      {/* Delete */}
                      <div className="flex flex-col">
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                          Order Action
                        </label>

                        <button
                          type="button"
                          onClick={() => deleteOrder(order.id)}
                          className="
                            w-full
                            bg-red-500
                            hover:bg-red-600
                            active:bg-red-700
                            text-white
                            px-3 py-3
                            rounded-xl
                            text-sm
                            font-bold
                            transition-all duration-200
                            shadow-sm
                          "
                        >
                          🗑️ Delete Order
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* =========================
                NO RESULTS
            ========================== */}
            {filteredOrders.filter((order: any) => {
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
            }).length === 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-3">
                  🔍</div>

                <h3 className="text-base font-bold text-slate-700">
                  No Orders Found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
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