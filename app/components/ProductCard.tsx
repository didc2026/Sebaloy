"use client";

import { useRouter } from "next/navigation";

type Product = {
    id: string;
    name: string;
    category: string;
    categorySlug?: string;
    price: number;
    stock: number;
    imageUrl?: string;
    featured?: boolean;
    company?: string;
    genericName?: string;
    strength?: string;
    size?: string;
    pharmacology: string;
    indication: string;
    dosage: string;
    administration: string;
    sideEffects: string;
    precautions: string;
    pregnancyLactation: string;
    drugInteraction: string;
    storage: string;
    brand?: string;
    model?: string;
    warranty?: string;
    stripsPerBox?: string;
    tabletsPerStrip?: string;
    unitType?: string;
    discount?: number;
    homeSampleCollection?: boolean;
};

type ProductCardPageProps = {
    products: Product[];
};

export default function ProductCardPage({
    products,
}: ProductCardPageProps) {
    const router = useRouter();

    /*
     * IMPORTANT:
     * Product Card থেকে আর সরাসরি Cart/Checkout হবে না।
     *
     * Add to Cart / Buy Now
     * → Product Details Page
     *
     * Product Details Page
     * → Strip / Box / Vial নির্বাচন
     * → Add to Cart
     *
     * তারপর Shopping Cart থেকে Checkout।
     */

    const goToProductDetails = (
        productId: string,
        e?: React.MouseEvent
    ) => {
        if (e) {
            e.stopPropagation();
        }

        router.push(`/product/${productId}`);
    };

    return (
        <div
            id="products"
            className="
                grid
                grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-4
                gap-5
                max-md:gap-3
            "
        >
            {products.map((product) => {
                const finalPrice = Math.round(
                    product.price -
                        (product.price *
                            (product.discount || 0)) /
                            100
                );

                const isOutOfStock =
                    Number(product.stock) === 0;

                return (
                    <div
                        key={product.id}
                        onClick={() =>
                            goToProductDetails(product.id)
                        }
                        className="
                            group
                            bg-white
                            rounded-2xl
                            border
                            border-slate-200/90
                            shadow-sm
                            hover:shadow-xl
                            hover:shadow-teal-200/40
                            hover:border-teal-400
                            hover:-translate-y-1.5
                            transition-all
                            duration-300
                            overflow-hidden
                            cursor-pointer
                            flex
                            flex-col
                            h-full

                            max-md:rounded-2xl
                            max-md:hover:translate-y-0
                            max-md:hover:shadow-md
                        "
                    >
                        {/* ================================
                            PRODUCT IMAGE
                        ================================= */}
                        <div
                            className="
                                relative
                                h-40
                                bg-gradient-to-b
                                from-white
                                to-slate-50/70
                                p-3
                                flex
                                items-center
                                justify-center

                                max-md:h-36
                                max-md:p-2.5
                            "
                        >
                            {product.imageUrl ? (
                                <>
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="
                                            w-auto
                                            h-auto
                                            max-w-[90%]
                                            max-h-[118px]
                                            object-contain
                                            transition-all
                                            duration-500
                                            group-hover:scale-105

                                            max-md:max-w-[92%]
                                            max-md:max-h-[112px]
                                        "
                                    />

                                    {/* DISCOUNT BADGE */}
                                    {(product.discount ?? 0) >
                                        0 && (
                                        <div
                                            className="
                                                absolute
                                                top-3
                                                left-3
                                                bg-red-500
                                                text-white
                                                text-xs
                                                font-bold
                                                px-2
                                                py-1
                                                rounded-full
                                                shadow

                                                max-md:top-2
                                                max-md:left-2
                                                max-md:text-[10px]
                                            "
                                        >
                                            {product.discount}% OFF
                                        </div>
                                    )}

                                    {/* FEATURED BADGE */}
                                    {product.featured && (
                                        <div
                                            className="
                                                absolute
                                                top-3
                                                right-3
                                                bg-amber-300
                                                text-slate-900
                                                text-xs
                                                font-bold
                                                px-2
                                                py-1
                                                rounded-full
                                                shadow

                                                max-md:top-2
                                                max-md:right-2
                                                max-md:text-[10px]
                                            "
                                        >
                                            ⭐ Featured
                                        </div>
                                    )}

                                    {/* PRODUCT SPECIFICATION */}
                                    <div
                                        className="
                                            absolute
                                            bottom-4
                                            left-4
                                            bg-white/90
                                            backdrop-blur-md
                                            rounded-xl
                                            px-2.5
                                            py-1.5
                                            shadow-lg

                                            max-md:bottom-2
                                            max-md:left-2
                                            max-md:px-2
                                            max-md:py-1.5
                                        "
                                    >
                                        {product.category ===
                                            "Medicine" && (
                                            <div>
                                                {product.strength && (
                                                    <p
                                                        className="
                                                            text-sm
                                                            font-bold
                                                            text-slate-800
                                                            max-md:text-[12px]
                                                        "
                                                    >
                                                        {
                                                            product.strength
                                                        }
                                                    </p>
                                                )}

                                                {product.size && (
                                                    <p
                                                        className="
                                                            text-xs
                                                            text-slate-500
                                                            max-md:text-[10px]
                                                        "
                                                    >
                                                        {
                                                            product.size
                                                        }{" "}
                                                        {product.unitType ||
                                                            "Bottle"}
                                                    </p>
                                                )}

                                                {product.unitType !==
                                                    "Bottle" &&
                                                    product.stripsPerBox &&
                                                    product.tabletsPerStrip && (
                                                        <p
                                                            className="
                                                                text-xs
                                                                text-slate-500
                                                                max-md:text-[10px]
                                                            "
                                                        >
                                                            {
                                                                product.stripsPerBox
                                                            }{" "}
                                                            ×{" "}
                                                            {
                                                                product.tabletsPerStrip
                                                            }{" "}
                                                            Strip
                                                        </p>
                                                    )}
                                            </div>
                                        )}

                                        {(product.category ===
                                            "Baby & Mom Care" ||
                                            product.category ===
                                                "Healthcare") && (
                                            <p
                                                className="
                                                    text-sm
                                                    font-bold
                                                    text-slate-800
                                                    max-md:text-[12px]
                                                "
                                            >
                                                {product.size}
                                            </p>
                                        )}

                                        {product.category ===
                                            "Medical Device" && (
                                            <p
                                                className="
                                                    text-sm
                                                    font-bold
                                                    text-slate-800
                                                    max-md:text-[12px]
                                                "
                                            >
                                                {product.model}
                                            </p>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="h-full w-full flex items-center justify-center rounded-xl bg-slate-50 text-xs font-medium text-slate-400">
                                    Product Image
                                </div>
                            )}
                        </div>

                        {/* ================================
                            PRODUCT CONTENT
                        ================================= */}
                        <div
                            className="
                                p-3
                                flex
                                flex-col
                                flex-1
                                max-md:p-2.5
                            "
                        >
                            {/* PRODUCT NAME */}
                            <h2
                                className="
                                    text-[13px]
                                    font-bold
                                    leading-snug
                                    line-clamp-2
                                    min-h-[38px]
                                    md:text-sm
                                    md:min-h-[48px]
                                    max-md:text-[12px]
                                "
                            >
                                {product.name}
                            </h2>

                            {/* GENERIC */}
                            {product.category === "Medicine" &&
                                product.genericName && (
                                    <p
                                        className="
                                            text-gray-500
                                            text-sm
                                            font-medium
                                            mt-1
                                            min-h-[22px]
                                            max-md:text-[12px]
                                            max-md:line-clamp-1
                                        "
                                    >
                                        {product.genericName}
                                        {product.strength &&
                                            ` ${product.strength}`}
                                    </p>
                                )}

                            {/* COMPANY */}
                            {product.company && (
                                <p
                                    className="
                                        text-gray-500
                                        text-sm
                                        mt-1
                                        min-h-[22px]
                                        max-md:text-[12px]
                                        max-md:line-clamp-1
                                    "
                                >
                                    {product.company}
                                </p>
                            )}

                            {/* BRAND */}
                            {product.brand && (
                                <p
                                    className="
                                        text-gray-500
                                        text-sm
                                        mt-1
                                        min-h-[22px]
                                        max-md:hidden
                                    "
                                >
                                    Brand: {product.brand}
                                </p>
                            )}

                            {/* MODEL */}
                            {product.model?.trim() && (
                                <p
                                    className="
                                        text-gray-500
                                        text-sm
                                        mt-1
                                        min-h-[22px]
                                        max-md:hidden
                                    "
                                >
                                    Model:{" "}
                                    <span className="font-semibold text-slate-700">
                                        {product.model}
                                    </span>
                                </p>
                            )}

                            {/* RATING */}
                            <div className="flex items-center gap-1 mt-2">
                                <span className="text-yellow-500">
                                    ★★★★★
                                </span>

                                <span className="text-xs text-slate-500">
                                    (4.8)
                                </span>
                            </div>

                            {/* PRICE */}
                            <div
                                className="
                                    mt-2.5
                                    min-h-[60px]
                                    max-md:mt-2
                                    max-md:min-h-[54px]
                                "
                            >
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span
                                        className="
                                            text-lg
                                            font-bold
                                            text-green-600
                                            max-md:text-[16px]
                                        "
                                    >
                                        ৳ {finalPrice}
                                    </span>

                                    {(product.discount ?? 0) >
                                        0 && (
                                        <span
                                            className="
                                                text-sm
                                                text-gray-400
                                                line-through
                                                max-md:text-[12px]
                                            "
                                        >
                                            ৳ {product.price}
                                        </span>
                                    )}
                                </div>

                                {(product.discount ?? 0) >
                                    0 && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <span
                                            className="
                                                bg-red-500
                                                text-white
                                                text-[10px]
                                                md:text-xs
                                                font-bold
                                                px-2
                                                py-1
                                                rounded-full
                                            "
                                        >
                                            {product.discount}% OFF
                                        </span>

                                        <span
                                            className="
                                                text-[10px]
                                                md:text-xs
                                                text-green-600
                                                font-semibold
                                            "
                                        >
                                            Save ৳{" "}
                                            {Math.round(
                                                (product.price *
                                                    (product.discount ||
                                                        0)) /
                                                    100
                                            )}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* ================================
                                LAB TEST
                            ================================= */}
                            {product.category === "Lab-Tests" ? (
                                <>
                                    <div className="flex gap-2 mt-2.5 flex-wrap">
                                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                                            🧪 Professional Testing
                                        </span>

                                        <span className="bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded-full font-medium">
                                            🏥 Verified Laboratory
                                        </span>

                                        {product.homeSampleCollection && (
                                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                                                🏠 Home Collection
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-auto pt-4">
                                        <button
                                            onClick={(e) =>
                                                goToProductDetails(
                                                    product.id,
                                                    e
                                                )
                                            }
                                            className="
                                                w-full
                                                py-3
                                                rounded-xl
                                                bg-blue-600
                                                hover:bg-blue-700
                                                text-white
                                                font-semibold
                                                transition-all
                                            "
                                        >
                                            🧪 Book Test
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* NORMAL PRODUCT STATUS */}
                                    <div
                                        className="
                                            flex
                                            gap-2
                                            mt-2.5
                                            flex-wrap
                                            max-md:mt-2
                                        "
                                    >
                                        <span
                                            className="
                                                bg-sky-50
                                                text-sky-700
                                                border
                                                border-sky-100
                                                text-xs
                                                px-2
                                                py-1
                                                rounded-full
                                                font-medium
                                                max-md:text-[9px]
                                            "
                                        >
                                            🚚 Quick Delivery
                                        </span>

                                        <span
                                            className="
                                                bg-emerald-50
                                                text-emerald-700
                                                border
                                                border-emerald-100
                                                text-xs
                                                px-2
                                                py-1
                                                rounded-full
                                                font-medium
                                                max-md:text-[9px]
                                            "
                                        >
                                            ✓ Genuine
                                        </span>

                                        {product.stock > 10 ? (
                                            <span className="font-bold text-green-600 max-md:text-[10px]">
                                                ▣ In Stock (
                                                {product.stock})
                                            </span>
                                        ) : product.stock > 0 ? (
                                            <span className="font-bold text-amber-600 max-md:text-[10px]">
                                                Only{" "}
                                                {product.stock}{" "}
                                                Left
                                            </span>
                                        ) : (
                                            <span className="font-bold text-red-600 max-md:text-[10px]">
                                                × Out of Stock
                                            </span>
                                        )}
                                    </div>

                                    {/* ================================
                                        ACTION BUTTONS

                                        IMPORTANT:
                                        এখানে আর addToCart নেই।

                                        দুই button-ই Product Details Page
                                        খুলবে।
                                    ================================= */}
                                    <div
                                        className="
                                            mt-auto
                                            pt-4
                                            grid
                                            grid-cols-2
                                            gap-2
                                            max-md:pt-3
                                        "
                                    >
                                        {/* ADD TO CART */}
                                        <button
                                            disabled={
                                                isOutOfStock
                                            }
                                            onClick={(e) =>
                                                goToProductDetails(
                                                    product.id,
                                                    e
                                                )
                                            }
                                            className={`
                                                py-2.5
                                                rounded-xl
                                                text-sm
                                                font-bold
                                                shadow-sm
                                                text-white
                                                transition-all
                                                duration-300

                                                max-md:py-2.5
                                                max-md:rounded-lg
                                                max-md:text-[10px]

                                                ${
                                                    isOutOfStock
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-teal-600 hover:bg-teal-700 hover:shadow-lg"
                                                }
                                            `}
                                        >
                                            Add to Cart
                                        </button>

                                        {/* BUY NOW */}
                                        <button
                                            disabled={
                                                isOutOfStock
                                            }
                                            onClick={(e) =>
                                                goToProductDetails(
                                                    product.id,
                                                    e
                                                )
                                            }
                                            className={`
                                                py-2.5
                                                rounded-xl
                                                text-sm
                                                font-bold
                                                shadow-sm
                                                text-white
                                                transition-all
                                                duration-300

                                                max-md:py-2.5
                                                max-md:rounded-lg
                                                max-md:text-[10px]

                                                ${
                                                    isOutOfStock
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-orange-500 hover:bg-orange-600 hover:shadow-lg"
                                                }
                                            `}
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}