"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

type Props = {
    product: any;
};

export default function PriceCard({ product }: Props) {
    const router = useRouter();
    const { addToCart } = useCart();

    const finalPrice = Math.round(
        product.price -
        (product.price * (product.discount || 0)) / 100
    );

    return (
        <div className="rounded-xl border bg-slate-50 p-4 space-y-3">

            <div className="flex justify-between">
                <span className="font-semibold">Category</span>
                <span>{product.category}</span>
            </div>

            <div className="flex justify-between">
                <span className="font-semibold">Company</span>
                <span>{product.company}</span>
            </div>

            {product.brand && (
                <div className="flex justify-between">
                    <span className="font-semibold">Brand</span>
                    <span>{product.brand}</span>
                </div>
            )}
            {product.category === "Medicine" && (
                <>
                    <div className="flex justify-between">
                        <span className="font-semibold">
                            Pack Size
                        </span>

                        <span>
                            {product.stripsPerBox} × {product.tabletsPerStrip} Tablets
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-semibold">
                            Selling Unit
                        </span>

                        <span>{product.unitType}</span>
                    </div>
                </>
            )}

            <div className="flex justify-between items-center">
                <span className="font-semibold">Price</span>

                <span className="text-2xl font-bold text-green-600">
                    ৳ {finalPrice}
                </span>
            </div>

            <div className="flex justify-between items-center">
                <span className="font-semibold">Stock</span>

                {product.category === "Lab-Tests" ? (
                    <span className="font-bold text-blue-600">
                        ✓ Test Available
                    </span>
                ) : product.stock > 10 ? (
                    <span className="font-bold text-green-600">
                        ▣ In Stock ({product.stock})
                    </span>
                ) : product.stock > 0 ? (
                    <span className="font-bold text-amber-600">
                        Only {product.stock} Left
                    </span>
                ) : (
                    <span className="font-bold text-red-600">
                        ✕ Out of Stock
                    </span>
                )}            </div>
            <div className="flex gap-3 pt-4">
                <button
                    onClick={() => {
                        addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            discount: product.discount || 0,
                            imageUrl: product.imageUrl,
                            packSize: product.packSize,
                            packType: product.packType,
                            unitType: product.unitType,
                            quantity: 1,
                        });

                        router.push("/cart");
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold"
                >
                    Add to Cart
                </button>

                <button
                    onClick={() => router.push("/checkout")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold"
                >
                    Buy Now
                </button>
            </div>

        </div>
    );
}