"use client";

type Props = {
  filteredProducts: any[];
  lowStockProducts: any[];

  searchProduct: string;
  setSearchProduct: (value: string) => void;

  selectedProducts: string[];
  toggleProductSelection: (id: string) => void;
  deleteSelectedProducts: () => void;

  editProduct: (product: any) => void;
  deleteProduct: (id: string) => void;
};

export default function ProductList({
  filteredProducts,
  lowStockProducts,
  searchProduct,
  setSearchProduct,
  selectedProducts,
  toggleProductSelection,
  deleteSelectedProducts,
  editProduct,
  deleteProduct,
}: Props) {
  return (
    <>
      {lowStockProducts.length > 0 && (
        <div className="bg-red-100 border border-red-300 p-3 rounded-xl mb-4">
          <h3 className="font-bold text-red-700 mb-1">
            ⚠ Low Stock Products
          </h3>

          <div className="space-y-0.5">
            {lowStockProducts.map((product: any) => (
              <p key={product.id} className="text-sm text-red-700">
                {product.name} (Stock: {product.stock})
              </p>
            ))}
          </div>
        </div>
      )}

      <input
        type="text"
        placeholder="🔍 Search product..."
        value={searchProduct}
        onChange={(e) => setSearchProduct(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-teal-500 outline-none"
      />

      <button
        onClick={deleteSelectedProducts}
        disabled={selectedProducts.length === 0}
        className="bg-red-600 text-white px-3 py-1.5 rounded mb-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Delete Selected ({selectedProducts.length})
      </button>

      <div className="border rounded-xl overflow-hidden bg-white">
        {filteredProducts.length === 0 ? (
          <div className="p-5 text-center text-gray-500 text-sm">
            No products found.
          </div>
        ) : (
          <div className="divide-y">
            {filteredProducts.map((product: any) => {
              const isSelected = selectedProducts.includes(product.id);
              const isOutOfStock = Number(product.stock) <= 0;

              return (
                <div
                  key={product.id}
                  className={`flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-2 ${
                    isOutOfStock ? "bg-red-50" : "bg-white"
                  } hover:bg-gray-50 transition`}
                >
                  {/* Selection */}
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleProductSelection(product.id)}
                    className="w-4 h-4 shrink-0 accent-teal-600"
                  />

                  {/* Product Image */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-lg border bg-gray-50 overflow-hidden flex items-center justify-center">
                    {product.imageUrl || product.image ? (
                      <img
                        src={product.imageUrl || product.image}
                        alt={product.name || "Product"}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-[10px] text-gray-400">
                        No Image
                      </span>
                    )}
                  </div>

                  {/* Main Product Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="font-semibold text-sm text-gray-800 truncate max-w-full">
                        {product.name || "Unnamed Product"}
                      </h3>

                      {isOutOfStock && (
                        <span className="text-[10px] font-semibold bg-red-600 text-white px-1.5 py-0.5 rounded">
                          OUT
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-gray-500 truncate">
                      {product.company ||
                        product.brand ||
                        product.genericName ||
                        product.category ||
                        "—"}
                    </div>

                    <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                      <span className="font-semibold text-teal-700">
                        ৳{product.sellingPrice ?? product.price ?? 0}
                      </span>

                      <span
                        className={
                          isOutOfStock
                            ? "text-red-600 font-semibold"
                            : "text-gray-500"
                        }
                      >
                        Stock: {product.stock ?? 0}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => editProduct(product)}
                      className="px-2 py-1 text-xs font-medium rounded border border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="px-2 py-1 text-xs font-medium rounded border border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
