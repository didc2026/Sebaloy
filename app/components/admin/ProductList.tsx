"use client";

import ProductCard from "./ProductCard";

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
        <div className="bg-red-100 border border-red-300 p-4 rounded-xl mb-4">
          <h3 className="font-bold text-red-700 mb-2">
            ⚠ Low Stock Products
          </h3>

          {lowStockProducts.map((product: any) => (
            <p key={product.id}>
              {product.name} (Stock: {product.stock})
            </p>
          ))}
        </div>
      )}

      <input
        type="text"
        placeholder="🔍 Search product..."
        value={searchProduct}
        onChange={(e) => setSearchProduct(e.target.value)}
        className="w-full border rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-teal-500 outline-none"
      />

      <button
        onClick={deleteSelectedProducts}
        disabled={selectedProducts.length === 0}
        className="bg-red-600 text-white px-4 py-2 rounded mb-4"
      >
        Delete Selected ({selectedProducts.length})
      </button>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredProducts.map((product: any) => (
          <ProductCard
            key={product.id}
            product={product}
            selectedProducts={selectedProducts}
            toggleProductSelection={toggleProductSelection}
            editProduct={editProduct}
            deleteProduct={deleteProduct}
          />
        ))}
      </div>
    </>
  );
}